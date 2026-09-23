# Technical Information

> Current implementation reference for the static portfolio. Last updated 2026-09-23.

## Runtime

| Component | Version/configuration |
|---|---|
| Node | `>=22.12.0` |
| Astro | `7.3.4` static output |
| Tailwind | `4.3.0` via `@tailwindcss/vite` |
| MDX | `@astrojs/mdx` `8.0.2`; unified processor for remark/rehype plugins |
| Validation | Astro Content Layer + Zod + Vitest |
| Browser QA | Playwright `1.63.0`, Chromium |
| Production | GitHub Pages, base `/my-portfolio` |

## Build and deployment

`astro.config.mjs` sets `site` to `https://ryantr-statinops.github.io` and `base` to `/my-portfolio`. The workflow runs `npm ci`, a safe dependency update check, report-only `npm audit`, unit tests, `astro check`, static build, exact seven-page assertion, smoke tests, visual tests and sitemap/robots verification before uploading the Pages artifact and deploying.

## Content

Projects live in `src/content/projects/*.mdx` and are loaded through the Astro glob collection. The schema validates the current fields and enforces `priority` uniqueness, date format, category/status allowlists, tag/stack limits and exact thumbnail paths. `src/lib/content.ts` provides the shared ascending-priority ordering used by the homepage and `/projects/`.

## Portfolio Registry and interaction

`/projects/` is the canonical Project Registry. `ProjectFilter` uses client-only browser state and dispatches the `portfolio:filter` event to update cards, registry rows, Project Graph nodes and KPI counts. No localStorage, API or server state is used.

`SystemTerminal` is a read-only showcase. Its whitelist is `help`, `status`, `neofetch`, `ls /projects` and `clear`; unknown input returns `command not found`. It does not invoke a shell, backend, WebSocket or remote execution.

## QA commands

```bash
npm run test:unit
npm run check
npm run build
npm run test:smoke
npm run test:visual
npm run test
```

Playwright uses the GitHub Pages base path during local preview. Visual tests cover dark/light themes and desktop `1280x800`, tablet `768x1024` and mobile `375x667`; animation, dynamic canvas and clock output are excluded from assertions.

## Security and dependency policy

Apply dependency remediation on `dev`; never run `npm audit fix --force`. Changes requiring an architectural decision belong on `refactor`, then return to `dev` and pass the complete QA suite before promotion to `main`.

The 2026-09-23 Astro 7 migration upgraded Astro to 7.3.4, `@astrojs/mdx` to 8.0.2 and the Node floor to 22.12.0. The math pipeline now uses `@astrojs/markdown-remark` explicitly because Astro 7's default Sätteri processor does not run remark/rehype plugins. `npm audit` reports zero vulnerabilities after the migration.

## Analytics status

GoatCounter is an optional final phase. `PUBLIC_GOATCOUNTER_URL` must be configured before its script is injected; without it, builds pass and no analytics request is made. No secret or personal form data belongs in the repository.
