import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getProjects } from "@/content/projects";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";

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
  const projectsList = getProjects(locale);

  return (
    <div className="page-content">
      <ScrollReveal>
        <SectionHeading kicker={dict.projects.kicker} title={dict.projects.title} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="section-description mb-8">{dict.projects.intro}</p>
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <div className="callout mb-10">{dict.security.note}</div>
      </ScrollReveal>
      <div className="space-y-5">
        {projectsList.map((project, index) => (
          <ScrollReveal key={project.slug} delay={200 + index * 80}>
            <ProjectCard project={project} locale={locale} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
