import { CATEGORY_MAP } from "./constants";

export const STRATEGY_STAGES = ["frame", "test", "build"] as const;

export type StrategyStage = (typeof STRATEGY_STAGES)[number];

export interface StrategyStageContent {
  label: string;
  title: string;
  description: string;
  decision: string;
  rationale: string;
  benefit: string;
  tradeoff: string;
  relatedProject: string | null;
}

export interface StrategyTrack {
  id: string;
  title: string;
  description: string;
  stages: Record<StrategyStage, StrategyStageContent>;
}

const emptyStage = (label: string): StrategyStageContent => ({
  label,
  title: "",
  description: "",
  decision: "",
  rationale: "",
  benefit: "",
  tradeoff: "",
  relatedProject: null,
});

export const STRATEGY_TRACKS: StrategyTrack[] = Object.entries(CATEGORY_MAP).map(([id, title]) => ({
  id,
  title,
  description: "",
  stages: {
    frame: emptyStage("Frame"),
    test: emptyStage("Test"),
    build: emptyStage("Build"),
  },
}));
