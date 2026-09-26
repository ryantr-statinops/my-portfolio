import { describe, expect, it } from "vitest";
import { orderedProjects } from "../app/data/projects";
import { filterProjects, toggleProjectCategory } from "../app/data/project-filter";

describe("React project filter", () => {
  it("unions independently selected categories and clears back to All", () => {
    const selected = toggleProjectCategory(
      toggleProjectCategory([], "data-engineering"),
      "ai-engineering",
    );
    expect(selected).toEqual(["data-engineering", "ai-engineering"]);
    expect(filterProjects(orderedProjects, selected)).toEqual([]);
    expect(filterProjects(orderedProjects, toggleProjectCategory(selected, "all"))).toEqual([]);
  });

  it("removes a selected category and produces no matches for empty categories", () => {
    const once = toggleProjectCategory([], "data-engineering");
    const twice = toggleProjectCategory(once, "data-engineering");
    expect(twice).toEqual([]);
    expect(filterProjects(orderedProjects, ["ai-engineering"])).toEqual([]);
  });
});
