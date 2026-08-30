import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getProjectBySlug, projects } from "@/content/projects";
import { StatusBadge } from "@/components/StatusBadge";

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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href={`/${locale}/projects/`}
        className="font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
      >
        ← {dict.projects.backToProjects}
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-[var(--color-text)]">{project.title}</h1>
        <StatusBadge status={project.status} label={dict.projects.statusLabels[project.status]} />
      </div>
      <p className="mt-3 text-[var(--color-text-muted)]">{project.summary[locale]}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs text-[var(--color-text-muted)]">
            {dict.projects.roleLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{project.role[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--color-text-muted)]">
            {dict.projects.periodLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{project.period[locale]}</dd>
        </div>
        {project.technologies.length > 0 && (
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono text-xs text-[var(--color-text-muted)]">
              {dict.projects.techLabel}
            </dt>
            <dd className="mt-1 text-[var(--color-text)]">
              {project.technologies.join(", ")}
            </dd>
          </div>
        )}
      </dl>

      {project.securityNote && (
        <p className="mt-6 rounded border border-[var(--color-amber)]/40 bg-[var(--color-amber)]/5 px-4 py-3 text-xs text-[var(--color-text-muted)]">
          {dict.security.note}
        </p>
      )}

      <div className="prose-body mt-10 space-y-8">
        {storySections.map((section) => (
          <div key={section.label}>
            <h2 className="font-mono text-sm text-[var(--color-accent)]">{section.label}</h2>
            <p className="mt-2 text-[var(--color-text)]">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
