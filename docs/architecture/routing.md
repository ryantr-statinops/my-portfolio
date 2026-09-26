# Routing and navigation

[Documentation index](../README.md) · [Section index](README.md)

The only registered application route is the homepage under /my-portfolio/.

## Contents

- [Routes and anchors](#routes-and-anchors)
- [Removed URLs and metadata](#removed-urls-and-metadata)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Routes and anchors

app/routes.ts registers only index(home). react-router.config.ts prerenders only /. Router basename and Vite base remain /my-portfolio/. Navbar and Hero use app-relative hashes through the router.

Section IDs are main, about-me, projects and footer connect. The intelligence-hub compatibility anchor sits at the top of ProjectHub. Section navigation intercepts only same-origin/path/query, unmodified primary clicks with an existing hash target, then updates history, focus and scrolling.

## Removed URLs and metadata

/projects/ and /projects/<slug>/ no longer exist, including when the catalog contains entries. They return HTTP 404 instead of rendering a registry or detail view. The generated error page links to /my-portfolio/#projects. Home metadata includes title, description, canonical URL and avatar social image. Repository links are external HTTPS links rather than application routes.

## Source references

- [app/routes.ts](../../app/routes.ts) — `export default` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/routes.ts#L3)).
- [react-router.config.ts](../../react-router.config.ts) — `prerender:` ([line 6](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/react-router.config.ts#L6)).
- [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) — `export function navigateToSection` ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/lib/sectionNavigation.ts#L1)).
- [app/routes/home.tsx](../../app/routes/home.tsx) — `export const meta` ([line 10](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/routes/home.tsx#L10)).

## Related documents

- [Homepage](../features/homepage-and-navigation.md)
