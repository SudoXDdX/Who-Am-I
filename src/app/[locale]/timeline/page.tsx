import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getTimeline } from "@/content/timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { TimelineList } from "@/components/TimelineList";

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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading kicker={dict.timeline.kicker} title={dict.timeline.title} />
      <p className="mb-12 max-w-xl text-[var(--color-text-muted)]">{dict.timeline.intro}</p>
      <TimelineList entries={entries} locale={locale} />
    </div>
  );
}
