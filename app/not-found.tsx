export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card text-center max-w-md">
        <div className="text-6xl mb-4">404</div>
        <h1 className="font-display text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-white/60 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}
