# Project data schema

[Documentation index](../README.md) · [Section index](README.md)

Use the catalog contract as the authoritative checklist for project metadata.

## Contents

- [Fields](#fields)
- [Enums and collection rules](#enums-and-collection-rules)
- [Illustrative valid entry](#illustrative-valid-entry)
- [Failure behavior](#failure-behavior)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Fields

All top-level fields below are required. Only the two fields inside `links` are optional.

| Field | Contract |
|---|---|
| `id` | String matching `^[a-z0-9]+(?:-[a-z0-9]+)*$`; unique in catalog |
| `routeSlug` | Same pattern as id; unique; used for route and Markdown filename |
| `title` | String, minimum 5 characters |
| `description` | String, minimum 10 characters |
| `date` | Valid ISO date via `z.iso.date()`, e.g. `2026-09-26` |
| `category` | One of the category IDs below |
| `status` | One of the status values below |
| `priority` | Integer 1–10 inclusive; unique in catalog |
| `tags` | Array of at most 12 nonempty strings; empty array accepted |
| `impact` | String, minimum 20 characters |
| `thumbnail` | Matches `^/images/projects/[a-z0-9-]+/thumbnail\.webp$` |
| `links` | Required object; may be `{}` |
| `links.github` | Optional URL string via `z.url()` |
| `links.demo` | Optional URL string via `z.url()` |
| `stack` | Array of at most 12 nonempty strings; empty array accepted |

String minima are length checks, not trim or editorial-quality checks. The URL schema does not restrict these fields to specific hosts.

## Enums and collection rules

Categories: `software-engineering`, `data-engineering`, `ai-engineering`, `other`.

Statuses: `In Progress`, `Production`, `Archived`, `Research & Development`, `Audit Pending`.

`projectCatalogSchema` accepts an empty array. Its refinement rejects duplicate IDs, route slugs and priorities. Unique priorities within 1–10 mean at most ten entries can currently pass validation. The schema does not require id, routeSlug and thumbnail directory to match each other; using the same slug is the authoring convention. It validates the asset path string, not whether the file exists. Markdown existence is checked separately when the loader reads it.

## Illustrative valid entry

This example is documentation only; it does not publish a project. Insert entries into the catalog array, not as a standalone catalog object.

```json
{
  "id": "example-system",
  "routeSlug": "example-system",
  "title": "Example Engineering System",
  "description": "An illustrative catalog entry for documenting a future engineering project.",
  "date": "2026-09-26",
  "category": "software-engineering",
  "status": "Research & Development",
  "priority": 1,
  "tags": [
    "Documentation"
  ],
  "impact": "Demonstrates the expected content contract for a future portfolio project.",
  "thumbnail": "/images/projects/example-system/thumbnail.webp",
  "links": {},
  "stack": [
    "TypeScript"
  ]
}
```

## Failure behavior

The catalog module calls `.parse` during import. Invalid data throws rather than silently skipping entries, so malformed catalog content can stop route generation or build. Error paths identify the entry index and field; duplicates use explicit duplicate ID, slug or priority messages. `Project` is inferred from the item schema.

## Source references

- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectSchema` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L6)).
- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectCatalogSchema` ([source line 31](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L31)).
- [src/lib/constants.ts](../../src/lib/constants.ts) — `export const CATEGORY_IDS` ([source line 8](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/constants.ts#L8)).
- [app/data/projects.ts](../../app/data/projects.ts) — `projectCatalogSchema.parse` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L4)).

## Related documents

- [Project catalog](../features/project-catalog.md)
- [Content authoring](content-authoring.md)
