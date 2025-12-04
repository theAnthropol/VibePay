import Link from "next/link";

export default function TermsPage() {
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
          <Link href="/terms" className="text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70">
          <p>
            <strong className="text-white">Last updated:</strong> December 2024
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              1. Service Description
            </h2>
            <p>
              VibePay provides a payment link generation service that connects
              creators with buyers through Stripe. We are a payment link
              factory—nothing more.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              2. Your Role as Merchant
            </h2>
            <p>
              When you create payment links through VibePay, you are the
              merchant of record. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for fulfilling orders</li>
              <li>You handle customer service and refunds</li>
              <li>You are liable for chargebacks and disputes</li>
              <li>You must comply with all applicable laws and regulations</li>
              <li>You must accurately describe your products</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              3. Fees
            </h2>
            <p>
              VibePay charges 5% of each successful transaction as an
              application fee. Stripe&apos;s standard processing fees (~2.9% +
              $0.30) also apply. The minimum product price is $2.00.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              4. Prohibited Uses
            </h2>
            <p>You may not use VibePay to sell:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Illegal products or services</li>
              <li>Adult content (unless permitted by Stripe)</li>
              <li>Weapons, drugs, or controlled substances</li>
              <li>Counterfeit or stolen goods</li>
              <li>Products that infringe on intellectual property rights</li>
              <li>Anything prohibited by Stripe&apos;s terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              5. Content Delivery Model
            </h2>
            <p>
              VibePay uses an &quot;honesty gate&quot; model. After payment,
              buyers are redirected to your destination URL. You acknowledge
              that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The destination URL becomes accessible after payment</li>
              <li>
                VibePay does not provide DRM or access control beyond this gate
              </li>
              <li>
                For sensitive content, you should implement additional security
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              6. Account Termination
            </h2>
            <p>
              We reserve the right to disable any product at our sole
              discretion, particularly in cases of abuse, fraud, or violation of
              these terms. We may also be required to disable products at
              Stripe&apos;s request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              7. Disclaimer of Warranties
            </h2>
            <p>
              VibePay is provided &quot;as is&quot; without warranties of any
              kind. We do not guarantee uptime, availability, or that the
              service will meet your requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              VibePay shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of the
              service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              9. Changes to Terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of VibePay
              constitutes acceptance of updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">
              10. Contact
            </h2>
            <p>
              For questions about these terms, contact us through the
              appropriate channels.
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
