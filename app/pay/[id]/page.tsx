import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import PayButton from "./PayButton";

export const runtime = "edge";

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
  is_active: number;
  creator_email: string | null;
  created_at: string;
}

export default async function PayPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { canceled?: string; return_url?: string };
}) {
  const env = getRequestContext().env as Record<string, unknown>;
  const db = env.DB as D1Database;

  const product = await db
    .prepare("SELECT id, name, price_in_cents, is_active, creator_email, created_at FROM products WHERE id = ?")
    .bind(params.id)
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
  const canceled = searchParams.canceled === "true";
  const returnUrl = searchParams.return_url;

  // Format creation date
  const createdDate = new Date(product.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Scam Warning Banner */}
        <div className="alert-warning px-4 py-3 text-xs mb-4" role="alert">
          <strong>Safety tip:</strong> Only pay if you requested this purchase.
          If you received this link unexpectedly, verify with the seller before paying.
        </div>

        <div className="card text-center">
          {canceled && (
            <div className="alert-error px-4 py-3 text-sm mb-6" role="alert">
              Payment was canceled. You can try again below.
            </div>
          )}

          <h1 className="font-display text-3xl font-bold mb-2">
            {product.name}
          </h1>

          <div className="text-4xl font-bold text-accent my-6">
            ${priceFormatted}
          </div>

          {/* Seller Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
            <div className="text-xs text-white/40 mb-2">Seller Information</div>
            <div className="space-y-1 text-sm">
              {product.creator_email ? (
                <div className="flex justify-between">
                  <span className="text-white/60">Contact:</span>
                  <a href={`mailto:${product.creator_email}`} className="text-accent hover:underline">
                    {product.creator_email}
                  </a>
                </div>
              ) : (
                <div className="text-white/40 text-xs italic">
                  Seller did not provide contact email
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/60">Listed:</span>
                <span className="text-white/80">{createdDate}</span>
              </div>
            </div>
          </div>

          <PayButton productId={product.id} returnUrl={returnUrl} />

          <p className="text-xs text-white/40 mt-6">
            Secure payment powered by Stripe
          </p>
        </div>

        {/* Footer with safety info */}
        <div className="mt-6 space-y-3">
          <div className="text-center">
            <a href="/" className="text-sm text-white/40 hover:text-white/60">
              Powered by VibePay
            </a>
          </div>
          <div className="text-center text-xs text-white/30">
            Questions about this purchase?{" "}
            {product.creator_email ? (
              <a href={`mailto:${product.creator_email}`} className="underline hover:text-white/50">
                Contact the seller
              </a>
            ) : (
              <span>Contact the seller directly</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
