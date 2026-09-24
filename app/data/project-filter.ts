import { CATEGORY_MAP } from "../../src/lib/constants";
import type { Project } from "./project-schema";

export const projectCategories = Object.keys(CATEGORY_MAP);

export function toggleProjectCategory(selected: string[], category: string) {
  if (category === "all") return [];
  if (!projectCategories.includes(category)) return selected;
  return selected.includes(category)
    ? selected.filter((current) => current !== category)
    : [...selected, category];
}

export function filterProjects(projects: Project[], selected: string[]) {
  if (selected.length === 0) return projects;
  return projects.filter((project) => selected.includes(project.category));
}
