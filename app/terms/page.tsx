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
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/terms" className="text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/dmca" className="hover:text-white">DMCA</Link>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-white/60 mb-2">
          <strong className="text-white">Effective Date:</strong> Immediately upon publication
        </p>
        <p className="text-white/60 mb-8">
          <strong className="text-white">Entity:</strong> Tethral, Inc. | 8 The Green, Suite B, Dover, Delaware 19901
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70">

          {/* Section 1: Introduction */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              1.1 These Terms of Service (&quot;Agreement&quot;) govern your access to and use of Vibepay.io and any related services (collectively, &quot;Vibepay&quot;), which are provided by Tethral, Inc., a Delaware corporation (&quot;Tethral,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p>
              1.2 By accessing or using Vibepay, you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by this Agreement. If you do not agree to this Agreement, you must not use Vibepay.
            </p>
            <p>
              1.3 This Agreement is a legally binding contract between you and Tethral. You should read it carefully.
            </p>
          </section>

          {/* Section 2: Definitions */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. Definitions</h2>
            <p>For purposes of this Agreement:</p>
            <p>
              <strong className="text-white">2.1 &quot;Vibepay&quot;</strong> means the payment-trigger and payment-link service operated by Tethral at Vibepay.io, which integrates with Stripe to allow Users to accept payments for digital content and services.
            </p>
            <p>
              <strong className="text-white">2.2 &quot;User&quot;</strong> means any individual or entity that accesses or uses Vibepay in any manner, whether as a seller, buyer, or visitor.
            </p>
            <p>
              <strong className="text-white">2.3 &quot;Seller&quot;</strong> means a User who uses Vibepay to accept payments for digital goods, content, or services.
            </p>
            <p>
              <strong className="text-white">2.4 &quot;Buyer&quot;</strong> means a User who pays a Seller for access to digital goods, content, or services using links or interfaces generated through Vibepay.
            </p>
            <p>
              <strong className="text-white">2.5 &quot;User Content&quot;</strong> means any content, data, materials, links, descriptions, titles, images, audio, video, web pages, or other digital assets that a User provides, lists, or references in connection with Vibepay, including any content that is accessed by a Buyer after payment.
            </p>
            <p>
              <strong className="text-white">2.6 &quot;Platform Fee&quot;</strong> means the fee retained by Vibepay on each eligible transaction, currently five percent (5%) of the transaction amount, in addition to Stripe&apos;s own fees.
            </p>
            <p>
              <strong className="text-white">2.7 &quot;Stripe&quot;</strong> means Stripe, Inc. and its affiliates, which act as the third-party payment processor and provide Stripe Connect functionality for Vibepay.
            </p>
            <p>
              <strong className="text-white">2.8 &quot;Stripe Services Agreement&quot;</strong> means the separate agreement(s) between User and Stripe that govern payment processing, refunds, chargebacks, and any Stripe-related services.
            </p>
            <p>
              <strong className="text-white">2.9 &quot;AUP&quot;</strong> means Vibepay&apos;s Acceptable Use and DMCA Policy, which is incorporated by reference into this Agreement.
            </p>
            <p>
              <strong className="text-white">2.10 &quot;DMCA Agent&quot;</strong> means Vibepay&apos;s designated contact for DMCA notices at{" "}
              <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a>.
            </p>
          </section>

          {/* Section 3: Changes to this Agreement */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Changes to this Agreement</h2>
            <p>
              3.1 Tethral may update or modify this Agreement from time to time. When we do, we will update the &quot;Effective Date&quot; at the top of the Agreement.
            </p>
            <p>
              3.2 If you continue to use Vibepay after changes become effective, you are deemed to have accepted the updated Agreement. If you do not agree to the updated Agreement, you must stop using Vibepay.
            </p>
          </section>

          {/* Section 4: Eligibility and Account Relationship */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. Eligibility and Account Relationship</h2>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">4.1 Age</h3>
            <p>
              Vibepay is intended only for individuals who are at least eighteen (18) years of age. By using Vibepay, you represent and warrant that you are at least 18.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">4.2 Stripe Account</h3>
            <p>
              To receive payments as a Seller, you must have an active Stripe account that is compatible with Stripe Connect and must agree to the Stripe Services Agreement and Stripe Connect terms. You understand that Stripe is a separate entity, and your relationship with Stripe is independent of Tethral.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">4.3 No Vibepay Wallet</h3>
            <p>
              Vibepay does not provide a wallet, does not hold funds on your behalf, and does not act as a money transmitter. All funds flow directly via Stripe between Buyers, Sellers, and Stripe.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">4.4 Accuracy of Information</h3>
            <p>
              You agree that all information you provide to Stripe and to Vibepay is true, accurate, and complete and that you will keep it up to date.
            </p>
          </section>

          {/* Section 5: Description of Vibepay Services */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. Description of Vibepay Services</h2>
            <p>
              5.1 Vibepay enables Sellers to generate payment-trigger links, snippets, or buttons that, when used by Buyers, direct Buyers to a Stripe-hosted checkout page. After successful payment, Buyers may be routed to a URL or resource designated by the Seller or may trigger access logic controlled by the Seller.
            </p>
            <p>
              5.2 Vibepay does not host, store, or transmit the underlying digital goods or content. Vibepay mainly processes metadata and routing information to Stripe and the Seller&apos;s designated URL or system.
            </p>
            <p>
              5.3 Vibepay does not guarantee delivery of digital content or performance of any services. Delivery and fulfillment are solely the responsibility of the Seller.
            </p>
            <p>
              5.4 Vibepay may provide integrations, code snippets, or embed widgets for Sellers to integrate with their own sites, apps, or tools. Sellers are solely responsible for using such snippets lawfully and securely.
            </p>
          </section>

          {/* Section 6: Fees, Taxes, and Payments */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. Fees, Taxes, and Payments</h2>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">6.1 Platform Fees</h3>
            <p>
              For each transaction processed through Vibepay, Tethral may charge a Platform Fee. The current Platform Fee is five percent (5%) of the transaction amount, in addition to Stripe&apos;s own processing fees. Platform Fees are subject to change with notice.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">6.2 Stripe Fees</h3>
            <p>
              Stripe charges separate processing fees (such as 2.9% + $0.30 per transaction, subject to Stripe&apos;s own pricing). These fees are determined solely by Stripe and may change without notice from Vibepay.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">6.3 Non-Refundable Platform Fees</h3>
            <p>
              Platform Fees are non-refundable. Even if a Buyer receives a refund or initiates a chargeback through Stripe, the Platform Fee retained by Vibepay is not refunded.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">6.4 Taxes</h3>
            <p>
              Sellers are solely responsible for determining whether any taxes, including sales tax, VAT, GST, or other similar taxes, apply to their transactions and for assessing, collecting, reporting, and remitting such taxes to the appropriate authorities, unless the Seller separately enables Stripe&apos;s automated tax tools and Stripe performs those functions on the Seller&apos;s behalf. Vibepay does not provide tax advice.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">6.5 Refunds and Chargebacks</h3>
            <p>
              Any refunds or chargebacks are handled exclusively by Stripe in accordance with the Stripe Services Agreement. Vibepay does not handle or issue refunds and has no authority to override a Stripe determination.
            </p>
          </section>

          {/* Section 7: User Content and Ownership */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. User Content and Ownership</h2>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.1 Ownership</h3>
            <p>
              As between you and Tethral, you retain all rights, title, and interest in and to your User Content. Tethral does not claim ownership of User Content.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.2 License to Operate Service</h3>
            <p>
              By using Vibepay and integrating User Content, you grant Tethral a limited, non-exclusive, worldwide, royalty-free license to use, reproduce, display, and transmit User Content and related metadata solely as necessary to provide, maintain, and improve Vibepay, including generating and operating payment-trigger links, logs, and routing behavior.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.3 Representation and Warranty</h3>
            <p>You represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You either own the User Content or have acquired all necessary rights to use, sell, distribute, license, or otherwise make User Content available through Vibepay.</li>
              <li>User Content and your use of Vibepay do not violate any third-party intellectual property, privacy, publicity, contract, or other rights.</li>
            </ul>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">7.4 No Review or Endorsement</h3>
            <p>
              Tethral does not review, approve, or endorse any User Content. User Content is the sole responsibility of the User who lists or distributes it.
            </p>
          </section>

          {/* Section 8: Prohibited Uses and Content */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Prohibited Uses and Content</h2>
            <p>
              8.1 You may not use Vibepay for any unlawful or prohibited purpose. Without limiting the Acceptable Use Policy, prohibited uses include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any content involving the sexual exploitation of minors or any child sexual abuse material (CSAM).</li>
              <li>Non-consensual intimate imagery, &quot;revenge porn,&quot; voyeurism, or surreptitious recordings.</li>
              <li>Content that incites or promotes violence, terrorism, or extremist ideologies.</li>
              <li>Sale or promotion of illegal drugs, controlled substances without proper licenses, or drug paraphernalia prohibited by law.</li>
              <li>Sale or promotion of firearms or other weapons where restricted by law or by Stripe&apos;s policies.</li>
              <li>Sale or distribution of stolen goods, hacked materials, or illegally obtained data.</li>
              <li>Distribution of pirated software, movies, music, books, or any other copyrighted works without authorization.</li>
              <li>Content that defames, harasses, or unlawfully discriminates against individuals or groups.</li>
              <li>Use of Vibepay in connection with phishing, malware, or other fraudulent schemes.</li>
            </ul>
            <p className="mt-4">
              8.2 You are responsible for ensuring that your use of Vibepay and your User Content comply with all laws and with Vibepay&apos;s AUP.
            </p>
          </section>

          {/* Section 9: Adult Content and Age Verification */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Adult Content and Age Verification</h2>
            <p>
              9.1 Vibepay may be used in connection with lawful adult content, subject to strict conditions.
            </p>
            <p>
              9.2 If you offer adult content, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All individuals depicted are at least eighteen (18) years of age at the time of creation of the content.</li>
              <li>You have obtained and maintain appropriate age-verification records and written consent or releases where required by law.</li>
              <li>You comply with all applicable recordkeeping, labeling, and documentation requirements under local law, including any requirements analogous to 18 U.S.C. § 2257, where applicable.</li>
            </ul>
            <p className="mt-4">
              9.3 Vibepay does not verify the age or identity of Buyers or viewers and does not provide age-gating tools. You bear all responsibility for ensuring that recipients are legally permitted to access adult content and for complying with any geographic restrictions, consent requirements, or other regulations.
            </p>
            <p>
              9.4 You acknowledge that payment processors, including Stripe, may have additional restrictions or prohibitions on adult or high-risk content, and you agree to comply with those restrictions.
            </p>
          </section>

          {/* Section 10: No Storage of Digital Goods */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">10. No Storage of Digital Goods</h2>
            <p>
              10.1 Vibepay does not host or store the underlying digital goods (such as images, PDFs, videos, web apps, or other files). You are solely responsible for hosting, storing, delivering, and securing your content.
            </p>
            <p>
              10.2 Because Vibepay does not store your digital goods, we cannot recover, restore, or re-deliver content if you lose or misconfigure your own hosting or links.
            </p>
          </section>

          {/* Section 11: Privacy and Data */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">11. Privacy and Data</h2>
            <p>
              11.1 Vibepay collects and processes minimal metadata necessary to operate the service, such as payment link identifiers, timestamps, and Stripe transaction status.
            </p>
            <p>
              11.2 Vibepay does not collect or store credit card numbers or bank information. All such data is processed directly by Stripe.
            </p>
            <p>
              11.3 Additional details are described in the{" "}
              <Link href="/privacy" className="text-accent hover:underline">Vibepay Privacy Notice</Link>, which is incorporated by reference into this Agreement.
            </p>
          </section>

          {/* Section 12: DMCA and Copyright */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">12. DMCA and Copyright</h2>
            <p>
              12.1 Vibepay complies with the Digital Millennium Copyright Act (&quot;DMCA&quot;), 17 U.S.C. § 512. We operate primarily as a linking and payment facilitation service.
            </p>
            <p>
              12.2 If Vibepay receives a valid DMCA notice alleging that a payment link points to infringing content, Vibepay may disable or remove the link or otherwise restrict access to that link, in its sole discretion.
            </p>
            <p>
              12.3 Procedures for DMCA notices and counter-notices are described in the{" "}
              <Link href="/dmca" className="text-accent hover:underline">Acceptable Use and DMCA Policy</Link>, which is incorporated by reference.
            </p>
          </section>

          {/* Section 13: No Duty to Monitor; Platform Immunity */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">13. No Duty to Monitor; Platform Immunity</h2>
            <p>
              13.1 Tethral has no obligation to monitor User Content, links, or transactions and does not commit to doing so.
            </p>
            <p>
              13.2 To the maximum extent permitted by law, Vibepay is an &quot;interactive computer service&quot; under 47 U.S.C. § 230, and Tethral shall not be treated as the publisher or speaker of User Content provided by third parties.
            </p>
            <p>
              13.3 Tethral may, but is not required to, remove or disable access to any User Content or links, or suspend or terminate any User account, if Tethral reasonably believes that such content or use violates this Agreement, the AUP, Stripe requirements, or applicable law.
            </p>
          </section>

          {/* Section 14: Disclaimers */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">14. Disclaimers</h2>
            <p>
              14.1 Vibepay is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, with all faults and without any warranty of any kind, whether express, implied, statutory, or otherwise.
            </p>
            <p>
              14.2 Tethral expressly disclaims all implied warranties, including any implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, and any warranties arising from course of dealing or usage of trade.
            </p>
            <p>
              14.3 Tethral does not warrant that Vibepay will be uninterrupted, error-free, secure, or free of harmful components, or that any data will be accurate or preserved without loss.
            </p>
          </section>

          {/* Section 15: Limitation of Liability */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">15. Limitation of Liability</h2>
            <p className="uppercase text-xs">
              15.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, TETHRAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, OR ANY LOSS OF PROFITS OR REVENUE, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR YOUR USE OF VIBEPAY.
            </p>
            <p className="uppercase text-xs mt-4">
              15.2 IN NO EVENT SHALL TETHRAL&apos;S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT OR YOUR USE OF VIBEPAY EXCEED THE TOTAL PLATFORM FEES ACTUALLY PAID BY YOU TO VIBEPAY DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, CAPPED AT ONE HUNDRED U.S. DOLLARS (USD $100).
            </p>
            <p className="mt-4">
              15.3 YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH VIBEPAY IS TO STOP USING THE SERVICE.
            </p>
          </section>

          {/* Section 16: Indemnification */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">16. Indemnification</h2>
            <p>
              16.1 You agree to indemnify, defend, and hold harmless Tethral and its officers, directors, employees, contractors, and agents from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorneys&apos; fees) arising out of or in any way related to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your User Content;</li>
              <li>Your use of Vibepay;</li>
              <li>Your violation of this Agreement or the AUP; or</li>
              <li>Your violation of any law or the rights of any third party (including intellectual property, privacy, or publicity rights).</li>
            </ul>
          </section>

          {/* Section 17: Dispute Resolution and Arbitration (AAA) */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">17. Dispute Resolution and Arbitration (AAA)</h2>
            <p>
              17.1 Any dispute, claim, or controversy arising out of or relating to this Agreement or your use of Vibepay (each, a &quot;Dispute&quot;) shall be resolved by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its Consumer Arbitration Rules, except as otherwise provided below.
            </p>
            <p>
              17.2 The arbitration shall be conducted in the State of Delaware, in the English language, before a single arbitrator.
            </p>
            <p className="uppercase text-xs mt-4">
              17.3 You and Tethral agree that each may bring claims against the other only in your or its individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding. The arbitrator shall not consolidate claims of multiple parties or preside over any form of representative or class proceeding.
            </p>
            <p className="mt-4">
              17.4 You may opt out of the arbitration requirement within thirty (30) days of first agreeing to this Agreement by sending written notice of your opt-out to{" "}
              <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a>{" "}
              with the subject line &quot;Arbitration Opt-Out&quot; and your full name and contact information in the body of the email.
            </p>
            <p>
              17.5 If you opt out of arbitration, or if the arbitration clause is found to be unenforceable, you agree that any Dispute shall be brought exclusively in the state or federal courts located in Delaware, and you consent to such courts&apos; personal jurisdiction and venue.
            </p>
          </section>

          {/* Section 18: Termination; Suspension */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">18. Termination; Suspension</h2>
            <p>
              18.1 Tethral may, at any time and in its sole discretion, suspend or terminate your access to Vibepay, or disable or remove any payment links, for any reason, including actual or suspected violation of this Agreement, the AUP, or applicable law, or in response to Stripe&apos;s requirements or a law enforcement request.
            </p>
            <p>
              18.2 Upon termination, your rights to use Vibepay shall immediately cease. Sections of this Agreement that by their nature should survive termination (including but not limited to payment obligations, disclaimers, limitations of liability, arbitration, indemnification, and ownership provisions) shall survive.
            </p>
          </section>

          {/* Section 19: Notices */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">19. Notices</h2>
            <p>
              19.1 Notices from Tethral to you may be provided by email to the email address associated with your Stripe account or any email you have provided to Tethral, or by posting within Vibepay or on the Vibepay website.
            </p>
            <p>
              19.2 Legal notices to Tethral, including arbitration opt-out and DMCA notices, must be sent to:
            </p>
            <div className="bg-white/5 border border-white/10 p-4 mt-3">
              <p>Email: <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a></p>
            </div>
          </section>

          {/* Section 20: Miscellaneous */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">20. Miscellaneous</h2>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.1 Entire Agreement</h3>
            <p>
              This Agreement, together with the AUP and Privacy Notice, constitutes the entire agreement between you and Tethral regarding Vibepay and supersedes all prior or contemporaneous agreements.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.2 Assignment</h3>
            <p>
              You may not assign or transfer this Agreement or any rights or obligations under it without Tethral&apos;s prior written consent. Tethral may freely assign this Agreement.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.3 Severability</h3>
            <p>
              If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.4 No Waiver</h3>
            <p>
              Tethral&apos;s failure to enforce any provision of this Agreement shall not be deemed a waiver of that provision or of the right to enforce it later.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.5 Force Majeure</h3>
            <p>
              Tethral shall not be liable for any delay or failure to perform due to any cause beyond its reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, governmental actions, or Internet or network failures.
            </p>
            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">20.6 No Agency</h3>
            <p>
              Nothing in this Agreement is intended to create a partnership, joint venture, or agency relationship between you and Tethral.
            </p>
          </section>

          <p className="text-center text-white/50 pt-8 border-t border-white/10">
            By using VibePay, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
