import type { ProjectStatus } from "../data/project-schema";

export const PROJECT_STATUS = {
  pending: { label: "Pending", color: "border-neutral-300 bg-neutral-100 text-neutral-800" },
  building: { label: "Building", color: "border-amber-300 bg-amber-100 text-amber-900" },
  active: { label: "Active", color: "border-emerald-300 bg-emerald-100 text-emerald-900" },
  paused: { label: "Paused", color: "border-orange-300 bg-orange-100 text-orange-900" },
  completed: { label: "Completed", color: "border-blue-300 bg-blue-100 text-blue-900" },
  archived: { label: "Archived", color: "border-slate-300 bg-slate-100 text-slate-800" },
} satisfies Record<ProjectStatus, { label: string; color: string }>;

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, color } = PROJECT_STATUS[status];
  return <span data-project-status={status} className={`inline-flex shrink-0 rounded-full border px-2 py-1 font-mono text-[10px] font-medium leading-tight ${color}`}><span className="sr-only">Status: </span>{label}</span>;
}
