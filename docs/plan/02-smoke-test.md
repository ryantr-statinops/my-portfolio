# L2 — Static Route and Interaction Smoke Tests

Status: Playwright runs against the prepared `dist/` artifact served by `npm run preview` under `/my-portfolio/`.

## Route source

Smoke coverage derives project routes from `dist/projects/<slug>/index.html`; it verifies the homepage, registry and all five detail pages by direct navigation. Every route must return HTTP 200 and include a page title, description and canonical URL under the GitHub Pages base path.

## Interaction coverage

The suite verifies homepage-to-detail navigation, reload on project details, local image requests, multi-select filter transitions and empty-state behavior, terminal whitelist/output/history, theme persistence, skip navigation, section navigation, reduced motion, mobile overlay Escape/focus restoration, Markdown math/tables/images, and homepage-only background video/poster.

Static artifact checks verify seven sitemap URLs, sitemap index, robots URL, real unknown-path 404 behavior and no SPA fallback.

Run `npm run test:smoke`. If local `test-results/` contains preserved user evidence, direct Playwright output to a temporary directory with `--output=/tmp/<run-name>`; never remove user evidence to make a test run.
