import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/timeline/`, label: dict.nav.timeline },
    { href: `/${locale}/projects/`, label: dict.nav.projects },
    { href: `/${locale}/stack/`, label: dict.nav.stack },
    { href: `/${locale}/lab/`, label: dict.nav.lab },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  return (
    <footer className="footer-blur-top relative z-[2]">
      <div
        className="mx-auto border-t border-[var(--color-border)]"
        style={{
          borderTopColor: "transparent",
          borderImage: "linear-gradient(90deg, transparent, rgba(130,177,255,0.15), transparent) 1",
        }}
      />
      <div className="mx-auto max-w-[1080px] px-6 pb-8 pt-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <p className="font-mono text-sm font-medium text-[var(--color-text)]">
              whoami<span className="text-[var(--color-primary)]">{"//"}</span>SuXD
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--color-text-muted)]">
              {dict.meta.description}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="section-kicker">navigation</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-text-sec)] transition-colors hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social / Source */}
          <div>
            <p className="section-kicker">source</p>
            <a
              href="https://github.com/SudoXDdX/Who-Am-I"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-text-sec)] transition-colors hover:text-[var(--color-primary)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {dict.footer.source}
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            &copy; {year} SuXD &middot; {dict.footer.built}
          </p>
          <span className="glass-card inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[0.65rem] text-[var(--color-text-muted)]">
            Next.js
            <span className="text-[var(--color-border-hover)]">&middot;</span>
            TypeScript
            <span className="text-[var(--color-border-hover)]">&middot;</span>
            Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
