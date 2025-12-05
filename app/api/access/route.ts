import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface AccessToken {
  id: string;
  product_id: string;
  token: string;
  expires_at: string;
  used_at: string | null;
}

interface Product {
  id: string;
  protected_url: string | null;
  destination_url: string;
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

// POST: Create an access token after successful payment
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      paymentIntentId?: string;
    };
    const { productId, paymentIntentId } = body;

    if (!productId || !paymentIntentId) {
      return NextResponse.json(
        { error: "Missing productId or paymentIntentId" },
        { status: 400 }
      );
    }

    const env = getRequestContext().env as Record<string, unknown>;
    const db = env.DB as D1Database;

    // Check if product exists and has a protected URL
    const product = await db
      .prepare("SELECT id, protected_url, destination_url FROM products WHERE id = ?")
      .bind(productId)
      .first<Product>();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // If no protected URL, just return the destination URL
    if (!product.protected_url) {
      return NextResponse.json({
        url: product.destination_url,
        protected: false
      });
    }

    // Generate a time-limited access token (24 hours)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await db
      .prepare(
        `INSERT INTO access_tokens (product_id, payment_intent_id, token, expires_at)
         VALUES (?, ?, ?, ?)`
      )
      .bind(productId, paymentIntentId, token, expiresAt)
      .run();

    const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

    return NextResponse.json({
      url: `${appUrl}/access/${token}`,
      protected: true,
      expiresAt,
    });
  } catch (error) {
    console.error("Access token creation error:", error);
    return NextResponse.json(
      { error: "Failed to create access token" },
      { status: 500 }
    );
  }
}

// GET: Verify a token and return the protected URL (used by the access page)
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const env = getRequestContext().env as Record<string, unknown>;
    const db = env.DB as D1Database;

    // Find the token
    const accessToken = await db
      .prepare(
        `SELECT at.*, p.protected_url, p.name as product_name
         FROM access_tokens at
         JOIN products p ON at.product_id = p.id
         WHERE at.token = ?`
      )
      .bind(token)
      .first<AccessToken & { protected_url: string; product_name: string }>();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Invalid or expired token", valid: false },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date(accessToken.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Token has expired", valid: false },
        { status: 410 }
      );
    }

    // Check if already used (optional - can remove for multi-use)
    if (accessToken.used_at) {
      // Still allow access, just note it was used before
      return NextResponse.json({
        valid: true,
        url: accessToken.protected_url,
        productName: accessToken.product_name,
        usedBefore: true,
      });
    }

    // Mark as used
    await db
      .prepare("UPDATE access_tokens SET used_at = datetime('now') WHERE token = ?")
      .bind(token)
      .run();

    return NextResponse.json({
      valid: true,
      url: accessToken.protected_url,
      productName: accessToken.product_name,
      usedBefore: false,
    });
  } catch (error) {
    console.error("Access token verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}
