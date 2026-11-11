# Portfolio Redesign — Master Implementation Roadmap (Renlenon Style)

> **Branch**: `main`
> **Commit Policy**: 1 task = 1 independent commit (Conventional Commits)
> **Target Aesthetic**: Modern Minimalist / Personal Editorial ([renlenon.vercel.app](https://renlenon.vercel.app/))
> **Core Stack**: React 19, TypeScript, React Router v7 (`basename: "/my-portfolio/"`), Tailwind CSS v4, Zod schema catalog.
> **Overall Progress**: 100% Completed (Stages 1 – 6 Fully Delivered & Verified)

---

## Stage Breakdown & Delivery Summary

| Stage | File | Focus | Commits | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 1** | [`stage-1-shell-and-navigation.md`](./stage-1-shell-and-navigation.md) | Centralized `max-w-3xl` container, minimal sticky navbar with monogram `RT`, removal of vertical stepper | 7 commits | **Completed** |
| **Stage 2** | [`stage-2-hero-and-identity.md`](./stage-2-hero-and-identity.md) | Avatar with verified badge, full name, social links, headline, 3-column stats cards | 6 commits | **Completed** |
| **Stage 3** | [`stage-3-experience-and-education.md`](./stage-3-experience-and-education.md) | 2-column chronological experience timeline, BSc in Statistics education block | 2 commits | **Completed** |
| **Stage 4** | [`stage-4-projects-showcase.md`](./stage-4-projects-showcase.md) | Big Featured Project showcase card, compact project card grid with tech stack badges | 4 commits | **Completed** |
| **Stage 5** | [`stage-5-skills-and-lifestyle.md`](./stage-5-skills-and-lifestyle.md) | 3-row bidirectional infinite marquee with official vector brand icons, streamlined Connect footer | 8 commits | **Completed** |
| **Stage 6** | [`stage-6-verification-and-tests.md`](./stage-6-verification-and-tests.md) | Local Chrome integration, smoke test alignment, visual regression snapshot baseline refresh | 4 commits | **Completed** |

---

## Operating Protocol (`commit-workflow`)

- **Branch**: All stages execute directly on `main`.
- **Atomic Commits**: Exactly one distinct task per commit.
- **Verification between commits**: Run `npm run check` and task-specific tests before moving to the next task.
- **Diff hygiene**: Inspect `git diff --cached` and `git diff --cached --check` before each commit; stage explicit paths only.
- **Strictly Local**: All commits remain local on `main` (0 remote pushes).
