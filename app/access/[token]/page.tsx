"use client";

export const runtime = "edge";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface AccessResult {
  valid: boolean;
  url?: string;
  productName?: string;
  usedBefore?: boolean;
  error?: string;
}

// Common file extensions that indicate a download
const DOWNLOAD_EXTENSIONS = [
  '.zip', '.rar', '.7z', '.tar', '.gz',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.mp3', '.mp4', '.wav', '.avi', '.mov', '.mkv',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.psd', '.ai',
  '.exe', '.dmg', '.app', '.apk',
  '.csv', '.json', '.xml', '.sql',
];

// Check if URL is likely a download
function isDownloadUrl(url: string): boolean {
  const lowerUrl = url.toLowerCase();

  // Check file extensions
  if (DOWNLOAD_EXTENSIONS.some(ext => lowerUrl.includes(ext))) {
    return true;
  }

  // Check common download patterns
  if (lowerUrl.includes('download') ||
      lowerUrl.includes('dl=1') ||
      lowerUrl.includes('export=download') ||
      lowerUrl.includes('/uc?') ||
      lowerUrl.includes('dropbox.com') ||
      lowerUrl.includes('drive.google.com')) {
    return true;
  }

  return false;
}

export default function AccessPage() {
  const params = useParams();
  const token = params.token as string;

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "expired">("loading");
  const [accessData, setAccessData] = useState<AccessResult | null>(null);
  const [countdown, setCountdown] = useState(3); // Faster countdown for downloads
  const [downloadStarted, setDownloadStarted] = useState(false);

  const isDownload = accessData?.url ? isDownloadUrl(accessData.url) : false;

  // Start the download
  const startDownload = useCallback(() => {
    if (!accessData?.url || downloadStarted) return;
    setDownloadStarted(true);
    window.location.href = accessData.url;
  }, [accessData?.url, downloadStarted]);

  useEffect(() => {
    async function verifyToken() {
      try {
        const res = await fetch(`/api/access?token=${token}`);
        const data = (await res.json()) as AccessResult;

        if (res.ok && data.valid) {
          setAccessData(data);
          setStatus("valid");
        } else if (res.status === 410) {
          setStatus("expired");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    }

    verifyToken();
  }, [token]);

  // Auto-redirect/download countdown
  useEffect(() => {
    if (status !== "valid" || !accessData?.url) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          startDownload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, accessData, startDownload]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <div className="text-4xl mb-4 animate-pulse">🔐</div>
          <h1 className="font-display text-xl font-bold">Verifying access...</h1>
        </div>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="font-display text-2xl font-bold mb-2">Invalid Link</h1>
          <p className="text-white/60 mb-6">
            This access link is invalid or has already been used.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Go to VibePay
          </Link>
        </div>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <div className="text-4xl mb-4">⏰</div>
          <h1 className="font-display text-2xl font-bold mb-2">Link Expired</h1>
          <p className="text-white/60 mb-6">
            This access link has expired. Access links are valid for 24 hours
            after purchase.
          </p>
          <p className="text-sm text-white/40">
            If you need help, contact the seller.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="card text-center">
          <div className="text-4xl mb-4">{isDownload ? "📥" : "✅"}</div>
          <h1 className="font-display text-2xl font-bold mb-2">
            {isDownload ? "Download Ready!" : "Access Granted!"}
          </h1>

          {accessData?.productName && (
            <p className="text-white/60 mb-4">
              Thank you for purchasing <strong>{accessData.productName}</strong>
            </p>
          )}

          {accessData?.usedBefore && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-2 text-sm mb-4">
              Note: This link has been accessed before.
            </div>
          )}

          {/* Download-specific UI */}
          {isDownload ? (
            <div className="bg-white/5 border border-white/10 p-4 mb-6">
              {downloadStarted ? (
                <>
                  <div className="text-accent text-lg font-medium mb-2">
                    ✓ Download started!
                  </div>
                  <p className="text-sm text-white/60 mb-4">
                    Your file should be downloading now.
                  </p>
                  <div className="space-y-2">
                    <a
                      href={accessData?.url}
                      className="btn-primary inline-block w-full"
                      onClick={() => setDownloadStarted(true)}
                    >
                      Download didn&apos;t start? Click here
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/60 mb-2">
                    Starting download in {countdown}...
                  </p>
                  <a
                    href={accessData?.url}
                    className="btn-primary inline-block w-full"
                    onClick={() => setDownloadStarted(true)}
                  >
                    Download Now →
                  </a>
                </>
              )}
            </div>
          ) : (
            /* Regular access UI */
            <div className="bg-white/5 border border-white/10 p-4 mb-6">
              <p className="text-sm text-white/60 mb-2">
                Redirecting in {countdown} seconds...
              </p>
              <a
                href={accessData?.url}
                className="btn-primary inline-block w-full"
              >
                Access Content Now →
              </a>
            </div>
          )}

          <p className="text-xs text-white/40">
            Your access link expires 24 hours after purchase.
            {isDownload && (
              <>
                <br />
                <strong>Save your file now</strong> — you can re-download within 24 hours.
              </>
            )}
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-white/40 hover:text-white/60">
            Powered by VibePay
          </a>
        </div>
      </div>
    </div>
  );
}
