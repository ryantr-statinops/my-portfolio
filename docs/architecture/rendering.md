# Rendering and static artifacts

[Documentation index](../README.md) · [Section index](README.md)

Explain how the build becomes a deployable GitHub Pages directory.

## Contents

- [Build sequence](#build-sequence)
- [Server entry and hydration](#server-entry-and-hydration)
- [Artifact contract](#artifact-contract)
- [Local static serving](#local-static-serving)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Build sequence

1. `npm run build` runs `react-router build` using Vite and the Tailwind plugin.
2. React Router prerenders home, registry and catalog project paths. `ssr: false` disables a deployed server runtime, while build-time rendering still uses the server entry.
3. `prepare-static-artifact.mjs` reads `build/client/my-portfolio/index.html` and fails if it is absent.
4. It copies client assets into the base directory, excluding the base directory itself, `.vite` and `__spa-fallback.html`.
5. It writes sitemap files and a styled 404 page, checks required route files, removes the old `dist/` and moves the prepared directory there.
6. GitHub Actions uploads `dist/` for Pages.

## Server entry and hydration

`handleRequest` uses `renderToPipeableStream`, a Node stream adapter and `ServerRouter`. HEAD requests omit the body. Bots and SPA mode wait for `onAllReady`; other requests use `onShellReady`. The exported stream timeout is 5000 ms, with abort scheduled after an additional 1000 ms. This explains why `@react-router/node` and `isbot` remain dependencies.

The root emits scripts for browser hydration and scroll restoration. Theme initialization runs in the document head. Interactive controls become active after hydration; Strategy Hub hides its controls before readiness while retaining readable initial content.

## Artifact contract

The artifact must contain home and registry `index.html` files, one per project slug, `404.html`, `robots.txt`, `sitemap-index.xml` and `sitemap-0.xml`. CI expects `2 + catalog.length` files named `index.html`. Public sitemap URLs include the base path exactly once.

The preparation script chooses a `global-*.css` asset for the 404 page and fails if it cannot find one. It reads raw project JSON after the framework build has imported and validated the catalog. Existing `dist/` is replaced by each successful preparation.

## Local static serving

`npm run preview` serves `dist/` on `127.0.0.1:4173`; `PORT` overrides the port. Only `/my-portfolio` and descendants are served. Directories resolve to `index.html`; missing files return the generated 404 with status 404. Build first: preview does not generate artifacts. It is a local HTTP server, not the production hosting service.

## Source references

- [app/entry.server.tsx](../../app/entry.server.tsx) — `export default function handleRequest` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/entry.server.tsx#L9)).
- [react-router.config.ts](../../react-router.config.ts) — `ssr:` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/react-router.config.ts#L6)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const homePage` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/prepare-static-artifact.mjs#L9)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const routePaths` ([source line 34](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/prepare-static-artifact.mjs#L34)).
- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `function resolveFile` ([source line 26](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/static-preview.mjs#L26)).

## Related documents

- [Routing](routing.md)
- [GitHub Pages](../deployment/github-pages.md)
