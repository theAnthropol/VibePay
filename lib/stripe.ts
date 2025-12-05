import Stripe from "stripe";
import { getRequestContext } from "@cloudflare/next-on-pages";

// Get Stripe client (initialized per-request for edge runtime)
export function getStripe(): Stripe {
  const secretKey = getRequestContext().env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey, {
    apiVersion: "2024-04-10",
    typescript: true,
  });
}

// Platform fee: 5%
export const PLATFORM_FEE_PERCENT = 5;

export function calculatePlatformFee(amountInCents: number): number {
  return Math.round(amountInCents * (PLATFORM_FEE_PERCENT / 100));
}
