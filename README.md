# Ryan Tran — Portfolio

A static React portfolio for profile, engineering capabilities and project case studies, published on [GitHub Pages](https://ryantr-statinops.github.io/my-portfolio/).

## Documentation

Start at the [documentation index](docs/README.md). The documentation is organized by system area, with section indexes, heading links and source permalinks.

- [Overview and stack](docs/overview.md)
- [Architecture](docs/architecture/README.md)
- [Feature behavior](docs/features/README.md)
- [Project data and authoring](docs/data/README.md)
- [Styling and assets](docs/design/README.md)
- [Development and testing](docs/development/README.md)
- [Deployment](docs/deployment/README.md)
- [Code and configuration reference](docs/reference/README.md)

## Stack and current state

React 19, React Router 7 Framework Mode, TypeScript, Vite and Tailwind CSS 4. Project metadata is validated with Zod; articles use Markdown with GFM and math rendering. Vitest and Playwright cover logic, static routes and visual baselines.

The catalog is currently empty. Home and registry pages are prerendered; detail pages are generated when projects are published. Strategy content is currently a scaffold. See the [overview](docs/overview.md) for the verified versions and implementation boundaries.

## Local development

Requires Node.js `>=22.12.0`. Run from the repository root:

```sh
npm ci
npm run dev
```

Use the dev server URL under `/my-portfolio/`. To preview the production artifact:

```sh
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/my-portfolio/`. See [setup](docs/development/setup.md) for generated files and troubleshooting, and [testing](docs/development/testing.md) for browser installation and validation commands.

## Release workflow

Pull requests targeting `dev` or `main` run validation. Pushes to `main` run the same checks and deploy `dist/` to GitHub Pages after success. See the [deployment guide](docs/deployment/github-pages.md) for the exact steps and failure diagnosis.
