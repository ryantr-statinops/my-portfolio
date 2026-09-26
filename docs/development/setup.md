# Local development setup

[Documentation index](../README.md) · [Section index](README.md)

Install dependencies, run the application and preview the exact static artifact.

## Contents

- [Prerequisites](#prerequisites)
- [Development workflow](#development-workflow)
- [Generated files](#generated-files)
- [Common setup failures](#common-setup-failures)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Prerequisites

Use Node.js `>=22.12.0` and npm. CI currently uses Node 22.12.0. Install from the checked-in lockfile with `npm ci`; use this rather than an unconstrained dependency update when reproducing a build.

Run commands from the repository root. Package scripts and static scripts resolve paths relative to that directory.

## Development workflow

```sh
npm ci
npm run dev
```

Open the URL printed by the dev server under `/my-portfolio/`. `npm run check` generates route types then runs TypeScript without emitting application JavaScript. Editing JSON is subject to schema parsing; an invalid entry can prevent the app from loading.

To verify the production artifact:

```sh
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/my-portfolio/`. Preview requires `dist/`; its server does not build. `PORT=4174 npm run preview` changes the preview port.

## Generated files

| Directory | Producer | Git policy |
|---|---|---|
| `node_modules/` | npm | Ignored |
| `.react-router/` | Route type generation | Ignored |
| `build/` | React Router | Ignored |
| `dist/` | Static artifact script | Ignored |
| `test-results/`, `playwright-report/` | Playwright output | Ignored |

Recreate these through their owning commands. `docs/` contains maintained source documentation; screenshot baselines under tests are tracked test inputs.

## Common setup failures

A preview 404 at `/` is expected: open the configured base path. If preview has no artifact, build first. If a local port is occupied, stop its process or select a free preview port and align Playwright’s base URL.

If test output belongs to root from a prior container run, repair ownership only for the affected generated directory, or pass a writable `--output` directory to Playwright. Do not run npm as root merely to suppress the permission error. Browser binaries are separate from npm dependencies; install the Chromium runtime for local Playwright testing.

## Source references

- [package.json](../../package.json) — `"engines"` ([source line 7](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package.json#L7)).
- [package.json](../../package.json) — `"scripts"` ([source line 10](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package.json#L10)).
- [.gitignore](../../.gitignore) — `dist/` ([source line 3](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.gitignore#L3)).
- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `const port` ([source line 57](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/static-preview.mjs#L57)).

## Related documents

- [Build architecture](../architecture/rendering.md)
- [Testing](testing.md)
- [Configuration](../reference/configuration.md)
