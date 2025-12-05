import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const env = getRequestContext().env as Record<string, unknown>;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

  try {
    const body = (await request.json()) as {
      accountId?: string;
      form?: string;
    };
    const { accountId, form } = body;

    if (!accountId) {
      return NextResponse.json(
        { error: "Missing account ID" },
        { status: 400 }
      );
    }

    if (!form) {
      return NextResponse.json(
        { error: "Missing form data" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // First check if account is actually ready
    const account = await stripe.accounts.retrieve(accountId);
    if (account.details_submitted) {
      // Account is ready, return callback URL directly
      return NextResponse.json({
        url: `${appUrl}/api/callback?account_id=${accountId}&form=${form}`,
        ready: true,
      });
    }

    // Create a new account link for the existing account
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/api/onboard/refresh?account_id=${accountId}&form=${form}`,
      return_url: `${appUrl}/api/callback?account_id=${accountId}&form=${form}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url, ready: false });
  } catch (error) {
    console.error("Retry error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to create account link: ${errorMessage}` },
      { status: 500 }
    );
  }
}
