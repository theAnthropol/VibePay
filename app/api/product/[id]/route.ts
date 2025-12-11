import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
  is_active: number;
}

// Helper to build CORS headers - uses requesting origin for better security
const getCorsHeaders = (request: NextRequest) => {
  const origin = request.headers.get("origin");
  return {
    // Reflect the requesting origin if present, otherwise allow all (for direct browser access)
    // This is needed for embed scripts to work from any website
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    // Prevent caching of CORS headers across different origins
    "Vary": "Origin",
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400, headers: getCorsHeaders(request) }
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
        { status: 404, headers: getCorsHeaders(request) }
      );
    }

    if (!product.is_active) {
      return NextResponse.json(
        { error: "Product is not active" },
        { status: 404, headers: getCorsHeaders(request) }
      );
    }

    // Return product info for embed (price in cents for consistency)
    // Only expose minimal data needed for embed functionality
    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price_in_cents,
    }, {
      headers: {
        ...getCorsHeaders(request),
        "Cache-Control": "public, max-age=60", // Cache for 1 minute
        "X-Content-Type-Options": "nosniff",
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
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}
