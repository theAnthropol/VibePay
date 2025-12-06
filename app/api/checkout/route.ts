import { NextRequest, NextResponse } from "next/server";
import { getStripe, calculatePlatformFee } from "@/lib/stripe";
import { getDB, Product } from "@/lib/db";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { productId?: string; returnUrl?: string };
    const { productId, returnUrl } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch product from D1 database
    const db = getDB();
    const product = await db
      .prepare("SELECT * FROM products WHERE id = ? AND is_active = 1")
      .bind(productId)
      .first<Product>();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found or inactive" },
        { status: 404 }
      );
    }

    const env = getRequestContext().env as Record<string, unknown>;
    const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";
    const stripe = getStripe();

    // Calculate platform fee (5%)
    const applicationFee = calculatePlatformFee(product.price_in_cents);

    // Determine success URL
    let successUrl: string;

    if (returnUrl) {
      // Gate.js flow: redirect back to app with payment confirmation
      const separator = returnUrl.includes('?') ? '&' : '?';
      successUrl = `${returnUrl}${separator}vibepay_payment={CHECKOUT_SESSION_ID}`;
    } else if (product.protected_url) {
      // Protected URL flow: use our handler
      successUrl = `${appUrl}/api/success?product_id=${productId}&session_id={CHECKOUT_SESSION_ID}`;
    } else {
      // Simple redirect to destination
      successUrl = product.destination_url;
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: product.price_in_cents,
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: applicationFee,
        },
        success_url: successUrl,
        cancel_url: `${appUrl}/pay/${productId}?canceled=true`,
      },
      {
        stripeAccount: product.stripe_account_id,
      }
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
