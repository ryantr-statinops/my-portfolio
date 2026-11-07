# Configuration and commands

[Documentation index](../README.md) · [Section index](README.md)

Locate runtime/build settings without confusing application inputs with test fixtures.

## Contents

- [Configuration files](#configuration-files)
- [Npm scripts](#npm-scripts)
- [Environment and state](#environment-and-state)
- [Changing the public base URL](#changing-the-public-base-url)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Configuration files

package.json defines scripts/ranges; package-lock.json pins installed packages. vite.config.ts sets base and Tailwind/React Router plugins. react-router.config.ts sets basename, ssr:false and home prerender. tsconfig.json enables strict ES2022/bundler/React JSX typing. vitest.config.ts selects Node unit tests. playwright.config.ts controls Chromium and both test servers. tests/fixtures/vite.config.ts serves only the fixture entry. The GitHub workflow validates and deploys. .gitignore excludes generated output; .mailmap normalizes Git author identity.

For agent tooling, [`.agents/mcp/servers.json`](../../.agents/mcp/servers.json) is the
shared MCP source. `mcp:sync` generates the supported clients' project
configurations and updates `.agents/mcp/generated.json`, which tracks managed
server names. Read [Shared MCP setup](../development/mcp.md) before changing
definitions or providing credentials; edit the source rather than generated
server entries.

## Npm scripts

| Script | Command |
|---|---|
| dev | `react-router dev` |
| build | `react-router build && node scripts/prepare-static-artifact.mjs` |
| check | `react-router typegen && tsc --noEmit` |
| mcp:sync | `node .agents/mcp/sync.mjs` |
| mcp:check | `node .agents/mcp/sync.mjs --check` |
| mcp:test | `node --test .agents/mcp/sync.test.mjs` |
| test | `npm run test:unit && npm run test:smoke && npm run test:visual` |
| test:unit | `vitest run` |
| test:smoke | `playwright test tests/e2e/smoke.spec.ts tests/e2e/static-artifact.spec.ts tests/e2e/project-hub.spec.ts` |
| test:visual | `playwright test tests/e2e/visual.spec.ts` |
| test:watch | `vitest` |
| preview | `node scripts/static-preview.mjs` |

MCP synchronization checks and offline tests are separate from `npm test` and
are not currently run by the GitHub Actions workflow. They do not verify live
service connectivity. See [MCP verification](../development/mcp.md#updating-and-verifying).

## Environment and state

| Input | Effect |
|---|---|
| PORT | Preview server port, default 4173 |
| PLAYWRIGHT_TEST_BASE_URL | Production test URL/readiness endpoint; default http://127.0.0.1:4173/my-portfolio/ |
| PLAYWRIGHT_EXECUTABLE_PATH | Optional browser binary override; can affect snapshots |
| CI | Nonempty value enables one worker, retries, forbidOnly and GitHub reporter; disables production-server reuse |
| import.meta.env.BASE_URL | Vite-provided asset base |
| localStorage theme | Persisted dark/light selection |
| STITCH_API_KEY | Development-tool credential for Stitch MCP; local Codex reads process environment first, then the root `.env`; other clients need their own runtime credential setup |

Fixture server uses fixed port 4174 and is never reused. Preview reads process.env directly, without dotenv loading. Hub selection is not persisted. No GitHub API token or runtime fetch is used.

`STITCH_API_KEY` is not an application input and is not required for development,
build or deployment of the portfolio. The sync script writes variable references,
not credential values. Keep local `.env` files untracked; see
[MCP credentials](../../.agents/mcp/README.md#credentials) for client differences.

## Changing the public base URL

Update router basename, Vite base, SITE.site/base, artifact origin/base/siteDirectory/copy exclusion, preview basePath, public/robots.txt, Playwright production base URL and static/smoke URL expectations. Review README/docs links and the custom 404 target. Rebuild and verify assets, home hashes and sitemap use the new base exactly once. The test fixture URL is independent of the production base.

## Source references

- [package.json](../../package.json) — `"scripts"` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/package.json#L10)).
- [vite.config.ts](../../vite.config.ts) — `base:` ([line 6](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/vite.config.ts#L6)).
- [react-router.config.ts](../../react-router.config.ts) — `basename:` ([line 4](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/react-router.config.ts#L4)).
- [tsconfig.json](../../tsconfig.json) — `"compilerOptions"` ([line 2](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/tsconfig.json#L2)).
- [vitest.config.ts](../../vitest.config.ts) — `include:` ([line 5](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/vitest.config.ts#L5)).
- [playwright.config.ts](../../playwright.config.ts) — `const baseURL` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/playwright.config.ts#L3)).
- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `const port` ([line 57](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/scripts/static-preview.mjs#L57)).
- [src/lib/constants.ts](../../src/lib/constants.ts) — `export const SITE` ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/lib/constants.ts#L1)).
- [tests/fixtures/vite.config.ts](../../tests/fixtures/vite.config.ts) — `server:` ([line 8](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/tests/fixtures/vite.config.ts#L8)).

## Related documents

- [Local setup](../development/setup.md)
- [Shared MCP setup](../development/mcp.md)
- [Deployment](../deployment/github-pages.md)
