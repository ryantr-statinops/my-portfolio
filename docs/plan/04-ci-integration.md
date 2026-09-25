# CI — Build, Validation and Deployment

## CI runtime

- Node `22.12.0` and lockfile install with `npm ci`.
- Playwright image pinned to `mcr.microsoft.com/playwright:v1.63.0-noble`.
- React Router type generation and TypeScript via `npm run check`.
- Build through `npm run build`; prepared Pages artifact is the flattened `dist/` directory.

## Validation order

1. Install and report dependency audit status.
2. Run `npm run test:unit` and `npm run check`.
3. Run `npm run build` and assert exactly seven `index.html` files.
4. Run `npm run test:smoke` and `npm run test:visual` against the static preview.
5. Verify `dist/sitemap-index.xml`, `dist/sitemap-0.xml` and `dist/robots.txt` exist.

## Branch gates

Pull requests to `dev` and `main` run validation only. Pages artifact upload and deployment require a push to `main` or manual dispatch from `main`; pull requests never deploy. `dev` is the integration branch, and production promotion is a separate `dev -> main` pull request.

The workflow uploads Playwright artifacts on failure. Test/build outputs and `test-results/` are ignored and must not enter the PR diff. Do not use `npm audit fix --force`; review audit reports before merging.
