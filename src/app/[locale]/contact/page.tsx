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

      <div className="space-y-4">
        <ScrollReveal delay={150}>
          <a
            href="https://github.com/SudoXDdX"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <NeonCard className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center">
              <div className="contact-card w-full">
                <div className="contact-icon-row">
                  <div className="contact-icon-box github-bg">
                    <span className="material-symbols-outlined icon-primary">github</span>
                  </div>
                  <div>
                    <span className="contact-label">{dict.contact.githubLabel}</span>
                    <span className="contact-sublabel block">github.com/SudoXDdX</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-sec)]">
                  {dict.contact.githubDesc}
                </p>
              </div>
            </NeonCard>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <a
            href="mailto:overtonightisgoat@gmail.com"
            className="group block"
          >
            <NeonCard className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center">
              <div className="contact-card w-full">
                <div className="contact-icon-row">
                  <div className="contact-icon-box email-bg">
                    <span className="material-symbols-outlined icon-green">alternate_email</span>
                  </div>
                  <div>
                    <span className="contact-label">{dict.contact.emailLabel}</span>
                    <span className="contact-sublabel block">overtonightisgoat@gmail.com</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-sec)]">
                  {dict.contact.emailDesc}
                </p>
              </div>
            </NeonCard>
          </a>
        </ScrollReveal>
      </div>
    </div>
  );
}
