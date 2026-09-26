# Ryan Tran — Command Center Portfolio

A personal portfolio connecting applied statistics, software engineering, data systems and infrastructure. The homepage combines a personal profile with a Project Hub for exploring repository overviews.

Built with React and TypeScript, prerendered with React Router and published as static files on GitHub Pages.

**[Visit the portfolio](https://ryantr-statinops.github.io/my-portfolio/)** · **[Documentation](docs/README.md)** · **[Deployment runs](https://github.com/ryantr-statinops/my-portfolio/actions/workflows/deploy.yml)**

## Contents

- [About the project](#about-the-project)
- [Project Hub](#project-hub)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [Publishing an overview](#publishing-an-overview)
- [Testing](#testing)
- [Build and deployment](#build-and-deployment)
- [Documentation](#documentation)
- [Contact](#contact)

## About the project

The homepage has four areas: **Hero → About Me → Project Hub → Connect**. Its visual style uses monospace typography, structured content, theme controls and a homepage video with a reduced-motion poster fallback.

The site is served beneath `/my-portfolio/` and needs no production application server or database. There is one application route: the homepage. Project details live in the linked GitHub repositories.

**Published catalog:** 12 selected projects with English overviews, technology stacks, lifecycle statuses and GitHub repository links.

| Category | Projects |
|---|---|
| Software Engineering | HomeMatch, Orbit System Manager, Statistical Computing Lab, InfoBoard |
| Data Engineering | Admissions CRM Automation, CSV Schema Alignment |
| AI Engineering | ScrawlNews, Agent Skill Library, Alpha Strategy Agent |
| Other | Grap4Prob, Poisson Process Analytics, Mean Reversion Analytics |

Statuses are maintained editorially: **Pending**, **Building**, **Active**, **Paused**, **Completed** and **Archived**. They describe project lifecycle, not verified uptime or GitHub archive settings. See the [status definitions](docs/data/project-schema.md#lifecycle-statuses).

## Project Hub

Project Hub combines category selection, a project list and an overview panel:

- Browse All, Software Engineering, Data Engineering, AI Engineering or Other.
- Projects appear in ascending `priority` order; the first visible project is selected initially.
- Choosing a category preserves the current project when it still matches, or selects the first result. Empty groups clear the panel.
- Read the title, category, lifecycle status, plain-text overview and tech stack, then open **View repository** in a new tab.
- Desktop uses a list beside the panel; smaller screens stack the list above it.
- Without JavaScript, all overviews and repository links remain readable in an ordered static presentation.

The former Frame → Test → Build controls, separate project showcase, registry, article pages and terminal have been removed. Old `/projects/` URLs return a custom 404 linking back to the Hub. The former `#intelligence-hub` anchor still points to the Hub location.

See [Project Hub behavior](docs/features/project-hub.md) for selection, accessibility and empty-state details.

## Technology stack

| Layer | Tools |
|---|---|
| UI | React 19, React DOM, TypeScript |
| Routing and rendering | React Router 7 Framework Mode, homepage prerender |
| Build | Vite 6 |
| Styling | Tailwind CSS 4, component CSS, bundled JetBrains Mono |
| Content | JSON repository overviews validated with Zod 4 |
| Verification | Vitest 5 and Playwright 1.63 |
| Hosting and CI | GitHub Pages and GitHub Actions |

These are repository stack versions, not claims about upstream latest releases. [package.json](package.json) defines ranges and scripts; [package-lock.json](package-lock.json) records resolved dependencies. There is no Markdown or math-rendering dependency in the current content pipeline.

## Getting started

Requires Node.js **22.12.0 or later**, npm and Git. CI uses Node 22.12.0. No application secret or custom environment file is required.

```sh
git clone https://github.com/ryantr-statinops/my-portfolio.git
cd my-portfolio
npm ci
npm run dev
```

Open the dev server URL printed in the terminal under `/my-portfolio/`. Run commands from the repository root.

To preview the production artifact:

```sh
npm run build
npm run preview
```

Open [http://127.0.0.1:4173/my-portfolio/](http://127.0.0.1:4173/my-portfolio/). Preview serves the existing `dist/`; rebuild after source changes. The bare `/` is outside its configured base and returns 404. `PORT=4175 npm run preview` selects a different port.

See [local setup](docs/development/setup.md) for generated files and troubleshooting.

## Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run check` | Generate route types and run TypeScript checking |
| `npm run build` | Prerender home and prepare `dist/` |
| `npm run preview` | Serve the built artifact locally |
| `npm run test:unit` | Verify schema, selection helpers and static Hub rendering |
| `npm run test:smoke` | Check production routes/navigation and populated fixture interactions |
| `npm run test:visual` | Compare homepage and populated Hub screenshots |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm test` | Run unit, smoke and visual tests in sequence |

Type checking is separate from `npm test`. See the [configuration reference](docs/reference/configuration.md) for scripts and environment inputs.

## Project structure

```text
my-portfolio/
├── app/
│   ├── components/          # Shared layout, homepage sections and ProjectHub
│   ├── data/                # JSON catalog, Zod schema and selection helpers
│   ├── routes/home.tsx      # Homepage composition and metadata
│   ├── entry.server.tsx     # Build-time framework rendering
│   ├── root.tsx             # Document and shared shell
│   └── routes.ts            # Homepage route registration
├── src/
│   ├── assets/fonts/        # Bundled fonts and license
│   ├── lib/                 # Site/category constants and section navigation
│   └── styles/              # Global CSS and theme tokens
├── public/                  # Homepage media, icons and robots.txt
├── scripts/                 # Artifact preparation and static preview
├── tests/
│   ├── e2e/                 # Browser tests and visual baselines
│   └── fixtures/            # Isolated populated Hub test page and records
├── docs/                    # System documentation and source references
└── .github/workflows/       # Validation and Pages deployment
```

`src/` contains active shared code. Generated dependencies, build output and test reports are ignored; visual baseline PNGs are tracked test inputs. The [source code map](docs/reference/code-map.md) links to exact implementation locations.

## Publishing an overview

Add a record to [app/data/projects.json](app/data/projects.json) with:

- A unique lowercase hyphenated `id`.
- `title`, plain-text `description`, one supported `category` and a `stack` array.
- A required `status`: `pending`, `building`, `active`, `paused`, `completed` or `archived`.
- A unique positive integer `priority`; lower numbers appear first, with no upper limit of ten.
- A required `links.github` URL such as `https://github.com/owner/repository`.

No Markdown article, thumbnail or detail route is needed. Repository URL validation checks shape and protocol; verify the actual repository is available to visitors before publishing.

Use the [schema example](docs/data/project-schema.md) and [authoring guide](docs/data/content-authoring.md). When changing the curated selection, update catalog assertions and review visual baselines. Commit each project separately. The sitemap stays at one homepage regardless of project count.

For other changes, see [homepage/navigation](docs/features/homepage-and-navigation.md), [styling/assets](docs/design/styling-and-assets.md) and the [base URL checklist](docs/reference/configuration.md#changing-the-public-base-url).

## Testing

```sh
npm ci
npx playwright install chromium
npm run check
npm run build
npm test
```

On Linux, `npx playwright install --with-deps chromium` can install system libraries where permitted. Browser tests start production preview on port 4173 and a separate populated-fixture server on port 4174; keep both ports available. Fixture records are never imported into production routes.

- Unit tests cover validation, all six statuses, the published catalog, priority/category ordering, selection transitions and readable pre-hydration output.
- Browser tests cover navigation, keyboard interactions, mobile overflow, empty/populated Hub states, repository links and removed-route 404s.
- Visual tests cover both themes at desktop, tablet and mobile sizes, including the populated list/panel layout.

Review actual and diff images before accepting snapshot changes. CI uses a pinned Playwright container; keep browser versions aligned when investigating rendering differences. See the [testing guide](docs/development/testing.md) for baseline review and output-permission troubleshooting.

## Build and deployment

```text
JSON overviews → Zod validation → Home / Project Hub
                                      ↓
                            React Router prerender
                                      ↓
                       Static artifact → GitHub Pages
```

Artifact preparation gathers assets, generates sitemap files and a custom 404, and verifies the required files. CI expects **one `index.html`**, independent of catalog size.

[GitHub Actions](.github/workflows/deploy.yml) validates pushes to `main`, pull requests targeting `dev`/`main`, and manual runs. It installs dependencies, reports outdated packages/audit findings, checks types and tests, builds, verifies the artifact and compares visual baselines. Eligible successful runs on `main` deploy `dist/`; pull requests do not publish.

Follow the [deployment guide](docs/deployment/github-pages.md) to diagnose a failing step or verify a release.

## Documentation

Start at the [documentation index](docs/README.md). Each area includes navigation and references to source files and verified code revisions.

| Area | Guide |
|---|---|
| Purpose and current state | [Overview](docs/overview.md) |
| Routing and rendering | [Architecture](docs/architecture/README.md) |
| Homepage and Project Hub | [Features](docs/features/README.md) |
| Schema and authoring | [Data](docs/data/README.md) |
| Styling and assets | [Design](docs/design/README.md) |
| Setup and tests | [Development](docs/development/README.md) |
| CI and hosting | [Deployment](docs/deployment/README.md) |
| Symbols and configuration | [Reference](docs/reference/README.md) |

Update related docs and source references alongside behavior changes.

## Contact

- **GitHub:** [ryantr-statinops](https://github.com/ryantr-statinops)
- **LinkedIn:** [Ryan Tran](https://www.linkedin.com/in/ryan-tr/)
- **Email:** [trankhang2856@gmail.com](mailto:trankhang2856@gmail.com)
