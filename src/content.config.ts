import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

/**
 * Project Collection Configuration (Astro v5+ Content Layer)
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    id: z.string(),
    title: z.string().min(5),
    description: z.string().min(10),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
    category: z.enum([
      "finance-quant",
      "ops-automation",
      "data-math",
      "system-ui",
      "ai-implementation",
      "software-engineering"
    ]),
    status: z.enum(["In Progress", "Production", "Archived"]).default("Production"),
    priority: z.number().int().min(1).max(10),
    tags: z.array(z.string()).max(12).default([]),
    impact: z.string().min(20),
    thumbnail: z.string().refine((v) => v.startsWith("/images/"), {
      message: "Thumbnail path must start with /images/"
    }),
    github: z.string().url().optional().or(z.literal("")),
    demo: z.string().url().optional().or(z.literal("")),
    stack: z.array(z.string()).max(12).default([]),
  }),
});

export const collections = { projects };
