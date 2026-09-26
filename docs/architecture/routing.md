# Routing and navigation

[Documentation index](../README.md) · [Section index](README.md)

Locate route definitions, URL ownership and error handling before changing navigation.

## Contents

- [Published routes](#published-routes)
- [Section navigation](#section-navigation)
- [Metadata and failures](#metadata-and-failures)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Published routes

| Public path | Route module | Condition |
|---|---|---|
| `/my-portfolio/` | `app/routes/home.tsx` | Always |
| `/my-portfolio/projects/` | `app/routes/projects.tsx` | Always |
| `/my-portfolio/projects/:slug/` | `app/routes/project.tsx` | Registered only when the catalog has slugs |

`app/routes.ts` registers routes; `react-router.config.ts` independently lists paths to prerender. Both derive project slugs from the validated catalog. React Router links use app-relative paths such as `/projects/`; the router basename supplies `/my-portfolio/`. Static asset URLs use `import.meta.env.BASE_URL`.

## Section navigation

Home section IDs are `main`, `about-me`, `intelligence-hub`, `projects` and footer `connect`. Desktop and mobile navigation target home hashes. `navigateToSection` intercepts only unmodified primary clicks on the same origin, pathname and query with the expected hash and an existing target. It updates history, focuses the section and scrolls with reduced-motion awareness. Otherwise normal link navigation continues.

The shell observes sections to update desktop `aria-current`. This is viewport observation, not route state or a persisted selection.

## Metadata and failures

Home and registry metadata come from their route modules and `SITE`. Project metadata uses its title, description, thumbnail and canonical URL. The detail loader throws 404 for an unknown slug or missing Markdown. Its error boundary renders a return link and a readable failure message.

Direct unknown static URLs receive the generated `404.html`. The preview server returns HTTP 404 rather than serving the SPA fallback. GitHub Pages serves the artifact’s custom error page; it does not execute the React loader on a server.

## Source references

- [app/routes.ts](../../app/routes.ts) — `export default` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes.ts#L4)).
- [react-router.config.ts](../../react-router.config.ts) — `basename` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/react-router.config.ts#L5)).
- [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) — `export function navigateToSection` ([source line 1](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/sectionNavigation.ts#L1)).
- [app/routes/project.tsx](../../app/routes/project.tsx) — `export function loader` ([source line 10](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L10)).
- [app/routes/project.tsx](../../app/routes/project.tsx) — `export function ErrorBoundary` ([source line 65](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/project.tsx#L65)).

## Related documents

- [Architecture](README.md)
