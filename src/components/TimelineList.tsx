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
    <ol className="relative border-l border-[var(--color-border)] pl-8">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative pb-12 last:pb-0">
          <span
            className="absolute -left-[2.3rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)]"
            aria-hidden
          />
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            {String(index + 1).padStart(2, "0")} · {entry.period[locale]}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--color-text)]">
            {entry.title[locale]}
          </h3>
          <p className="mt-2 max-w-2xl text-[var(--color-text-muted)]">
            {entry.body[locale]}
          </p>
        </li>
      ))}
    </ol>
  );
}
