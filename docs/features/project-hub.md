# Project Hub

[Documentation index](../README.md) · [Section index](README.md)

Browse repository overviews by category without leaving the homepage until opening a repository.

## Contents

- [Layout and state](#layout-and-state)
- [Overview and repository](#overview-and-repository)
- [Empty and static rendering](#empty-and-static-rendering)
- [Navigation](#navigation)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Layout and state

Desktop at the lg breakpoint uses a project list beside an overview panel. Smaller screens stack the list above the panel. Categories are All, Software Engineering, Data Engineering, AI Engineering and Other. All is the initial filter.

The list is sorted by ascending positive priority. Initial selection is the first visible project. Changing categories retains the selected ID if present in the next result; otherwise it selects the first result. Empty results clear selection, so switching to a populated category after an empty one selects its first project. Selection and category are local React state and are not persisted or encoded in the URL.

## Overview and repository

Each panel displays title, category, lifecycle status, description, stack and View repository. Description is plain text with line breaks preserved; it is not Markdown. Empty stack arrays hide the stack list. The repository is a required HTTPS GitHub owner/repository URL. Links open in a new tab with noopener/noreferrer and an accessible new-tab hint.

A shared badge mapping displays Pending, Building, Active, Paused, Completed or Archived in both the project list and overview. Each badge includes visible text and an accessible “Status:” prefix. Explicit foreground/background color pairs remain readable on selected rows and in both themes. Status does not change sorting or filtering.

## Empty and static rendering

The production catalog contains twelve projects across four categories (4 Software Engineering, 2 Data Engineering, 3 AI Engineering and 3 Other). An empty catalog still displays “Projects are being prepared.” An empty category within a populated catalog displays “No projects in this category yet.” No stale overview remains visible.

Before hydration, all projects render as ordered overview articles with status labels and usable repository links. Without JavaScript these remain readable. After the readiness effect, category buttons and list/panel selection replace the static presentation. Buttons use aria-pressed and visible keyboard focus; the panel is a polite live region.

## Navigation

The section ID is projects. Hero and desktop/mobile navigation link to /#projects through the router basename. A positioned intelligence-hub anchor preserves the previous Hub hash. The standalone Projects routes were removed; they return 404 rather than redirecting. Frame/Test/Build stages are no longer rendered.

## Source references

- [app/components/ProjectStatusBadge.tsx](../../app/components/ProjectStatusBadge.tsx) — [ProjectStatusBadge](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/ProjectStatusBadge.tsx#L12).

- [app/components/sections/ProjectHub.tsx](../../app/components/sections/ProjectHub.tsx) — `export default function ProjectHub` ([line 26](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/sections/ProjectHub.tsx#L26)).
- [app/components/sections/ProjectHub.tsx](../../app/components/sections/ProjectHub.tsx) — `function ProjectOverviewPanel` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/sections/ProjectHub.tsx#L10)).
- [app/data/project-hub.ts](../../app/data/project-hub.ts) — `export function projectsForCategory` ([line 5](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-hub.ts#L5)).
- [app/data/project-hub.ts](../../app/data/project-hub.ts) — `export function resolveSelectedProject` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/project-hub.ts#L10)).

## Related documents

- [Schema](../data/project-schema.md)
- [Authoring](../data/content-authoring.md)
