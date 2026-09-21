# Release Roadmap — Portfolio Hardening

> Source of truth for the current portfolio release. Production target: GitHub Pages.
> Last verified: 2026-09-21.

## Current release model

- `/` is the homepage.
- `/projects/` is the canonical Project Registry.
- Five project detail pages are generated from `src/content/projects/*.mdx`.
- `/cluster/` was removed. A future Cluster startup project will be added as its own MDX entry and route under `/projects/`; no `cluster.mdx` is part of this release.
- The static build must generate exactly seven pages.
- Existing project IDs, slugs and public URLs remain unchanged.

## Completed release work

- Route migration from the old dashboard to `/projects/`.
- Neutral portfolio terminology and removal of unverified dashboard metrics.
- Ascending priority order (`1` is highest) with duplicate-priority build failure.
- Strict project thumbnail paths and content tests.
- Base-path-aware navigation for GitHub Pages.
- Shared multi-select category filter on the homepage and Project Registry.
- Read-only Portfolio Runtime Terminal with a whitelist of five commands.
- Reduced-motion fallbacks and deterministic visual-test behavior.
- L1 unit tests, L2 Chromium smoke tests and L3 responsive visual baselines.
- CI gates for check, build, seven-page output, smoke, visual, sitemap and robots.

## Remaining release work

### Phase 1 — Dependency and security maintenance

- Apply only safe dependency patch updates.
- Keep `npm audit` report-only when remediation requires an Astro major upgrade.
- Record remaining vulnerabilities in technical documentation.
- Evaluate Astro 7 later on a separate branch with the complete test suite.

### Phase 2 — Optional analytics

After all feature and QA gates are stable, configure GoatCounter through `PUBLIC_GOATCOUNTER_URL`.
The build must remain valid and load no analytics script when the variable is absent. Track only page views, project detail views, GitHub/demo clicks and contact clicks; never collect message content or PII.

## Release acceptance criteria

`npm run test`, `npm run check` and `npm run build` pass; seven pages are generated; all routes and internal links return 200; filters and terminal behavior pass; dark/light responsive baselines pass; sitemap and robots exist; GitHub Pages deploys; documentation contains no obsolete deployment or removed-feature assumptions.

## Commit policy

Changes are delivered as small atomic commits. Every commit must pass its relevant gate, be committed directly to `main`, and be pushed immediately. Do not squash. A failing CI result is fixed by a subsequent commit.
