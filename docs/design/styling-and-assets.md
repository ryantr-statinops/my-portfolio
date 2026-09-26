# Styling and assets

[Documentation index](../README.md) · [Section index](README.md)

Shared styling lives in the global stylesheet; media-specific rules live with VideoBackground.

## Contents

- [Tokens and type](#tokens-and-type)
- [Hub layout](#hub-layout)
- [Assets and motion](#assets-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Tokens and type

Tailwind is imported by src/styles/global.css and compiled by its Vite plugin. @theme exposes CSS-variable colors and the mono font stack. Root variables define light values; .dark overrides them. The homepage-video light override preserves dark contrast above the video. Regular/bold JetBrains Mono fonts are bundled with their OFL license. There is no KaTeX or Markdown prose styling pipeline.

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
