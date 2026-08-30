import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getProjects } from "@/content/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

export function generateStaticParams() {
  return localeParams();
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const projects = getProjects(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading kicker={dict.projects.kicker} title={dict.projects.title} />
      <p className="mb-6 max-w-xl text-[var(--color-text-muted)]">{dict.projects.intro}</p>
      <p className="mb-10 max-w-xl rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-xs text-[var(--color-text-muted)]">
        {dict.security.note}
      </p>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
