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
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="text-white">Privacy</Link>
          <Link href="/dmca" className="hover:text-white">DMCA</Link>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-4">Privacy Notice</h1>
        <p className="text-white/60 mb-2">
          <strong className="text-white">Effective Date:</strong> Immediately
        </p>
        <p className="text-white/60 mb-2">
          <strong className="text-white">Entity:</strong> Tethral, Inc. | 8 The Green, Suite B, Dover, Delaware 19901
        </p>
        <p className="text-white/60 mb-8">
          <strong className="text-white">Contact Emails:</strong>{" "}
          <a href="mailto:vibepay_privacy@tethral.ai" className="text-accent hover:underline">vibepay_privacy@tethral.ai</a>,{" "}
          <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a>,{" "}
          <a href="mailto:vibepay_dpo@tethral.ai" className="text-accent hover:underline">vibepay_dpo@tethral.ai</a>
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70">

          {/* Section 1: Scope */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Scope</h2>
            <p>
              This Privacy Notice describes how Tethral, Inc. (&quot;Tethral,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects information in connection with Vibepay.io (&quot;Vibepay&quot;). This Notice applies to Users who create or use payment links via Vibepay, and to Buyers who pay via Stripe checkout initiated by a Vibepay link.
            </p>
            <p>
              Vibepay is directed primarily to users located in the United States and is not designed to target or monitor individuals in the European Economic Area or the United Kingdom.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">2.1 Information You Provide to Stripe</h3>
            <p>
              When you use Vibepay, you will be required to connect or create a Stripe account. All payment and identity information requested by Stripe is collected and processed directly by Stripe under the Stripe Services Agreement. Vibepay does not receive or store full payment card numbers, bank account numbers, or government ID documents.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">2.2 Metadata We Receive from Stripe</h3>
            <p>Through Stripe&apos;s APIs and webhooks, Vibepay may receive limited metadata, which may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A unique Stripe account ID associated with the Seller.</li>
              <li>Transaction identifiers and status (for example: succeeded, pending, failed, refunded, disputed).</li>
              <li>Timestamps and amounts for payments.</li>
              <li>Basic information attached to the Stripe charge, such as currency, amount, and descriptor.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">2.3 Service Metadata</h3>
            <p>When you use Vibepay, we may process:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment link identifiers.</li>
              <li>Internal routing logic flags (for example: whether a payment flag has been set to &quot;paid&quot;).</li>
              <li>Basic technical logs, such as date and time of link usage, IP address, and basic browser or device information, to the extent necessary for security and service operation.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">2.4 Communications</h3>
            <p>
              If you email us (for example, for legal or support reasons), we collect your email address and any information you include in your message.
            </p>
          </section>

          {/* Section 3: Information We Do Not Intentionally Collect or Store */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Information We Do Not Intentionally Collect or Store</h2>
            <p>
              3.1 Vibepay does not host or store the digital goods or files that Sellers provide to Buyers. These may include photos, videos, PDFs, code, documents, or websites. Those are stored and delivered by Sellers using their own infrastructure or third-party services.
            </p>
            <p>3.2 Vibepay does not knowingly receive or store:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The contents of files delivered by Sellers.</li>
              <li>Payment card numbers, CVV codes, or full bank account numbers.</li>
              <li>Government ID scans or biometric data.</li>
            </ul>
            <p>
              3.3 Because we do not host or store your files, we cannot access, decrypt, or restore your content if it is lost or misconfigured elsewhere.
            </p>
          </section>

          {/* Section 4: How We Use Information */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. How We Use Information</h2>
            <p>We use the limited information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Operate and maintain Vibepay, including routing payment-trigger logic and verifying payment success with Stripe.</li>
              <li>Communicate with Users about service-related matters, such as support and legal notices.</li>
              <li>Monitor for security, fraud, and abuse, including repeated misuse of links or patterns that indicate high risk.</li>
              <li>Comply with legal, regulatory, and law enforcement obligations, to the extent applicable and technically feasible.</li>
              <li>Improve the reliability and performance of Vibepay.</li>
            </ul>
            <p className="mt-4">
              We do not use collected information for behavioral advertising or cross-site tracking.
            </p>
          </section>

          {/* Section 5: Cookies and Tracking Technologies */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Cookies and Tracking Technologies</h2>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">5.1 Essential Cookies</h3>
            <p>
              Vibepay uses only essential cookies and similar technologies necessary to operate the site, maintain session state, and enable secure checkout via Stripe.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">5.2 No Advertising Cookies</h3>
            <p>
              We do not use third-party advertising cookies, retargeting pixels, or social media tracking pixels for targeted advertising.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">5.3 Stripe Cookies</h3>
            <p>
              Stripe may use its own cookies and tracking technologies on the checkout pages it hosts. Those are governed by Stripe&apos;s own privacy and cookie policies.
            </p>
          </section>

          {/* Section 6: Legal Bases (Where Applicable) */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. Legal Bases (Where Applicable)</h2>
            <p>
              Although Vibepay is primarily directed to users in the United States and is not designed to target EU or UK residents, if and to the extent that EU or UK data protection laws apply, our legal bases for processing limited personal data may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Performance of a contract (providing Vibepay services).</li>
              <li>Legitimate interests (fraud prevention, security, and service reliability).</li>
              <li>Compliance with legal obligations.</li>
            </ul>
          </section>

          {/* Section 7: CCPA / CPRA Disclosures (California) */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. CCPA / CPRA Disclosures (California)</h2>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.1 Categories of Personal Information</h3>
            <p>
              Under the California Consumer Privacy Act (&quot;CCPA&quot;) as amended by the California Privacy Rights Act (&quot;CPRA&quot;), the limited information that Vibepay may process could fall under:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identifiers (such as an email address used to contact us, or IP address in security logs).</li>
              <li>Internet or other network activity information (such as logs of link usage and timestamps).</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.2 We Do Not Sell or Share Personal Information</h3>
            <p>
              Vibepay does not sell personal information and does not &quot;share&quot; personal information for cross-context behavioral advertising as those terms are defined under the CCPA/CPRA.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.3 California Consumer Rights</h3>
            <p>
              Because Vibepay processes minimal personal information and does not maintain a consumer profile in the usual sense, some CCPA rights (such as access and deletion) may be limited in practice. However, you may still contact{" "}
              <a href="mailto:vibepay_privacy@tethral.ai" className="text-accent hover:underline">vibepay_privacy@tethral.ai</a>{" "}
              to ask whether we maintain any personal information about you and to request deletion of data that can reasonably be associated with you.
            </p>
          </section>

          {/* Section 8: International Use and GDPR */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. International Use and GDPR</h2>
            <p>
              8.1 Vibepay is primarily directed to users in the United States and is not specifically offered to individuals in the European Economic Area or the United Kingdom.
            </p>
            <p>
              8.2 Vibepay does not systematically monitor the behavior of individuals in the EEA or UK in a way that is intended to trigger GDPR&apos;s extraterritorial provisions. If you are located in the EEA or UK, you should understand that Vibepay is not tailored to comply with all local requirements.
            </p>
            <p>
              8.3 If we ever expand to offer localized services to EU or UK residents, we may adopt additional GDPR-specific documentation and safeguards at that time.
            </p>
          </section>

          {/* Section 9: Data Retention */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Data Retention</h2>
            <p>9.1 Vibepay retains limited metadata (for example, logs and Stripe transaction status) only as long as reasonably necessary for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing the service.</li>
              <li>Security and fraud prevention.</li>
              <li>Recordkeeping for legal or accounting obligations.</li>
            </ul>
            <p className="mt-4">
              9.2 As a general guideline, we aim to retain most operational logs for no longer than approximately ninety (90) days, unless a longer retention period is required for security, legal, or compliance reasons.
            </p>
            <p>
              9.3 Stripe and other third-party providers may have their own retention schedules, which are independent of Vibepay.
            </p>
          </section>

          {/* Section 10: Data Security */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">10. Data Security</h2>
            <p>
              10.1 We use reasonable administrative, technical, and organizational measures to safeguard the limited metadata we process. However, no method of transmission or storage is perfectly secure.
            </p>
            <p>
              10.2 Because we do not store your files or see your payment card data, those security obligations are largely governed by your own hosting infrastructure and by Stripe&apos;s security measures.
            </p>
          </section>

          {/* Section 11: Law Enforcement and Legal Requests */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">11. Law Enforcement and Legal Requests</h2>
            <p>
              11.1 Tethral responds to valid legal process, such as subpoenas or court orders, to the extent required by law and to the extent technically feasible.
            </p>
            <p>
              11.2 Our ability to respond is limited by the data we actually possess. We cannot provide file contents, detailed buyer identities, or payment card data that we never collect or store.
            </p>
            <p>
              11.3 In the event of a legal request, we may disclose basic metadata if it can be reliably associated with an identifiable User and if disclosure is required by law.
            </p>
          </section>

          {/* Section 12: Children's Privacy */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">12. Children&apos;s Privacy</h2>
            <p>
              12.1 Vibepay is not directed to individuals under the age of eighteen (18), and we do not knowingly collect personal information from minors.
            </p>
            <p>
              12.2 If we become aware that information has been collected from a minor in violation of this policy, we will take reasonable steps to delete it.
            </p>
          </section>

          {/* Section 13: Your Choices and Rights */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">13. Your Choices and Rights</h2>
            <p>13.1 Because Vibepay processes minimal personal data, your main choices are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Whether to use Vibepay at all.</li>
              <li>Whether to connect a Stripe account.</li>
              <li>Whether to contact us for support or legal matters.</li>
            </ul>
            <p className="mt-4">
              13.2 You may contact{" "}
              <a href="mailto:vibepay_privacy@tethral.ai" className="text-accent hover:underline">vibepay_privacy@tethral.ai</a>{" "}
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ask what information we may have that relates to you.</li>
              <li>Request correction of inaccurate contact information you provided.</li>
              <li>Request deletion of data that can reasonably be linked to you, subject to our legal obligations and technical capabilities.</li>
            </ul>
          </section>

          {/* Section 14: Changes to this Privacy Notice */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">14. Changes to this Privacy Notice</h2>
            <p>
              14.1 We may update this Privacy Notice from time to time. When we do, we will update the Effective Date at the top.
            </p>
            <p>
              14.2 Material changes may be communicated via the Vibepay site or by email where appropriate.
            </p>
          </section>

          {/* Section 15: Contact Information */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">15. Contact Information</h2>
            <p>For privacy inquiries or data subject requests, you may contact:</p>
            <div className="bg-white/5 border border-white/10 p-4 mt-3">
              <p>Email: <a href="mailto:vibepay_privacy@tethral.ai" className="text-accent hover:underline">vibepay_privacy@tethral.ai</a></p>
            </div>
            <p className="mt-4">For legal notices, including subpoenas:</p>
            <div className="bg-white/5 border border-white/10 p-4 mt-3">
              <p>Email: <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a></p>
            </div>
          </section>

          {/* Section 16: ANNEX A – Data Processing Addendum */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">16. ANNEX A – Data Processing Addendum (Summary)</h2>
            <p>
              This Annex summarizes Vibepay&apos;s data processing role for business Users who may have obligations under data protection law.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">16.1 Roles of the Parties</h3>
            <p>Tethral operates Vibepay in a limited capacity and primarily processes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Metadata about payment links and transactions.</li>
              <li>Log data for service operation and security.</li>
            </ul>
            <p className="mt-2">
              Stripe acts as the primary payment processor and is a separate data controller or processor in its own right.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">16.2 Scope of Processing</h3>
            <p>Tethral&apos;s processing is limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Routing payment metadata between Vibepay and Stripe.</li>
              <li>Maintaining logs and records for service integrity, security, and compliance.</li>
            </ul>
            <p className="mt-2">
              Tethral does not process payment card details, full buyer profiles, or the content of digital files delivered by Sellers.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">16.3 Subprocessors</h3>
            <p>
              Tethral may use basic infrastructure providers (for example, cloud hosting services) as subprocessors for metadata, subject to reasonable confidentiality and security requirements.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">16.4 Security</h3>
            <p>
              Tethral will implement appropriate technical and organizational measures to protect metadata from unauthorized access or disclosure.
            </p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">16.5 Assistance</h3>
            <p>
              Where reasonably possible and legally required, Tethral will provide assistance to business Users in responding to data subject requests, subject to the strict limitation of data that Tethral actually possesses.
            </p>
          </section>

          <p className="text-center text-white/50 pt-8 border-t border-white/10">
            By using VibePay, you acknowledge that you have read and understood this Privacy Notice.
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
