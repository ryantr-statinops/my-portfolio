# L2 — Static Route and Interaction Smoke Tests

Status: Playwright runs against the prepared `dist/` artifact served by `npm run preview` under `/my-portfolio/`.

## Route source

Smoke coverage derives project routes from `dist/projects/<slug>/index.html`; with an empty catalog it verifies the homepage and registry. Every published route must return HTTP 200 and include a page title, description and canonical URL under the GitHub Pages base path.

## Interaction coverage

The suite verifies the four Strategy tracks and three stages, local selection/reset behavior, no-JavaScript fallback, keyboard operation, Projects empty state and four-category registry filter, terminal output, unknown-route 404, and homepage-only background video/poster.

Static artifact checks verify two sitemap URLs plus any published projects, sitemap index, robots URL and real unknown-path 404 behavior without an SPA fallback.

Run `npm run test:smoke`. If local `test-results/` contains preserved user evidence, direct Playwright output to a temporary directory with `--output=/tmp/<run-name>`; never remove user evidence to make a test run.
