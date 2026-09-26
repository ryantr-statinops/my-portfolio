# Homepage and navigation

[Documentation index](../README.md) · [Section index](README.md)

The homepage has four visible areas: Hero, About Me, Project Hub and Connect.

## Contents

- [Composition](#composition)
- [About Me content and layout](#about-me-content-and-layout)
- [Connect and footer](#connect-and-footer)
- [Navigation and focus](#navigation-and-focus)
- [Theme and motion](#theme-and-motion)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Composition

Home renders Hero, AboutMe and ProjectHub with the validated catalog. SiteShell provides fixed navigation, the homepage video, skip link, main content and shared footer. Hero retains its headline, introduction and three navigation links: View Profile, View Projects and Contact. AboutMe owns its section anchor, profile, education, availability, contact links and Current Focus. Footer provides a compact connection invitation, four contact channels and a closing bar.

## About Me content and layout

The section has one semantic section element with id about-me and aria-labelledby pointing to about-me-title. The heading is “About Me”, styled consistently with “Project Hub”. “Statistics Student” and “Data · AI · Software” sit outside the profile card, which explains the role of mathematics/statistics as a foundation and programming/engineering as the means of implementation.

Education is a short BSc in Statistics entry for Ton Duc Thang University, Faculty of Mathematics & Statistics, 2024–Present. An availability card below the profile states openness to internship and entry-level opportunities in data, AI and software engineering. It links to LinkedIn, GitHub, email and telephone. Social links open new tabs with noopener/noreferrer and an accessible hint; email and phone use mailto/tel links.

Six Current Focus cards follow in this order: Backend Engineering, Data Engineering, AI Infrastructure, Infrastructure, Quantitative Analytics and Statistics → Engineering. They describe current interests and work rather than proficiency ratings. These cards retain their original Hero titles and concise descriptions, reordered to put Backend, Data and AI first.

Desktop uses two vertical columns in a 60/40 ratio: profile and availability cards stack on the left, and six compact focus cards stack on the right. Below the desktop breakpoint, the columns stack into one reading order. Shared card styles keep borders, backgrounds and spacing consistent. The section grows with content rather than forcing a viewport height.

About Me does not include work experience, achievements, the former Journey/Principles, a CV download or production-readiness claims. Its content is prerendered and has no reveal-animation visibility gate, so the complete profile remains readable without JavaScript.

## Connect and footer

Connect uses a content-height layout with 96 px top padding (128 px on desktop) and 64 px bottom padding. It shares the About Me max-width. At desktop width it has 55/45 columns: an invitation on the left, and one contact box on the right. Below 1024 px the columns stack. It has no minimum viewport height or reveal visibility gate.

“Let’s connect” introduces a general invitation to exchange ideas and projects in data, AI and software. A smaller paragraph also welcomes internship and entry-level opportunities. The contact box contains Email, LinkedIn, GitHub and Phone, in that order. Email appears once with stronger emphasis. Each entire row is a keyboard-focusable link with at least a 44 px target; email and phone use mailto/tel, while social profiles open a new tab with noopener/noreferrer and an accessible hint.

The closing bar contains © 2026 Ryan Tran and a visible “Back to top” button. Its id remains scroll-to-top and accessible name remains “Scroll to top”. Scrolling is instant under reduced motion and smooth otherwise. The footer keeps its transparentBackground prop and connect anchor. It has no form, online status, deployment/security claims, repeated avatar or location.

## Navigation and focus

Desktop and mobile navigation contain About Me, Projects and Connect. Keep their section arrays aligned. Hero View Projects links to #projects. Modified/external navigation is left to normal link behavior; matching same-page section clicks update history, focus and scroll. The shell tracks sections at a reading line 40% down the viewport for aria-current, clears the highlight in Hero and selects Connect at the bottom of the page. Scroll updates are batched with requestAnimationFrame.

Mobile opening focuses the first link; Escape and explicit close restore menu-button focus. Choosing a section closes without forcing focus back. The overlay is not a full modal focus trap. The skip link targets main-content.

## Theme and motion

The root initializes dark/light from localStorage or system preference. ThemeToggle in the mobile menu persists the selected theme; the desktop navbar has no theme button. Homepage video styling retains dark contrast tokens even in light preference. VideoBackground mounts on the home route and retains its poster when reduced motion is enabled or autoplay fails. Reveal effects activate immediately under reduced motion. About Me and Connect remain readable without JavaScript.

## Source references

- [app/components/layout/Footer.tsx](../../app/components/layout/Footer.tsx) — [Footer](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/layout/Footer.tsx#L12).

- [app/components/sections/Hero.tsx](../../app/components/sections/Hero.tsx) — [Hero](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/sections/Hero.tsx#L3).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [AboutMe](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/sections/AboutMe.tsx#L17).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [contacts](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/sections/AboutMe.tsx#L10).

- [app/components/sections/AboutMe.tsx](../../app/components/sections/AboutMe.tsx) — [focusAreas](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/sections/AboutMe.tsx#L1).

- [app/routes/home.tsx](../../app/routes/home.tsx) — `export default function Home` ([line 19](https://github.com/ryantr-statinops/my-portfolio/blob/8fceddadcb5a368eb6fc155954840582ead88b61/app/routes/home.tsx#L19)).
- [app/components/layout/SiteShell.tsx](../../app/components/layout/SiteShell.tsx) — `export default function SiteShell` ([line 9](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/layout/SiteShell.tsx#L9)).
- [app/components/layout/Navbar.tsx](../../app/components/layout/Navbar.tsx) — `const navItems` ([line 4](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/layout/Navbar.tsx#L4)).
- [app/components/layout/MobileOverlay.tsx](../../app/components/layout/MobileOverlay.tsx) — `const navItems` ([line 6](https://github.com/ryantr-statinops/my-portfolio/blob/bc71cdaa778c74acdc05ae548bccad1b7379c700/app/components/layout/MobileOverlay.tsx#L6)).
- [src/lib/sectionNavigation.ts](../../src/lib/sectionNavigation.ts) — `export function navigateToSection` ([line 1](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/src/lib/sectionNavigation.ts#L1)).

## Related documents

- [Project Hub](project-hub.md)
