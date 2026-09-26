# Ryan Tran - Portfolio

A personal portfolio exploring the connection between applied statistics, software engineering, data systems and infrastructure. The site brings together a personal profile, a capability explorer and a structured registry for project case studies.

Built with React and TypeScript, prerendered with React Router, and published as static files on GitHub Pages.

**[Visit the portfolio](https://ryantr-statinops.github.io/my-portfolio/)** · **[Read the documentation](docs/README.md)** · **[View deployment runs](https://github.com/ryantr-statinops/my-portfolio/actions/workflows/deploy.yml)**

## Contents

- [Ryan Tran - Portfolio](#ryan-tran---portfolio)
  - [Contents](#contents)
  - [About the project](#about-the-project)
  - [Features](#features)
  - [Technology stack](#technology-stack)
  - [Getting started](#getting-started)
    - [Requirements](#requirements)
    - [Install and run](#install-and-run)
    - [Preview the production artifact](#preview-the-production-artifact)
  - [Available commands](#available-commands)
  - [Project structure](#project-structure)
  - [Content and customization](#content-and-customization)
    - [Publish a project](#publish-a-project)
    - [Customize the site](#customize-the-site)
  - [Testing](#testing)
  - [Build and deployment](#build-and-deployment)
  - [Documentation](#documentation)
  - [Contact](#contact)

## About the project

The portfolio uses a command-center visual style: monospace typography, structured project records, capability panels and a small interactive terminal. Its implementation combines static publishing with browser interactions such as category filtering, theme selection and keyboard navigation.

The application is served beneath `/my-portfolio/`. Home and project registry pages are always generated; project detail pages are generated from the validated catalog. Production hosting requires no application server or database.

**Current content status:** the project catalog is empty while case studies are being rebuilt. The registry and homepage show empty states, and Strategy Hub contains capability/stage controls with content preparation messages. The project-detail rendering pipeline is implemented, but no project detail pages are currently published.

## Features

| Area | Implementation |
|---|---|
| Personal profile | Introduction, background, engineering principles and contact links |
| Strategy Hub | Four capability tracks with Frame, Test and Build stages; independent local selection state |
| Project registry | Priority ordering, category filtering, status labels and structured metadata |
| Case study rendering | Markdown articles with GFM, math through KaTeX, metadata and related-project links |
| Portfolio terminal | Local commands, command history and project listings |
| Theme and navigation | Stored theme preference, responsive navigation, skip link and section focus handling |
| Homepage media | Video background with a poster fallback and reduced-motion behavior |
| Static publishing | Prerendered routes, canonical metadata, sitemap generation and a custom 404 page |

The terminal interprets a fixed set of browser-side commands; it does not execute shell commands. Status and integrity labels in the interface are presentation copy, not live infrastructure monitoring. See the [feature documentation](docs/features/README.md) for behavior and limitations.

## Technology stack

| Layer | Tools |
|---|---|
| UI | React 19, React DOM, TypeScript |
| Routing and rendering | React Router 7 Framework Mode with prerendering |
| Build | Vite 6 |
| Styling | Tailwind CSS 4, component CSS, bundled JetBrains Mono fonts |
| Content | JSON catalog, Zod 4 validation, Markdown files |
| Markdown and math | React Markdown, remark-gfm, remark-math, rehype-katex |
| Verification | Vitest 5 and Playwright 1.63 |
| Hosting and CI | GitHub Pages and GitHub Actions |

These versions describe the repository's current stack, not the latest upstream releases. [package.json](package.json) defines dependency ranges and scripts; [package-lock.json](package-lock.json) records the resolved versions. See the [project overview](docs/overview.md#stack) for the version reference.

## Getting started

### Requirements

- Node.js **22.12.0 or later**; CI uses Node 22.12.0.
- npm and Git.
- Chromium browser binaries for Playwright when running browser tests.

No application secrets or custom environment file are required for the current static site.

### Install and run

```sh
git clone https://github.com/ryantr-statinops/my-portfolio.git
cd my-portfolio
npm ci
npm run dev
```

Open the URL printed by the development server under `/my-portfolio/`. Run all commands from the repository root.

### Preview the production artifact

```sh
npm run build
npm run preview
```

Open [http://127.0.0.1:4173/my-portfolio/](http://127.0.0.1:4173/my-portfolio/). Preview serves the existing `dist/` directory; build again after changing source files. Visiting `/` instead of the configured base path returns a 404 from the preview server.

For a different preview port, use `PORT=4174 npm run preview`. See [local setup](docs/development/setup.md) for generated files and troubleshooting.

## Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the React Router development server |
| `npm run check` | Generate route types and run TypeScript checking |
| `npm run build` | Prerender routes and prepare the static artifact in `dist/` |
| `npm run preview` | Serve the built artifact locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run test:smoke` | Run browser smoke and static artifact checks |
| `npm run test:visual` | Compare browser screenshots against tracked baselines |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm test` | Run unit, smoke and visual tests in sequence |

Type checking is a separate command and is not included in `npm test`. Full script definitions and environment overrides are documented in the [configuration reference](docs/reference/configuration.md).

## Project structure

```text
my-portfolio/
├── app/
│   ├── components/          # Layout, sections and interactive UI
│   ├── content/projects/   # Markdown case studies
│   ├── data/               # Catalog, schema, filtering and content access
│   ├── routes/             # Home, registry and project detail modules
│   ├── entry.server.tsx    # Framework server rendering entry
│   ├── root.tsx            # HTML document and shared application shell
│   └── routes.ts           # Route registration
├── src/
│   ├── assets/fonts/       # Bundled fonts and license
│   ├── lib/                # Shared constants and interaction logic
│   └── styles/             # Global styles and theme tokens
├── public/                 # Images, videos, icons and robots.txt
├── scripts/                # Static artifact preparation and preview server
├── tests/                  # Unit tests, browser tests and visual baselines
├── docs/                   # System documentation and source references
└── .github/workflows/      # Validation and Pages deployment
```

`src/` contains active shared code used by the React application. Generated directories such as `node_modules/`, `.react-router/`, `build/`, `dist/` and Playwright output are ignored by Git. The [source code map](docs/reference/code-map.md) links each implementation area to its files and symbols.

## Content and customization

### Publish a project

A project combines three inputs:

1. Metadata in [app/data/projects.json](app/data/projects.json), validated by the [project schema](app/data/project-schema.ts).
2. An article at `app/content/projects/<routeSlug>.md`.
3. A thumbnail at `public/images/projects/<routeSlug>/thumbnail.webp`.

The catalog controls ordering and route generation. Metadata is stored in JSON rather than Markdown frontmatter. Project IDs, route slugs and priorities must be unique; priorities currently range from 1 to 10.

**Before publishing the first project**, update the tests that intentionally assert an empty catalog and a two-page sitemap, then review the affected visual baselines. Follow the [content authoring guide](docs/data/content-authoring.md) and [schema reference](docs/data/project-schema.md) for the complete workflow and a valid example.

### Customize the site

| Change | Starting point |
|---|---|
| Profile and homepage content | [Homepage and navigation](docs/features/homepage-and-navigation.md) |
| Capability/stage content | [Strategy Hub](docs/features/strategy-hub.md) |
| Colors, typography and media | [Styling and assets](docs/design/styling-and-assets.md) |
| Terminal commands | [Terminal behavior](docs/features/terminal.md) |
| Site origin or deployment base path | [Base URL configuration](docs/reference/configuration.md#changing-the-public-base-url) |

The deployment base path is configured in several files. Use the configuration checklist when changing it so routes, assets, sitemap links and browser tests remain aligned.

## Testing

For a full local validation run:

```sh
npm ci
npx playwright install chromium
npm run check
npm run build
npm test
```

On Linux, `npx playwright install --with-deps chromium` can also install the required system libraries where permitted. Building before the first browser-test run ensures the artifact exists for tests that discover generated project routes.

- **Unit tests** cover catalog validation, filtering, strategy data and terminal parsing.
- **Smoke tests** cover published routes, metadata, selected interactions, reduced-motion behavior and static sitemap/404 responses.
- **Visual tests** cover dark/light themes at desktop, tablet and mobile viewport sizes.

Browser tests use the static preview server. Review expected, actual and diff images before updating a baseline; browser and OS differences can affect rendering. CI uses a pinned Playwright container for repeatability. See [testing and visual baselines](docs/development/testing.md) for environment details, snapshot updates and output-permission troubleshooting.

## Build and deployment

The build pipeline is:

```text
Validated catalog + Markdown + React routes
                    ↓
          React Router prerender
                    ↓
       Static artifact preparation
                    ↓
       dist/ → GitHub Pages
```

Artifact preparation collects assets, creates sitemap files and a custom 404 page, and checks required route files. The expected number of generated `index.html` pages is `2 + project count`.

[GitHub Actions](.github/workflows/deploy.yml) runs validation for pull requests targeting `dev` or `main`, pushes to `main`, and manual dispatches. It installs dependencies, reports dependency/audit findings, runs unit tests and type checking, builds the site, checks page counts, and runs smoke and visual tests.

A successful eligible run on `main` uploads `dist/` and deploys it to GitHub Pages. Pull requests validate without deploying. For failure diagnosis and release verification, use the [deployment guide](docs/deployment/github-pages.md).

## Documentation

The [documentation index](docs/README.md) provides reading paths and a complete directory. Pages include section navigation, related topics and source permalinks tied to a verified code revision.

| Topic | Start here |
|---|---|
| Purpose, stack and current state | [Overview](docs/overview.md) |
| Application boundaries, routing and rendering | [Architecture](docs/architecture/README.md) |
| UI behavior and state ownership | [Features](docs/features/README.md) |
| Schema and content authoring | [Data](docs/data/README.md) |
| Themes, styles and assets | [Design](docs/design/README.md) |
| Setup and verification | [Development](docs/development/README.md) |
| CI and publication | [Deployment](docs/deployment/README.md) |
| Exact files, symbols and configuration | [Reference](docs/reference/README.md) |

When changing behavior or configuration, update the corresponding documentation and source references alongside the implementation.

## Contact

- **GitHub:** [ryantr-statinops](https://github.com/ryantr-statinops)
- **LinkedIn:** [Ryan Tran](https://www.linkedin.com/in/ryan-tr/)
- **Email:** [trankhang2856@gmail.com](mailto:trankhang2856@gmail.com)
