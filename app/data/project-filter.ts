import { CATEGORY_IDS } from "../../src/lib/constants";
import type { Project } from "./project-schema";

export const projectCategories = CATEGORY_IDS;

export function toggleProjectCategory(selected: string[], category: string) {
  if (category === "all") return [];
  if (!projectCategories.includes(category as (typeof projectCategories)[number])) return selected;
  return selected.includes(category)
    ? selected.filter((current) => current !== category)
    : [...selected, category];
}

export function filterProjects(projects: Project[], selected: string[]) {
  if (selected.length === 0) return projects;
  return projects.filter((project) => selected.includes(project.category));
}
