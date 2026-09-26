import { z } from "zod";
import { CATEGORY_IDS } from "../../src/lib/constants";

export const projectCategorySchema = z.enum(CATEGORY_IDS);
export const projectStatusSchema = z.enum(["pending", "building", "active", "paused", "completed", "archived"]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const repositoryUrlSchema = z.url().refine((value) => {
  let url: URL;
  try { url = new URL(value); } catch { return false; }
  return url.protocol === "https:" && url.hostname === "github.com" &&
    !url.username && !url.password && !url.port && !url.search && !url.hash &&
    /^\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname) &&
    ![".", ".."].includes(url.pathname.split("/")[2]);
}, "Use an HTTPS GitHub repository URL: https://github.com/owner/repository");

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(5),
  description: z.string().min(10),
  category: projectCategorySchema,
  status: projectStatusSchema,
  priority: z.number().int().positive(),
  stack: z.array(z.string().trim().min(1)).max(12),
  links: z.object({ github: repositoryUrlSchema }),
});

export const projectCatalogSchema = z.array(projectSchema).superRefine((projects, context) => {
  const ids = new Set<string>();
  const priorities = new Set<number>();
  projects.forEach((project, index) => {
    if (ids.has(project.id)) context.addIssue({ code: "custom", path: [index, "id"], message: "Duplicate project ID: " + project.id });
    if (priorities.has(project.priority)) context.addIssue({ code: "custom", path: [index, "priority"], message: "Duplicate priority: " + project.priority });
    ids.add(project.id);
    priorities.add(project.priority);
  });
});

export type ProjectOverview = z.infer<typeof projectSchema>;
