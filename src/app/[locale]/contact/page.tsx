import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/SectionHeading";
import { NeonCard } from "@/components/NeonCard";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    <div className="page-content">
      <ScrollReveal>
        <SectionHeading kicker={dict.contact.kicker} title={dict.contact.title} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="section-description mb-10">{dict.contact.intro}</p>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <a
          href="https://github.com/SudoXDdX"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <NeonCard className="flex flex-col gap-3 p-8">
            <div className="flex items-center gap-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="var(--color-primary)"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:scale-110"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div>
                <span className="text-sm font-medium text-[var(--color-text)]">{dict.contact.githubLabel}</span>
                <span className="block text-xs text-[var(--color-text-muted)]">github.com/SudoXDdX</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text-sec)]">
              {dict.contact.githubDesc}
            </p>
          </NeonCard>
        </a>
      </ScrollReveal>
    </div>
  );
}
