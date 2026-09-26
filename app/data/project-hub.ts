import type { ProjectOverview } from "./project-schema";

export type ProjectCategory = "all" | ProjectOverview["category"];

export function projectsForCategory(projects: readonly ProjectOverview[], category: ProjectCategory) {
  return projects.filter((project) => category === "all" || project.category === category)
    .sort((left, right) => left.priority - right.priority);
}

export function resolveSelectedProject(projects: readonly ProjectOverview[], selectedId: string | null) {
  return projects.find((project) => project.id === selectedId) ?? projects[0] ?? null;
}
