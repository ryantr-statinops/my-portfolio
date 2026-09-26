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
| Browser QA | Playwright 1.63.0, Chromium |
| Unit QA | Vitest 5 |
| Production | GitHub Pages, `/my-portfolio/` |

## Routes and build

`react-router.config.ts` defines the `/my-portfolio/` basename and prerender list: homepage, registry and one detail route per published project. The catalog is currently empty, so `dist/` contains two route `index.html` files plus `404.html`, `robots.txt`, sitemap files, bundled assets and public images. No SPA fallback is used for direct loads.

`npm run preview` serves the exact `dist/` artifact below `/my-portfolio/`; it is the Playwright and manual production-like preview.

## Content and behavior

`app/data/project-schema.ts` is the Zod contract, and category IDs are shared from `src/lib/constants.ts`. `app/data/projects.json` is currently empty; future entries include title, description, date, category, status, priority, tags, impact, thumbnail, links and stack. `app/data/projects.ts` owns validation, ordering and route slugs. Detail Markdown lives in `app/content/projects/<routeSlug>.md`; inline `/images/...` paths are prefixed with Vite `BASE_URL` at render time.

`/projects/` is the canonical registry. Filters are multi-select and an empty category set means All. The homepage uses the four-track Strategy workflow without filtering projects; project content is intentionally unpublished. The portfolio terminal is read-only and only accepts its allowlisted commands. Theme persistence, mobile menu focus/escape handling, section navigation and reduced-motion behavior remain in browser-facing components.

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

The current React stack is React 19, React Router 7, TypeScript and Tailwind CSS 4. The published project catalog is empty while its content is rebuilt; the Strategy interface is a four-category Frame/Test/Build scaffold.
