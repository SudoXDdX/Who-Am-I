import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { getDictionary } from "@/content/dictionary";
import { StatusBadge } from "@/components/StatusBadge";
import { NeonCard } from "@/components/NeonCard";

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <NeonCard className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="project-card-title">{project.title}</h3>
        <StatusBadge
          status={project.status}
          label={dict.projects.statusLabels[project.status]}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-sec)]">
        {project.summary[locale]}
      </p>
      {project.technologies.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="project-card-tech">
              {tech}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>
              open_in_new
            </span>
            GitHub
          </a>
        )}
        {project.story && (
          <Link
            href={`/${locale}/projects/${project.slug}/`}
            className="project-card-link"
          >
            {dict.projects.readMore}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </NeonCard>
  );
}
