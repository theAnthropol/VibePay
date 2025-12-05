import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, priceInCents, destinationUrl, email } = body;

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

    // Store form data in httpOnly cookie (expires in 1 hour)
    const formData = {
      name: name.trim(),
      priceInCents,
      destinationUrl: destinationUrl.trim(),
      email: email?.trim() || null,
    };

    const cookieStore = await cookies();
    cookieStore.set("vibepay_form", JSON.stringify(formData), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    const stripe = getStripe();
    const env = getRequestContext().env;
    const appUrl = env.NEXT_PUBLIC_APP_URL || "https://vibepay.io";

    // Create Stripe Connect account
    const account = await stripe.accounts.create({
      type: "standard",
      email: email?.trim() || undefined,
    });

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${appUrl}/api/onboard/refresh?account_id=${account.id}`,
      return_url: `${appUrl}/api/callback?account_id=${account.id}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Onboard error:", error);
    return NextResponse.json(
      { error: "Failed to start onboarding" },
      { status: 500 }
    );
  }
}
