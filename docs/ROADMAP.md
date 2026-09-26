# Release Roadmap — Portfolio Hardening

> Source of truth for the current portfolio release. Production target: GitHub Pages.
> Last verified: 2026-09-26.

## Current release model

- `/` is the homepage.
- `/projects/` is the canonical Project Registry.
- The project collection is empty during the content rebuild; future detail pages are generated from `src/content/projects/*.mdx`.
- `/cluster/` was removed. A future Cluster startup project will be added as its own MDX entry and route under `/projects/`; no `cluster.mdx` is part of this release.
- The static build generates two pages while the collection is empty, then two pages plus one per project.
- Legacy project entries, detail routes and dedicated media have been removed.
- The current Strategy and content rebuild is delivered as small commits directly on `main`.
- `refactor` remains reserved for major architectural decisions.

## Completed release work

- Route migration from the old dashboard to `/projects/`.
- Replacement of Intelligence Hub with a four-domain guided Strategy scaffold (Frame, Test, Build).
- Empty project states on the homepage, Project Registry and terminal.
- New portfolio categories: Software Engineering, Data Engineering, AI Engineering and Other.
- Neutral portfolio terminology and removal of unverified dashboard metrics.
- Ascending priority order (`1` is highest) with duplicate-priority build failure.
- Strict project thumbnail paths and content tests.
- Base-path-aware navigation for GitHub Pages.
- Multi-select category filter on the Project Registry; homepage filtering is removed.
- Read-only Portfolio Runtime Terminal with a whitelist of five commands.
- Reduced-motion fallbacks and deterministic visual-test behavior.
- L1 unit tests, L2 Chromium smoke tests and L3 responsive visual baselines.
- CI gates for check, build, dynamic page count, smoke, visual, sitemap and robots.

## Remaining release work

### Phase 1 — Dependency and security maintenance (completed 2026-09-23)

- Upgraded Astro to 7.3.4 and `@astrojs/mdx` to 8.0.2.
- Migrated the math pipeline to the explicit unified Markdown processor.
- Raised the supported Node floor to 22.12.0.
- Confirmed `npm audit` reports zero vulnerabilities.

### Phase 2 — Optional analytics

After all feature and QA gates are stable, configure GoatCounter through `PUBLIC_GOATCOUNTER_URL`.
The build must remain valid and load no analytics script when the variable is absent. Track only page views, project detail views, GitHub/demo clicks and contact clicks; never collect message content or PII.

## Release acceptance criteria

`npm run test`, `npm run check` and `npm run build` pass; generated page count is two plus project detail routes; all generated routes and internal links return 200; Strategy, registry filters and terminal behavior pass; dark/light responsive baselines pass; sitemap and robots exist; GitHub Pages deploys; documentation reflects the empty project collection and Strategy scaffold.

## Commit policy

Changes are delivered as small atomic commits. Every commit must pass its relevant gate, be committed directly to `main`, and be pushed immediately. Do not squash. A failing CI result is fixed by a subsequent commit.
