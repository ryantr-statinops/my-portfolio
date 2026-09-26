# Project catalog and filtering

[Documentation index](../README.md) · [Section index](README.md)

Follow a catalog entry through ordering, cards, registry and detail pages.

## Contents

- [Catalog and presentation](#catalog-and-presentation)
- [Filter state](#filter-state)
- [Detail content](#detail-content)
- [Display limitations](#display-limitations)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Catalog and presentation

The catalog module parses JSON with Zod at import time, creates an ascending priority copy and exports route slugs. A lower priority number appears first. Home passes the ordered catalog to the showcase, which slices to six items. Registry receives the filtered ordered list.

ProjectCard displays the year, category, status badge for In Progress, impact, up to three tags and a thumbnail. Registry displays up to three stack entries per row, status and impact, with horizontal scrolling for its table on narrow viewports. The row number is the visible-list index, not project ID.

## Filter state

The registry route owns selected category IDs in React state. No selection means all. Category buttons toggle a selection; `all` resets it, unknown category toggles leave it unchanged. Multiple selected categories form an OR filter. No query string or localStorage persistence is implemented.

Home has no project filter. Strategy selection is independent of registry filtering. An empty catalog or a filter yielding zero entries shows the same “Projects are being rebuilt.” copy.

## Detail content

The detail loader resolves the slug and loads matching raw Markdown. ReactMarkdown applies GFM and math plugins, then KaTeX rendering. There is no raw HTML plugin enabled. Images whose source starts with `/images/` are prefixed with the Vite base URL; other image URLs pass through. Normal Markdown links do not receive this custom image rewrite.

The detail header includes metadata, stack, tags, impact and optional GitHub/demo links. Related projects are the first two other entries in priority order, not a category similarity ranking.

## Display limitations

The registry’s integrity/encryption wording and terminal status are presentation strings; the implementation does not perform an audit or encrypt records. The showcase’s optional view-selected link points to its own `#projects` section. Treat product copy and implemented behavior separately when editing or describing the site.

## Source references

- [app/data/projects.ts](../../app/data/projects.ts) — `export const orderedProjects` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L5)).
- [app/data/project-filter.ts](../../app/data/project-filter.ts) — `export function toggleProjectCategory` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-filter.ts#L6)).
- [app/data/project-filter.ts](../../app/data/project-filter.ts) — `export function filterProjects` ([source line 14](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-filter.ts#L14)).
- [app/components/sections/ProjectCard.tsx](../../app/components/sections/ProjectCard.tsx) — `export default function ProjectCard` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/ProjectCard.tsx#L9)).
- [app/components/sections/PortfolioRegistry.tsx](../../app/components/sections/PortfolioRegistry.tsx) — `export default function PortfolioRegistry` ([source line 18](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/PortfolioRegistry.tsx#L18)).
- [app/components/sections/ProjectShowcase.tsx](../../app/components/sections/ProjectShowcase.tsx) — `export default function ProjectShowcase` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/ProjectShowcase.tsx#L9)).
- [app/components/ProjectMarkdown.tsx](../../app/components/ProjectMarkdown.tsx) — `export default function ProjectMarkdown` ([source line 11](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/ProjectMarkdown.tsx#L11)).
- [app/routes/project.tsx](../../app/routes/project.tsx) — `const related` ([source line 45](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L45)).

## Related documents

- [Routing](../architecture/routing.md)
- [Project schema](../data/project-schema.md)
- [Content authoring](../data/content-authoring.md)
