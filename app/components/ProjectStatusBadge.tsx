import type { ProjectStatus } from "../data/project-schema";

export const PROJECT_STATUS = {
  pending: { label: "Pending", color: "border-border/60 bg-surface/80 text-muted" },
  building: { label: "Building", color: "border-amber-500/40 bg-amber-500/10 text-amber-500 dark:text-amber-400" },
  active: { label: "Active", color: "border-accent/40 bg-accent/10 text-accent" },
  paused: { label: "Paused", color: "border-orange-500/40 bg-orange-500/10 text-orange-500 dark:text-orange-400" },
  completed: { label: "Completed", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  archived: { label: "Archived", color: "border-border/40 bg-surface/40 text-muted/70" },
} satisfies Record<ProjectStatus, { label: string; color: string }>;

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, color } = PROJECT_STATUS[status];
  return <span data-project-status={status} className={`inline-flex shrink-0 rounded-full border px-2 py-1 font-mono text-[10px] font-medium leading-tight ${color}`}><span className="sr-only">Status: </span>{label}</span>;
}
