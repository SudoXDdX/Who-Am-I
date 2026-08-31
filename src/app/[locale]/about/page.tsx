import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NeonCard } from "@/components/NeonCard";

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

  const valueColors = ["var(--color-primary)", "var(--color-cyan)", "var(--color-violet)", "var(--color-green)"];

  return (
    <div className="page-content">
      <ScrollReveal>
        <SectionHeading kicker={dict.about.kicker} title={dict.about.title} />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <p className="text-lg leading-relaxed text-[var(--color-text)]">{dict.about.intro}</p>
      </ScrollReveal>

      <div className="prose-body mt-8 text-[var(--color-text-sec)]">
        {dict.about.body.map((paragraph, index) => (
          <ScrollReveal key={index} delay={150 + index * 80}>
            <p>{paragraph}</p>
          </ScrollReveal>
        ))}
      </div>

      <div className="section-divider" aria-hidden="true" />

      <ScrollReveal>
        <h2 className="section-title text-2xl">{dict.about.valuesTitle}</h2>
      </ScrollReveal>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {dict.about.values.map((value, index) => (
          <ScrollReveal key={value.title} delay={200 + index * 100}>
            <NeonCard className="flex h-full flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: valueColors[index] || "var(--color-primary)" }}
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-[var(--color-text)]">{value.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-sec)]">{value.body}</p>
            </NeonCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
