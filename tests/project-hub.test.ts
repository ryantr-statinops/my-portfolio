import { describe, expect, it } from "vitest";
import { projectsForCategory, resolveSelectedProject } from "../app/data/project-hub";
import type { ProjectOverview } from "../app/data/project-schema";

const projects: ProjectOverview[] = [
  { id: "later", title: "Later Project", description: "A software project overview.", category: "software-engineering", status: "active", priority: 20, stack: [], links: { github: "https://github.com/example/later" } },
  { id: "first", title: "First Project", description: "A data project overview.", category: "data-engineering", status: "active", priority: 1, stack: ["SQL"], links: { github: "https://github.com/example/first" } },
];

describe("project hub selection", () => {
  it("orders all projects without mutating input", () => {
    expect(projectsForCategory(projects, "all").map((p) => p.id)).toEqual(["first", "later"]);
    expect(projects[0].id).toBe("later");
  });
  it("filters one category", () => {
    expect(projectsForCategory(projects, "data-engineering")).toEqual([projects[1]]);
  });
  it("retains valid selection and falls back to first visible project", () => {
    const all = projectsForCategory(projects, "all");
    expect(resolveSelectedProject(all, "later")?.id).toBe("later");
    expect(resolveSelectedProject(all, null)?.id).toBe("first");
    expect(resolveSelectedProject(projectsForCategory(projects, "data-engineering"), "later")?.id).toBe("first");
  });
  it("clears selection for empty results", () => {
    expect(resolveSelectedProject(projectsForCategory(projects, "ai-engineering"), "first")).toBeNull();
    expect(resolveSelectedProject([], null)).toBeNull();
  });
});
