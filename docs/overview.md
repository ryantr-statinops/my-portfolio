# Project overview

[Documentation index](README.md)

Understand what the repository ships and where to find its implementation.

## Contents

- [Purpose and current state](#purpose-and-current-state)
- [Stack](#stack)
- [Repository layout](#repository-layout)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Purpose and current state

The portfolio presents Ryan Tran’s profile, engineering capabilities and project registry. It is a static website hosted beneath `/my-portfolio/` on GitHub Pages. There is no deployed application server or database.

The checked-in catalog is `[]`. Home and registry pages render empty project states. Strategy tracks exist for four categories, with blank content and “Content is being prepared.” placeholders in the product. Documentation describes this scaffold honestly rather than inventing projects or completed capabilities.

## Stack

| Layer | Repository version | Role |
|---|---|---|
| React / React DOM | 19.3.0 | UI and hydration |
| React Router | 7.18.4 | Framework routes and prerender |
| TypeScript | 5.9.3 | Strict type checking |
| Vite | 6.4.3 | Build pipeline |
| Tailwind CSS | 4.3.0 | Styling through the Vite plugin |
| Zod | 4.6.5 | Catalog validation |
| React Markdown | 10.1.0 | Project article rendering |
| Vitest | 5.0.0 | Unit tests |
| Playwright | 1.63.0 | Browser and screenshot tests |

These are lockfile versions at the source snapshot, not upstream latest-version claims. `package.json` declares ranges; `npm ci` uses `package-lock.json`. Markdown uses remark-gfm, remark-math and rehype-katex; KaTeX CSS/fonts are bundled. Node must satisfy `>=22.12.0`; CI selects 22.12.0.

## Repository layout

| Location | Responsibility |
|---|---|
| `app/` | React routes, shell, UI, project data and Markdown |
| `src/lib/` | Shared constants, strategy, terminal and section navigation |
| `src/styles/` and `src/assets/` | Global CSS and bundled fonts |
| `public/` | Static images, videos, icons and robots |
| `scripts/` | Artifact preparation and local static server |
| `tests/` | Unit tests, browser tests and screenshot baselines |
| `.github/workflows/` | Validation and deployment |
| `docs/` | Maintainer documentation |

`src/` is active shared code. The current runtime is React Router; it does not use Astro.

## Source references

- [package.json](../package.json) — `"dependencies"` ([source line 21](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package.json#L21)).
- [package-lock.json](../package-lock.json) — `"lockfileVersion"` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package-lock.json#L4)).
- [app/data/projects.json](../app/data/projects.json) — `[]` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.json#L1)).
- [src/lib/strategy.ts](../src/lib/strategy.ts) — `emptyStage` ([source line 25](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L25)).

## Related documents

- [Documentation index](README.md)
- [Architecture](architecture/README.md)
- [Local setup](development/setup.md)
- [Configuration](reference/configuration.md)
