# TECHNICAL_INFORMATION.md - System Specifications

This document serves as the single source of truth for the technical architecture, stack, and implementation details of the Portfolio Intelligence System.

## 1. Core Technology Stack

| Layer | Technology | Version | Description |
| --- | --- | --- | --- |
| **Framework** | [Astro](https://astro.build/) | v6.3.1 | Zero-JS by default, Content Layer architecture. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | v4.3.0 | Utility-first, configured via `@tailwindcss/vite`. |
| **Content** | [MDX](https://mdxjs.com/) | v5.0.4 | Markdown with JSX support for interactive components. |
| **Typography** | Inter & Meslo NF | - | Professional sans-serif and high-tech monospace fallback. |
| **Mathematics** | [KaTeX](https://katex.org/) | v0.16.11 | High-performance LaTeX rendering for Quant projects. |

## 2. System Architecture

### A. Content Layer (Astro v5+ Standard)
- **Configuration:** Managed in `src/content.config.ts`.
- **Loader:** Uses `glob` loader for efficient scanning of `src/content/projects/*.mdx`.
- **Validation:** Strict Zod schema for project metadata (ID, Title, Category, Impact, Stack).

### B. Directory Mapping
- `/agents/`: Operational rules, strategy, and frontend skill modules.
- `/src/content/projects/`: MDX project database.
- `/src/components/`: Reusable Atomic & Composite components (e.g., `ProjectCard.astro`).
- `/src/layouts/`: System-wide templates (e.g., `MainLayout.astro` with scroll-reveal logic).
- `/public/images/`: Centralized optimized assets.

## 3. UI/UX Specifications

- **Design Philosophy:** Professional & Minimalist (Bloomberg/High-end Fintech style).
- **Key Utilities:**
    - `.glass`: Glassmorphism effect (blur + subtle border).
    - `.reveal`: Scroll-triggered entry animations via `IntersectionObserver`.
    - **Neon Accents:** Primary color `#00f2ff` for high-signal interactive elements.
- **Dark Mode:** Deep black background (`#050505`) with high-contrast foreground.

## 4. Feature Implementation Details

### A. Mathematical Rendering
Integrated via `remark-math` and `rehype-katex`. CSS injected globally in `MainLayout.astro`.
- **Usage:** `$E=mc^2$` for inline or `$$` for block formulas.

### B. Intelligence Hub (`/cluster`)
A high-density dashboard simulating an OS/Terminal environment.
- **Tech:** Tailwind Grid (12-column), SVG-based dynamic visualizations, real-time UTC clock.
- **Aesthetic:** Monospace-heavy, metadata-rich, operational focus.

## 5. Development Workflow

1. **Local Server:** `npm run dev` (Port 4321).
2. **New Project:** Add `.mdx` to `src/content/projects/`. Ensure frontmatter matches the strict Zod schema.
3. **Asset Management:** Store all images in `public/images/` and reference via absolute paths (`/images/...`).

---

*Last Updated: 2026-05-12*
