# Homepage and navigation

[Documentation index](../README.md) · [Section index](README.md)

The homepage has four visible areas: Hero, About Me, Project Hub and Connect.

## Contents

- [Composition](#composition)
- [About Me content and layout](#about-me-content-and-layout)
- [Navigation and focus](#navigation-and-focus)
- [Theme and motion](#theme-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Composition

Home renders Hero, AboutMe and ProjectHub with the validated catalog. SiteShell provides fixed navigation, the homepage video, skip link, main content and shared footer. Hero retains its headline, introduction and two navigation links. AboutMe owns its section anchor, profile, education, availability, contact links and Current Focus. Footer retains its existing Connect content and scroll-to-top control.

## About Me content and layout

The section has one semantic section element with id about-me and aria-labelledby pointing to about-me-title. The label is “01 / About me”. A large profile card presents “Statistics Student” and “Data · AI · Software”, followed by the role of mathematics/statistics as a foundation and programming/engineering as the means of implementation.

Education is a short BSc in Statistics entry for Ton Duc Thang University, Faculty of Mathematics & Statistics, 2024–Present. A neighboring availability card states openness to internship and entry-level opportunities in data, AI and software engineering. It links to LinkedIn, GitHub, email and telephone. Social links open new tabs with noopener/noreferrer and an accessible hint; email and phone use mailto/tel links.

Six Current Focus cards follow in this order: Backend Engineering, Data Engineering, AI Engineering, Infrastructure, Quantitative Analytics and Statistics → Engineering. They describe current interests and work rather than proficiency ratings. These cards were moved from Hero; AI Engineering replaces the former AI Infrastructure label.

Desktop uses a larger profile column beside a smaller availability column, followed by a three-column focus grid. Tablet uses two focus columns; mobile uses one column throughout. Shared card styles keep borders, backgrounds and spacing consistent. The section grows with content rather than forcing a viewport height.

About Me does not include work experience, achievements, the former Journey/Principles, a CV download or production-readiness claims. Its content is prerendered and has no reveal-animation visibility gate, so the complete profile remains readable without JavaScript.

## Navigation and focus

Desktop and mobile navigation contain About Me, Projects and Connect. Keep their section arrays aligned. Hero View Projects links to #projects. Modified/external navigation is left to normal link behavior; matching same-page section clicks update history, focus and scroll. The shell observes visible sections for aria-current.

Mobile opening focuses the first link; Escape and explicit close restore menu-button focus. Choosing a section closes without forcing focus back. The overlay is not a full modal focus trap. The skip link targets main-content.

## Theme and motion

The root initializes dark/light from localStorage or system preference. ThemeToggle persists the selected theme. Homepage video styling retains dark contrast tokens even in light preference. VideoBackground mounts on the home route and retains its poster when reduced motion is enabled or autoplay fails. Reveal effects activate immediately under reduced motion. Footer deployment/security labels are static presentation copy.

## Source references

- [app/components/sections/Hero.tsx](../../app/components/sections/Hero.tsx) — [Hero](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/components/sections/Hero.tsx#L3).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [AboutMe](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/components/sections/AboutMe.tsx#L19).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [contacts](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/components/sections/AboutMe.tsx#L10).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [focusAreas](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/components/sections/AboutMe.tsx#L1).

- [app/routes/home.tsx](../../app/routes/home.tsx) — `export default function Home` ([line 19](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/routes/home.tsx#L19)).
- [app/components/layout/SiteShell.tsx](../../app/components/layout/SiteShell.tsx) — `export default function SiteShell` ([line 9](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/SiteShell.tsx#L9)).
- [app/components/layout/Navbar.tsx](../../app/components/layout/Navbar.tsx) — `const navItems` ([line 5](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/Navbar.tsx#L5)).
- [app/components/layout/MobileOverlay.tsx](../../app/components/layout/MobileOverlay.tsx) — `const navItems` ([line 6](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/MobileOverlay.tsx#L6)).
- [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) — `export function navigateToSection` ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/lib/sectionNavigation.ts#L1)).

## Related documents

- [Project Hub](project-hub.md)
