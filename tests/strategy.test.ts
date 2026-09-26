import { describe, expect, it } from "vitest";
import { CATEGORY_MAP } from "../src/lib/constants";
import { STRATEGY_STAGES, STRATEGY_TRACKS } from "../src/lib/strategy";

describe("Strategy scaffold", () => {
  it("provides one empty track for each portfolio capability category", () => {
    expect(STRATEGY_TRACKS.map(({ id, title }) => [id, title])).toEqual(Object.entries(CATEGORY_MAP));
  });

  it("provides Frame, Test and Build for every track without invented content", () => {
    for (const track of STRATEGY_TRACKS) {
      expect(Object.keys(track.stages)).toEqual(STRATEGY_STAGES);
      expect(track.description).toBe("");
      for (const stage of Object.values(track.stages)) {
        expect(stage.title).toBe("");
        expect(stage.description).toBe("");
        expect(stage.decision).toBe("");
        expect(stage.rationale).toBe("");
        expect(stage.benefit).toBe("");
        expect(stage.tradeoff).toBe("");
        expect(stage.relatedProject).toBeNull();
      }
    }
  });
});
