import type { Locale } from "@/lib/i18n";
import type { LabEntry } from "@/content/lab";
import { getDictionary } from "@/content/dictionary";
import { NeonCard } from "@/components/NeonCard";

export function LabCard({ entry, locale }: { entry: LabEntry; locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <NeonCard className="neon-card-lab p-6">
      <p className="lab-card-tag">{entry.tag[locale]}</p>
      <h3 className="lab-card-title">{entry.title[locale]}</h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="lab-card-label">{dict.lab.objectiveLabel}</dt>
          <dd className="mt-1 text-[var(--color-text-sec)]">{entry.objective[locale]}</dd>
        </div>
        <div>
          <dt className="lab-card-label">{dict.lab.whatHappenedLabel}</dt>
          <dd className="mt-1 text-[var(--color-text-sec)]">{entry.whatHappened[locale]}</dd>
        </div>
        <div>
          <dt className="lab-card-label">{dict.lab.resultLabel}</dt>
          <dd className="mt-1 text-[var(--color-text-sec)]">{entry.result[locale]}</dd>
        </div>
        <div>
          <dt className="lab-card-label-accent">{dict.lab.lessonLabel}</dt>
          <dd className="mt-1 text-[var(--color-text-sec)]">{entry.lesson[locale]}</dd>
        </div>
      </dl>
    </NeonCard>
  );
}
