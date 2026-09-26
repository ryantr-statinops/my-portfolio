# Technical Information

> Current implementation reference for the static portfolio. Last updated 2026-09-26.

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

`astro.config.mjs` sets `site` to `https://ryantr-statinops.github.io` and `base` to `/my-portfolio`. The workflow runs `npm ci`, a safe dependency update check, report-only `npm audit`, unit tests, `astro check`, static build, a page-count assertion (two shell pages plus project routes), smoke tests, visual tests and sitemap/robots verification before uploading the Pages artifact and deploying.

## Content

Projects live in `src/content/projects/*.mdx` and are loaded through the Astro glob collection. The collection is currently empty; the schema allows zero entries and validates future entries, including unique priority, date format, category/status allowlists, tag/stack limits and thumbnail paths. The four category IDs are defined in `src/lib/constants.ts`.

## Portfolio Registry and interaction

`/projects/` is the canonical Project Registry, with a four-category filter and an empty state. Homepage Strategy lives at `#intelligence-hub`; it presents four capability groups and Frame/Test/Build stages. Selection is local to the component, resets to Frame when a group changes, and does not persist or change the URL. Its content model is intentionally empty until reviewed copy and project evidence are ready.

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

Never run `npm audit fix --force`. Project changes follow the repository's atomic commit policy on `main`; run the relevant checks before each commit and push.

The 2026-09-23 Astro 7 migration upgraded Astro to 7.3.4, `@astrojs/mdx` to 8.0.2 and the Node floor to 22.12.0. The math pipeline uses `@astrojs/markdown-remark` explicitly. `npm audit` reported zero vulnerabilities after the migration.

## Analytics status

GoatCounter is an optional final phase. `PUBLIC_GOATCOUNTER_URL` must be configured before its script is injected; without it, builds pass and no analytics request is made. No secret or personal form data belongs in the repository.
