import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getTimeline } from "@/content/timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { TimelineList } from "@/components/TimelineList";
import { ScrollReveal } from "@/components/ScrollReveal";

export function generateStaticParams() {
  return localeParams();
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const entries = getTimeline(locale);

  return (
    <div className="page-content">
      <ScrollReveal>
        <SectionHeading kicker={dict.timeline.kicker} title={dict.timeline.title} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="section-description mb-12">{dict.timeline.intro}</p>
      </ScrollReveal>
      <TimelineList entries={entries} locale={locale} />
    </div>
  );
}
