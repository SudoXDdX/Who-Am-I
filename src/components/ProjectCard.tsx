import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { getDictionary } from "@/content/dictionary";
import { StatusBadge } from "@/components/StatusBadge";

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <article className="border-b border-[var(--color-border)] py-8 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          {project.title}
        </h3>
        <StatusBadge
          status={project.status}
          label={dict.projects.statusLabels[project.status]}
        />
      </div>
      <p className="mt-3 text-[var(--color-text-muted)]">
        {project.summary[locale]}
      </p>
      {project.technologies.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
      {project.story && (
        <Link
          href={`/${locale}/projects/${project.slug}/`}
          className="mt-4 inline-block font-mono text-sm text-[var(--color-accent)] underline underline-offset-4"
        >
          {dict.projects.readMore}
        </Link>
      )}
    </article>
  );
}
