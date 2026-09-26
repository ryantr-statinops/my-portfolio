# Testing and visual baselines

[Documentation index](../README.md) · [Section index](README.md)

Validate the twelve-project production catalog and isolated populated/empty Hub fixtures.

## Contents

- [Commands and coverage](#commands-and-coverage)
- [Test environments](#test-environments)
- [Visual contract](#visual-contract)
- [Baseline review](#baseline-review)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Commands and coverage

| Command | Coverage |
|---|---|
| npm run test:unit | Schema, six lifecycle statuses, published catalog, category/selection helpers and static fallback rendering |
| npm run check | Route type generation and TypeScript |
| npm run test:smoke | Production homepage, hashes/mobile/keyboard, legacy 404s, sitemap and populated fixture interactions |
| npm run test:visual | Dark/light homepage and populated Hub snapshots at three sizes |
| npm test | Unit, smoke and visual in sequence; excludes type-check |

Unit fallback tests render the real component with ReactDOMServer and ensure all overviews, lifecycle labels and repository links exist before hydration. Populated browser tests verify order, retained selection, category fallback, clearing stale panels, repo target, keyboard operation and 320 px overflow. A desktop geometry assertion checks that the panel actually sits beside the list.

About Me tests verify prerendered profile/education/contacts, the six focus headings in order, external-link hints, keyboard traversal, section navigation and responsive column counts at 1280, 768 and 320 px. A no-JavaScript browser case checks visible profile content. Full-section About Me screenshots include every focus card and temporarily hide the viewport-fixed Primary navigation to avoid overlay artifacts in the tall capture. Browser navigation tests verify the real navbar and heading clearance separately.

## Test environments

Install browsers with npx playwright install chromium (or --with-deps chromium where Linux dependency installation is permitted). Playwright builds/serves the production artifact on port 4173 and starts a separate Vite fixture server on 4174. Fixtures live under tests/fixtures and are not imported by application routes or copied into dist. The fixture stylesheet imports real global styles and explicitly scans app classes.

CI uses the pinned Playwright 1.63.0 Noble container, one worker and two retries. Local defaults use parallel workers and no retries. Match the browser/container before accepting environment-sensitive screenshot changes.

## Visual contract

Themes: dark and light. Viewports: desktop 1280×800, tablet 768×1024 and mobile 375×667. Each case captures Hero, the full About Me section, populated Project Hub, Footer and the populated fixture Hub after selecting Software Later. Videos are paused/hidden, transitions disabled and reveal elements activated.

Pixel-ratio allowances remain 0.08 mobile and 0.05 elsewhere, with a 15-second assertion timeout. Dimension changes still matter. Failure traces/screenshots/videos are retained.

## Baseline review

Inspect expected, actual and diff images before updating. Use npm run test:visual -- --grep "dark tablet" --update-snapshots for a targeted intentional change, inspect changed PNGs, then rerun without update mode. Do not hide failures by raising thresholds. The fixture must have real styles before its baseline is accepted.

Production smoke tests read the validated catalog and check all project selections, statuses and repository links. Static-artifact tests require all twelve overviews in prerendered HTML. Unit tests lock the curated IDs, status assignments, priorities and category counts; update these expectations deliberately when changing the selection. The fixture URL ?empty preserves empty-catalog coverage; the AI category in the populated fixture preserves empty-category coverage.

## Source references

- [tests/project-hub-render.test.ts](../../tests/project-hub-render.test.ts) — `describe(` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/tests/project-hub-render.test.ts#L10)).
- [tests/e2e/project-hub.spec.ts](../../tests/e2e/project-hub.spec.ts) — `test(` ([line 5](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/tests/e2e/project-hub.spec.ts#L5)).
- [tests/e2e/visual.spec.ts](../../tests/e2e/visual.spec.ts) — `const viewports` ([line 2](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/tests/e2e/visual.spec.ts#L2)).
- [playwright.config.ts](../../playwright.config.ts) — `webServer:` ([line 22](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/playwright.config.ts#L22)).

## Related documents

- [Authoring](../data/content-authoring.md)
