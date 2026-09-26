# Project overview authoring

[Documentation index](../README.md) · [Section index](README.md)

Publish a concise project overview by editing JSON; no article or thumbnail is required.

## Contents

- [Add a project](#add-a-project)
- [Overview guidance](#overview-guidance)
- [Choosing a status](#choosing-a-status)
- [Production versus fixtures](#production-versus-fixtures)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Add a project

1. Add an object to app/data/projects.json using the schema example.
2. Give it a unique ID and positive integer priority; lower priorities appear first.
3. Choose one category and a required lifecycle status; provide title, English plain-text description, stack and a real HTTPS GitHub repository link.
4. Run unit tests, type-check and build; inspect selection, text wrapping and repository navigation.
5. Review visual changes and update published-catalog assertions when intentionally adding or removing records.

No Markdown file, frontmatter, thumbnail or project route is created. The sitemap remains one homepage regardless of catalog size.

## Overview guidance

Explain the problem, what the project does and its practical scope in a short description. Use the stack list for technologies. Put detailed implementation material in the linked repository. Do not place Markdown syntax in description expecting it to render.

## Choosing a status

Use the [lifecycle definitions](project-schema.md#lifecycle-statuses). Choose Active for usable, maintained projects; Building for unfinished core functionality; Completed for finished scope. Pending, Paused and Archived describe planned, suspended and retired work respectively.

The initial twelve statuses are editorial selections approved for this portfolio, not independent verification of each repository's operational readiness. Review them when project circumstances change. Do not infer retirement from inactivity or present roadmap technologies as implemented stack entries. InfoBoard intentionally has an empty stack and describes its native host as planned.

## Production versus fixtures

Production contains twelve selected repositories: four Software Engineering, two Data Engineering, three AI Engineering and three Other. The unit and browser tests use separate records under tests/fixtures; these are never imported by production routes. Empty-state browser coverage uses the fixture URL with ?empty. Keep these cases even when every production category is populated.

Each project record should be committed separately so content changes remain easy to review. Keep stable IDs, distinct priorities and concise descriptions; an empty stack is preferable to unverified technology claims.

## Source references

- [app/data/projects.ts](../../app/data/projects.ts) — `export const projects` ([line 4](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/app/data/projects.ts#L4)).
- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectSchema` ([line 14](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/app/data/project-schema.ts#L14)).
- [tests/fixtures/projects.ts](../../tests/fixtures/projects.ts) — `export const fixtureProjects` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/tests/fixtures/projects.ts#L3)).

## Related documents

- [Schema](project-schema.md)
- [Project Hub](../features/project-hub.md)
