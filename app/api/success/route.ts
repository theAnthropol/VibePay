import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDB, Product } from "@/lib/db";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: NextRequest) {
  const env = getRequestContext().env as Record<string, unknown>;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("product_id");
    const sessionId = searchParams.get("session_id");

    if (!productId || !sessionId) {
      return NextResponse.redirect(new URL("/?error=invalid_success", appUrl));
    }

    const db = getDB();

    // Fetch the product
    const product = await db
      .prepare("SELECT * FROM products WHERE id = ?")
      .bind(productId)
      .first<Product>();

    if (!product) {
      return NextResponse.redirect(new URL("/?error=product_not_found", appUrl));
    }

    // If no protected URL, just redirect to destination
    if (!product.protected_url) {
      return NextResponse.redirect(product.destination_url);
    }

    // Verify payment was successful (required)
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      stripeAccount: product.stripe_account_id,
    });

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(
        new URL(`/pay/${productId}?error=payment_not_confirmed`, appUrl)
      );
    }

    // Check if we already created a token for this session (idempotency)
    const existingToken = await db
      .prepare("SELECT token FROM access_tokens WHERE payment_intent_id = ?")
      .bind(sessionId)
      .first<{ token: string }>();

    if (existingToken) {
      // Return existing token
      return NextResponse.redirect(
        new URL(`/access/${existingToken.token}`, appUrl)
      );
    }

    // Generate a new access token (24 hours)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await db
      .prepare(
        `INSERT INTO access_tokens (product_id, payment_intent_id, token, expires_at)
         VALUES (?, ?, ?, ?)`
      )
      .bind(productId, sessionId, token, expiresAt)
      .run();

    // Redirect to access page
    return NextResponse.redirect(new URL(`/access/${token}`, appUrl));
  } catch (error) {
    console.error("Success handler error:", error);
    return NextResponse.redirect(new URL("/?error=success_failed", appUrl));
  }
}
