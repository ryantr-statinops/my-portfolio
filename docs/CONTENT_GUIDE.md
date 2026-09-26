# Project Content Guide

## Project metadata

Project metadata is stored in `app/data/projects.json`; project detail Markdown has no frontmatter. Add one JSON record with these fields:

- `id`: unique project identifier; keep it stable after publication.
- `routeSlug`: unique public route slug and matching Markdown filename; keep it stable after publication.
- `title`, `description`, `date`, `category`, `status`, `priority`, `tags`, `impact`, `thumbnail`, `links`, `stack`.

`app/data/project-schema.ts` is the single validation contract. Keep IDs, route slugs and priorities unique; priority `1` is highest. Use the existing category and status allowlists, ISO `YYYY-MM-DD` dates, public thumbnail path `/images/projects/<slug>/thumbnail.webp`, and HTTP(S) URLs for optional GitHub/demo links.

## Detail body

Write project detail text in `app/content/projects/<routeSlug>.md`. Preserve the full project context, technical implementation, challenge/solution, impact claims and source/demo links. Use GitHub Flavored Markdown tables/lists, fenced code blocks, `$...$` inline math and `$$...$$` display math. Markdown images use `/images/...` paths and meaningful alt text; `ProjectMarkdown` prefixes local image URLs with the GitHub Pages base path.

Use objective, specific language. Do not strengthen claims, invent metrics, remove citations or alter public links during format conversion.

## Media

- Keep shared public image paths stable. Add project-specific media only with a published project that references it.
- Verify each thumbnail and inline image exists under `public/images/`.
- Provide concise descriptive alt text. Prefer a diagram or image with useful project context over decorative captures.

## Authoring workflow

1. Add/update metadata in `app/data/projects.json`.
2. Add/update the matching `app/content/projects/<routeSlug>.md` body.
3. Add images under `public/images/` without changing existing public asset URLs.
4. Run `npm run test:unit`, `npm run check` and `npm run build`; browser QA must verify direct route and asset loading.
