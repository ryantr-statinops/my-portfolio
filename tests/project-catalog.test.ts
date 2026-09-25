import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { projectCatalogSchema } from "../app/data/project-schema";
import { getProjectBySlug, orderedProjects, projects } from "../app/data/projects";

const validProject = projects[0];

describe("project catalog", () => {
  it("validates all five route slugs and retains priority order", () => {
    expect(projects.map((project) => project.id)).toEqual([
      "grap4prob",
      "factory-stochastic-order-flow",
      "mean-reversion-trading-bot",
      "orbit-system-manager",
      "mean-function-simulator",
    ]);
    expect(projects).toHaveLength(5);
    expect(orderedProjects.map((project) => project.routeSlug)).toEqual([
      "grap4prob",
      "project-01",
      "mean-reversion-bot",
      "orbit-system-manager",
      "project-02",
    ]);

    for (const project of projects) {
      expect(existsSync(fileURLToPath(new URL("../public" + project.thumbnail, import.meta.url)))).toBe(true);
      const markdown = readFileSync(fileURLToPath(new URL("../app/content/projects/" + project.routeSlug + ".md", import.meta.url)), "utf8");
      for (const [, imagePath] of markdown.matchAll(/!\[[^\]]*\]\((\/images\/[^)\s]+)(?:\s+[^)]*)?\)/g)) {
        expect(existsSync(fileURLToPath(new URL("../public" + imagePath, import.meta.url)))).toBe(true);
      }
    }
  });

  it("rejects duplicate route slugs and priorities", () => {
    const duplicate = { ...validProject, routeSlug: "grap4prob", priority: 1 };
    const result = projectCatalogSchema.safeParse([validProject, duplicate]);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate route slug: grap4prob");
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate priority: 1");
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate project ID: " + validProject.id);
    }
  });
  it("looks up projects by their public route slug", () => {
    expect(getProjectBySlug("mean-reversion-bot")?.id).toBe("mean-reversion-trading-bot");
    expect(getProjectBySlug("not-a-project")).toBeUndefined();
  });

  it("rejects missing editorial fields and malformed asset paths", () => {
    const { impact: _impact, ...missingImpact } = validProject;
    expect(projectCatalogSchema.safeParse([missingImpact]).success).toBe(false);
    expect(projectCatalogSchema.safeParse([{ ...validProject, thumbnail: "/images/missing.webp" }]).success).toBe(false);
  });
});
