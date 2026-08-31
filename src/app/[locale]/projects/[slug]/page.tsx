import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getProjectBySlug, projects } from "@/content/projects";
import { StatusBadge } from "@/components/StatusBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NeonCard } from "@/components/NeonCard";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.filter((p) => p.story).map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);
  if (!project || !project.story) notFound();

  const { story } = project;

  const storySections: Array<{ label: string; body: string }> = [
    { label: dict.projects.contextLabel, body: story.context[locale] },
    { label: dict.projects.problemLabel, body: story.problem[locale] },
    { label: dict.projects.explorationLabel, body: story.exploration[locale] },
    { label: dict.projects.buildLabel, body: story.build[locale] },
    { label: dict.projects.resultLabel, body: story.result[locale] },
    { label: dict.projects.lessonsLabel, body: story.lessons[locale] },
  ];

  return (
    <div className="page-content">
      <ScrollReveal>
        <Link
          href={`/${locale}/projects/`}
          className="project-card-link mb-8 inline-flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          {dict.projects.backToProjects}
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="section-title mt-0">{project.title}</h1>
          <StatusBadge status={project.status} label={dict.projects.statusLabels[project.status]} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <p className="mt-4 text-[var(--color-text-sec)] leading-relaxed">{project.summary[locale]}</p>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <NeonCard className="mt-6 p-5">
          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="lab-card-label">{dict.projects.roleLabel}</dt>
              <dd className="mt-1 text-[var(--color-text)]">{project.role[locale]}</dd>
            </div>
            <div>
              <dt className="lab-card-label">{dict.projects.periodLabel}</dt>
              <dd className="mt-1 text-[var(--color-text)]">{project.period[locale]}</dd>
            </div>
            {project.technologies.length > 0 && (
              <div>
                <dt className="lab-card-label">{dict.projects.techLabel}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-card-tech">{tech}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </NeonCard>
      </ScrollReveal>

      {project.securityNote && (
        <ScrollReveal delay={200}>
          <div className="callout callout-amber mt-6">{dict.security.note}</div>
        </ScrollReveal>
      )}

      <div className="section-divider mt-10" aria-hidden="true" />

      <div className="mt-8 space-y-10">
        {storySections.map((section, index) => (
          <ScrollReveal key={section.label} delay={200 + index * 80}>
            <div>
              <h2 className="lab-card-label-accent text-xs font-medium uppercase tracking-wider">{section.label}</h2>
              <p className="mt-3 leading-relaxed text-[var(--color-text-sec)]">{section.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}