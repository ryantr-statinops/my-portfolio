import rawProjects from "./projects.json";
import { projectCatalogSchema } from "./project-schema";

export const projects = projectCatalogSchema.parse(rawProjects);
export const orderedProjects = [...projects].sort((left, right) => left.priority - right.priority);
export const projectRouteSlugs = orderedProjects.map((project) => project.routeSlug);
export function getProjectBySlug(routeSlug: string) {
  return projects.find((project) => project.routeSlug === routeSlug);
}
