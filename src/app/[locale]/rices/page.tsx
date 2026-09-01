import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { isLocale, localeParams } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localeParams();
}

export default async function RicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <SectionHeading
        kicker={dict.rices.kicker}
        title={dict.rices.title}
      />
      <p className="text-[var(--color-text-sec)] text-lg leading-relaxed">
        {dict.rices.intro}
      </p>
      <div className="neon-card mt-12 p-8 text-center">
        <span
          className="material-symbols-outlined text-[var(--color-text-muted)]"
          style={{ fontSize: 48 }}
        >
          wallpaper
        </span>
        <p className="mt-4 font-mono text-sm text-[var(--color-text-muted)]">
          {dict.rices.comingSoon}
        </p>
      </div>
    </section>
  );
}