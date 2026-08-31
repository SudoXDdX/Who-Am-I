import type { Locale } from "@/lib/i18n";
import type { TimelineEntry } from "@/content/timeline";

export function TimelineList({
  entries,
  locale,
}: {
  entries: TimelineEntry[];
  locale: Locale;
}) {
  return (
    <ol className="timeline-line">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative pb-12 last:pb-0">
          <span className="timeline-dot" aria-hidden />
          <p className="timeline-number">
            {String(index + 1).padStart(2, "0")} &middot; {entry.period[locale]}
          </p>
          <h3 className="timeline-title">{entry.title[locale]}</h3>
          <p className="timeline-body">{entry.body[locale]}</p>
        </li>
      ))}
    </ol>
  );
}
