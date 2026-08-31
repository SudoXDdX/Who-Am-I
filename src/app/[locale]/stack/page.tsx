import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { stackCategories } from "@/content/stack";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

export function generateStaticParams() {
  return localeParams();
}

export default async function StackPage({
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
        <SectionHeading kicker={dict.stack.kicker} title={dict.stack.title} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="section-description mb-12">{dict.stack.intro}</p>
      </ScrollReveal>

      <div className="space-y-10">
        {stackCategories.map((category, catIndex) => (
          <ScrollReveal key={category.id} delay={150 + catIndex * 80}>
            <div>
              <h2 className="stack-category-label">{category.label[locale]}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item} className="stack-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
