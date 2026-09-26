# Portfolio Interface Overview

Current stack: React 19, React Router 7 Framework Mode, TypeScript, Vite and Tailwind CSS 4. React components live under `app/components`; shared category and Strategy data live under `src/lib`.

## Shared shell

`SiteShell` composes the navigation, mobile menu, theme toggle and footer. The homepage keeps its fixed video/poster background; reduced-motion mode uses the poster. Navigation retains the Strategy anchor `#intelligence-hub` and the Projects registry route.

## Homepage

- **Hero:** systems and infrastructure headline, current-focus cards and links to the page sections.
- **About:** two-column profile with principles and supporting details.
- **Strategy:** four capability choices—Software Engineering, Data Engineering, AI Engineering and Other—with Frame, Test and Build stages. Selection stays local to the component. Since copy and evidence are not authored yet, the panel says “Content is being prepared.” Controls appear after client code initializes.
- **Projects:** no homepage filter. The project showcase says “Projects are being rebuilt.” until entries are published.

## Project Registry

`/projects/` has an All option and filters for the four shared categories. The empty catalog displays a rebuilding message and does not render blank project rows. The terminal's `ls /projects` command says “No projects published yet.”

## Responsive and accessible behavior

Navigation, filters and Strategy choices use native buttons and links with visible focus. At narrow widths, capability choices stack vertically while Frame/Test/Build remain in one row. Reduced-motion preference disables continuous animation. The first server-rendered Strategy state remains readable when JavaScript is unavailable.
