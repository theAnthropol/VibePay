import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import CopyButton from "./CopyButton";
import Link from "next/link";

// Server-side Supabase client
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase credentials");
  return createClient(url, key);
}

interface Product {
  id: string;
  name: string;
  price_in_cents: number;
}

export default async function CreatedPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const productId = searchParams.id;

  if (!productId) {
    redirect("/");
  }

  const supabase = getSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, price_in_cents")
    .eq("id", productId)
    .single();

  if (error || !product) {
    redirect("/?error=product_not_found");
  }

  const typedProduct = product as Product;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://vibepay.io";
  const paymentLink = `${appUrl}/pay/${typedProduct.id}`;
  const priceFormatted = (typedProduct.price_in_cents / 100).toFixed(2);

  const embedCode = `<script src="${appUrl}/embed.js" data-vibepay-id="${typedProduct.id}"></script>`;

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
              <span className="text-accent">{typedProduct.name}</span> — $
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
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white"
            >
              ← Create another product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
