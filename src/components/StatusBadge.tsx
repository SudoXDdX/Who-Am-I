import type { ProjectStatus } from "@/content/projects";

const statusStyles: Record<ProjectStatus, string> = {
  idea: "status-idea",
  prototype: "status-prototype",
  research: "status-research",
  active: "status-active",
  delivered: "status-delivered",
  parked: "status-parked",
};

export function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span className={`status-badge ${statusStyles[status]}`}>
      {label}
    </span>
  );
}
