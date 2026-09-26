# Configuration and commands

[Documentation index](../README.md) · [Section index](README.md)

Locate tool settings and distinguish deployment paths from environment overrides.

## Contents

- [Configuration files](#configuration-files)
- [Npm scripts](#npm-scripts)
- [Environment and browser state](#environment-and-browser-state)
- [Changing the public base URL](#changing-the-public-base-url)
- [Exact source locations](#exact-source-locations)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Configuration files

| File | Responsibility |
|---|---|
| `package.json` | Node requirement, dependency ranges and npm scripts |
| `package-lock.json` | Reproducible installed package versions |
| `vite.config.ts` | Base URL plus Tailwind/React Router plugins |
| `react-router.config.ts` | Basename, static mode and prerender route list |
| `tsconfig.json` | ES2022, strict typing, bundler resolution, React JSX and generated route types |
| `vitest.config.ts` | Node unit-test environment and test glob |
| `playwright.config.ts` | Browser, preview startup, retries, output policies and base URL |
| `.github/workflows/deploy.yml` | CI environment, validation and Pages deployment |
| `.gitignore` | Generated dependencies/build/test output and local files |
| `.mailmap` | Git author identity normalization |

These files remain at root or their tool’s conventional location. Moving one requires updating its consumers, not just the documentation.

## Npm scripts

| Command | Exact script |
|---|---|
| `npm run dev` | `react-router dev` |
| `npm run build` | `react-router build && node scripts/prepare-static-artifact.mjs` |
| `npm run check` | `react-router typegen && tsc --noEmit` |
| `npm run test` | `npm run test:unit && npm run test:smoke && npm run test:visual` |
| `npm run test:unit` | `vitest run` |
| `npm run test:smoke` | `playwright test tests/e2e/smoke.spec.ts tests/e2e/static-artifact.spec.ts` |
| `npm run test:visual` | `playwright test tests/e2e/visual.spec.ts` |
| `npm run test:watch` | `vitest` |
| `npm run preview` | `node scripts/static-preview.mjs` |

`npm test` is an alias for the test script; it does not include `check`. Browser tests build/start static preview through Playwright configuration. `npm run preview` alone does not build.

## Environment and browser state

| Input | Consumer | Default and effect |
|---|---|---|
| `PORT` | Static preview script | 4173; HTTP port |
| `PLAYWRIGHT_TEST_BASE_URL` | Playwright config | `http://127.0.0.1:4173/my-portfolio/`; request/navigation and readiness URL |
| `PLAYWRIGHT_EXECUTABLE_PATH` | Playwright config | Unset; otherwise launches specified browser binary |
| `CI` | Playwright config | Any nonempty value enables forbidOnly, 2 retries, 1 worker, GitHub reporter and disables server reuse |
| `import.meta.env.BASE_URL` | Root and asset consumers | Supplied by Vite from `base`; not a standalone custom environment variable |
| localStorage `theme` | Root initialization and ThemeToggle | Stored theme or initial system preference |

The preview script reads `process.env.PORT` directly and does not load dotenv files. Changing the Playwright base URL does not rewrite app routing or preview base-path constants. If changing its port, set `PORT` and the test base URL together. No custom application secret is required by the current static site.

## Changing the public base URL

The current base is repeated in several places. Review all of these together:

1. Router basename and Vite base.
2. `SITE.site` and `SITE.base` in shared constants for canonical/social URLs.
3. Artifact script’s siteOrigin, basePath, siteDirectory and base-directory exclusion in its copy loop.
4. Static preview basePath.
5. `public/robots.txt` sitemap URL.
6. Playwright’s default URL and hard-coded URL expectations in smoke/static-artifact tests.
7. README/docs public links and any authored Markdown links.

Then rebuild and verify direct routes, thumbnails, article images, sitemap URLs and 404 links. The current setup has no single configuration value that changes every consumer.

## Exact source locations

- [package.json](../../package.json) — `"scripts"` ([source line 10](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package.json#L10)).
- [package-lock.json](../../package-lock.json) — `"lockfileVersion"` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package-lock.json#L4)).
- [vite.config.ts](../../vite.config.ts) — `base:` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/vite.config.ts#L6)).
- [react-router.config.ts](../../react-router.config.ts) — `basename:` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/react-router.config.ts#L5)).
- [tsconfig.json](../../tsconfig.json) — `"compilerOptions"` ([source line 2](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tsconfig.json#L2)).
- [vitest.config.ts](../../vitest.config.ts) — `include:` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/vitest.config.ts#L5)).
- [playwright.config.ts](../../playwright.config.ts) — `const baseURL` ([source line 3](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/playwright.config.ts#L3)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `on:` ([source line 3](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.github/workflows/deploy.yml#L3)).
- [.gitignore](../../.gitignore) — `dist/` ([source line 3](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.gitignore#L3)).
- [.mailmap](../../.mailmap) — `` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.mailmap#L1)).

## Source references

- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `process.env.PORT` ([source line 57](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/static-preview.mjs#L57)).
- [playwright.config.ts](../../playwright.config.ts) — `process.env.CI` ([source line 7](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/playwright.config.ts#L7)).
- [src/lib/constants.ts](../../src/lib/constants.ts) — `export const SITE` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/constants.ts#L1)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const siteOrigin` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/prepare-static-artifact.mjs#L4)).
- [public/robots.txt](../../public/robots.txt) — `Sitemap:` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/public/robots.txt#L4)).

## Related documents

- [Code map](code-map.md)
- [Local setup](../development/setup.md)
- [Deployment](../deployment/github-pages.md)
