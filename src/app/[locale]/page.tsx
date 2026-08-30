import Link from "next/link";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { notFound } from "next/navigation";

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
      <section className="mx-auto flex max-w-4xl flex-col items-start gap-10 px-6 py-20 sm:py-28 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-sm text-[var(--color-accent)]">
            {dict.home.kicker}
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-[var(--color-text)] sm:text-6xl">
            {dict.home.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
            {dict.home.lede}
          </p>
          <Link
            href={`/${locale}/about/`}
            className="mt-8 inline-flex items-center rounded border border-[var(--color-accent)] px-5 py-2.5 font-mono text-sm text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
          >
            {dict.home.cta}
          </Link>
        </div>

        <TerminalPrompt lines={dict.home.prompt} />
      </section>

      <section className="border-t border-[var(--color-border)] px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col justify-between gap-4 bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-surface)]"
            >
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {card.body}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--color-accent)] group-hover:underline">
                {card.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
