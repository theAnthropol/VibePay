import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import PayButton from "./PayButton";

export const runtime = "edge";

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
  is_active: number;
}

export default async function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ canceled?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const env = getRequestContext().env as Record<string, unknown>;
  const db = env.DB as D1Database;

  const product = await db
    .prepare("SELECT id, name, price_in_cents, is_active FROM products WHERE id = ?")
    .bind(resolvedParams.id)
    .first<Product>();

  if (!product) {
    notFound();
  }

  if (!product.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">
            Product Unavailable
          </h1>
          <p className="text-white/60">
            This product is no longer available for purchase.
          </p>
        </div>
      </div>
    );
  }

  const priceFormatted = (product.price_in_cents / 100).toFixed(2);
  const canceled = resolvedSearchParams.canceled === "true";

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card text-center">
          {canceled && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-3 text-sm mb-6">
              Payment was canceled. You can try again below.
            </div>
          )}

          <h1 className="font-display text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <div className="text-4xl font-bold text-accent my-8">
            ${priceFormatted}
          </div>

          <PayButton productId={product.id} />

          <p className="text-xs text-white/40 mt-6">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-white/40 hover:text-white/60">
            Powered by VibePay
          </a>
        </div>
      </div>
    </div>
  );
}
