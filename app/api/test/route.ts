import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Step 1: Basic test
  let result: Record<string, unknown> = { step1: "ok" };

  // Step 2: Try to import getRequestContext
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    result.step2 = "import ok";

    // Step 3: Try to call getRequestContext
    try {
      const ctx = getRequestContext();
      result.step3 = "context ok";

      // Step 4: Check env
      const env = ctx.env as Record<string, unknown>;
      result.step4 = "env ok";
      result.hasStripeKey = !!env.STRIPE_SECRET_KEY;
      result.hasWebhookSecret = !!env.STRIPE_WEBHOOK_SECRET;
      result.hasDB = !!env.DB;
      result.envKeys = Object.keys(env);
    } catch (e) {
      result.step3_error = e instanceof Error ? e.message : String(e);
    }
  } catch (e) {
    result.step2_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(result);
}
