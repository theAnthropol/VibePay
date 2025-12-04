import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get("account_id");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!accountId) {
      return NextResponse.redirect(
        new URL("/?error=missing_account", appUrl)
      );
    }

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
      return NextResponse.redirect(
        new URL("/?error=session_expired", appUrl)
      );
    }

    let formData;
    try {
      formData = JSON.parse(formCookie.value);
    } catch {
      return NextResponse.redirect(
        new URL("/?error=invalid_session", appUrl)
      );
    }

    const { name, priceInCents, destinationUrl, email } = formData;

    // Validate form data
    if (!name || !priceInCents || !destinationUrl) {
      return NextResponse.redirect(
        new URL("/?error=invalid_data", appUrl)
      );
    }

    // Create product in database
    const { data: product, error: dbError } = await supabase
      .from("products")
      .insert({
        stripe_account_id: accountId,
        name,
        price_in_cents: priceInCents,
        destination_url: destinationUrl,
        creator_email: email,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.redirect(
        new URL("/?error=creation_failed", appUrl)
      );
    }

    // Clear the form cookie
    cookieStore.delete("vibepay_form");

    // Redirect to success page
    return NextResponse.redirect(
      new URL(`/created?id=${product.id}`, appUrl)
    );
  } catch (error) {
    console.error("Callback error:", error);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(
      new URL("/?error=callback_failed", appUrl)
    );
  }
}
