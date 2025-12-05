import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Handle refresh URL - user abandoned onboarding and needs a new link
export async function GET(request: NextRequest) {
  const env = getRequestContext().env;
  const appUrl = env.NEXT_PUBLIC_APP_URL || "https://vibepay.io";

  try {
    const searchParams = request.nextUrl.searchParams;
    const accountId = searchParams.get("account_id");

    if (!accountId) {
      return NextResponse.redirect(new URL("/", appUrl));
    }

    const stripe = getStripe();

    // Create a new account link for the same account
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/api/onboard/refresh?account_id=${accountId}`,
      return_url: `${appUrl}/api/callback?account_id=${accountId}`,
      type: "account_onboarding",
    });

    return NextResponse.redirect(accountLink.url);
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.redirect(new URL("/?error=refresh_failed", appUrl));
  }
}
