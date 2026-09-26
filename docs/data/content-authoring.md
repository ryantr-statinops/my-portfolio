# Project content authoring

[Documentation index](../README.md) · [Section index](README.md)

Add a project by keeping catalog metadata, Markdown and public assets consistent.

## Contents

- [Prepare the entry](#prepare-the-entry)
- [Write the article](#write-the-article)
- [Update scaffold expectations](#update-scaffold-expectations)
- [Validate publication](#validate-publication)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Prepare the entry

1. Choose a lowercase hyphenated slug and unused priority in 1–10.
2. Add an object to `app/data/projects.json`, following the schema reference. Keep `links` even if it is empty.
3. Create `app/content/projects/<routeSlug>.md`. The glob reads only `.md` files directly in this directory. Nested folders and `.mdx` are not included.
4. Add `public/images/projects/<routeSlug>/thumbnail.webp` and use `/images/projects/<routeSlug>/thumbnail.webp` in metadata.
5. Add any article images to `public/` and reference them with `/images/...` for the renderer’s base-path rewrite.

The metadata lives in JSON. There is no frontmatter parser; a Markdown frontmatter block is not used to populate project fields.

## Write the article

A useful article contains problem, constraints, approach, implementation, evidence and limitations. The route already renders the project title and metadata, so start the body with level-two sections. GFM supports tables and task lists; math uses `$...$` and display `$$...$$` through the configured plugins.

```markdown
## Problem

Explain the problem and the constraints.

## Approach

State the decision and its tradeoffs.

## Results

Describe measured outcomes and limitations.

![System diagram](/images/projects/example-system/diagram.webp)
```

The image path is illustrative: create the actual asset before publishing. Ordinary Markdown links are not automatically rewritten with the deployment base; use a correct published path or absolute URL.

## Update scaffold expectations

The current tests intentionally assert an empty catalog. Publishing the first project therefore also requires updating those expectations:

- `tests/project-catalog.test.ts` asserts imported catalog arrays are empty.
- `tests/e2e/smoke.spec.ts` asserts no generated project routes and checks empty messages.
- `tests/e2e/static-artifact.spec.ts` expects exactly two sitemap URLs.
- Visual tests discover generated project routes and capture the first project detail when present. Review new detail snapshots and changed home/registry snapshots.

Update these to express the new published state; retain duplicate/schema/error-path coverage. If a Strategy Hub stage links to this project, verify the link slug and review scaffold-specific strategy tests as well.

## Validate publication

Run `npm run test:unit`, `npm run check`, `npm run build`, `npm run test:smoke` and `npm run test:visual` after updating the applicable expectations. Inspect the built detail page, metadata, images and math in preview. Verify the sitemap includes the new slug and the artifact has `2 + catalog.length` index pages.

Schema checks do not prove thumbnails exist. Missing Markdown throws 404 in `readProjectMarkdown`; a malformed or missing image needs a separate asset/browser check. A Markdown file without a catalog entry creates no published route.

## Source references

- [app/data/project-content.ts](../../app/data/project-content.ts) — `const contentFiles` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-content.ts#L1)).
- [app/data/project-content.ts](../../app/data/project-content.ts) — `export function readProjectMarkdown` ([source line 7](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-content.ts#L7)).
- [tests/project-catalog.test.ts](../../tests/project-catalog.test.ts) — `accepts an empty collection` ([source line 22](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/project-catalog.test.ts#L22)).
- [tests/e2e/smoke.spec.ts](../../tests/e2e/smoke.spec.ts) — `expect(projectRoutes).toEqual([])` ([source line 26](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/smoke.spec.ts#L26)).
- [tests/e2e/static-artifact.spec.ts](../../tests/e2e/static-artifact.spec.ts) — `toHaveLength(2)` ([source line 20](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/static-artifact.spec.ts#L20)).
- [app/components/ProjectMarkdown.tsx](../../app/components/ProjectMarkdown.tsx) — `components={{` ([source line 17](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/ProjectMarkdown.tsx#L17)).

## Related documents

- [Schema and example](project-schema.md)
- [Project rendering](../features/project-catalog.md)
