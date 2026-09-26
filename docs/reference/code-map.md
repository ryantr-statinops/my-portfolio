# Source code map

[Documentation index](../README.md) · [Section index](README.md)

Use the file link for the working copy or the symbol permalink for an exact location in the documented source snapshot.

## Contents

- [Application and shared logic](#application-and-shared-logic)
- [Build and preview scripts](#build-and-preview-scripts)
- [Tests](#tests)
- [Other tracked inputs](#other-tracked-inputs)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Application and shared logic

| Source | Symbols or entry point | Responsibility |
|---|---|---|
| [app/components/ProjectMarkdown.tsx](../../app/components/ProjectMarkdown.tsx) | [`ProjectMarkdown`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/ProjectMarkdown.tsx#L11) | GFM/math pipeline and image URL rewrite |
| [app/components/interactive/ProjectFilter.tsx](../../app/components/interactive/ProjectFilter.tsx) | [`ProjectFilter`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/ProjectFilter.tsx#L9) | Controlled category buttons |
| [app/components/interactive/SystemTerminal.tsx](../../app/components/interactive/SystemTerminal.tsx) | [`SystemTerminal`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/SystemTerminal.tsx#L18) | Terminal input, output and history state |
| [app/components/interactive/VideoBackground.tsx](../../app/components/interactive/VideoBackground.tsx) | [`VideoBackground`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/VideoBackground.tsx#L4) | Homepage media and reduced-motion listener |
| [app/components/interactive/video-background.css](../../app/components/interactive/video-background.css) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/video-background.css#L1) | Media appearance and reduced-motion rules |
| [app/components/layout/Footer.tsx](../../app/components/layout/Footer.tsx) | [`Footer`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/Footer.tsx#L5) | Contact links, display labels and scroll-to-top |
| [app/components/layout/MobileOverlay.tsx](../../app/components/layout/MobileOverlay.tsx) | [`MobileOverlay`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/MobileOverlay.tsx#L19) | Mobile links, initial focus and close actions |
| [app/components/layout/Navbar.tsx](../../app/components/layout/Navbar.tsx) | [`Navbar`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/Navbar.tsx#L19) | Desktop section links and mobile menu button |
| [app/components/layout/SiteShell.tsx](../../app/components/layout/SiteShell.tsx) | [`SiteShell`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/SiteShell.tsx#L9) | Shared layout, menu state and observers |
| [app/components/layout/ThemeToggle.tsx](../../app/components/layout/ThemeToggle.tsx) | [`ThemeToggle`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/ThemeToggle.tsx#L5) | Theme class and localStorage persistence |
| [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) | [`AboutMe`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/AboutMe.tsx#L15) | Profile and background content |
| [app/components/sections/Hero.tsx](../../app/components/sections/Hero.tsx) | [`Hero`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/Hero.tsx#L12) | Homepage introduction and primary links |
| [app/components/sections/PortfolioRegistry.tsx](../../app/components/sections/PortfolioRegistry.tsx) | [`PortfolioRegistry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/PortfolioRegistry.tsx#L18) | Status table and empty registry |
| [app/components/sections/ProjectCard.tsx](../../app/components/sections/ProjectCard.tsx) | [`ProjectCard`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/ProjectCard.tsx#L9) | Project summary card and detail link |
| [app/components/sections/ProjectShowcase.tsx](../../app/components/sections/ProjectShowcase.tsx) | [`ProjectShowcase`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/ProjectShowcase.tsx#L9) | Limited homepage cards and empty state |
| [app/components/sections/StrategyHub.tsx](../../app/components/sections/StrategyHub.tsx) | [`StrategyHub`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/StrategyHub.tsx#L11) | Capability/stage selection and decision panel |
| [app/components/sections/portfolio-registry.css](../../app/components/sections/portfolio-registry.css) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/sections/portfolio-registry.css#L1) | Registry-specific table styling |
| [app/data/project-content.ts](../../app/data/project-content.ts) | [`readProjectMarkdown`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-content.ts#L7) | Eager Markdown import and missing-content response |
| [app/data/project-filter.ts](../../app/data/project-filter.ts) | [`projectCategories`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-filter.ts#L4), [`toggleProjectCategory`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-filter.ts#L6), [`filterProjects`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-filter.ts#L14) | Category toggle and OR filtering |
| [app/data/project-schema.ts](../../app/data/project-schema.ts) | [`projectCategorySchema`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L4), [`projectSchema`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L6), [`projectCatalogSchema`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L31), [`Project`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/project-schema.ts#L52) | Item contract, collection uniqueness and Project type |
| [app/data/projects.json](../../app/data/projects.json) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.json#L1) | Checked-in catalog, currently empty |
| [app/data/projects.ts](../../app/data/projects.ts) | [`projects`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L4), [`orderedProjects`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L5), [`projectRouteSlugs`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L6), [`getProjectBySlug`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/data/projects.ts#L7) | Validation, ordered entries and slug lookup |
| [app/entry.server.tsx](../../app/entry.server.tsx) | [`streamTimeout`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/entry.server.tsx#L7), [`handleRequest`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/entry.server.tsx#L9) | Streaming renderer used by framework rendering |
| [app/root.tsx](../../app/root.tsx) | [`links`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/root.tsx#L9), [`meta`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/root.tsx#L15), [`Layout`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/root.tsx#L25), [`App`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/root.tsx#L44) | Document, assets, theme initialization and route outlet |
| [app/routes.ts](../../app/routes.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes.ts#L4) | Conditional route registration |
| [app/routes/home.tsx](../../app/routes/home.tsx) | [`meta`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/home.tsx#L11), [`Home`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/home.tsx#L20) | Homepage composition and metadata |
| [app/routes/project.tsx](../../app/routes/project.tsx) | [`loader`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L10), [`meta`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L18), [`ProjectRoute`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L43), [`ErrorBoundary`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L65) | Detail loader, metadata, rendering and error boundary |
| [app/routes/projects.tsx](../../app/routes/projects.tsx) | [`meta`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/projects.tsx#L12), [`Projects`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/projects.tsx#L22) | Registry selection state and terminal command inputs |
| [src/lib/constants.ts](../../src/lib/constants.ts) | [`SITE`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/constants.ts#L1), [`CATEGORY_IDS`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/constants.ts#L8), [`CATEGORY_MAP`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/constants.ts#L15) | Site identity, origin, base path and category IDs/labels |
| [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) | [`navigateToSection`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/sectionNavigation.ts#L1) | Same-page navigation interception and focus |
| [src/lib/strategy.ts](../../src/lib/strategy.ts) | [`STRATEGY_STAGES`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L3), [`StrategyStage`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L5), [`StrategyStageContent`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L7), [`StrategyTrack`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L18), [`STRATEGY_TRACKS`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/strategy.ts#L36) | Stage types and empty capability tracks |
| [src/lib/terminal.ts](../../src/lib/terminal.ts) | [`TerminalCommandMap`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/terminal.ts#L1), [`TerminalCommandResult`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/terminal.ts#L3), [`TERMINAL_HELP`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/terminal.ts#L8), [`parseTerminalCommand`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/terminal.ts#L10) | Pure command normalization and result parsing |
| [src/styles/global.css](../../src/styles/global.css) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/styles/global.css#L19) | Tailwind entry, fonts, tokens, reveal and prose styles |

## Build and preview scripts

| Source | Symbols or entry point | Responsibility |
|---|---|---|
| [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/prepare-static-artifact.mjs#L4) | Assemble deployable files and sitemap/404 |
| [scripts/static-preview.mjs](../../scripts/static-preview.mjs) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/static-preview.mjs#L5) | Local base-path static HTTP server |

## Tests

| Source | Symbols or entry point | Responsibility |
|---|---|---|
| [tests/e2e/smoke.spec.ts](../../tests/e2e/smoke.spec.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/smoke.spec.ts#L5) | Browser behavior and artifact assertions |
| [tests/e2e/static-artifact.spec.ts](../../tests/e2e/static-artifact.spec.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/static-artifact.spec.ts#L3) | Browser behavior and artifact assertions |
| [tests/e2e/visual.spec.ts](../../tests/e2e/visual.spec.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/e2e/visual.spec.ts#L5) | Browser behavior and artifact assertions |
| [tests/project-catalog.test.ts](../../tests/project-catalog.test.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/project-catalog.test.ts#L5) | Unit behavior assertions |
| [tests/react-project-filter.test.ts](../../tests/react-project-filter.test.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/react-project-filter.test.ts#L5) | Unit behavior assertions |
| [tests/strategy.test.ts](../../tests/strategy.test.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/strategy.test.ts#L5) | Unit behavior assertions |
| [tests/terminal.test.ts](../../tests/terminal.test.ts) | [`entry`](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/tests/terminal.test.ts#L4) | Unit behavior assertions |

## Other tracked inputs

Project Markdown belongs in `app/content/projects/` (currently only `.gitkeep`). Public assets are under `public/`; bundled fonts and the license are under `src/assets/fonts/`. Screenshot PNGs under `tests/e2e/visual.spec.ts-snapshots/` are expected test inputs, not generated failure output. Tool configuration is indexed in the configuration reference when available.

## Source references

- [app/root.tsx](../../app/root.tsx) — `export default function App` ([source line 44](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/root.tsx#L44)).
- [app/routes.ts](../../app/routes.ts) — `export default` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes.ts#L4)).

## Related documents

- [Architecture](../architecture/README.md)
- [Features](../features/README.md)
- [Testing](../development/testing.md)
