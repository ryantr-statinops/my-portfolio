import { z } from "zod";

export const projectCategorySchema = z.enum([
  "finance-quant",
  "ops-automation",
  "data-math",
  "system-ui",
  "ai-implementation",
  "software-engineering",
]);

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  routeSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(5),
  description: z.string().min(10),
  date: z.iso.date(),
  category: projectCategorySchema,
  status: z.enum([
    "In Progress",
    "Production",
    "Archived",
    "Research & Development",
    "Audit Pending",
  ]),
  priority: z.number().int().min(1).max(10),
  tags: z.array(z.string().min(1)).max(12),
  impact: z.string().min(20),
  thumbnail: z.string().regex(/^\/images\/projects\/[a-z0-9-]+\/thumbnail\.webp$/),
  links: z.object({
    github: z.url().optional(),
    demo: z.url().optional(),
  }),
  stack: z.array(z.string().min(1)).max(12),
});

export const projectCatalogSchema = z.array(projectSchema).superRefine((projects, context) => {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const priorities = new Set<number>();

  projects.forEach((project, index) => {
    if (ids.has(project.id)) {
      context.addIssue({ code: "custom", path: [index, "id"], message: "Duplicate project ID: " + project.id });
    }
    if (slugs.has(project.routeSlug)) {
      context.addIssue({ code: "custom", path: [index, "routeSlug"], message: "Duplicate route slug: " + project.routeSlug });
    }
    if (priorities.has(project.priority)) {
      context.addIssue({ code: "custom", path: [index, "priority"], message: "Duplicate priority: " + project.priority });
    }
    ids.add(project.id);
    slugs.add(project.routeSlug);
    priorities.add(project.priority);
  });
});

export type Project = z.infer<typeof projectSchema>;
