# QA Plan — Current Status

Project: Ryan Tran portfolio · Production: GitHub Pages · Stack: Astro 7.3.4, Tailwind 4.3, MDX.

## Source of truth

The current scaffold has two static pages: `/` and `/projects/`. The project collection is empty; future content adds one detail route per MDX entry. `/cluster/` is not a valid route.

## Layer status

| Layer | Purpose | Implementation | Status |
|---|---|---|---|
| L1 | Content/schema/unit | Vitest, content/filter/terminal/strategy tests | Complete |
| L2 | HTTP/routes/interactions | Playwright, `tests/e2e/smoke.spec.ts` | Complete — dynamic route set |
| L3 | Visual regression | Chromium, 2 themes × 3 viewports | Complete |

## Commands

```bash
npm run test:unit
npm run check
npm run build
npm run test:smoke
npm run test:visual
npm run test
```

## CI order

GitHub Actions installs dependencies, reports audit status, runs L1, type check, build, asserts two shell pages plus project detail pages, installs Chromium, runs L2/L3, verifies sitemap/robots, uploads failure artifacts and deploys the Pages artifact. Any failure blocks deployment.

## Maintenance rules

- Derive project routes from build output; never hardcode project slug lists in E2E tests.
- Use reduced-motion and deterministic data for visual tests.
- Update visual baselines only with an intentional UI change.
- Keep dependency patch updates separate from any Astro major upgrade.
- Keep GoatCounter disabled until its public endpoint is configured.

See `01-content-schema.md`, `02-smoke-test.md`, `03-visual-regression.md` and `04-ci-integration.md` for layer details.
