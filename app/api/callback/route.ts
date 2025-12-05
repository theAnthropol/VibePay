import { NextRequest, NextResponse } from "next/server";
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
    const formParam = searchParams.get("form");

    if (!accountId) {
      return NextResponse.redirect(new URL("/?error=missing_account", appUrl));
    }

    if (!formParam) {
      return NextResponse.redirect(new URL("/?error=missing_form_data", appUrl));
    }

    // Parse form data from URL parameter
    let formData;
    try {
      formData = JSON.parse(decodeURIComponent(formParam));
    } catch {
      return NextResponse.redirect(new URL("/?error=invalid_form_data", appUrl));
    }

    const { name, priceInCents, destinationUrl, protectedUrl, email } = formData;

    // Validate form data
    if (!name || !priceInCents || !destinationUrl) {
      return NextResponse.redirect(new URL("/?error=invalid_data", appUrl));
    }

    const stripe = getStripe();

    // Verify the Stripe account
    const account = await stripe.accounts.retrieve(accountId);

    // For Standard accounts, details_submitted means they completed onboarding
    // charges_enabled may take a moment to become true after linking existing account
    const isReady = account.details_submitted;

    // If not ready, show pending page
    if (!isReady) {
      const encodedFormData = encodeURIComponent(JSON.stringify(formData));
      return NextResponse.redirect(
        new URL(`/pending?account_id=${accountId}&form=${encodedFormData}`, appUrl)
      );
    }

    // If details submitted but charges not enabled, still proceed but warn
    // This can happen with new accounts that need Stripe review
    const needsReview = !account.charges_enabled;

    // Create product in D1 database
    const db = getDB();
    const productId = generateId();

    await db
      .prepare(
        `INSERT INTO products (id, stripe_account_id, name, price_in_cents, destination_url, protected_url, creator_email)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(productId, accountId, name, priceInCents, destinationUrl, protectedUrl || null, email)
      .run();

    // Redirect to success page (with review flag if needed)
    const successUrl = needsReview
      ? `/created?id=${productId}&review=pending`
      : `/created?id=${productId}`;
    return NextResponse.redirect(new URL(successUrl, appUrl));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/?error=callback_failed", appUrl));
  }
}
