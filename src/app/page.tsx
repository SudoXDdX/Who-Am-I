"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/lib/i18n";

/**
 * Static export can't do a server redirect for "/", so this client
 * component redirects immediately on load, with a plain link as a
 * no-JS / crawler-friendly fallback.
 */
export default function RootPage() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}/`);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6 text-[var(--color-text)]">
      <p className="font-mono text-sm text-[var(--color-text-muted)]">
        Redirecting to{" "}
        <a className="text-[var(--color-accent)] underline" href={`/${defaultLocale}/`}>
          /{defaultLocale}/
        </a>
        …
      </p>
    </main>
  );
}
