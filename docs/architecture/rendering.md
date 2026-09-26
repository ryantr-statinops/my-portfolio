# Rendering and static artifacts

[Documentation index](../README.md) · [Section index](README.md)

Build one public HTML page with static assets, sitemap and a custom error page.

## Contents

- [Build sequence](#build-sequence)
- [Rendering and hydration](#rendering-and-hydration)
- [Preview](#preview)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Build sequence

1. React Router builds through Vite and prerenders the home route.
2. The artifact script requires build/client/my-portfolio/index.html.
3. It copies client assets into that directory, excluding the base directory itself, .vite and the SPA fallback.
4. It creates sitemap-index.xml, sitemap-0.xml and 404.html, requiring the global stylesheet for the error page.
5. It checks required files, removes the prior dist directory and moves the prepared directory to dist.

The sitemap contains exactly the homepage. The artifact contains one index.html regardless of project count; repository URLs do not become sitemap entries.

## Rendering and hydration

ssr:false means there is no deployed application server. The build still uses the framework server entry, React streaming and the Node stream adapter. isbot chooses stream readiness for bot requests. The entry handles HEAD requests and has a 5000 ms stream timeout plus a 1000 ms abort margin.

ProjectHub initially renders all overview articles (or the catalog empty message). After hydration its effect enables category controls and the selected-project panel. No client request loads project content.

## Preview

The static server serves dist at 127.0.0.1:4173/my-portfolio/. PORT overrides the port. Missing paths return 404.html with status 404; requests outside the base return 404. Build before preview; the server does not generate files. CI uploads dist directly to Pages.

## Source references

- [app/entry.server.tsx](../../app/entry.server.tsx) — `export default function handleRequest` ([line 9](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/app/entry.server.tsx#L9)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const publicUrls` ([line 20](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/scripts/prepare-static-artifact.mjs#L20)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const routePaths` ([line 29](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/scripts/prepare-static-artifact.mjs#L29)).
- [scripts/static-preview.mjs](../../scripts/static-preview.mjs) — `function resolveFile` ([line 26](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/scripts/static-preview.mjs#L26)).

## Related documents

- [Deployment](../deployment/github-pages.md)
