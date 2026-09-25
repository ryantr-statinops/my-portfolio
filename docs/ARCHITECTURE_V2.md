# Architecture — Portfolio Runtime

> Canonical implementation: React 19, React Router 7 Framework Mode, Vite and TypeScript. GitHub Pages base: `/my-portfolio/`.

## Source of truth

Static HTML is prerendered for the homepage, Project Registry and five project-detail routes. Direct load and reload are served by route-specific HTML; deployment does not use an SPA fallback.

## Stack and boundaries

| Layer | Implementation |
|---|---|
| Framework | React 19, TypeScript, React Router 7 Framework Mode |
| Build | Vite, `ssr: false`, explicit prerender routes |
| Content | `app/data/projects.json`, validated by the single Zod schema in `app/data/project-schema.ts` |
| Detail bodies | `app/content/projects/<routeSlug>.md`, rendered by `react-markdown`, `remark-gfm`, `remark-math` and `rehype-katex` |
| Styling | Tailwind CSS 4 through `@tailwindcss/vite` |
| Tests | Vitest and Playwright against the prepared static artifact |
| Hosting | GitHub Pages at `https://ryantr-statinops.github.io/my-portfolio/` |

`app/root.tsx` owns global CSS, KaTeX CSS, favicon, sitemap metadata, site metadata and the `SiteShell`, `Outlet`, `Scripts` and `ScrollRestoration` boundary. Layout/navigation/theme/footer live in `app/components/layout/`; homepage sections in `app/components/sections/`; browser state in `app/components/interactive/`; project Markdown rendering in `app/components/ProjectMarkdown.tsx`.

## Routes and artifact

| Public route | Generated HTML |
|---|---|
| `/my-portfolio/` | `dist/index.html` |
| `/my-portfolio/projects/` | `dist/projects/index.html` |
| `/my-portfolio/projects/<slug>/` | `dist/projects/<slug>/index.html` (five routes) |

`react-router.config.ts` sets `basename: "/my-portfolio/"`, `ssr: false` and prerenders `/`, `/projects` and `projectRouteSlugs`. `npm run build` runs React Router and then `scripts/prepare-static-artifact.mjs`, which flattens `build/client/my-portfolio/` into the deployable `dist/` root and verifies all seven pages, `404.html`, `robots.txt`, sitemap files and the stylesheet. `scripts/static-preview.mjs` serves `dist/` beneath the GitHub Pages base path and returns an actual 404 for unknown paths.

## Data and content contracts

- `id` preserves each historic project identifier; `routeSlug` preserves its public route and Markdown filename. These are separate fields.
- `app/data/projects.ts` exports validated data, ascending-priority ordering, prerender slugs and slug lookup. Priority `1` is highest; duplicate IDs, route slugs or priorities fail validation.
- `app/data/project-content.ts` loads the corresponding Markdown body at build time; no content network request runs in the browser.
- Markdown images under `/images/` are resolved against Vite's `BASE_URL`; asset checks ensure every thumbnail and inline image exists under `public/images`.
- Internal navigation uses React Router links beneath the configured basename; metadata canonical URLs and sitemap entries include `/my-portfolio/`.

## Interaction and motion

The shared shell provides responsive navigation, mobile overlay focus/escape handling, active-section navigation, theme persistence and the homepage video/poster. Category selection is multi-select; an empty selection means All. The read-only terminal accepts only its documented whitelist and returns `command not found` for unknown input. Reduced-motion preference disables motion/autoplay. Project graph and heatmap surfaces retain their fallback behavior.

## Verification

- `npm run check`: React Router type generation and TypeScript.
- `npm run test:unit`: data schema/order/lookup, filter and terminal contracts.
- `npm run build`: route prerender plus Pages artifact assembly.
- `npm run test:smoke`: direct static route and interaction checks.
- `npm run test:visual`: light/dark desktop, tablet and mobile snapshots.
- `npm run preview`: serve the actual flattened artifact with direct-route and 404 behavior.

## Branch and deployment boundary

`dev` is the integration branch; major architecture decisions are developed on `refactor` and prepared for `dev` through a pull request. `main` receives a separate promotion pull request from `dev`. Pull requests to `dev` and `main` run validation only. Pages artifact upload and deployment are restricted to pushes to `main` or manual dispatch from `main`.
