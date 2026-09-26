import { describe, expect, it } from "vitest";
import { projectCatalogSchema, type Project } from "../app/data/project-schema";
import { getProjectBySlug, orderedProjects, projects } from "../app/data/projects";

const validProject: Project = {
  id: "new-project",
  routeSlug: "new-project",
  title: "A Future Portfolio Project",
  description: "A project entry used to validate future content against the portfolio contract.",
  date: "2026-01-01",
  category: "software-engineering",
  status: "Research & Development",
  priority: 1,
  tags: ["Example"],
  impact: "A representative impact statement used only in a schema test fixture.",
  thumbnail: "/images/projects/new-project/thumbnail.webp",
  links: {},
  stack: ["TypeScript"],
};

describe("project catalog", () => {
  it("accepts an empty collection and keeps the scaffold unpopulated", () => {
    expect(projectCatalogSchema.parse([])).toEqual([]);
    expect(projects).toEqual([]);
    expect(orderedProjects).toEqual([]);
    expect(getProjectBySlug("not-a-project")).toBeUndefined();
  });

  it("rejects duplicate IDs, route slugs and priorities", () => {
    const duplicate = { ...validProject, routeSlug: "new-project", priority: 1 };
    const result = projectCatalogSchema.safeParse([validProject, duplicate]);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate route slug: new-project");
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate priority: 1");
      expect(result.error.issues.map((issue) => issue.message)).toContain("Duplicate project ID: " + validProject.id);
    }
  });
  it("accepts only the four portfolio category IDs", () => {
    expect(projectCatalogSchema.safeParse([validProject]).success).toBe(true);
    expect(projectCatalogSchema.safeParse([{ ...validProject, category: "finance-quant" }]).success).toBe(false);
  });

  it("rejects missing required fields and malformed asset paths", () => {
    const { impact: _impact, ...missingImpact } = validProject;
    expect(projectCatalogSchema.safeParse([missingImpact]).success).toBe(false);
    expect(projectCatalogSchema.safeParse([{ ...validProject, thumbnail: "/images/missing.webp" }]).success).toBe(false);
  });
});
