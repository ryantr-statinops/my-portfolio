import { describe, expect, it } from "vitest";
import { orderedProjects } from "../app/data/projects";
import { filterProjects, toggleProjectCategory } from "../app/data/project-filter";

describe("React project filter", () => {
  it("unions independently selected categories and clears back to All", () => {
    const selected = toggleProjectCategory(
      toggleProjectCategory([], "data-math"),
      "finance-quant",
    );
    expect(selected).toEqual(["data-math", "finance-quant"]);
    expect(filterProjects(orderedProjects, selected).map((project) => project.routeSlug)).toEqual([
      "grap4prob",
      "mean-reversion-bot",
      "project-02",
    ]);
    expect(filterProjects(orderedProjects, toggleProjectCategory(selected, "all"))).toHaveLength(5);
  });

  it("removes a selected category and produces no matches for empty categories", () => {
    const once = toggleProjectCategory([], "data-math");
    const twice = toggleProjectCategory(once, "data-math");
    expect(twice).toEqual([]);
    expect(filterProjects(orderedProjects, ["ai-implementation"])).toEqual([]);
  });
});
