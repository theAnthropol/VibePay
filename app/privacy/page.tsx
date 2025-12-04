import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold">
          Vibe<span className="text-accent">Pay</span>
        </Link>
        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="text-white">
            Privacy
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <p>
            <strong className="text-white">Last updated:</strong> December 2024
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Our Philosophy: Minimal Data
            </h2>
            <p>
              VibePay is designed to collect and store as little data as
              possible. We believe the best way to protect your privacy is to
              never have your data in the first place.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              What We Store
            </h2>
            <p>For each product created, we store only:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product name</li>
              <li>Price</li>
              <li>Destination URL</li>
              <li>Stripe account ID (an identifier, not bank details)</li>
              <li>Creator email (if provided, optional)</li>
              <li>Creation timestamp</li>
            </ul>
            <p className="mt-4">That&apos;s it. One table, six fields.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              What We Never See
            </h2>
            <p>
              We have no access to and never store:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your bank account details</li>
              <li>Your social security number or tax ID</li>
              <li>Your identity documents</li>
              <li>Your customers&apos; payment information</li>
              <li>Your sales volume or transaction history</li>
              <li>Your payout schedule or amounts</li>
            </ul>
            <p className="mt-4">
              All of this is handled by Stripe. We are intentionally kept out of
              the loop.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Cookies
            </h2>
            <p>
              We use a single httpOnly cookie during the product creation
              process to temporarily store your form data while you complete
              Stripe onboarding. This cookie:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Expires after 1 hour</li>
              <li>Is deleted after successful product creation</li>
              <li>Cannot be read by JavaScript (httpOnly)</li>
              <li>Is not used for tracking or analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              No Analytics
            </h2>
            <p>
              VibePay does not use Google Analytics, Facebook Pixel, or any
              other tracking tools. We don&apos;t know who visits our site, how
              long they stay, or what they click on.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Third Parties
            </h2>
            <p>We use two third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Stripe</strong> — Payment
                processing. Their privacy policy governs how they handle payment
                data.
              </li>
              <li>
                <strong className="text-white">Supabase</strong> — Database
                hosting. They store our minimal product data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Data Retention
            </h2>
            <p>
              Product data is retained indefinitely to ensure payment links
              continue to work. We do not currently offer a way to delete
              products, but you can request deletion by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your data</li>
              <li>Request deletion of your data</li>
              <li>Request correction of your data</li>
            </ul>
            <p className="mt-4">
              Given our minimal data collection, there&apos;s not much to see,
              but we&apos;ll honor any reasonable request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              Contact
            </h2>
            <p>
              For privacy-related questions or data requests, contact us through
              the appropriate channels.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary inline-block">
            Create a Payment Link →
          </Link>
        </div>
      </main>
    </div>
  );
}
