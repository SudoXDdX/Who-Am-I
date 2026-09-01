import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { labEntries } from "@/content/lab";
import { SectionHeading } from "@/components/SectionHeading";
import { LabCard } from "@/components/LabCard";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    <div className="page-content page-content-wide">
      <ScrollReveal>
        <SectionHeading kicker={dict.lab.kicker} title={dict.lab.title} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="section-description mb-12">{dict.lab.intro}</p>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {labEntries.map((entry, index) => (
          <ScrollReveal key={entry.id} delay={150 + index * 100}>
            <LabCard entry={entry} locale={locale} />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-16" aria-hidden="true" />
    </div>
  );
}
