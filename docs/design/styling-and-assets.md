# Styling and assets

[Documentation index](../README.md) · [Section index](README.md)

Shared styling lives in the global stylesheet; media-specific rules live with VideoBackground.

## Contents

- [Tokens and type](#tokens-and-type)
- [Shared information boxes](#shared-information-boxes)
- [Desktop content width](#desktop-content-width)
- [Hub layout](#hub-layout)
- [Assets and motion](#assets-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Tokens and type

Tailwind is imported by src/styles/global.css and compiled by its Vite plugin. @theme exposes CSS-variable colors and the mono font stack. Root variables define light values; .dark overrides them. The homepage-video light override preserves dark contrast above the video. Regular/bold JetBrains Mono fonts are bundled with their OFL license. There is no KaTeX or Markdown prose styling pipeline.

## Shared information boxes

[src/styles/boxes.css](../../src/styles/boxes.css), imported by the global stylesheet, owns information surface styles. Change its root variables to adjust radius, border, background opacity, blur and spacing across About Me, Connect and Project Hub. Theme colors derive from the existing root color tokens.

| Class | Usage |
|---|---|
| info-box | Profile and availability cards; shared 16 px radius, 70% background and 20 px padding |
| info-box--compact | Focus cards and selectable project rows; 12 px vertical padding |
| info-box--filter | Category filters; 12 px vertical and 16 px horizontal padding |
| info-box--panel | Project overview, prerender fallback and empty state; 24 px padding, 32 px from 768 px |
| info-box--list | Contact list; no vertical container padding, shared row dividers |
| info-box--interactive | Project row and category filter hover, keyboard focus and aria-pressed selection |

Always combine modifiers with info-box. Keep layout and typography on the component; avoid overriding surface properties there. Category filters share the surface and interactive styles. Action buttons, technology chips and status badges remain separate controls.

## Desktop content width

About Me, Project Hub and Connect (including its closing bar) share --desktop-content-width, defined in the global stylesheet as 85rem (1360px). From 1024px, their containers use that maximum width and 32px outer gutters. Below that breakpoint their existing widths and spacing remain unchanged.

## Hub layout

ProjectHub uses category buttons above a list/panel layout. At lg and above the grid has two columns; smaller widths stack the list and panel. Long titles, descriptions and stack labels wrap. Controls provide focus-visible styling and selected aria-pressed states. Both themes use existing project tokens. The section retains the homepage background rather than introducing a new visual identity.

## Assets and motion

Avatar and current icon/social image use public/images/avt.webp. Homepage media uses black-hole.webm and black-hole-poster.jpg. Public paths are prefixed with import.meta.env.BASE_URL. Project overviews require no image. Reveal effects respect reduced motion; video playback pauses and CSS leaves the poster visible.

Tests cover desktop 1280×800, tablet 768×1024 and mobile 375×667; these are test dimensions, not CSS breakpoint declarations. Populated Hub fixtures explicitly include application classes in Tailwind scanning so their layout matches production styling.

## Source references

- [src/styles/global.css](../../src/styles/global.css) — `@theme` ([line 19](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/styles/global.css#L19)).
- [app/components/sections/ProjectHub.tsx](../../app/components/sections/ProjectHub.tsx) — `export default function ProjectHub` ([line 26](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/sections/ProjectHub.tsx#L26)).
- [app/components/interactive/VideoBackground.tsx](../../app/components/interactive/VideoBackground.tsx) — `export default function VideoBackground` ([line 4](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/interactive/VideoBackground.tsx#L4)).
- [tests/fixtures/styles.css](../../tests/fixtures/styles.css) — `@source` ([line 2](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/tests/fixtures/styles.css#L2)).

## Related documents

- [Visual tests](../development/testing.md)
