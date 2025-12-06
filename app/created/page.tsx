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
  searchParams: { id?: string };
}) {
  const productId = searchParams.id;

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
  const gateCode = `<script src="${appUrl}/gate.js" data-vibepay-id="${product.id}"></script>`;

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

          {/* Quick Reference - 3 Ways to Get Paid */}
          <div className="bg-white/5 rounded-lg p-4 mb-8">
            <div className="text-xs text-white/40 mb-3 text-center">Pick the method that fits your use case:</div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="space-y-1">
                <div className="text-accent font-bold">1. Link</div>
                <div className="text-white/50">Share anywhere</div>
                <div className="text-white/30">Social, email, DMs</div>
              </div>
              <div className="space-y-1">
                <div className="text-accent font-bold">2. Button</div>
                <div className="text-white/50">Add to website</div>
                <div className="text-white/30">HTML, blogs, docs</div>
              </div>
              <div className="space-y-1">
                <div className="text-accent font-bold">3. Paywall</div>
                <div className="text-white/50">Block entire app</div>
                <div className="text-white/30">SaaS, tools, games</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Option 1: Direct Link */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded">1</span>
                <label className="text-sm font-medium">Share the Link</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={paymentLink}
                  readOnly
                  className="input-field flex-1 text-sm"
                />
                <CopyButton text={paymentLink} />
              </div>
              <p className="text-xs text-white/40 mt-2">
                Share on Twitter, Discord, email — anywhere you want.
              </p>
            </div>

            {/* Option 2: Embed Button */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded">2</span>
                <label className="text-sm font-medium">Embed a Buy Button</label>
              </div>
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
                Paste into any HTML page — button appears automatically.
              </p>

              {/* Platform-specific instructions */}
              <details className="mt-4">
                <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">
                  How to add to your app (Replit, Cursor, etc.)
                </summary>
                <div className="mt-3 space-y-4 text-xs">
                  {/* Replit */}
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">🔥 Replit / HTML project</div>
                    <ol className="list-decimal list-inside space-y-1 text-white/50">
                      <li>Open your <code className="bg-white/10 px-1 rounded">index.html</code></li>
                      <li>Paste the embed code where you want the button</li>
                      <li>Run your app — the Buy button will appear!</li>
                    </ol>
                  </div>

                  {/* React/Next.js */}
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">⚛️ React / Next.js / Cursor</div>
                    <p className="text-white/50 mb-2">Add to your component:</p>
                    <code className="block bg-black/30 p-2 rounded font-mono break-all text-white/70">
{`<a
  href="${paymentLink}"
  target="_blank"
  className="btn"
>
  Buy ${product.name} - $${priceFormatted}
</a>`}
                    </code>
                    <p className="text-white/40 mt-2">Or use Script tag in _document.tsx / layout.tsx</p>
                  </div>

                  {/* AI Instructions */}
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">🤖 Tell your AI assistant</div>
                    <p className="text-white/50 mb-2">Copy this prompt:</p>
                    <code className="block bg-black/30 p-2 rounded font-mono text-white/70 whitespace-pre-wrap">
{`Add a payment button to my app that links to:
${paymentLink}

Style it as a prominent call-to-action button
with the text "Buy ${product.name} - $${priceFormatted}"`}
                    </code>
                  </div>
                </div>
              </details>

              {/* Theme customization */}
              <details className="mt-4">
                <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">
                  Customize button style
                </summary>
                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="text-white/40">Light theme:</span>
                    <code className="block bg-white/5 p-2 mt-1 rounded font-mono break-all">
                      {`<script src="${appUrl}/embed.js" data-vibepay-id="${product.id}" data-theme="light"></script>`}
                    </code>
                  </div>
                  <div>
                    <span className="text-white/40">Accent theme (green):</span>
                    <code className="block bg-white/5 p-2 mt-1 rounded font-mono break-all">
                      {`<script src="${appUrl}/embed.js" data-vibepay-id="${product.id}" data-theme="accent"></script>`}
                    </code>
                  </div>
                  <div>
                    <span className="text-white/40">Large size:</span>
                    <code className="block bg-white/5 p-2 mt-1 rounded font-mono break-all">
                      {`<script src="${appUrl}/embed.js" data-vibepay-id="${product.id}" data-size="large"></script>`}
                    </code>
                  </div>
                  <div>
                    <span className="text-white/40">Custom text:</span>
                    <code className="block bg-white/5 p-2 mt-1 rounded font-mono break-all">
                      {`<script src="${appUrl}/embed.js" data-vibepay-id="${product.id}" data-text="Get Access"></script>`}
                    </code>
                  </div>
                </div>
              </details>
            </div>

            {/* Option 3: Gate.js Paywall */}
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded">3</span>
                <label className="text-sm font-medium">Paywall Your App</label>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">For apps</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={gateCode}
                  readOnly
                  className="input-field flex-1 text-sm font-mono"
                />
                <CopyButton text={gateCode} />
              </div>
              <p className="text-xs text-white/40 mt-2">
                Blocks your entire app until payment. Perfect for SaaS, tools, games, or any web app you want to monetize.
              </p>

              <details className="mt-4">
                <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">
                  How it works
                </summary>
                <div className="mt-3 space-y-3 text-xs">
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">🔒 Full-screen paywall</div>
                    <p className="text-white/50">
                      Gate.js shows a payment overlay that blocks your entire app. Users can&apos;t interact with anything until they pay. After payment, access is saved to their browser — they won&apos;t see the paywall again.
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">⚡ One-time setup</div>
                    <ol className="list-decimal list-inside space-y-1 text-white/50">
                      <li>Add the script tag to your app&apos;s HTML</li>
                      <li>Deploy your app</li>
                      <li>Users pay → get lifetime access</li>
                    </ol>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <div className="font-medium text-white/80 mb-2">🎨 Customization options</div>
                    <div className="space-y-2 text-white/50">
                      <code className="block bg-black/30 p-2 rounded font-mono break-all">
                        data-theme=&quot;light&quot; or &quot;dark&quot;
                      </code>
                      <code className="block bg-black/30 p-2 rounded font-mono break-all">
                        data-title=&quot;Unlock Premium&quot;
                      </code>
                      <code className="block bg-black/30 p-2 rounded font-mono break-all">
                        data-description=&quot;Get full access&quot;
                      </code>
                      <code className="block bg-black/30 p-2 rounded font-mono break-all">
                        data-button-text=&quot;Buy Now&quot;
                      </code>
                    </div>
                  </div>
                </div>
              </details>
            </div>

          </div>

          {/* Stripe Dashboard */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <a
                href="https://dashboard.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white inline-flex items-center gap-2"
              >
                <span>📊</span> Track Sales & Payouts in Stripe Dashboard →
              </a>
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
