import Link from "next/link";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { timelineEntries } from "@/content/timeline";
import { projects } from "@/content/projects";
import { stackCategories } from "@/content/stack";
import { labEntries } from "@/content/lab";
import { notFound } from "next/navigation";
import { TypeWriter } from "@/components/TypeWriter";
import { HeroParallax } from "@/components/HeroParallax";
import { NeonCard } from "@/components/NeonCard";
import { ScrollReveal } from "@/components/ScrollReveal";

export function generateStaticParams() {
  return localeParams();
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  const storyCount = projects.filter((p) => p.story).length;
  const stats = [
    { value: timelineEntries.length, label: dict.nav.timeline },
    { value: storyCount, label: dict.projects.kicker },
    { value: stackCategories.length, label: dict.stack.kicker },
    { value: labEntries.length, label: dict.lab.kicker },
  ];

  const cards = [
    {
      title: dict.home.sections.aboutTitle,
      body: dict.home.sections.aboutBody,
      cta: dict.home.sections.aboutCta,
      href: `/${locale}/about/`,
    },
    {
      title: dict.home.sections.timelineTitle,
      body: dict.home.sections.timelineBody,
      cta: dict.home.sections.timelineCta,
      href: `/${locale}/timeline/`,
    },
    {
      title: dict.home.sections.projectsTitle,
      body: dict.home.sections.projectsBody,
      cta: dict.home.sections.projectsCta,
      href: `/${locale}/projects/`,
    },
    {
      title: dict.home.sections.labTitle,
      body: dict.home.sections.labBody,
      cta: dict.home.sections.labCta,
      href: `/${locale}/lab/`,
    },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />
        <div className="hero-blob hero-blob-3" aria-hidden="true" />

        <div className="relative z-[2] mx-auto max-w-[1080px]">
          <HeroParallax>
            <div className="max-w-2xl">
              <span className="hero-tag">
                <span className="hero-tag-dot" aria-hidden="true" />
                {dict.home.kicker}
              </span>

              <h1 className="hero-title gradient-text-animated mt-6">
                {dict.home.title}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-sec)] sm:text-xl">
                <TypeWriter text={dict.home.lede} speed={25} />
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/about/`} className="btn-primary">
                  {dict.home.cta}
                </Link>
                <Link href={`/${locale}/projects/`} className="btn-ghost">
                  {dict.home.sections.projectsCta}
                </Link>
              </div>

              <div className="hero-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <div className="stat-card-value">{stat.value}</div>
                    <div className="stat-card-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </HeroParallax>
        </div>
      </section>

      {/* ═══ SECTION DIVIDER ═══ */}
      <div className="section-divider" aria-hidden="true" />

      {/* ═══ SECTION PREVIEW CARDS ═══ */}
      <section className="relative z-[2] px-6 pb-20">
        <div className="mx-auto grid max-w-[1080px] gap-6 sm:grid-cols-2">
          {cards.map((card, index) => (
            <ScrollReveal key={card.href} delay={index * 100}>
              <Link href={card.href} className="group block">
                <NeonCard className="flex h-full flex-col justify-between gap-4 p-8">
                  <div>
                    <h2 className="project-card-title text-lg">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-sec)]">
                      {card.body}
                    </p>
                  </div>
                  <span className="project-card-link">
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </NeonCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
