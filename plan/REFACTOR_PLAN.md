> Historical plan record only. It describes the retired Astro implementation and is not current execution guidance. Use `docs/ARCHITECTURE_V2.md` and `docs/ROADMAP.md` for current runtime and release status.
# Historical Refactor Record

This file records the completed pre-release refactor. It is no longer an active implementation plan; current work is tracked in `docs/ROADMAP.md` and `docs/plan/`.

## Completed migration

- Shell, navigation, footer and project layout were moved into the current Astro boundaries.
- Project content was consolidated into `src/content/projects/*.mdx` with strict Zod validation.
- Shared library modules were introduced for content ordering, SEO, base-path URLs and constants.
- Existing five project routes and their public URLs were preserved.
- GitHub Pages became the production target with `base: /my-portfolio`.
- The old `/cluster/` dashboard was removed and replaced by the neutral `/projects/` Project Registry.
- The current release added shared filters, a read-only Portfolio Runtime Terminal, reduced-motion fallbacks, L1/L2/L3 QA and CI deployment gates.

## Historical decisions

- Priority `1` is the highest priority and collections sort ascending.
- The portfolio runtime must not invent infrastructure, market or business metrics.
- A future Cluster startup project will be content-driven and introduced separately as a normal MDX project.
- Major framework upgrades are isolated from patch dependency maintenance.

For the active state, do not use the old phase descriptions in this record; consult the release roadmap and architecture documents.
