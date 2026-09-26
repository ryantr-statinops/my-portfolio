# Architecture — Portfolio Runtime

> Current architecture and migration status. Verified 2026-09-23.

## Source of truth

The runtime is a static Astro portfolio. MDX content is validated by Zod, rendered at build time and published to GitHub Pages under `/my-portfolio`.

## Stack

| Layer | Current implementation |
|---|---|
| Framework | Astro 7.3.4, static output |
| Content | `@astrojs/mdx` 8.0.2, glob collection, Zod schema |
| Styling | Tailwind CSS 4.3 with `@tailwindcss/vite` |
| Math | `remark-math`, `rehype-katex`, KaTeX 0.16.11 |
| Tests | Vitest 5.0.0 and Playwright 1.63.0/Chromium |
| Deployment | GitHub Pages via `actions/deploy-pages@v4` |

## Routes

```text
src/pages/index.astro              -> /
src/pages/projects/index.astro     -> /projects/
src/pages/projects/[slug].astro    -> /projects/<project-slug>/ (generated from content)
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
- `src/lib/strategy.ts`: four capability tracks with Frame, Test and Build content slots.
- `src/components/sections/StrategyHub.astro`: guided capability and approach selector on the homepage.
- `src/components/sections/PortfolioRegistry.astro`: Project Registry table used by `/projects/`.

## Content contract

The project collection is currently empty while the portfolio is rebuilt. `/projects/` remains available and shows a rebuilding state; no project detail routes are generated. Future entries use the required fields `id`, `title`, `description`, `date`, `category`, `status`, `priority`, `tags`, `impact`, `thumbnail`, `github`, `demo` and `stack`. Categories are defined in `src/lib/constants.ts`: `software-engineering`, `data-engineering`, `ai-engineering` and `other`. Duplicate priorities fail the build; thumbnail paths must resolve to an existing asset.

## Interaction and motion

The Project Registry filter uses `{ categories: string[] }`; an empty array means `All`. Strategy selection is local to the section and does not change the URL or filter projects. It defaults to Software Engineering → Frame and presents empty content slots as “Content is being prepared.” The terminal accepts only `help`, `status`, `neofetch`, `ls /projects` and `clear`; `ls /projects` explains when the collection is empty.

## Migration status

- P1 shell/navigation: complete.
- P2 sections/content boundaries: complete.
- P3 project layout, schema strictness and GitHub Pages deployment: complete.
- Release hardening and route migration: complete through CI/visual gates.
- Optional GoatCounter: intentionally pending until a site endpoint is supplied.

## Future work

The current homepage uses the guided Strategy scaffold. The project collection is intentionally empty until new project write-ups are ready; page count and route tests derive their expectations from collection content.
