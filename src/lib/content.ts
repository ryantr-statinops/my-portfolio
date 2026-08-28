import type { CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export const sortByPriority = (a: ProjectEntry, b: ProjectEntry) => b.data.priority - a.data.priority;

export const filterByCategory = (projects: ProjectEntry[], category: string) =>
  projects.filter((p) => p.data.category === category);
