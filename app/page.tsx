"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("https://");
  const [protectedUrl, setProtectedUrl] = useState("");
  const [useProtection, setUseProtection] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fee calculator
  const priceNum = parseFloat(price) || 0;
  const stripeFee = priceNum > 0 ? priceNum * 0.029 + 0.3 : 0;
  const vibePayFee = priceNum * 0.05;
  const youGet = priceNum - stripeFee - vibePayFee;

  const isValidUrl = (url: string) =>
    url.trim().length > 8 &&
    (url.startsWith("http://") || url.startsWith("https://"));

  const isValid =
    name.trim() &&
    priceNum >= 2 &&
    isValidUrl(destinationUrl) &&
    (!useProtection || isValidUrl(protectedUrl));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          priceInCents: Math.round(priceNum * 100),
          destinationUrl: destinationUrl.trim(),
          protectedUrl: useProtection ? protectedUrl.trim() : null,
          email: email.trim() || null,
        }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Stripe onboarding
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="font-display text-2xl font-bold">
          Vibe<span className="text-accent">Pay</span>
        </div>
        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Payment links for
              <br />
              <span className="text-accent">vibe coders</span>
            </h1>
            <p className="text-white/60 text-lg">
              No accounts. No dashboards. Just vibes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Product name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Thing"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Price (USD) — $2 minimum
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  $
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="10.00"
                  min="2"
                  step="0.01"
                  className="input-field pl-8"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                {useProtection
                  ? "Thank you page — shown after payment"
                  : "Destination URL — where buyers go after payment"}
              </label>
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder={
                  useProtection
                    ? "https://your-site.com/thank-you"
                    : "https://your-content.com/download"
                }
                className="input-field"
                required
              />
            </div>

            {/* Link Protection Toggle */}
            <div className="card">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useProtection}
                  onChange={(e) => setUseProtection(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-accent"
                />
                <div>
                  <span className="font-medium">Protect a file link</span>
                  <p className="text-sm text-white/50 mt-1">
                    Hide your Google Drive, Dropbox, or any file URL behind a
                    paywall. Buyers get a secure, time-limited access link.
                  </p>
                </div>
              </label>

              {useProtection && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <label className="block text-sm text-white/60 mb-2">
                    Protected file URL — hidden until payment
                  </label>
                  <input
                    type="url"
                    value={protectedUrl}
                    onChange={(e) => setProtectedUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-2">
                    This URL is never exposed. After payment, buyers get a
                    unique link that expires in 24 hours.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Your email (optional) — for Stripe notifications
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            {/* Fee Calculator */}
            {priceNum >= 2 && (
              <div className="card space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Buyer pays</span>
                  <span>${priceNum.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Stripe (~2.9% + $0.30)</span>
                  <span className="text-white/40">-${stripeFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">VibePay (5%)</span>
                  <span className="text-white/40">
                    -${vibePayFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                  <span>You get</span>
                  <span className="text-accent">${youGet.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Connecting..." : "Connect Stripe & Create →"}
            </button>

            <p className="text-xs text-white/40 text-center">
              You&apos;ll be redirected to Stripe to connect your account.
              <br />
              Returning users: Stripe remembers you — instant creation.
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-white/40">
        Built for vibe coders who ship.
      </footer>
    </div>
  );
}
