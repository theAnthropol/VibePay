import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name?: string; priceInCents?: number; destinationUrl?: string; protectedUrl?: string; email?: string };
    const { name, priceInCents, destinationUrl, protectedUrl, email } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    if (!priceInCents || typeof priceInCents !== "number" || priceInCents < 200) {
      return NextResponse.json(
        { error: "Price must be at least $2.00" },
        { status: 400 }
      );
    }

    if (
      !destinationUrl ||
      typeof destinationUrl !== "string" ||
      (!destinationUrl.startsWith("http://") &&
        !destinationUrl.startsWith("https://"))
    ) {
      return NextResponse.json(
        { error: "Valid destination URL is required (http:// or https://)" },
        { status: 400 }
      );
    }

    // Validate protected URL if provided
    if (
      protectedUrl &&
      typeof protectedUrl === "string" &&
      !protectedUrl.startsWith("http://") &&
      !protectedUrl.startsWith("https://")
    ) {
      return NextResponse.json(
        { error: "Protected URL must be a valid URL (http:// or https://)" },
        { status: 400 }
      );
    }

    // Store form data for later use via query params
    const formData = {
      name: name.trim(),
      priceInCents,
      destinationUrl: destinationUrl.trim(),
      protectedUrl: protectedUrl?.trim() || null,
      email: email?.trim() || null,
    };

    const stripe = getStripe();
    const env = getRequestContext().env as Record<string, unknown>;
    const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.pages.dev";

    // Create Stripe Connect account
    const account = await stripe.accounts.create({
      type: "standard",
      email: email?.trim() || undefined,
    });

    // Encode form data in URL for callback
    const encodedFormData = encodeURIComponent(JSON.stringify(formData));

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${appUrl}/api/onboard/refresh?account_id=${account.id}&form=${encodedFormData}`,
      return_url: `${appUrl}/api/callback?account_id=${account.id}&form=${encodedFormData}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Onboard error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to start onboarding: ${errorMessage}` },
      { status: 500 }
    );
  }
}
