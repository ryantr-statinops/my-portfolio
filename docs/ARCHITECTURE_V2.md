# Architecture — Portfolio Runtime

> React/TypeScript static portfolio prerendered for GitHub Pages under `/my-portfolio/`.

## Source of truth

The application is built with React Router 7 Framework Mode and Vite. Static HTML is generated for the homepage, project registry and five project-detail routes. Direct loads and reloads do not depend on a client-side SPA fallback.

## Stack

| Layer | Implementation |
|---|---|
| Framework | React 19, TypeScript, React Router 7 Framework Mode |
| Build | Vite, `ssr: false`, explicit prerender routes |
| Content | Typed project catalog in `app/data/projects.json`, validated by Zod |
| Detail bodies | Plain Markdown rendered by `react-markdown`, `remark-gfm`, `remark-math` and `rehype-katex` |
| Styling | Tailwind CSS 4 through `@tailwindcss/vite` |
| Tests | Vitest and Playwright against the static artifact |
| Hosting path | `/my-portfolio/` on `https://ryantr-statinops.github.io` |

## Routes and artifact

```text
/                                  -> build/client/my-portfolio/index.html
/projects/                         -> build/client/my-portfolio/projects/index.html
/projects/<slug>/                  -> build/client/my-portfolio/projects/<slug>/index.html (5 routes)
```

`npm run build` runs the React Router prerender, then `scripts/prepare-static-artifact.mjs` assembles `build/client/my-portfolio/` as the Pages artifact. Assets, `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml` and a static `404.html` live in that artifact. `scripts/static-preview.mjs` mounts those files beneath `/my-portfolio/` and returns 404 for unknown paths instead of serving the SPA fallback.

## Data and content boundaries

- `app/data/project-schema.ts`: required field validation plus unique route slug and priority invariants.
- `app/data/projects.json`: the five editorial metadata records used for cards, registry, graph and prerender paths.
- `app/content/projects/<slug>.md`: detail body; route slugs come from filenames and remain independent of historic frontmatter IDs.
- `app/data/project-content.ts`: build-time Markdown lookup; no GitHub or network requests run in the browser.
- `src/lib/constants.ts`: shared site metadata and category labels.

GitHub repository inventory and publication policy are not part of this application cutover; existing catalog content remains authoritative until separately approved.

## Interaction and motion

The shared shell provides responsive navigation, skip link, section scroll spy, reveal behavior, theme persistence and the homepage video/poster. Category selection is a multi-select union; an empty selection means `All`. The registry terminal accepts only `help`, `status`, catalog-provided `neofetch`/`ls /projects`, `clear`, and returns `command not found` for other input. Reduced-motion preference disables autoplay and reveals content without motion.

## Verification

- `npm run check`: React Router type generation and TypeScript check.
- `npm test`: unit, route/interaction/static-artifact smoke, and dark/light responsive visual tests.
- `npm run build`: prerender and assemble the Pages artifact.
- `npm run preview`: serve that artifact under `/my-portfolio/`, with direct route requests and no SPA fallback.

## Deployment workflow boundary

`.github/workflows/deploy.yml` remains unchanged during this website migration by design. It still reflects the pre-cutover build/artifact path; GitHub Actions/Pages changes are deferred to the separate post-refactor review requested by the repository owner.
