import rawProjects from "./projects.json";
import { projectCatalogSchema, type Project } from "./project-schema";

export const projects = projectCatalogSchema.parse(rawProjects);
export const orderedProjects: Project[] = [...projects].sort((left, right) => left.priority - right.priority).map((project) => ({ ...project, routeSlug: project.id, date: "2026-01-01", status: "Research & Development", tags: [], impact: project.description, thumbnail: "" }));
export const projectRouteSlugs = orderedProjects.map((project) => project.routeSlug);
export function getProjectBySlug(routeSlug: string) {
  return orderedProjects.find((project) => project.routeSlug === routeSlug);
}
