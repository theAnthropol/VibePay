"use client";

import { useState } from "react";

export default function PayButton({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={isLoading}
        className="btn-primary w-full text-lg"
      >
        {isLoading ? "Redirecting..." : "Purchase Access →"}
      </button>
    </div>
  );
}
