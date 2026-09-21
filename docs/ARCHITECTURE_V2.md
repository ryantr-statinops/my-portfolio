# Architecture — Portfolio Runtime

> Current architecture and migration status. Verified 2026-09-21.

## Source of truth

The runtime is a static Astro portfolio. MDX content is validated by Zod, rendered at build time and published to GitHub Pages under `/my-portfolio`.

## Stack

| Layer | Current implementation |
|---|---|
| Framework | Astro 6.4.8, static output |
| Content | `@astrojs/mdx` 5.0.4, glob collection, Zod schema |
| Styling | Tailwind CSS 4.3 with `@tailwindcss/vite` |
| Math | `remark-math`, `rehype-katex`, KaTeX 0.16.11 |
| Tests | Vitest 5.0.0 and Playwright 1.63.0/Chromium |
| Deployment | GitHub Pages via `actions/deploy-pages@v4` |

## Routes

```text
src/pages/index.astro              -> /
src/pages/projects/index.astro     -> /projects/
src/pages/projects/[slug].astro    -> /projects/<project-slug>/ (5 pages)
```

The old `/cluster/` dashboard is removed. The word Cluster is reserved for future project content or strategy context, not the portfolio runtime. A future Cluster project will be a normal MDX entry; this release creates no `cluster.mdx`.

## Boundaries

```text
pages       -> layouts, sections, interactive, lib, content
sections    -> ui, interactive, lib
interactive -> lib and browser APIs only
layouts     -> layout/ui/lib
lib         -> no Astro components
content     -> data only
```

Important runtime modules:

- `src/lib/content.ts`: sorted project collection and duplicate-priority validation.
- `src/lib/project-filter.ts`: pure multi-select filter state and matching logic.
- `src/components/interactive/ProjectFilter.astro`: accessible filter UI and event bridge.
- `src/components/interactive/SystemTerminal.astro`: read-only command simulator; never executes shell commands.
- `src/components/sections/IntelligenceHub.astro`: Project Graph, registry list and derived counts.
- `src/components/sections/PortfolioRegistry.astro`: Project Registry table used by `/projects/`.

## Content contract

The five current projects retain their IDs and routes. Required fields are `id`, `title`, `description`, `date`, `category`, `status`, `priority`, `tags`, `impact`, `thumbnail`, `github`, `demo` and `stack`. Priority `1` is highest; duplicate priorities fail the build. Thumbnails must match `/images/projects/<filename-slug>/thumbnail.webp` and the file must exist.

## Interaction and motion

The filter uses `{ categories: string[] }`; an empty array means `All`. The terminal accepts only `help`, `status`, `neofetch`, `ls /projects` and `clear`. Heatmap and Project Graph canvases render deterministic static fallbacks under `prefers-reduced-motion: reduce`; SmoothSnap is disabled in that mode.

## Migration status

- P1 shell/navigation: complete.
- P2 sections/content boundaries: complete.
- P3 project layout, schema strictness and GitHub Pages deployment: complete.
- Release hardening and route migration: complete through CI/visual gates.
- Optional GoatCounter: intentionally pending until a site endpoint is supplied.

## Future work

Astro major upgrade evaluation is a separate post-release branch. It must run the full unit, smoke, visual, check and build suite before merge.
