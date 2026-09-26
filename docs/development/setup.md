# Local development setup

[Documentation index](../README.md) · [Section index](README.md)

Use the repository lockfile and run commands from the repository root.

## Contents

- [Install and develop](#install-and-develop)
- [Check and preview](#check-and-preview)
- [Generated files and troubleshooting](#generated-files-and-troubleshooting)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Install and develop

Requires Node >=22.12.0 and npm. CI uses 22.12.0.

```sh
npm ci
npm run dev
```

Open the printed dev URL under /my-portfolio/. No custom application environment file is required. Invalid catalog records fail validation during import.

## Check and preview

```sh
npm run check
npm run build
npm run preview
```

check generates route types and runs TypeScript. Preview serves the existing dist directory at http://127.0.0.1:4173/my-portfolio/. PORT can change its port. The root / is outside the preview base and returns 404.

## Generated files and troubleshooting

node_modules, .react-router, build, dist, test-results and playwright-report are ignored. Recreate them with their owning commands. Baseline PNGs under tests are tracked inputs.

Browser tests also start a test-only Vite server on port 4174; free that port before running them. Install matching Chromium binaries locally. If old test output is owned by root, correct ownership of the generated output or pass a writable --output directory; do not run all npm commands as root.

## Source references

- [package.json](../../package.json) — `"engines"` ([line 7](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/package.json#L7)).
- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `const port` ([line 57](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/scripts/static-preview.mjs#L57)).
- [playwright.config.ts](../../playwright.config.ts) — `webServer:` ([line 22](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/playwright.config.ts#L22)).

## Related documents

- [Testing](testing.md)
