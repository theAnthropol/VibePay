"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-3 bg-white/10 hover:bg-white/20 transition-colors text-sm whitespace-nowrap"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
