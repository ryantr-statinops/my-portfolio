import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export const sortByPriority = (a: ProjectEntry, b: ProjectEntry) => b.data.priority - a.data.priority;

export const filterByCategory = (projects: ProjectEntry[], category: string) =>
  projects.filter((p) => p.data.category === category);

export const validateUniquePriority = (projects: ProjectEntry[]): string[] => {
  const seen = new Map<number, string>();
  const duplicates: string[] = [];
  for (const p of projects) {
    const pri = p.data.priority;
    if (seen.has(pri)) {
      duplicates.push(`priority ${pri} duplicated: ${seen.get(pri)} vs ${p.id}`);
    } else {
      seen.set(pri, p.id);
    }
  }
  return duplicates;
};

export const getSortedProjects = async (): Promise<ProjectEntry[]> => {
  const projects = await getCollection("projects");
  const duplicates = validateUniquePriority(projects);
  if (duplicates.length > 0) {
    console.warn("[content] duplicate priorities:", duplicates.join("; "));
  }
  return [...projects].sort(sortByPriority);
};
