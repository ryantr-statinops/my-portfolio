# L2 — Playwright Smoke Tests

Status: complete. Chromium smoke tests run against `astro preview` with the `/my-portfolio/` base path.

## Route source

The test reads `dist/projects/*/index.html` after build and derives the five project routes. Together with `/` and `/projects/`, this yields exactly seven pages without hardcoding project names.

## Coverage

- HTTP 200 and title/description/canonical/OG metadata for every generated route.
- Sitemap and robots availability.
- Internal homepage links and project thumbnail requests.
- Multi-select `All`, single-category, multi-category and empty filter states on `/` and `/projects/`.
- Read-only terminal whitelist, unknown command handling and clear behavior.
- Theme toggle, skip link, anchors and mobile menu open/close.

Run locally with:

```bash
npm run build
npm run test:smoke
```

The test server and base URL are defined in `playwright.config.ts`; CI installs Chromium with `--with-deps`.
