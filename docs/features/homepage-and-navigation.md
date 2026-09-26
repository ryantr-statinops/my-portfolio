# Homepage and navigation

[Documentation index](../README.md) · [Section index](README.md)

The homepage has four visible areas: Hero, About Me, Project Hub and Connect.

## Contents

- [Composition](#composition)
- [Navigation and focus](#navigation-and-focus)
- [Theme and motion](#theme-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Composition

Home renders Hero, the about-me section and ProjectHub with the validated catalog. SiteShell provides fixed navigation, the homepage video, skip link, main content and shared footer. Profile content lives in Hero/AboutMe; contact links and scroll-to-top live in Footer.

## Navigation and focus

Desktop and mobile navigation contain About Me, Projects and Connect. Keep their section arrays aligned. Hero View Projects links to #projects. Modified/external navigation is left to normal link behavior; matching same-page section clicks update history, focus and scroll. The shell observes visible sections for aria-current.

Mobile opening focuses the first link; Escape and explicit close restore menu-button focus. Choosing a section closes without forcing focus back. The overlay is not a full modal focus trap. The skip link targets main-content.

## Theme and motion

The root initializes dark/light from localStorage or system preference. ThemeToggle persists the selected theme. Homepage video styling retains dark contrast tokens even in light preference. VideoBackground mounts on the home route and retains its poster when reduced motion is enabled or autoplay fails. Reveal effects activate immediately under reduced motion. Footer deployment/security labels are static presentation copy.

## Source references

- [app/routes/home.tsx](../../app/routes/home.tsx) — `export default function Home` ([line 19](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/routes/home.tsx#L19)).
- [app/components/layout/SiteShell.tsx](../../app/components/layout/SiteShell.tsx) — `export default function SiteShell` ([line 9](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/SiteShell.tsx#L9)).
- [app/components/layout/Navbar.tsx](../../app/components/layout/Navbar.tsx) — `const navItems` ([line 5](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/Navbar.tsx#L5)).
- [app/components/layout/MobileOverlay.tsx](../../app/components/layout/MobileOverlay.tsx) — `const navItems` ([line 6](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/app/components/layout/MobileOverlay.tsx#L6)).
- [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) — `export function navigateToSection` ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/lib/sectionNavigation.ts#L1)).

## Related documents

- [Project Hub](project-hub.md)
