# Styling and assets

[Documentation index](../README.md) · [Section index](README.md)

Find the source of theme tokens, typography, component styling and static media.

## Contents

- [Stylesheet ownership](#stylesheet-ownership)
- [Fonts and prose](#fonts-and-prose)
- [Media and paths](#media-and-paths)
- [Responsive behavior and motion](#responsive-behavior-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Stylesheet ownership

Tailwind enters through `@import "tailwindcss"` in the global stylesheet and `@tailwindcss/vite` in Vite. The root links the global CSS; component styles cover the video background and registry. Keep shared tokens in the global stylesheet and local behavior with its component.

`@theme` maps background, foreground, surface, card, border, primary, accent, success and muted utilities to CSS variables. It also defines the mono font stack. The default root is light; `.dark` overrides tokens. Homepage light preference has an additional `.homepage-video:not(.dark)` override to retain dark contrast over the video.

## Fonts and prose

Regular and bold JetBrains Mono TTF files are bundled with weights 400 and 700 and `font-display: swap`. Keep the associated OFL license with the files. KaTeX CSS is imported from the installed package and its fonts are included by the build.

ProjectMarkdown applies `project-prose` plus utility classes. Review the actual global prose rules when changing article layout; the manifest does not declare a separate Tailwind typography plugin.

## Media and paths

| Asset source | Use |
|---|---|
| `public/images/avt.webp` | Avatar, current favicon and social metadata |
| `public/images/black-hole-poster.jpg` | Homepage fallback image |
| `public/videos/black-hole.webm` | Homepage background video |
| `public/images/projects/<slug>/thumbnail.webp` | Convention for future project thumbnails |
| `src/assets/fonts/` | Imported fonts and license |

Public files are copied as static assets. Prefix application image/video URLs with `import.meta.env.BASE_URL`; catalog thumbnail values remain `/images/...` and are prefixed by consumers. Other public files may exist without being active UI inputs; existence alone is not proof of usage.

## Responsive behavior and motion

Navbar switches to mobile controls below `md`; showcase expands across one, two and three columns; Strategy Hub uses its own responsive grid. Browser snapshots cover 1280×800, 768×1024 and 375×667. Smoke additionally checks horizontal overflow at 320 px. These test sizes are not CSS breakpoint definitions.

Reveal classes activate through SiteShell intersection observers. Reduced motion activates reveal elements immediately and disables background-video motion. For visual changes, review both themes and all viewport cases rather than updating snapshots without inspection.

## Source references

- [src/styles/global.css](../../src/styles/global.css) — `@theme` ([source line 19](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/styles/global.css#L19)).
- [src/styles/global.css](../../src/styles/global.css) — `:root.homepage-video` ([source line 63](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/styles/global.css#L63)).
- [app/components/interactive/video-background.css](../../app/components/interactive/video-background.css) — `@media` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/video-background.css#L5)).
- [app/components/sections/portfolio-registry.css](../../app/components/sections/portfolio-registry.css) — `.` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/portfolio-registry.css#L1)).
- [src/assets/fonts/JetBrainsMono-OFL.txt](../../src/assets/fonts/JetBrainsMono-OFL.txt) — `SIL OPEN FONT LICENSE` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/assets/fonts/JetBrainsMono-OFL.txt#L9)).
- [vite.config.ts](../../vite.config.ts) — `plugins:` ([source line 7](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/vite.config.ts#L7)).

## Related documents

- [Theme behavior](../features/homepage-and-navigation.md)
- [Content authoring](../data/content-authoring.md)
- [Visual testing](../development/testing.md#snapshot-contract)
