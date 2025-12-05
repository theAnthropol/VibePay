"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function PendingContent() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account_id");
  const formParam = searchParams.get("form");
  const [isChecking, setIsChecking] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Parse form data to show product info
  let productName = "Your product";
  try {
    if (formParam) {
      const formData = JSON.parse(decodeURIComponent(formParam));
      productName = formData.name || "Your product";
    }
  } catch {
    // Ignore parse errors
  }

  async function checkStatus() {
    if (!accountId || !formParam) return;
    setIsChecking(true);

    try {
      const res = await fetch(
        `/api/callback?account_id=${accountId}&form=${formParam}`
      );
      // The API will redirect us - either back here or to /created
      window.location.href = res.url;
    } catch {
      setIsChecking(false);
    }
  }

  async function retryOnboarding() {
    if (!accountId || !formParam) return;
    setIsRetrying(true);

    try {
      const res = await fetch("/api/onboard/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, form: formParam }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setIsRetrying(false);
    }
  }

  if (!accountId || !formParam) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <h1 className="font-display text-2xl font-bold mb-4">
            Session Expired
          </h1>
          <p className="text-white/60 mb-6">
            Your session has expired. Please start over.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="font-display text-2xl font-bold mb-2">
            Almost There!
          </h1>
          <p className="text-white/60 mb-6">
            Your Stripe account is being verified. This usually takes just a
            moment, but sometimes Stripe needs additional information.
          </p>

          <div className="bg-white/5 border border-white/10 p-4 mb-6 text-left">
            <div className="text-sm text-white/40 mb-1">Product</div>
            <div className="font-medium">{productName}</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={checkStatus}
              disabled={isChecking}
              className="btn-primary w-full"
            >
              {isChecking ? "Checking..." : "Check Status"}
            </button>

            <button
              onClick={retryOnboarding}
              disabled={isRetrying}
              className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors disabled:opacity-50"
            >
              {isRetrying ? "Loading..." : "Complete Stripe Setup"}
            </button>
          </div>

          <p className="text-xs text-white/40 mt-6">
            If you&apos;ve already completed verification, click &quot;Check
            Status&quot;. If Stripe needs more info, click &quot;Complete Stripe
            Setup&quot;.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-white/40 hover:text-white/60">
            ← Start over with a new product
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card text-center max-w-md">
        <div className="text-4xl mb-4 animate-pulse">⏳</div>
        <h1 className="font-display text-xl font-bold">Loading...</h1>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PendingContent />
    </Suspense>
  );
}
