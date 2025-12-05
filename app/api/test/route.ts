import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const env = getRequestContext().env as Record<string, unknown>;

    return NextResponse.json({
      status: "ok",
      hasStripeKey: !!env.STRIPE_SECRET_KEY,
      hasWebhookSecret: !!env.STRIPE_WEBHOOK_SECRET,
      hasDB: !!env.DB,
      appUrl: env.NEXT_PUBLIC_APP_URL || "not set",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
