import Link from "next/link";

const faqs = [
  {
    question: "What is VibePay?",
    answer:
      "VibePay is a payment link generation platform that enables creators to create payment links for digital products and services, accept payments through Stripe Connect, protect file download URLs behind a paywall, and embed buy buttons on external websites. We're built for vibe creators who want to get paid without the complexity.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. VibePay has zero accounts. You connect your Stripe account, create payment links, and manage everything through Stripe's dashboard. Your email (if provided) is only used to link you to your Stripe Connect account for faster product creation on return visits.",
  },
  {
    question: "What are the fees?",
    answer:
      "VibePay charges a 5% platform fee on each successful transaction, deducted automatically through Stripe Connect. Stripe's standard processing fees (approximately 2.9% + $0.30 per transaction for US cards) also apply. The minimum product price is $0.99 USD.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments go directly to your Stripe account through Stripe Connect. Payouts are handled entirely by Stripe according to their payout schedule and your connected account settings. We never touch your money.",
  },
  {
    question: "What can I sell?",
    answer:
      "You can sell digital products, services, and content that are legal in your jurisdiction and the buyer's jurisdiction, accurately described, owned by you or licensed for resale, and not infringing on third-party intellectual property. See our Acceptable Use Policy for prohibited items.",
  },
  {
    question: "What can't I sell?",
    answer:
      "Prohibited items include: illegal goods or services, stolen or counterfeit items, adult content without appropriate age verification, weapons/drugs/controlled substances, products on Stripe's Prohibited Businesses list, and fraudulent or deceptive offerings. See our DMCA & AUP page for full details.",
  },
  {
    question: "Can I sell adult content?",
    answer:
      "Adult content is permitted only with appropriate age verification mechanisms in place. You are responsible for complying with all applicable laws regarding adult content in your jurisdiction and your buyers' jurisdictions. Failure to implement proper age verification may result in immediate termination.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refund policies are set by individual sellers. VibePay does not process refunds directly—buyers should contact the seller directly or use Stripe's dispute process. As a seller, you handle refunds through your Stripe Dashboard.",
  },
  {
    question: "What happens after someone pays?",
    answer:
      "Buyers receive a unique access link valid for 24 hours that can be used multiple times within the validity period. They're immediately redirected to your destination URL—this could be a download page, a thank you page, or any content you specify.",
  },
  {
    question: "Can I create multiple products?",
    answer:
      "Yes. Return to VibePay, fill out the form, and Stripe will recognize your account. Instant new product, no re-onboarding required.",
  },
  {
    question: "Can I edit or delete products?",
    answer:
      "VibePay is intentionally minimal. If you want to change a price, create a new product. If you want to 'delete' a product, stop sharing the link. Contact us if you need products deactivated.",
  },
  {
    question: "Who handles chargebacks and disputes?",
    answer:
      "You do. Since we use Stripe Connect Standard, you're the merchant of record. Chargebacks and disputes are between you and Stripe. Excessive chargebacks or disputes may result in termination.",
  },
  {
    question: "What if someone infringes my copyright (DMCA)?",
    answer:
      "We take intellectual property rights seriously. If you believe content on VibePay infringes your copyright, submit a DMCA takedown notice to dmca@tethral.com. See our DMCA & AUP page for the full notice process and requirements.",
  },
  {
    question: "Who is responsible for taxes?",
    answer:
      "You are responsible for all taxes associated with your sales. VibePay does not provide tax advice or withhold taxes on your behalf. Consult a tax professional for guidance specific to your situation and jurisdiction.",
  },
  {
    question: "What's the age requirement?",
    answer:
      "You must be at least 18 years of age (or the age of majority in your jurisdiction) to use VibePay. You must also be capable of forming a binding contract and not prohibited from using payment services under applicable law.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold">
          Vibe<span className="text-accent">Pay</span>
        </Link>
        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/faq" className="text-white">
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

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-white/60 mb-8">
          Everything you need to know about VibePay: what it is, what you can
          sell, how payments and refunds work, age requirements, DMCA handling,
          and tax responsibilities.
        </p>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10 pb-8">
              <h2 className="font-display text-xl font-semibold mb-3">
                {faq.question}
              </h2>
              <p className="text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/5 border border-white/10">
          <h2 className="font-display text-xl font-semibold mb-3">
            Still have questions?
          </h2>
          <p className="text-white/70 mb-4">
            Check our legal documents for more detailed information:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/terms"
              className="text-accent hover:underline text-sm"
            >
              Terms of Service →
            </Link>
            <Link
              href="/privacy"
              className="text-accent hover:underline text-sm"
            >
              Privacy Policy →
            </Link>
            <Link href="/dmca" className="text-accent hover:underline text-sm">
              DMCA & Acceptable Use →
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-4">
            For other inquiries, contact:{" "}
            <a
              href="mailto:support@tethral.com"
              className="text-accent hover:underline"
            >
              support@tethral.com
            </a>
          </p>
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
