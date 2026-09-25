# Technical Information

> Current React production implementation. Node floor: `>=22.12.0`.

## Runtime

| Component | Version/configuration |
|---|---|
| UI | React 19, React DOM 19, TypeScript |
| Routing/build | React Router 7 Framework Mode, Vite 6, `ssr: false` |
| CSS | Tailwind CSS 4 through `@tailwindcss/vite` |
| Project metadata | JSON catalog, Zod schema and unique ID/slug/priority checks |
| Detail content | Markdown, `react-markdown`, GFM, math and KaTeX |
| 3D visualization | Three.js WebGL graph, loaded on viewport proximity; accessible SVG fallback for reduced motion or unavailable WebGL |
| Browser QA | Playwright 1.63.0, Chromium |
| Unit QA | Vitest 5 |
| Production | GitHub Pages, `/my-portfolio/` |

## Routes and build

`react-router.config.ts` defines the `/my-portfolio/` basename and explicit prerender list: homepage, registry and five project routes. `npm run build` runs the React Router build and `scripts/prepare-static-artifact.mjs`; the prepared root is `dist/`, the Pages upload path. It contains seven route `index.html` files, `404.html`, `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml`, bundled assets and public images. No SPA fallback is used for direct loads.

`npm run preview` serves the exact `dist/` artifact below `/my-portfolio/`; it is the Playwright and manual production-like preview.

## Content and behavior

`app/data/project-schema.ts` is the sole Zod contract. `app/data/projects.json` preserves historic `id` values separately from public `routeSlug` values and includes title, description, date, category, status, priority, tags, impact, thumbnail, links and stack. `app/data/projects.ts` owns validation, ordering, route slugs and lookup. Detail Markdown lives in `app/content/projects/<routeSlug>.md`; inline `/images/...` paths are prefixed with Vite `BASE_URL` at render time.

`/projects/` is the canonical registry. Filters are multi-select and an empty category set means All. The portfolio terminal is read-only and only accepts its allowlisted commands. Theme persistence, mobile menu focus/escape handling, section navigation, reduced-motion behavior and the SVG graph fallback remain in browser-facing components. Detail pages display each project's `tags` as Focus Areas.

## QA commands

```bash
npm ci
npm run check
npm run test:unit
npm run build
npm run test:smoke
npm run test:visual
npm run preview
```

Visual snapshots cover light/dark themes at desktop `1280x800`, tablet `768x1024` and mobile `375x667`. The workflow pins `mcr.microsoft.com/playwright:v1.63.0-noble` and Node `22.12.0`.

## Branch and deployment policy

Architecture work is on `refactor`; integration targets `dev` through a pull request; promotion targets `main` through a separate `dev -> main` pull request. Pull requests to `dev` and `main` run validation without Pages upload/deploy. Upload and deployment conditions require `refs/heads/main` and a non-PR event.

Dependency audit is report-only in CI; review any reported advisory before merge. Do not use `npm audit fix --force`.

## Cutover status

The React migration (PR #7), hero cyan gradient and lazy Three.js graph (PR #8), and graph interaction tests (PR #9) are merged into `dev`. Parity additions are developed on `refactor` and merged into `dev` through a separate PR. The WebGL graph uses a settling force layout, idle rotation, complexity-based node size, hover glow and pointer-following tooltips; its SVG fallback covers reduced motion and unavailable WebGL. CI and local tests cover both graph paths when supported. Vite's 500 KB chunk warning and Rollup annotation warnings remain non-fatal.
