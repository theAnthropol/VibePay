import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Handle refresh URL - user abandoned onboarding and needs a new link
export async function GET(request: NextRequest) {
  const env = getRequestContext().env as Record<string, unknown>;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get("account_id");
    const formParam = searchParams.get("form");

    if (!accountId) {
      return NextResponse.redirect(new URL("/", appUrl));
    }

    if (!formParam) {
      return NextResponse.redirect(new URL("/?error=session_expired", appUrl));
    }

    const stripe = getStripe();

    // First check if account is actually ready - if so, go to callback directly
    const account = await stripe.accounts.retrieve(accountId);
    if (account.details_submitted) {
      // Account is ready, skip re-onboarding and go to callback
      return NextResponse.redirect(
        new URL(`/api/callback?account_id=${accountId}&form=${formParam}`, appUrl)
      );
    }

    // Account not ready, create a new account link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/api/onboard/refresh?account_id=${accountId}&form=${formParam}`,
      return_url: `${appUrl}/api/callback?account_id=${accountId}&form=${formParam}`,
      type: "account_onboarding",
    });

    return NextResponse.redirect(accountLink.url);
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.redirect(new URL("/?error=refresh_failed", appUrl));
  }
}
