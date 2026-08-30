import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/SectionHeading";

export function generateStaticParams() {
  return localeParams();
}

export default async function AboutPage({
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
      <SectionHeading kicker={dict.about.kicker} title={dict.about.title} />
      <p className="text-lg text-[var(--color-text)]">{dict.about.intro}</p>

      <div className="prose-body mt-8 text-[var(--color-text-muted)]">
        {dict.about.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold text-[var(--color-text)]">
        {dict.about.valuesTitle}
      </h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        {dict.about.values.map((value) => (
          <div
            key={value.title}
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <dt className="font-semibold text-[var(--color-text)]">{value.title}</dt>
            <dd className="mt-2 text-sm text-[var(--color-text-muted)]">{value.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
