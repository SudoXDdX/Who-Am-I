"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export function Nav({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const alt = otherLocale(locale);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className={`nav-glass ${scrolled ? "scrolled" : ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--color-primary)] focus:px-3 focus:py-2 focus:text-[var(--color-bg)] focus:font-medium"
      >
        {dict.nav.skipToContent}
      </a>
      <div className="nav-glass-inner">
        <Link
          href={`/${locale}/`}
          className="font-mono text-sm tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
        >
          whoami<span className="text-[var(--color-primary)]">{"//"}</span>SuXD
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <Link href={`/${alt}/`} aria-label={dict.nav.langSwitchAria} className="nav-lang-btn">
            {dict.nav.langLabel}
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary
            className="cursor-pointer list-none rounded-lg border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-sec)]"
            aria-label="Menu"
          >
            menu
          </summary>
          <div className="nav-mobile-panel">
            <nav className="flex flex-col gap-0.5" aria-label="Primary">
              {links.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${alt}/`}
                className="nav-lang-btn mt-1 justify-center"
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
