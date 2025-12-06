# VibePay Privacy Policy

**Effective Date:** December 5, 2024
**Last Updated:** December 5, 2024

## 1. Introduction

This Privacy Policy describes how **Tethral, Inc.** ("Company," "we," "us," or "our") collects, uses, and shares information when you use VibePay (the "Service").

VibePay is designed with privacy as a core principle. **We collect minimal data and do not track you.**

## 2. Information We Collect

### 2.1 Information You Provide (Sellers)

| Data | Required? | Purpose | Retention |
|------|-----------|---------|-----------|
| **Email address** | Optional | Link your Stripe account for faster future product creation | Until you request deletion |
| **Product name** | Yes | Display to buyers | Until product deleted |
| **Product price** | Yes | Process payments | Until product deleted |
| **Destination URL** | Yes | Redirect buyers after payment | Until product deleted |
| **Protected file URL** | Optional | Deliver protected content after payment | Until product deleted |

### 2.2 Information We Receive from Stripe

| Data | Purpose | Retention |
|------|---------|-----------|
| **Stripe Account ID** | Link products to your Stripe account | Until product deleted |
| **Account verification status** | Determine if onboarding is complete | Not stored (checked in real-time) |

### 2.3 Information We Generate

| Data | Purpose | Retention |
|------|---------|-----------|
| **Product ID** | Unique identifier for payment links | Until product deleted |
| **Access tokens** | Time-limited access to protected files | **24 hours** then deleted |
| **Stripe session ID** | Prevent duplicate access tokens | **24 hours** then deleted |

### 2.4 Information We Do NOT Collect

We explicitly **do not collect**:

- **IP addresses** — Not logged or stored
- **Browser fingerprints** — Not collected
- **Device information** — Not collected
- **Location data** — Not collected
- **Cookies** — Not used (no tracking cookies, no analytics cookies)
- **Buyer email addresses** — Sent directly to Stripe, never seen by us
- **Payment card numbers** — Handled exclusively by Stripe
- **Bank account details** — Handled exclusively by Stripe
- **Government IDs** — Handled exclusively by Stripe
- **Social Security Numbers** — Handled exclusively by Stripe

## 3. How We Use Information

We use the information we collect solely to:

1. **Provide the Service** — Create payment links, process protected file access
2. **Recognize returning sellers** — Skip Stripe onboarding if you've already connected
3. **Prevent fraud** — Verify payment before granting access to protected files
4. **Comply with legal obligations** — Respond to lawful requests from authorities

We do NOT use your information for:
- Advertising or marketing
- Profiling or behavioral analysis
- Selling to third parties
- Training AI models

## 4. Information Sharing

### 4.1 Third Parties We Share Data With

| Third Party | Data Shared | Purpose |
|-------------|-------------|---------|
| **Stripe, Inc.** | Email (if provided), product details | Payment processing, seller onboarding |
| **Cloudflare, Inc.** | Request data (standard web hosting) | Website hosting and security |

### 4.2 We Do NOT Share Data With

- Advertisers
- Data brokers
- Marketing companies
- Analytics providers (we don't use analytics)
- Social media platforms

### 4.3 Legal Requirements

We may disclose information if required by law, court order, or government request. We will notify you unless prohibited by law.

## 5. Data Retention

| Data Type | Retention Period |
|-----------|------------------|
| Seller email | Until you request deletion |
| Product information | Until product deleted or 7 years (for tax/legal compliance) |
| Access tokens | 24 hours after creation |
| Stripe payment references | 7 years (legal/tax compliance) |

### 5.1 Deletion Requests

To delete your data:
1. **Products:** Contact us at privacy@tethral.com with your product IDs
2. **Seller account:** Contact us to remove your email from our database
3. **Stripe data:** Contact Stripe directly — we cannot delete data held by Stripe

## 6. Data Security

We implement appropriate security measures including:

- **Encryption in transit** — All connections use HTTPS/TLS
- **Secure infrastructure** — Hosted on Cloudflare's global network
- **Minimal data storage** — We don't store what we don't need
- **No sensitive data storage** — Payment details never touch our servers
- **Access controls** — Database access limited to essential operations

### 6.1 Security Limitations

No system is 100% secure. While we take reasonable precautions, we cannot guarantee absolute security. Protected file URLs, once revealed to a buyer, may be shared by that buyer.

## 7. Your Rights

Depending on your location, you may have the right to:

### 7.1 GDPR Rights (European Users)

- **Access** — Request a copy of your data
- **Rectification** — Correct inaccurate data
- **Erasure** — Request deletion of your data
- **Portability** — Receive your data in a portable format
- **Object** — Object to certain processing
- **Restrict** — Limit how we use your data

### 7.2 CCPA Rights (California Users)

- **Know** — What personal information we collect
- **Delete** — Request deletion of your data
- **Opt-out** — We don't sell personal information, so this doesn't apply
- **Non-discrimination** — Equal service regardless of privacy choices

### 7.3 Exercising Your Rights

Contact us at privacy@tethral.com with your request. We will respond within 30 days.

## 8. International Data Transfers

VibePay is operated from the United States. If you are accessing from outside the US, your information may be transferred to and processed in the US.

For EU users: We rely on Cloudflare's and Stripe's data processing agreements and standard contractual clauses for lawful data transfers.

## 9. Children's Privacy

VibePay is not intended for users under 18 years of age. We do not knowingly collect information from children. If we learn we have collected data from a child, we will delete it promptly.

## 10. Third-Party Links

VibePay payment links redirect to:
- **Stripe Checkout** — Governed by [Stripe's Privacy Policy](https://stripe.com/privacy)
- **Seller destination URLs** — Governed by the respective seller's privacy practices

We are not responsible for the privacy practices of these third parties.

## 11. Cookies and Tracking

### 11.1 We Do NOT Use

- Tracking cookies
- Analytics services (no Google Analytics, no Mixpanel, etc.)
- Advertising pixels
- Social media tracking
- Session replay tools

### 11.2 Essential Functionality Only

We may use browser localStorage for:
- Temporary form data during checkout flow
- Access token validation on the access page

This data is stored locally on your device and never transmitted to our servers for tracking purposes.

## 12. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.

Material changes will be highlighted, and we may notify Sellers via email if we have their email address.

## 13. Contact Us

For privacy-related questions or requests:

**Tethral, Inc.**
Email: privacy@tethral.com
Website: https://tethral.com

For data protection inquiries in the EU:
Email: gdpr@tethral.com

---

## Appendix: Data Flow Diagram

```
SELLER FLOW:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  VibePay    │     │   Stripe    │     │   Seller    │
│   Form      │────▶│  Onboarding │────▶│  Dashboard  │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │
      ▼                    ▼
┌─────────────┐     ┌─────────────┐
│ VibePay DB  │     │  Stripe DB  │
│ - Email     │     │ - Full KYC  │
│ - Product   │     │ - Bank info │
│ - Stripe ID │     │ - Tax info  │
└─────────────┘     └─────────────┘

BUYER FLOW:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Payment    │     │   Stripe    │     │   Access    │
│   Link      │────▶│  Checkout   │────▶│    Page     │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Stripe DB  │
                    │ - Card info │
                    │ - Email     │
                    │ - Address   │
                    └─────────────┘

VibePay NEVER sees buyer payment details.
```

---

By using VibePay, you acknowledge that you have read and understood this Privacy Policy.
