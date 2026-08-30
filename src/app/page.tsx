"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/lib/i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Static export can't do a server redirect for "/", so this client
 * component redirects immediately on load, with a plain link as a
 * no-JS / crawler-friendly fallback.
 */
export default function RootPage() {
  useEffect(() => {
    window.location.replace(`${basePath}/${defaultLocale}/`);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6 text-[var(--color-text)]">
      <p className="font-mono text-sm text-[var(--color-text-muted)]">
        Redirecting to{" "}
        <a className="text-[var(--color-accent)] underline" href={`${basePath}/${defaultLocale}/`}>
          {basePath}/{defaultLocale}/
        </a>
        …
      </p>
    </main>
  );
}
