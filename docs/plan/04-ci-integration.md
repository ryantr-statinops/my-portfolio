# CI and Release Gates

Status: implemented in `.github/workflows/deploy.yml`.

## Order

1. `npm ci`
2. Safe dependency update step (non-force)
3. Report-only `npm audit`
4. `npm run test:unit`
5. `npm run check`
6. `npm run build`
7. Assert two shell pages plus one generated page per project entry
8. Install Chromium
9. `npm run test:smoke`
10. `npm run test:visual`
11. Verify sitemap and robots
12. Upload Playwright artifacts on failure
13. Upload the Pages artifact and deploy only from `main`

Schema/unit, type, build, route/metadata/link smoke and visual checks run for pull requests into `main`, pushes to `main` and manual dispatches. Only `main` can upload and deploy the Pages artifact. Node 22 is the supported CI runtime.

## Scripts

```json
{
  "test": "npm run test:unit && npm run test:smoke && npm run test:visual",
  "test:unit": "vitest run",
  "test:smoke": "playwright test tests/e2e/smoke.spec.ts",
  "test:visual": "playwright test tests/e2e/visual.spec.ts",
  "test:watch": "vitest"
}
```

## Dependency policy

Do not use `npm audit fix --force`. Patch updates are separate from a future Astro major migration. If an audit vulnerability remains because it needs Astro 7, CI reports it without silently changing the release architecture.
