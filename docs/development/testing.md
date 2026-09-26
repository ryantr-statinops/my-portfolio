# Testing and visual baselines

[Documentation index](../README.md) · [Section index](README.md)

Choose checks by behavior and review screenshot changes before accepting them.

## Contents

- [Test layers](#test-layers)
- [Browser environment](#browser-environment)
- [Snapshot contract](#snapshot-contract)
- [Review and update](#review-and-update)
- [Coverage boundaries](#coverage-boundaries)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Test layers

| Command | Scope |
|---|---|
| `npm run test:unit` | Vitest: catalog schema, filter, strategy and terminal logic |
| `npm run check` | Generated route types plus strict TypeScript |
| `npm run test:smoke` | Route metadata/status, empty states, strategy interactions, accessibility scenarios, media and static artifacts |
| `npm run test:visual` | Dark/light screenshots for desktop, tablet and mobile |
| `npm test` | Unit → smoke → visual; type-check is separate |
| `npm run test:watch` | Vitest watch mode |

Vitest runs `tests/**/*.test.ts` in Node. Playwright runs Chromium against the static preview. Its webServer command builds and starts preview; outside CI it may reuse an existing server. Ensure a reused server serves the intended artifact. For direct browser-test use on a clean checkout, build first because the specs enumerate `dist/projects` during collection.

## Browser environment

```sh
npx playwright install chromium
npm run build
npm run test:smoke
npm run test:visual
```

On Linux, `npx playwright install --with-deps chromium` also installs OS browser dependencies where permitted. CI uses `mcr.microsoft.com/playwright:v1.63.0-noble`, aligned with Playwright 1.63.0 in the lockfile. Use that environment for final baseline parity when local OS rendering differs.

CI enables one worker, two retries and the GitHub reporter. Local defaults allow parallel workers and no retries. Traces, screenshots and videos are retained for failures. `PLAYWRIGHT_EXECUTABLE_PATH` can select a browser binary but may change rendering; avoid mixing browser versions when updating baselines.

## Snapshot contract

Viewports are desktop 1280×800, tablet 768×1024 and mobile 375×667, in dark and light themes. Stabilization pauses videos, hides video rendering, disables transitions/animations and activates reveal elements. The mask targets `#utc-clock` if present; the current UI does not render that element. Screenshots include page viewports and individual elements.

The pixel-ratio allowance is 0.08 on mobile and 0.05 elsewhere, with a 15-second screenshot assertion timeout. Dimension changes can still fail despite these allowances. Detail screenshots are conditional on at least one generated project route. Baselines are tracked in the spec’s `-snapshots` directory.

## Review and update

1. Reproduce the failure with the matching browser/environment and inspect expected, actual and diff images.
2. Decide whether application behavior changed intentionally or whether timing/rendering needs correction. Do not loosen thresholds merely to obtain a pass.
3. Update only the affected cases, for example:

```sh
npm run test:visual -- --grep "dark tablet|light tablet" --update-snapshots --output=/tmp/portfolio-snapshot-review
```

4. Review the changed tracked PNGs and run the visual suite again without update mode.
5. Commit approved baselines with the relevant behavior change.

A previous failure involved strategy element heights of 1025 versus 1024 px. Both local and CI reproduced it; the two tablet baselines were refreshed and CI then passed. This is a diagnostic example, not permission to accept every 1 px difference.

## Coverage boundaries

Current catalog/smoke/static tests assert an empty catalog and two sitemap URLs. Adding content requires revising these assumptions and reviewing new snapshots. Schema tests validate path format, not asset existence. Smoke checks selected keyboard and reduced-motion cases; it is not a comprehensive accessibility audit.

If `test-results` is unwritable, a temporary `--output=/tmp/portfolio-tests` avoids stale permissions without changing baselines or application configuration.

## Source references

- [vitest.config.ts](../../vitest.config.ts) — `include:` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/vitest.config.ts#L5)).
- [playwright.config.ts](../../playwright.config.ts) — `retries:` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/playwright.config.ts#L9)).
- [playwright.config.ts](../../playwright.config.ts) — `webServer:` ([source line 22](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/playwright.config.ts#L22)).
- [tests/e2e/visual.spec.ts](../../tests/e2e/visual.spec.ts) — `const viewports` ([source line 11](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/visual.spec.ts#L11)).
- [tests/e2e/visual.spec.ts](../../tests/e2e/visual.spec.ts) — `async function stabilize` ([source line 19](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/visual.spec.ts#L19)).
- [tests/e2e/visual.spec.ts](../../tests/e2e/visual.spec.ts) — `maxDiffPixelRatio:` ([source line 41](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/visual.spec.ts#L41)).

## Related documents

- [Local setup](setup.md)
- [Publishing content](../data/content-authoring.md)
- [CI pipeline](../deployment/github-pages.md)
