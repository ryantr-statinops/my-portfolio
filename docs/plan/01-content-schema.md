# L1 — Catalog and Unit Tests

Status: implemented with Vitest. The catalog has five records and the public site generates seven static routes.

## Catalog contract

- `app/data/project-schema.ts` validates the project JSON contract: historic `id`, public `routeSlug`, title, description, ISO date, category, status, unique priority, tags, impact, thumbnail, optional GitHub/demo links and stack.
- IDs, route slugs and priorities must be unique. Priority `1` is highest and route ordering is ascending.
- Thumbnail paths must match `/images/projects/<slug>/thumbnail.webp`; thumbnails and every Markdown inline image must exist under `public/images/`.
- `app/data/projects.ts` provides validated records, ordering, prerender slugs and route-slug lookup.
- Each `app/content/projects/<routeSlug>.md` preserves its full detail body; image paths resolve below `/my-portfolio/` in the built artifact.

## Behavior coverage

Unit contracts cover required/malformed metadata, duplicate IDs/slugs/priorities, ordering, slug lookup, image assets, multi-select filters (including empty = All), and terminal allowlist/unknown command behavior.

Run with `npm run test:unit`. Keep tests deterministic and check externally visible behavior or invariants, not source text or forwarding.
