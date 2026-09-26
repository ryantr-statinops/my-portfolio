# Project overview

[Documentation index](README.md)

Ryan Tran’s static single-page portfolio presents a profile and repository overviews.

## Contents

- [Current product](#current-product)
- [Stack](#stack)
- [Repository layout](#repository-layout)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Current product

The homepage contains Hero, About Me, Project Hub and Connect. Project Hub replaces the former Strategy Hub stages and standalone project registry. Visitors read overviews in a list/panel interface and open GitHub repositories for details. The production catalog contains twelve selected projects: four Software Engineering, two Data Engineering, three AI Engineering and three Other. Each overview includes an editorial lifecycle status.

There is no project detail route, Markdown article pipeline, runtime terminal, application backend or database. Old project URLs return a custom 404 linking to the Hub.

## Stack

React 19 and React Router 7 Framework Mode provide UI, hydration and prerendering. Vite 6 builds the application; Tailwind CSS 4 supplies utilities and theme tokens. Zod 4 validates JSON overviews. TypeScript provides strict checking; Vitest and Playwright verify logic, rendering, browser behavior and screenshots.

Package ranges are in package.json and resolved versions in package-lock.json. These describe the repository, not upstream latest releases. Node requires >=22.12.0; CI selects 22.12.0. Dependencies for server rendering remain necessary during the build even though production is static.

## Repository layout

app contains routes, components and validated catalog modules. src/lib contains site/category constants and section navigation; src/styles and src/assets contain CSS and fonts. public contains static media/robots. scripts prepares and serves dist. tests includes unit/browser cases, separate fixture inputs and screenshot baselines. docs provides maintainer guides. Generated output is ignored by Git.

## Source references

- [package.json](../package.json) — `"dependencies"` ([line 21](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/package.json#L21)).
- [app/routes/home.tsx](../app/routes/home.tsx) — `export default function Home` ([line 19](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/routes/home.tsx#L19)).
- [app/data/projects.json](../app/data/projects.json) — production catalog ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/data/projects.json#L1)).

## Related documents

- [Architecture](architecture/README.md)
- [Project Hub](features/project-hub.md)
