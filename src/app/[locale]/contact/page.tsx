import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/SectionHeading";

export function generateStaticParams() {
  return localeParams();
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading kicker={dict.contact.kicker} title={dict.contact.title} />
      <p className="mb-12 max-w-xl text-[var(--color-text-muted)]">{dict.contact.intro}</p>

      <a
        href="https://github.com/SudoXDdX"
        className="group flex flex-col gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]/30"
      >
        <span className="font-mono text-sm text-[var(--color-accent)]">
          {dict.contact.githubLabel}
        </span>
        <span className="text-[var(--color-text)]">github.com/SudoXDdX</span>
        <span className="mt-2 text-sm text-[var(--color-text-muted)]">
          {dict.contact.githubDesc}
        </span>
      </a>
    </div>
  );
}
