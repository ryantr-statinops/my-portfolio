# Project overview schema

[Documentation index](../README.md) · [Section index](README.md)

The catalog is an array of validated overview records. All top-level fields are required.

## Contents

- [Fields](#fields)
- [Lifecycle statuses](#lifecycle-statuses)
- [Repository URL](#repository-url)
- [Collection and failures](#collection-and-failures)
- [Illustrative example](#illustrative-example)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Fields

| Field | Rule |
|---|---|
| id | Lowercase alphanumeric slug with single hyphen separators; unique |
| title | String, minimum 5 characters |
| description | Plain text, minimum 10 characters; line breaks supported |
| category | software-engineering, data-engineering, ai-engineering or other |
| status | Required: pending, building, active, paused, completed or archived |
| priority | Positive integer, unique; lower values appear first; no maximum of 10 |
| stack | At most 12 strings; trimmed, nonempty values; empty array allowed |
| links.github | Required repository URL, as specified below |

There is no routeSlug, date, thumbnail, tags, impact or demo field in the inferred ProjectOverview type. Title and description minima are length checks, not automatic whitespace trimming. The schema uses a Zod object rather than a strict object; extra legacy keys are stripped from parsed output, not consumed by the UI.

## Lifecycle statuses

| Value | Label | Meaning |
|---|---|---|
| pending | Pending | Planned; core implementation has not started |
| building | Building | Core functionality is under development |
| active | Active | Usable and maintained |
| paused | Paused | Development is temporarily suspended |
| completed | Completed | The intended scope is complete |
| archived | Archived | No longer maintained; retained for reference |

Status is an editorial field maintained by the portfolio owner. It is not inferred from commit age, fetched from GitHub or synchronized with GitHub's archive flag. Missing and unsupported values fail validation. Status does not affect priority, visibility or category filtering.

## Repository URL

Use https://github.com/owner/repository, optionally with a trailing slash. The validator rejects other protocols/hosts, credentials, custom nondefault ports, query strings, fragments and nested paths such as /tree/main. Owner characters are alphanumeric/hyphen; repository names also allow underscore and dot. URL parsing normalizes input. Validation checks URL shape, not remote repository existence or visibility.

## Collection and failures

An empty catalog is valid. Duplicate IDs or priorities report the entry index and offending field. Catalog parsing happens at import time, so invalid input prevents the application/build from proceeding. Keep priorities stable when possible; gaps such as 10, 20 and 30 leave room for insertion.

## Illustrative example

This is test/example content, not a published repository record. Add your own real repository and overview.

```json
{
  "id": "example-project",
  "title": "Example Project",
  "description": "A concise overview of the problem and approach used in this illustrative project.",
  "category": "software-engineering",
  "status": "building",
  "priority": 1,
  "stack": [
    "TypeScript"
  ],
  "links": {
    "github": "https://github.com/example/project"
  }
}
```

## Source references

- [app/data/project-schema.ts](../../app/data/project-schema.ts) — [projectStatusSchema](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-schema.ts#L5).

- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const repositoryUrlSchema` ([line 8](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-schema.ts#L8)).
- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectSchema` ([line 17](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-schema.ts#L17)).
- [app/data/project-schema.ts](../../app/data/project-schema.ts) — `export const projectCatalogSchema` ([line 28](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-schema.ts#L28)).

## Related documents

- [Authoring](content-authoring.md)
