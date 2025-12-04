import Link from "next/link";

const faqs = [
  {
    question: "What is VibePay?",
    answer:
      "VibePay is an ultra-minimal payment link generator for creators. No accounts, no dashboards—just fill out a form, connect Stripe, and get payment links.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. VibePay has zero accounts. You connect your Stripe account once, create payment links, and manage everything through Stripe's dashboard.",
  },
  {
    question: "What are the fees?",
    answer:
      "VibePay takes 5% of each transaction. Stripe's standard fees (~2.9% + $0.30) also apply. The minimum price is $2.00 to ensure sustainable margins.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments go directly to your Stripe account. You manage payouts, view transactions, and handle refunds through Stripe's dashboard—we never touch your money.",
  },
  {
    question: "Can I create multiple products?",
    answer:
      "Yes. Just come back to VibePay, fill out the form again, and Stripe will recognize your account. Instant new product, no re-onboarding required.",
  },
  {
    question: "Can I edit or delete products?",
    answer:
      "No. VibePay is intentionally minimal. If you want to change a price, create a new product. If you want to 'delete' a product, just stop sharing the link.",
  },
  {
    question: "How do I issue refunds?",
    answer:
      "Through your Stripe Dashboard. VibePay doesn't handle refunds—you're the merchant of record and have full control.",
  },
  {
    question: "What happens after someone pays?",
    answer:
      "Buyers are immediately redirected to your destination URL. This could be a download page, a thank you page, or anything else you specify.",
  },
  {
    question: "Is the destination URL secure?",
    answer:
      "VibePay uses an 'honesty gate' model—the destination URL is revealed after payment. For highly sensitive content, consider using signed URLs or access tokens.",
  },
  {
    question: "Who handles chargebacks?",
    answer:
      "You do. Since we use Stripe Connect Standard, you're the merchant of record. Chargebacks and disputes are between you and Stripe.",
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
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-8">FAQ</h1>

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

        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary inline-block">
            Create a Payment Link →
          </Link>
        </div>
      </main>
    </div>
  );
}
