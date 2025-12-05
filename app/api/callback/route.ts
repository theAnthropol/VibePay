import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { getDB, generateId } from "@/lib/db";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const env = getRequestContext().env as Record<string, unknown>;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get("account_id");

    if (!accountId) {
      return NextResponse.redirect(new URL("/?error=missing_account", appUrl));
    }

    const stripe = getStripe();

    // Verify the Stripe account
    const account = await stripe.accounts.retrieve(accountId);

    // Check if charges are enabled
    if (!account.charges_enabled) {
      // Redirect back to complete onboarding
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${appUrl}/api/onboard/refresh?account_id=${accountId}`,
        return_url: `${appUrl}/api/callback?account_id=${accountId}`,
        type: "account_onboarding",
      });
      return NextResponse.redirect(accountLink.url);
    }

    // Get form data from cookie
    const cookieStore = await cookies();
    const formCookie = cookieStore.get("vibepay_form");

    if (!formCookie?.value) {
      return NextResponse.redirect(new URL("/?error=session_expired", appUrl));
    }

    let formData;
    try {
      formData = JSON.parse(formCookie.value);
    } catch {
      return NextResponse.redirect(new URL("/?error=invalid_session", appUrl));
    }

    const { name, priceInCents, destinationUrl, email } = formData;

    // Validate form data
    if (!name || !priceInCents || !destinationUrl) {
      return NextResponse.redirect(new URL("/?error=invalid_data", appUrl));
    }

    // Create product in D1 database
    const db = getDB();
    const productId = generateId();

    await db
      .prepare(
        `INSERT INTO products (id, stripe_account_id, name, price_in_cents, destination_url, creator_email)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(productId, accountId, name, priceInCents, destinationUrl, email)
      .run();

    // Clear the form cookie
    cookieStore.delete("vibepay_form");

    // Redirect to success page
    return NextResponse.redirect(new URL(`/created?id=${productId}`, appUrl));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/?error=callback_failed", appUrl));
  }
}
