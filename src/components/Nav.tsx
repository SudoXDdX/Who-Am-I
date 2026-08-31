"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { ThemeToggle } from "./ThemeToggle";

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
    { href: `/${locale}/`, label: dict.nav.home, icon: "home" },
    { href: `/${locale}/about/`, label: dict.nav.about, icon: "person" },
    { href: `/${locale}/timeline/`, label: dict.nav.timeline, icon: "timeline" },
    { href: `/${locale}/projects/`, label: dict.nav.projects, icon: "folder_special" },
    { href: `/${locale}/stack/`, label: dict.nav.stack, icon: "code" },
    { href: `/${locale}/lab/`, label: dict.nav.lab, icon: "science" },
    { href: `/${locale}/contact/`, label: dict.nav.contact, icon: "mail" },
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
          className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
        >
          <span className="material-symbols-outlined icon-primary" style={{ fontSize: 20 }}>
            terminal
          </span>
          <span className="font-mono text-xs">
            whoami<span className="text-[var(--color-primary)]">{'//'}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1.5">
            <ThemeToggle locale={locale} />
            <Link href={`/${alt}/`} aria-label={dict.nav.langSwitchAria} className="nav-lang-btn">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                translate
              </span>
              {dict.nav.langLabel}
            </Link>
          </div>
        </nav>

        <details className="relative md:hidden">
          <summary
            className="cursor-pointer list-none rounded-lg border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-sec)]"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              menu
            </span>
          </summary>
          <div className="nav-mobile-panel">
            <nav className="flex flex-col gap-0.5" aria-label="Primary">
              {links.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link flex items-center gap-2"
                >
                  <span className="material-symbols-outlined icon-text-muted" style={{ fontSize: 16 }}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${alt}/`}
                className="nav-lang-btn mt-1 justify-center"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  translate
                </span>
                {dict.nav.langLabel}
              </Link>
              <div className="mt-2 flex items-center justify-center">
                <ThemeToggle locale={locale} />
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
