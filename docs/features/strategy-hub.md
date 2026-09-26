# Strategy Hub

[Documentation index](../README.md) · [Section index](README.md)

Understand capability selection and the Frame → Test → Build presentation.

## Contents

- [Data model](#data-model)
- [Selection and rendering](#selection-and-rendering)
- [Decision details and project links](#decision-details-and-project-links)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Data model

`STRATEGY_STAGES` contains `frame`, `test`, `build`. `STRATEGY_TRACKS` derives four tracks from `CATEGORY_MAP`: software engineering, data engineering, AI engineering and other. Every track has a description and a stage record.

Each stage supports label, title, description, decision, rationale, benefit, tradeoff and an optional related project slug. Current content strings are blank except stage labels; related project is null. This is an intentional content scaffold.

## Selection and rendering

Initial selection is the first track and Frame. Choosing a capability resets the stage to Frame, including clicking the currently selected capability. Choosing a stage changes only local component state; it does not update the URL or project filter.

Controls are hidden until the readiness effect runs. Without JavaScript the initial panel remains readable. Buttons expose `aria-pressed`, and the panel uses a polite atomic live region. Missing title/description fields are conditionally omitted or rendered with preparation copy. The status line currently always says content is being prepared, even if stage content is later filled.

## Decision details and project links

Decision/rationale/benefit/tradeoff fields enable a decision section. Benefits and tradeoffs appear inside native disclosure details. A truthy `relatedProject` generates `/projects/<slug>/`; there is no automatic catalog lookup to validate that slug. Confirm the target exists before authoring a link.

When filling strategy content, also review the unconditional status copy and the tests that currently expect empty scaffold values. Do not claim complete content authoring support without adjusting these expectations.

## Source references

- [src/lib/strategy.ts](../../src/lib/strategy.ts) — `export interface StrategyStageContent` ([source line 7](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L7)).
- [src/lib/strategy.ts](../../src/lib/strategy.ts) — `export const STRATEGY_TRACKS` ([source line 36](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L36)).
- [app/components/sections/StrategyHub.tsx](../../app/components/sections/StrategyHub.tsx) — `export default function StrategyHub` ([source line 11](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/StrategyHub.tsx#L11)).
- [tests/strategy.test.ts](../../tests/strategy.test.ts) — `describe(` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/strategy.test.ts#L5)).

## Related documents

- [Homepage](homepage-and-navigation.md)
