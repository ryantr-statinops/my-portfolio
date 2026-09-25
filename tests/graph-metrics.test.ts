import { describe, expect, it } from "vitest";
import { projectComplexity, projectNodeRadius } from "../app/data/graph-metrics";

describe("project graph metrics", () => {
  it("keeps the main graph's priority-to-complexity mapping and scales node size", () => {
    expect(projectComplexity(1)).toBe(6);
    expect(projectComplexity(5)).toBe(14);
    expect(projectNodeRadius(5)).toBeGreaterThan(projectNodeRadius(1));
    expect(projectNodeRadius(10)).toBeLessThanOrEqual(0.19);
  });
});
