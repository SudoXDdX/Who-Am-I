import type { Locale } from "@/lib/i18n";
import type { LabEntry } from "@/content/lab";
import { getDictionary } from "@/content/dictionary";

export function LabCard({ entry, locale }: { entry: LabEntry; locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <article className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <p className="font-mono text-xs text-[var(--color-accent)]">{entry.tag[locale]}</p>
      <h3 className="mt-1 text-lg font-semibold text-[var(--color-text)]">
        {entry.title[locale]}
      </h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-mono text-xs text-[var(--color-text-muted)]">
            {dict.lab.objectiveLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{entry.objective[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--color-text-muted)]">
            {dict.lab.whatHappenedLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{entry.whatHappened[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--color-text-muted)]">
            {dict.lab.resultLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{entry.result[locale]}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-[var(--color-accent)]">
            {dict.lab.lessonLabel}
          </dt>
          <dd className="mt-1 text-[var(--color-text)]">{entry.lesson[locale]}</dd>
        </div>
      </dl>
    </article>
  );
}
