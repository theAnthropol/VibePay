import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibePay - Payment Links for Vibe Coders",
  description:
    "Ultra-minimal payment links. No accounts, no dashboards. Just vibes.",
  openGraph: {
    title: "VibePay",
    description: "Payment links for vibe coders",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
