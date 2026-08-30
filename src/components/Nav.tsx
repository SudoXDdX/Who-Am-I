import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export function Nav({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const alt = otherLocale(locale);

  const links = [
    { href: `/${locale}/`, label: dict.nav.home },
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/timeline/`, label: dict.nav.timeline },
    { href: `/${locale}/projects/`, label: dict.nav.projects },
    { href: `/${locale}/stack/`, label: dict.nav.stack },
    { href: `/${locale}/lab/`, label: dict.nav.lab },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  return (
    <header className="border-b border-[var(--color-border)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-3 focus:py-2 focus:text-[#06110f]"
      >
        {dict.nav.skipToContent}
      </a>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}/`}
          className="font-mono text-sm tracking-tight text-[var(--color-text)]"
        >
          whoami<span className="text-[var(--color-accent)]">{"//"}</span>SuXD
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${alt}/`}
            aria-label={dict.nav.langSwitchAria}
            className="rounded border border-[var(--color-border)] px-2 py-1 font-mono text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {dict.nav.langLabel}
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary
            className="cursor-pointer list-none rounded border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-muted)]"
            aria-label="Menu"
          >
            menu
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-44 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg">
            <nav className="flex flex-col gap-1" aria-label="Primary">
              {links.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded px-2 py-1.5 font-mono text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${alt}/`}
                className="mt-1 rounded border border-[var(--color-border)] px-2 py-1.5 font-mono text-sm text-[var(--color-text-muted)]"
              >
                {dict.nav.langLabel}
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
