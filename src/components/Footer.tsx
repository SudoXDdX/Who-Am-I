import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          © {year} SuXD · {dict.footer.built}
        </p>
        <a
          href="https://github.com/SudoXDdX/Who-Am-I"
          className="font-mono underline decoration-[var(--color-border)] underline-offset-4 hover:text-[var(--color-accent)]"
        >
          {dict.footer.source}
        </a>
      </div>
    </footer>
  );
}
