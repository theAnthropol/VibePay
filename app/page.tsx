"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Mouse tracking for interactive glass effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  // Check if user has already accepted cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("vibepay_cookies_accepted");
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("vibepay_cookies_accepted", "true");
    setShowCookieBanner(false);
  };

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
    name.trim().length <= 100 &&
    priceNum >= 0.99 &&
    priceNum <= 10000 &&
    isValidUrl(destinationUrl) &&
    (!useProtection || isValidUrl(protectedUrl)) &&
    acceptedTerms;

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
          <Link href="/dmca" className="hover:text-white">
            DMCA
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Side - Instructions */}
          <div className="w-full lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              <h2 className="font-display text-xl font-bold mb-4 text-accent">How it works</h2>

              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-white/80 font-medium mb-1">⚡ First time?</div>
                  <p className="text-white/50">
                    You&apos;ll create a Stripe account (~5 mins). We never see your Stripe data — payments go directly to you.
                  </p>
                </div>

                <div>
                  <div className="text-white/80 font-medium mb-2">3 ways to monetize:</div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-accent font-bold">1.</span>
                      <div className="text-white/50">
                        <span className="text-white/70">Share the link</span>
                        <span className="text-white/30 text-xs ml-1">(Twitter, Discord, email)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-accent font-bold">2.</span>
                      <div className="text-white/50">
                        <span className="text-white/70">Embed a button</span>
                        <span className="text-white/30 text-xs ml-1">(websites, blogs, docs)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-accent font-bold">3.</span>
                      <div className="text-white/50">
                        <span className="text-white/70">Paywall your app</span>
                        <span className="text-white/30 text-xs ml-1">(SaaS, tools, games)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-white/80 font-medium mb-1">🤖 Works with vibe coders</div>
                  <p className="text-white/50">
                    Cursor, Replit, Bolt, Lovable — just paste the embed code and ship.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:flex-1 max-w-xl order-1 lg:order-2">
            {/* Hero */}
            <div className="text-center lg:text-left mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Payment links for
                <br />
                <span className="text-accent">vibe creators</span>
              </h1>
              <p className="text-white/60 text-lg">
                Create, link, get paid.
              </p>
              <p className="text-white/40 text-sm mt-2">
                Powered by{" "}
                <a
                  href="https://stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white"
                >
                  Stripe
                </a>
              </p>
            </div>

            {/* Form with Interactive Glass Effect */}
          <div
            className="card glass-interactive"
            onMouseMove={handleMouseMove}
          >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="alert-error px-4 py-3 text-sm" role="alert">
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
                maxLength={100}
                required
                aria-describedby="name-hint"
              />
              <p id="name-hint" className="text-xs text-white/30 mt-1">{name.length}/100</p>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Price (USD)
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
                  max="10000"
                  step="0.01"
                  className="input-field pl-8"
                />
              </div>
              {price && priceNum < 0.99 && (
                <p className="text-xs text-red-400 mt-1">Price must be at least $0.99</p>
              )}
              {price && priceNum > 10000 && (
                <p className="text-xs text-red-400 mt-1">Price must be $10,000 or less</p>
              )}
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
                  <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">For downloads</span>
                  <p className="text-sm text-white/50 mt-1">
                    Sell downloadable files (PDFs, ZIPs, videos, etc.). Your file URL stays hidden — buyers get a secure, time-limited download link after payment. Works with Google Drive, Dropbox, or any direct file URL.
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
                Your email (optional) — shown to buyers for support
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
              />
              <p className="text-xs text-white/30 mt-1">
                Buyers can contact you about issues with their purchase
              </p>
            </div>

            {/* Fee Calculator */}
            {priceNum >= 0.99 && (
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

            {/* Terms & Privacy Acceptance */}
            <div className="card">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-accent"
                  required
                />
                <div className="text-sm">
                  <span className="text-white/80">
                    I agree to the{" "}
                    <Link href="/terms" className="text-accent hover:underline" target="_blank">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-accent hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                  <p className="text-white/40 text-xs mt-1">
                    You must accept to create a payment link
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Connecting..." : "Connect Stripe & Create →"}
            </button>

            <p className="text-xs text-white/40 text-center lg:text-left">
              First time users are redirected to Stripe to connect your account.
            </p>
          </form>
          </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-white/40">
        Built for vibe coders who ship.
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-white/10 p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/70 text-center sm:text-left">
              <span className="text-white font-medium">We use cookies</span> to remember your preferences and improve your experience.
              By continuing, you agree to our{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={acceptCookies}
                className="btn-primary text-sm px-6 py-2"
              >
                Accept
              </button>
              <button
                onClick={() => setShowCookieBanner(false)}
                className="text-sm text-white/50 hover:text-white px-4 py-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
