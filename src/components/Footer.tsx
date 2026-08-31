import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}/about/`, label: dict.nav.about, icon: "person" },
    { href: `/${locale}/timeline/`, label: dict.nav.timeline, icon: "timeline" },
    { href: `/${locale}/projects/`, label: dict.nav.projects, icon: "folder_special" },
    { href: `/${locale}/stack/`, label: dict.nav.stack, icon: "code" },
    { href: `/${locale}/lab/`, label: dict.nav.lab, icon: "science" },
    { href: `/${locale}/contact/`, label: dict.nav.contact, icon: "mail" },
  ];

  return (
    <footer className="footer-blur-top relative z-[2]">
      <div className="mx-auto border-t border-[var(--color-border)]" />
      <div className="mx-auto max-w-[1080px] px-6 pb-8 pt-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text)]">
              <span className="material-symbols-outlined icon-primary" style={{ fontSize: 18 }}>
                terminal
              </span>
              <span className="font-mono text-xs">
                whoami<span className="text-[var(--color-primary)]">//</span>
              </span>
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
                  className="flex items-center gap-2 text-sm text-[var(--color-text-sec)] transition-colors hover:text-[var(--color-primary)]"
                >
                  <span className="material-symbols-outlined icon-text-muted" style={{ fontSize: 16 }}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact / Source */}
          <div>
            <p className="section-kicker">contact</p>
            <a
              href="https://github.com/SudoXDdX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-sec)] transition-colors hover:text-[var(--color-text)]"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-text-sec)" }}>
                github
              </span>
              {dict.footer.source}
            </a>
            <a
              href="mailto:overtonightisgoat@gmail.com"
              className="mt-2 flex items-center gap-2 text-sm text-[var(--color-text-sec)] transition-colors hover:text-[var(--color-green)]"
            >
              <span className="material-symbols-outlined icon-green" style={{ fontSize: 18 }}>
                alternate_email
              </span>
              overtonightisgoat@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            &copy; {year} SuXD &middot; {dict.footer.built}
          </p>
          <span className="glass-card inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[0.62rem] text-[var(--color-text-muted)]">
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
