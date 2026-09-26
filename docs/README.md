# Portfolio documentation

[Documentation index](README.md)

Technical documentation for maintainers of Ryan Tran’s static portfolio. Start with the overview, follow the architecture, then use feature and reference pages for a specific change.

## Contents

- [Reading paths](#reading-paths)
- [Directory](#directory)
- [Reference conventions](#reference-conventions)
- [Maintaining these docs](#maintaining-these-docs)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Reading paths

New maintainers: overview → architecture → development.

Content authors: data → project catalog. UI changes: features → design. Release troubleshooting: deployment → testing. Use the directory below for the pages currently available.

## Directory

- [Project overview](overview.md) — purpose, stack and current content.
- [Architecture](architecture/README.md)
  - [Rendering and static artifacts](architecture/rendering.md)
  - [Routing and navigation](architecture/routing.md)
- [Features](features/README.md)
  - [Homepage and site navigation](features/homepage-and-navigation.md)
  - [Project catalog and filtering](features/project-catalog.md)
  - [Strategy Hub](features/strategy-hub.md)
  - [Terminal commands](features/terminal.md)

## Reference conventions

Internal links are relative Markdown links. Section links use heading anchors. Each topic names its source file and symbol, with a GitHub permalink to the verified implementation at `1ad473623a2d8cd3f1e5efe8831e539433543349`. Relative source links open the working copy; permalinks preserve the documented version and line location.

The source snapshot is a documentation baseline, not a claim that future revisions retain the same line numbers.

## Maintaining these docs

Update the relevant topic whenever behavior, data contracts, commands or configuration change. Confirm each source symbol in the working tree; when implementation changes, refresh its permalink SHA and line. Update both the section index and this directory with the page. Keep one authoritative explanation per topic and link to it elsewhere.

Check relative file targets, heading anchors, JSON examples and `git diff --check` before committing. Distinguish current behavior from suggestions. Never present decorative UI labels as verified operational guarantees.

## Source references

- [package.json](../package.json) — `"scripts"` ([source line 10](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/package.json#L10)).
- [app/routes.ts](../app/routes.ts) — `export default` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes.ts#L4)).

## Related documents

- [Documentation index](README.md)
