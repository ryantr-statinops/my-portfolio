import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { projectCatalogSchema } from "../app/data/project-schema";
import { orderedProjects, projects } from "../app/data/projects";

const validProject = projects[0];

 describe("project catalog", () => {
  it("validates all five route slugs and retains priority order", () => {
    expect(projects).toHaveLength(5);
    expect(orderedProjects.map((project) => project.routeSlug)).toEqual([
      "grap4prob",
      "project-01",
      "mean-reversion-bot",
      "orbit-system-manager",
      "project-02",
    ]);

    for (const project of projects) {
      expect(existsSync(fileURLToPath(new URL(`../public${project.thumbnail}`, import.meta.url)))).toBe(true);
    }
  });

  it("rejects duplicate route slugs and priorities", () => {
    const duplicate = { ...validProject, routeSlug: "grap4prob", priority: 1 };
    const result = projectCatalogSchema.safeParse([validProject, duplicate]);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate route slug: grap4prob");
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate priority: 1");
    }
  });

  it("rejects missing editorial fields and malformed asset paths", () => {
    const { impact: _impact, ...missingImpact } = validProject;
    expect(projectCatalogSchema.safeParse([missingImpact]).success).toBe(false);
    expect(projectCatalogSchema.safeParse([{ ...validProject, thumbnail: "/images/missing.webp" }]).success).toBe(false);
  });
});
