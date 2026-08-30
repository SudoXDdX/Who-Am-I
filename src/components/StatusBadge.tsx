import type { ProjectStatus } from "@/content/projects";

const statusStyles: Record<ProjectStatus, string> = {
  idea: "border-[var(--color-border)] text-[var(--color-text-muted)]",
  prototype: "border-[var(--color-amber)]/50 text-[var(--color-amber)]",
  research: "border-[var(--color-amber)]/50 text-[var(--color-amber)]",
  active: "border-[var(--color-accent)]/50 text-[var(--color-accent)]",
  delivered: "border-[var(--color-accent)]/50 text-[var(--color-accent)]",
  parked: "border-[var(--color-border)] text-[var(--color-text-muted)]",
};

export function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
