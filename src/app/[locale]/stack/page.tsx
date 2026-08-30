import { notFound } from "next/navigation";
import { isLocale, localeParams, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { stackCategories } from "@/content/stack";
import { SectionHeading } from "@/components/SectionHeading";

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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading kicker={dict.stack.kicker} title={dict.stack.title} />
      <p className="mb-12 max-w-xl text-[var(--color-text-muted)]">{dict.stack.intro}</p>

      <div className="space-y-10">
        {stackCategories.map((category) => (
          <div key={category.id}>
            <h2 className="font-mono text-sm text-[var(--color-accent)]">
              {category.label[locale]}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-text)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
