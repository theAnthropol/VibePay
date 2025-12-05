import { redirect } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import CopyButton from "./CopyButton";
import Link from "next/link";

export const runtime = "edge";

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
}

export default async function CreatedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const productId = params.id;

  if (!productId) {
    redirect("/");
  }

  const ctx = getRequestContext();
  const env = ctx.env as Record<string, unknown>;
  const db = env.DB as D1Database;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) || "https://vibepay.io";

  const product = await db
    .prepare("SELECT id, name, price_in_cents FROM products WHERE id = ?")
    .bind(productId)
    .first<Product>();

  if (!product) {
    redirect("/?error=product_not_found");
  }

  const paymentLink = `${appUrl}/pay/${product.id}`;
  const priceFormatted = (product.price_in_cents / 100).toFixed(2);
  const embedCode = `<script src="${appUrl}/embed.js" data-vibepay-id="${product.id}"></script>`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold">
          Vibe<span className="text-accent">Pay</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">✓</div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Your VibePay link is ready!
            </h1>
            <p className="text-white/60">
              <span className="text-accent">{product.name}</span> — $
              {priceFormatted}
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-6">
            {/* Direct Link */}
            <div className="card">
              <label className="block text-sm text-white/60 mb-2">
                Payment Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={paymentLink}
                  readOnly
                  className="input-field flex-1 text-sm"
                />
                <CopyButton text={paymentLink} />
              </div>
            </div>

            {/* Embed Code */}
            <div className="card">
              <label className="block text-sm text-white/60 mb-2">
                Embed Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={embedCode}
                  readOnly
                  className="input-field flex-1 text-sm font-mono"
                />
                <CopyButton text={embedCode} />
              </div>
              <p className="text-xs text-white/40 mt-2">
                Add this to your website to create a buy button.
              </p>
            </div>

            {/* Stripe Dashboard Link */}
            <div className="card">
              <label className="block text-sm text-white/60 mb-2">
                Manage Sales & Payouts
              </label>
              <a
                href="https://dashboard.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block text-center w-full"
              >
                Go to Stripe Dashboard →
              </a>
              <p className="text-xs text-white/40 mt-2">
                View sales, issue refunds, and manage payouts in Stripe.
              </p>
            </div>
          </div>

          {/* Create Another */}
          <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-white/60 hover:text-white">
              ← Create another product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
