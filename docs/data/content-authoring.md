# Project overview authoring

[Documentation index](../README.md) · [Section index](README.md)

Publish a concise project overview by editing JSON; no article or thumbnail is required.

## Contents

- [Add a project](#add-a-project)
- [Overview guidance](#overview-guidance)
- [Production versus fixtures](#production-versus-fixtures)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Add a project

1. Add an object to app/data/projects.json using the schema example.
2. Give it a unique ID and positive integer priority; lower priorities appear first.
3. Choose one category and provide title, plain-text description, stack and a real HTTPS GitHub repository link.
4. Run unit tests, type-check and build; inspect selection, text wrapping and repository navigation.
5. Review visual changes when the production empty state is replaced with real content.

No Markdown file, frontmatter, thumbnail or project route is created. The sitemap remains one homepage regardless of catalog size.

## Overview guidance

Explain the problem, what the project does and its practical scope in a short description. Use the stack list for technologies. Put detailed implementation material in the linked repository. Do not place Markdown syntax in description expecting it to render.

## Production versus fixtures

Production starts with an empty catalog. The unit and browser tests use separate records under tests/fixtures; these are never imported by production routes. When publishing the first real record, update smoke assertions that intentionally check the current empty state and review the homepage baseline. Schema and populated-fixture tests should continue to pass unchanged.

## Source references

- [app/data/projects.ts](../../app/data/projects.ts) — `export const projects` ([line 4](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/app/data/projects.ts#L4)).
- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectSchema` ([line 14](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/app/data/project-schema.ts#L14)).
- [tests/fixtures/projects.ts](../../tests/fixtures/projects.ts) — `export const fixtureProjects` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/75b94490a3cc85eca54936f87e0f0901e7a7e49b/tests/fixtures/projects.ts#L3)).

## Related documents

- [Schema](project-schema.md)
- [Project Hub](../features/project-hub.md)
