import { NextRequest, NextResponse } from "next/server";
import { stripe, calculatePlatformFee } from "@/lib/stripe";
import { supabase, Product } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch product from database
    const { data: product, error: dbError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_active", true)
      .single();

    if (dbError || !product) {
      return NextResponse.json(
        { error: "Product not found or inactive" },
        { status: 404 }
      );
    }

    const typedProduct = product as Product;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Calculate platform fee (5%)
    const applicationFee = calculatePlatformFee(typedProduct.price_in_cents);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: typedProduct.name,
              },
              unit_amount: typedProduct.price_in_cents,
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: applicationFee,
        },
        success_url: typedProduct.destination_url,
        cancel_url: `${appUrl}/pay/${productId}?canceled=true`,
      },
      {
        stripeAccount: typedProduct.stripe_account_id,
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
