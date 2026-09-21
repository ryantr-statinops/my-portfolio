# L3 — Visual Regression

Status: complete. Chromium baselines are committed under `tests/e2e/visual.spec.ts-snapshots/`.

## Matrix

- Themes: dark and light.
- Viewports: desktop `1280x800`, tablet `768x1024`, mobile `375x667`.
- Six scopes per matrix entry: Hero, homepage project showcase, Project Registry, active filter, Portfolio Runtime Terminal and project detail header.
- Total: 36 snapshots.

## Determinism

Tests emulate reduced motion, disable CSS animation/transition and scrolling behavior, activate reveal elements deterministically, mask dynamic canvases and mask the UTC clock. Cursor, animation frames and clock values are not assertions.

## Updating baselines

Only update snapshots with an intentional UI change and review all generated PNGs:

```bash
npx playwright test tests/e2e/visual.spec.ts --update-snapshots
npm run test:visual
```

The test uses the same generated project route source as smoke tests and does not introduce a fake data dashboard.
