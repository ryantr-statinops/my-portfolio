# QA Plan — Current Status

Project: Ryan Tran portfolio · Production: GitHub Pages · Stack: React 19, React Router 7 Framework Mode, Vite, Tailwind CSS 4.

## Source of truth

The release has seven static pages: `/`, `/projects/` and five project detail routes. Public base path is `/my-portfolio/`; direct route loads use prerendered HTML, not an SPA fallback. `/cluster/` is not a valid route.

## Layer status

| Layer | Purpose | Implementation | Status |
|---|---|---|---|
| L1 | Data/schema/filter/terminal contracts | Vitest | 9 tests passed locally |
| L2 | Routes and interactions | Playwright on flattened `dist/` artifact | 14 tests passed locally, including WebGL availability and reduced-motion fallback |
| L3 | Visual regression | Chromium, light/dark responsive snapshots | Complete — 6 tests passed across desktop/tablet/mobile |
| A11y | Name/role/value, keyboard, contrast and motion audit | axe on static preview | Complete — 0 confirmed violations on 3 routes; contrast cases marked incomplete on image/transparent backgrounds and manually reviewed |

## Commands

```bash
npm ci
npm run check
npm run build
npm run test:unit
npm run test:smoke
npm run test:visual
npm run preview
```

## CI and branch policy

The GitHub Actions workflow runs install, dependency audit reporting, unit tests, React Router type generation/TypeScript, build, exact seven-page assertion, smoke/visual and sitemap/robots checks. Pull requests to `dev` and `main` validate only. Artifact upload and deployment run only for a push to `main` or a manual dispatch from `main`.

## Maintenance rules

- Preserve IDs, slugs, content meaning and public URLs when changing catalog data.
- Keep reduced-motion and deterministic behavior in visual tests.
- Update visual baselines only for documented intentional UI changes; never relax thresholds to hide drift.
- Keep the Node floor at `22.12.0` or newer and the CI Playwright image aligned with the lockfile.
- Keep optional analytics disabled until its public endpoint and privacy requirements are approved.

See `01-content-schema.md`, `02-smoke-test.md`, `03-visual-regression.md` and `04-ci-integration.md` for layer details.
