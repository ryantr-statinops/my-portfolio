# Portfolio documentation

[Documentation index](README.md)

English maintainer documentation for the single-page portfolio and its Project Hub.

## Contents

- [Reading paths](#reading-paths)
- [Directory](#directory)
- [Reference conventions](#reference-conventions)
- [Maintaining documentation](#maintaining-documentation)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Reading paths

Start with Overview → Architecture → Development. To publish a project, read Data → Project Hub. For UI work use Design; for failed releases use Deployment → Testing.

## Directory

- [Overview](overview.md)
- [Architecture](architecture/README.md)
  - [Rendering and static artifacts](architecture/rendering.md)
  - [Routing and navigation](architecture/routing.md)
- [Features](features/README.md)
  - [Homepage and navigation](features/homepage-and-navigation.md)
  - [Project Hub](features/project-hub.md)
- [Data](data/README.md)
  - [Project overview authoring](data/content-authoring.md)
  - [Project overview schema](data/project-schema.md)
- [Design](design/README.md)
  - [Styling and assets](design/styling-and-assets.md)
- [Development](development/README.md)
  - [Local development setup](development/setup.md)
  - [Testing and visual baselines](development/testing.md)
- [Deployment](deployment/README.md)
  - [GitHub Pages deployment](deployment/github-pages.md)
- [Reference](reference/README.md)
  - [Source code map](reference/code-map.md)
  - [Configuration and commands](reference/configuration.md)

## Reference conventions

Relative source links open the current file. Symbol permalinks pin a verified source revision; this update uses `24efc0ca6734fc406153cc5b291764af915cda52`. Line numbers belong to the linked commit, not necessarily future revisions. Internal section links use heading anchors.

## Maintaining documentation

Update behavior, examples, references and index entries with the implementation. Validate JSON examples against Zod; check relative paths, anchors and `git diff --check`. Distinguish fixture data from the empty production catalog. No project detail pages, Markdown article pipeline or runtime terminal are part of the current application.

## Source references

- [app/routes.ts](../app/routes.ts) — `export default` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/app/routes.ts#L3)).
- [package.json](../package.json) — `"scripts"` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/24efc0ca6734fc406153cc5b291764af915cda52/package.json#L10)).

## Related documents

- [Documentation index](README.md)
