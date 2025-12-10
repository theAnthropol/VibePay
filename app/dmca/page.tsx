import Link from "next/link";

export default function DMCAPage() {
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
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/dmca" className="text-white">DMCA</Link>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="font-display text-4xl font-bold mb-4">Acceptable Use Policy and DMCA Policy</h1>
        <p className="text-white/60 mb-2">
          <strong className="text-white">Effective Date:</strong> Immediately
        </p>
        <p className="text-white/60 mb-2">
          <strong className="text-white">Entity:</strong> Tethral, Inc. | 8 The Green, Suite B, Dover, Delaware 19901
        </p>
        <p className="text-white/60 mb-8">
          <strong className="text-white">Contact:</strong>{" "}
          <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a>
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70">

          {/* Section 1: Purpose and Relationship to Terms of Service */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">1. Purpose and Relationship to Terms of Service</h2>
            <p>
              1.1 This Acceptable Use and DMCA Policy (&quot;AUP&quot;) forms part of, and is incorporated into, the Vibepay Terms of Service.
            </p>
            <p>
              1.2 If you use Vibepay, you agree to comply with this AUP. Capitalized terms not defined here have the meanings given in the Terms of Service.
            </p>
          </section>

          {/* Section 2: General Acceptable Use */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">2. General Acceptable Use</h2>
            <p>
              2.1 You may only use Vibepay for lawful purposes and in accordance with this AUP and all applicable laws and regulations.
            </p>
            <p>
              2.2 You are responsible for all User Content and activity that occurs under your Stripe account or through your use of Vibepay.
            </p>
          </section>

          {/* Section 3: Prohibited Content and Activities */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">3. Prohibited Content and Activities</h2>
            <p>Without limiting the Terms of Service, the following content and uses are strictly prohibited:</p>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.1 Child Sexual Abuse Material and Minors</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content that depicts or exploits minors in any sexual or abusive context.</li>
              <li>Any content that appears to depict minors in a sexual context, regardless of the stated age.</li>
              <li>Any attempt to solicit, sell, or purchase sexual content involving minors.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.2 Non-Consensual and Exploitative Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Non-consensual intimate images (&quot;revenge porn&quot;).</li>
              <li>Hidden camera or voyeuristic recordings.</li>
              <li>Content obtained through coercion, force, or exploitation.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.3 Illegal Goods and Services</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sale or promotion of illegal drugs or controlled substances without proper authorization.</li>
              <li>Sale or promotion of firearms or other weapons where prohibited by law or by Stripe&apos;s policies.</li>
              <li>Sale of stolen goods, hacked materials, or illegally obtained data or credentials.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.4 Violent, Terrorist, or Extremist Activity</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content that promotes or glorifies terrorism, extremist organizations, or violent acts.</li>
              <li>Fundraising for groups or individuals designated under applicable terrorism or sanctions laws.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.5 Intellectual Property Infringement</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Distribution of copyrighted works (including software, movies, music, books, art, photographs, designs, or code) without permission or legal rights.</li>
              <li>Use of trademarks or logos in a way that is likely to confuse or mislead about source, affiliation, or endorsement.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.6 Fraud, Malware, and Security Violations</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phishing schemes or deceptive practices intended to obtain sensitive information.</li>
              <li>Distribution of malware, ransomware, or other malicious code.</li>
              <li>Attempts to bypass or interfere with security or integrity of Vibepay or any Stripe systems.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.7 Harassment and Hate</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Targeted harassment, doxxing, or threats toward individuals or groups.</li>
              <li>Hate speech or incitement to violence based on race, ethnicity, religion, gender, sexual orientation, disability, or similar characteristics.</li>
            </ul>

            <h3 className="text-lg font-medium text-white/90 mt-4 mb-2">3.8 Other High-Risk Activities</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Activities that violate Stripe&apos;s own service terms or prohibited business lists.</li>
              <li>Any other use that Tethral reasonably considers to pose undue risk to users, Tethral, or Stripe.</li>
            </ul>
          </section>

          {/* Section 4: Adult Content Requirements */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">4. Adult Content Requirements</h2>
            <p>4.1 Vibepay may be used in connection with lawful adult content, but you must comply with the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must verify that all individuals depicted are at least 18 years of age at the time of creation of the content.</li>
              <li>You must maintain appropriate age-verification and consent records as required by applicable law.</li>
              <li>You must ensure that your content does not involve fraud, coercion, or exploitation.</li>
            </ul>
            <p className="mt-4">
              4.2 Vibepay does not provide age-verification tools, and you are solely responsible for ensuring that Buyers or viewers of your content are legally permitted to access adult material in their jurisdiction.
            </p>
            <p>
              4.3 You are solely responsible for complying with all applicable laws and payment processor policies relating to adult content.
            </p>
          </section>

          {/* Section 5: User Obligations */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">5. User Obligations</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with all applicable laws, rules, and regulations.</li>
              <li>Obtain and maintain all rights, licenses, consents, and permissions necessary to sell or distribute your content.</li>
              <li>Provide truthful and accurate information to Stripe and to Tethral where required.</li>
              <li>Immediately cease use of Vibepay if instructed to do so in connection with a violation of this AUP or the Terms of Service.</li>
            </ul>
          </section>

          {/* Section 6: No Monitoring Duty */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">6. No Monitoring Duty</h2>
            <p>
              6.1 Tethral is not obligated to monitor or review User Content, payment links, or transactions.
            </p>
            <p>
              6.2 Tethral may, at its discretion, investigate any reported violation of this AUP and may take appropriate action, including disabling links, notifying Stripe, or terminating use of Vibepay.
            </p>
          </section>

          {/* Section 7: DMCA Policy */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">7. DMCA Policy</h2>
            <p>
              7.1 Vibepay complies with the Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512, with respect to material that is linked through Vibepay.
            </p>
            <p>
              7.2 If you believe that a payment link facilitated by Vibepay refers to content that infringes your copyright, you may submit a DMCA notice to the DMCA Agent at:
            </p>
            <div className="bg-white/5 border border-white/10 p-4 mt-3">
              <p>Email: <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a></p>
            </div>
          </section>

          {/* Section 8: Requirements for DMCA Notices */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">8. Requirements for DMCA Notices</h2>
            <p>To be effective, a DMCA notice must include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple works are covered, a representative list.</li>
              <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity, and information reasonably sufficient to permit Tethral to locate the material, such as a URL or payment link.</li>
              <li>Your name, address, telephone number, and email address.</li>
              <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are the copyright owner or are authorized to act on the owner&apos;s behalf.</li>
              <li>A physical or electronic signature of the copyright owner or an authorized representative.</li>
            </ul>
            <p className="mt-4">
              If your notice does not meet these requirements, we may be unable to act on it.
            </p>
          </section>

          {/* Section 9: Counter-Notice Procedure */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">9. Counter-Notice Procedure</h2>
            <p>
              9.1 If your content has been disabled or a link has been removed as a result of a DMCA notice and you believe this was a mistake or misidentification, you may submit a counter-notice to:
            </p>
            <div className="bg-white/5 border border-white/10 p-4 mt-3">
              <p>Email: <a href="mailto:vibepay_legal@tethral.ai" className="text-accent hover:underline">vibepay_legal@tethral.ai</a></p>
            </div>

            <p className="mt-4">9.2 Your counter-notice must include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access was disabled.</li>
              <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
              <li>Your name, address, and telephone number.</li>
              <li>A statement that you consent to the jurisdiction of the federal court in the district where you reside (or in Delaware if you reside outside the United States) and that you will accept service of process from the person who provided the original DMCA notice or an agent of that person.</li>
              <li>Your physical or electronic signature.</li>
            </ul>

            <p className="mt-4">
              9.3 Upon receipt of a valid counter-notice, Tethral may forward it to the original complaining party. If the complaining party does not notify Tethral within a reasonable time that it has filed an action seeking a court order, Tethral may restore the link or take other appropriate action, but is under no obligation to do so.
            </p>
          </section>

          {/* Section 10: Repeat Infringers */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">10. Repeat Infringers</h2>
            <p>
              10.1 Tethral reserves the right to disable or terminate use of Vibepay by Users who are determined, in Tethral&apos;s reasonable discretion, to be repeat infringers of intellectual property rights.
            </p>
          </section>

          {/* Section 11: Enforcement */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white mb-3">11. Enforcement</h2>
            <p>11.1 Tethral may take any enforcement actions it deems appropriate for violations of this AUP or for DMCA complaints, which can include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Disabling specific payment links.</li>
              <li>Requiring you to remove or modify content.</li>
              <li>Notifying Stripe or other service providers.</li>
              <li>Suspending or terminating your ability to use Vibepay.</li>
            </ul>
            <p className="mt-4">
              11.2 Tethral is not required to give advance notice prior to taking enforcement action.
            </p>
          </section>

          <p className="text-center text-white/50 pt-8 border-t border-white/10">
            By using VibePay, you acknowledge that you have read, understood, and agree to comply with this Acceptable Use Policy and DMCA Policy.
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
