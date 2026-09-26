import { describe, expect, it } from "vitest";
import {
  createFilterState,
  filterProjects,
  matchesFilter,
  toggleFilterCategory,
} from "../src/lib/project-filter";

const projects = [
  { data: { category: "data-engineering" } },
  { data: { category: "software-engineering" } },
  { data: { category: "other" } },
];

describe("Project filter state", () => {
  it("treats an empty category list as All", () => {
    const state = createFilterState();

    expect(state.categories).toEqual([]);
    expect(filterProjects(projects, state)).toHaveLength(3);
    expect(matchesFilter("ai-engineering", state)).toBe(true);
  });

  it("toggles categories without duplicate values", () => {
    const selected = toggleFilterCategory(createFilterState(), "data-engineering");
    const selectedTwice = toggleFilterCategory(selected, "data-engineering");

    expect(selected.categories).toEqual(["data-engineering"]);
    expect(selectedTwice.categories).toEqual([]);
  });

  it("supports multiple categories", () => {
    let state = createFilterState();
    state = toggleFilterCategory(state, "data-engineering");
    state = toggleFilterCategory(state, "other");

    expect(filterProjects(projects, state)).toHaveLength(2);
    expect(filterProjects(projects, state).map((project) => project.data.category)).toEqual([
      "data-engineering",
      "other",
    ]);
  });

  it("resets to All when the all control is selected", () => {
    const state = toggleFilterCategory(
      toggleFilterCategory(createFilterState(), "software-engineering"),
      "all",
    );

    expect(state.categories).toEqual([]);
  });

  it("ignores unknown categories", () => {
    const state = toggleFilterCategory(createFilterState(), "unknown-domain");

    expect(state.categories).toEqual([]);
  });
});
