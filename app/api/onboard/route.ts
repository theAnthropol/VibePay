import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface Seller {
  id: string;
  email: string;
  stripe_account_id: string;
  is_verified: number;
}

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

    if (!priceInCents || typeof priceInCents !== "number" || priceInCents < 99) {
      return NextResponse.json(
        { error: "Price must be at least $0.99" },
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
    const db = env.DB as D1Database;
    const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

    // Check if this email already has a verified Stripe account
    const normalizedEmail = email?.trim().toLowerCase();

    if (normalizedEmail) {
      // First check our local database
      const existingSeller = await db
        .prepare("SELECT * FROM sellers WHERE email = ?")
        .bind(normalizedEmail)
        .first<Seller>();

      if (existingSeller) {
        // Verify the account still exists and is ready in Stripe
        try {
          const account = await stripe.accounts.retrieve(existingSeller.stripe_account_id);
          if (account.details_submitted) {
            // Account is ready - skip onboarding entirely!
            const encodedFormData = encodeURIComponent(JSON.stringify(formData));
            return NextResponse.json({
              url: `${appUrl}/api/callback?account_id=${existingSeller.stripe_account_id}&form=${encodedFormData}`,
              returning: true
            });
          }
        } catch (err) {
          // Account doesn't exist in Stripe anymore, remove from our DB
          console.log("Removing stale seller record:", err);
          await db.prepare("DELETE FROM sellers WHERE id = ?").bind(existingSeller.id).run();
        }
      }

      // Not in our DB - search Stripe for existing connected account with this email
      // This catches accounts created before we added the sellers table
      try {
        const accounts = await stripe.accounts.list({ limit: 100 });
        const existingAccount = accounts.data.find(
          (acc) => acc.email?.toLowerCase() === normalizedEmail && acc.details_submitted
        );

        if (existingAccount) {
          // Found existing account in Stripe! Save it and use it
          console.log("Found existing Stripe account for email:", normalizedEmail);

          // Save to our DB for future
          try {
            await db
              .prepare(
                `INSERT INTO sellers (email, stripe_account_id, is_verified)
                 VALUES (?, ?, 1)
                 ON CONFLICT(email) DO UPDATE SET stripe_account_id = ?, is_verified = 1`
              )
              .bind(normalizedEmail, existingAccount.id, existingAccount.id)
              .run();
          } catch (e) {
            console.log("Note: couldn't save seller:", e);
          }

          // Skip onboarding - use existing account
          const encodedFormData = encodeURIComponent(JSON.stringify(formData));
          return NextResponse.json({
            url: `${appUrl}/api/callback?account_id=${existingAccount.id}&form=${encodedFormData}`,
            returning: true
          });
        }
      } catch (err) {
        console.log("Note: couldn't search Stripe accounts:", err);
        // Continue to create new account
      }
    }

    // No existing account found anywhere - create a new Stripe Connect account
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
