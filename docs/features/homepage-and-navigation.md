# Homepage and site navigation

[Documentation index](../README.md) · [Section index](README.md)

Identify the components responsible for homepage content and shared navigation.

## Contents

- [Composition](#composition)
- [Navigation and accessibility](#navigation-and-accessibility)
- [Theme and background](#theme-and-background)
- [Editing checklist](#editing-checklist)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Composition

Home renders `Hero`, an `about-me` wrapper around `AboutMe`, `StrategyHub` and `ProjectShowcase` with a limit of six. The shared shell surrounds every route with navigation, skip link, main content and footer. The video background is mounted only when the router pathname is `/`.

Profile copy belongs in Hero/AboutMe; navigation labels and section IDs are duplicated in Navbar and MobileOverlay, so keep those arrays aligned. Footer provides the connect section and scroll-to-top control.

## Navigation and accessibility

The fixed desktop navbar shows section links at the `md` breakpoint; narrower screens use a menu button and overlay. Opening the overlay focuses the first link. Close and Escape restore focus to the menu button; choosing a section closes without forcing focus back. The implementation does not establish a full modal focus trap.

The shell’s skip link targets `main-content`. Section navigation respects modifier clicks and reduced motion. Reveal elements activate on intersection or immediately for reduced motion.

## Theme and background

The root initializes the `dark` class using stored `theme` or system preference. ThemeToggle changes the class and saves `dark`/`light` in localStorage. The homepage also receives `homepage-video`, whose CSS intentionally uses dark contrast tokens even for light preference.

VideoBackground uses `black-hole.webm` and its poster, mutes and loops playback, and listens for reduced-motion changes. CSS hides the video for reduced motion; the poster stays visible. Autoplay rejection is caught. The registry does not mount the background.

## Editing checklist

Keep section IDs aligned with both navigation arrays and browser selectors. Check desktop and mobile navigation, Escape, keyboard focus and same-page hashes after navigation edits. For media changes, confirm the poster still works with reduced motion and blocked autoplay. Product labels such as the footer deployment version are hard-coded copy, not runtime release information.

## Source references

- [app/routes/home.tsx](../../app/routes/home.tsx) — `export default function Home` ([source line 20](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/home.tsx#L20)).
- [app/components/layout/SiteShell.tsx](../../app/components/layout/SiteShell.tsx) — `export default function SiteShell` ([source line 9](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/SiteShell.tsx#L9)).
- [app/components/layout/Navbar.tsx](../../app/components/layout/Navbar.tsx) — `const navItems` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/Navbar.tsx#L5)).
- [app/components/layout/MobileOverlay.tsx](../../app/components/layout/MobileOverlay.tsx) — `const navItems` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/MobileOverlay.tsx#L6)).
- [app/components/layout/ThemeToggle.tsx](../../app/components/layout/ThemeToggle.tsx) — `function toggleTheme` ([source line 6](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/ThemeToggle.tsx#L6)).
- [app/components/interactive/VideoBackground.tsx](../../app/components/interactive/VideoBackground.tsx) — `export default function VideoBackground` ([source line 4](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/VideoBackground.tsx#L4)).
- [app/components/layout/Footer.tsx](../../app/components/layout/Footer.tsx) — `export default function Footer` ([source line 5](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/layout/Footer.tsx#L5)).

## Related documents

- [Routing and navigation](../architecture/routing.md)
- [Styling and assets](../design/styling-and-assets.md)
