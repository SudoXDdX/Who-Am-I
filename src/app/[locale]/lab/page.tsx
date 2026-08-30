import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { labEntries } from "@/content/lab";
import { SectionHeading } from "@/components/SectionHeading";
import { LabCard } from "@/components/LabCard";

export function generateStaticParams() {
  return localeParams();
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading kicker={dict.lab.kicker} title={dict.lab.title} />
      <p className="mb-12 max-w-xl text-[var(--color-text-muted)]">{dict.lab.intro}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {labEntries.map((entry) => (
          <LabCard key={entry.id} entry={entry} locale={locale} />
        ))}
      </div>
    </div>
  );
}
