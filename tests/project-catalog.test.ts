import { describe, expect, it } from "vitest";
import { projectCatalogSchema, projectSchema } from "../app/data/project-schema";

const project = { id: "example-project", title: "Example Project", description: "An example overview for schema verification.", category: "software-engineering", status: "active", priority: 11, stack: ["TypeScript"], links: { github: "https://github.com/example/project" } };

describe("project overview catalog", () => {
  it.each(["pending", "building", "active", "paused", "completed", "archived"])("accepts status %s", (status) => {
    expect(projectSchema.parse({ ...project, status }).status).toBe(status);
  });
  it.each([undefined, null, "", "archive", "unknown"])("rejects invalid or missing status %s", (status) => {
    expect(projectSchema.safeParse({ ...project, status }).success).toBe(false);
  });
  it("accepts empty catalogs and priorities above ten", () => {
    expect(projectCatalogSchema.parse([])).toEqual([]);
    expect(projectSchema.parse(project).priority).toBe(11);
  });
  it("requires unique IDs and priorities", () => {
    const result = projectCatalogSchema.safeParse([project, project]);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map((issue) => issue.path)).toEqual([[1, "id"], [1, "priority"]]);
  });
  it.each([0, -1, 1.5])("rejects invalid priority %s", (priority) => {
    expect(projectSchema.safeParse({ ...project, priority }).success).toBe(false);
  });
  it.each(["not-a-url", "", "http://github.com/owner/repo", "https://example.com/owner/repo", "https://github.com/owner", "https://github.com/owner/repo/tree/main", "https://github.com/owner/repo?tab=readme", "https://user:pass@github.com/owner/repo"]) ("rejects non-repository URL %s", (github) => {
    expect(projectSchema.safeParse({ ...project, links: { github } }).success).toBe(false);
  });
  it("requires a repository, supported category and nonempty stack values", () => {
    expect(projectSchema.safeParse({ ...project, links: {} }).success).toBe(false);
    expect(projectSchema.safeParse({ ...project, category: "invalid" }).success).toBe(false);
    expect(projectSchema.safeParse({ ...project, stack: [" "] }).success).toBe(false);
  });
});
