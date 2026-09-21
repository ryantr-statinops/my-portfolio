import { describe, expect, it } from "vitest";
import {
  createFilterState,
  filterProjects,
  matchesFilter,
  toggleFilterCategory,
} from "../src/lib/project-filter";

const projects = [
  { data: { category: "data-math" } },
  { data: { category: "finance-quant" } },
  { data: { category: "system-ui" } },
];

describe("Project filter state", () => {
  it("treats an empty category list as All", () => {
    const state = createFilterState();

    expect(state.categories).toEqual([]);
    expect(filterProjects(projects, state)).toHaveLength(3);
    expect(matchesFilter("ops-automation", state)).toBe(true);
  });

  it("toggles categories without duplicate values", () => {
    const selected = toggleFilterCategory(createFilterState(), "data-math");
    const selectedTwice = toggleFilterCategory(selected, "data-math");

    expect(selected.categories).toEqual(["data-math"]);
    expect(selectedTwice.categories).toEqual([]);
  });

  it("supports multiple categories", () => {
    let state = createFilterState();
    state = toggleFilterCategory(state, "data-math");
    state = toggleFilterCategory(state, "system-ui");

    expect(filterProjects(projects, state)).toHaveLength(2);
    expect(filterProjects(projects, state).map((project) => project.data.category)).toEqual([
      "data-math",
      "system-ui",
    ]);
  });

  it("resets to All when the all control is selected", () => {
    const state = toggleFilterCategory(
      toggleFilterCategory(createFilterState(), "finance-quant"),
      "all",
    );

    expect(state.categories).toEqual([]);
  });

  it("ignores unknown categories", () => {
    const state = toggleFilterCategory(createFilterState(), "unknown-domain");

    expect(state.categories).toEqual([]);
  });
});
