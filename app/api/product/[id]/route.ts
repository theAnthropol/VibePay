import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
  is_active: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const env = getRequestContext().env as Record<string, unknown>;
    const db = env.DB as D1Database;

    const product = await db
      .prepare("SELECT id, name, price_in_cents, is_active FROM products WHERE id = ?")
      .bind(productId)
      .first<Product>();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    if (!product.is_active) {
      return NextResponse.json(
        { error: "Product is not active" },
        { status: 404 }
      );
    }

    // Return product info for embed (price in cents for consistency)
    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price_in_cents,
    }, {
      headers: {
        // Allow CORS for embed script
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      }
    });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
