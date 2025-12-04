import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import PayButton from "./PayButton";

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
  is_active: boolean;
}

export default async function PayPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { canceled?: string };
}) {
  const supabase = getSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, price_in_cents, is_active")
    .eq("id", params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  const typedProduct = product as Product;

  if (!typedProduct.is_active) {
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

  const priceFormatted = (typedProduct.price_in_cents / 100).toFixed(2);
  const canceled = searchParams.canceled === "true";

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
            {typedProduct.name}
          </h1>

          <div className="text-4xl font-bold text-accent my-8">
            ${priceFormatted}
          </div>

          <PayButton productId={typedProduct.id} />

          <p className="text-xs text-white/40 mt-6">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-white/40 hover:text-white/60"
          >
            Powered by VibePay
          </a>
        </div>
      </div>
    </div>
  );
}
