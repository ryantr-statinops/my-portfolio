# Release Roadmap — React Cutover

> Current runtime source of truth. Production target: GitHub Pages under `/my-portfolio/`.

## Current release model

- React 19 + React Router 7 Framework Mode + Vite; the seven production pages are prerendered as static route HTML.
- Seven static pages: `/`, `/projects/` and five `/projects/<slug>/` detail pages.
- Existing project IDs, slugs, route URLs, Markdown bodies, thumbnails and public asset paths are immutable.
- `dev` is the integration branch; major architecture decisions remain on `refactor`.
- React migration and QA (PR #7), cyan hero gradient and lazy Three.js graph (PR #8), and graph interaction tests (PR #9) are merged into `dev`. Additional parity work is developed on `refactor` for integration into `dev`.
- Pull requests to `dev` and `main` validate only. `main` promotion remains a separate `dev -> main` pull request; Pages deploys only from `main` pushes or manual dispatch from `main`.

## Migration status

- React routes, shell, content catalog, project Markdown renderer and static artifact preparation are in place.
- Historic project IDs are preserved separately from route slugs.
- Content and asset references have been compared against the `dev` source; inline images use Markdown syntax and retain their original assets.
- Static artifact output is flattened to `dist/`; the build verifies the seven route pages, 404, robots and sitemap files.
- The React cutover is integrated into `dev`; subsequent parity changes are validated on `refactor` before their PR to `dev`.

## Completed behavior contracts

- Ascending priority order (`1` is highest); duplicate IDs, slugs and priorities fail schema validation.
- Base-path-aware navigation and canonical metadata.
- Shared multi-select category filter; empty selection means All.
- Read-only terminal whitelist, theme persistence, mobile overlay focus/escape handling, active-section navigation, reduced motion and an SVG graph fallback when WebGL is unavailable.
- Three.js graph force layout, idle rotation, hover glow and pointer-following tooltip; project detail pages display focus-area tags.
- Vitest data/filter/terminal contracts and Playwright route, interaction and visual coverage.

## Release acceptance criteria

`npm ci`, `npm run check`, `npm run build`, unit, smoke and visual gates pass; exactly seven route HTML files exist; sitemap and robots URLs use `/my-portfolio/`; direct route reloads work; critical/serious axe violations and keyboard traps are absent; production-like navigation, theme, filter, terminal and mobile-menu behavior are manually verified.

## Future work

Optional analytics remain deferred until a public endpoint and privacy requirements are explicitly approved. No analytics request is included in this cutover.
