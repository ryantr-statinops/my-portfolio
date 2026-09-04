# UI_OVERVIEW.md — Portfolio Interface Description

## Design Philosophy

Professional & Minimalist (Bloomberg/High-end Fintech style). The portfolio functions as a **Command Center** — a terminal-inspired dashboard that communicates Systems Thinking, Data-Driven Operations, and Intelligence.

---

## 1. Layout Structure

- **Scroll**: Smooth anchor navigation (`scroll-smooth` on `html`, see `MainLayout.astro`) — `snap-mandatory` removed per `ARCHITECTURE_V2` (caused scroll trapping)
- **Grid**: 12-column responsive grid system via Tailwind CSS
- **Breakpoints**: Mobile-first (1 column) → `md:` (2 columns) → `lg:` (3 columns)

---

## 2. Color System

| Token | Dark Mode | Light Mode |
|---|---|---|
| `--background` | `#0a0a0a` | `#ffffff` |
| `--foreground` | `#ffffff` | `#0a0a0a` |
| `--primary` | `#ffffff` (accent: `#00f2ff`) | `#0a0a0a` (accent: `#0088cc`) |
| `--success` | `#10b981` | `#10b981` |
| `--muted` | `#a3a3a3` | `#737373` |
| `--border` | `#404040` | `#d4d4d4` |
| `--card` | `#161616` | `#ffffff` |

Modes are toggled via ThemeToggle component and persisted in localStorage.

---

## 3. Typography

- **UI Font**: Inter, Geist Sans (sans-serif stack)
- **Monospace**: MesloLGS NF, JetBrains Mono, ui-monospace (for terminal-style labels, code, metrics)
- **Scale**: Heading up to `text-8xl`, body `text-base`, labels at `text-[8px]` to `text-[11px]` for terminal UI
- **Letter-spacing**: Labels use heavy `tracking-[0.2em]` to `tracking-[0.5em]` for command-line feel

---

## 4. Navigation (`MainLayout.astro`)

- **Fixed top bar** with glassmorphism effect
- **Left**: Circular avatar + "Ryan Tran" name
- **Right**: Terminal-style nav links: `[IDENTITY]`, `[STRATEGY]`, `[PROJECTS]`, `[CONNECT]` (9px mono, uppercase, tracking-widest)
- **Far right**: ThemeToggle button (sun/moon SVG icons)

---

## 5. Sections Breakdown

### A. Hero Section (`index.astro`)

```
┌──────────────────────────────────────────┐
│  ● System_Initialization_Success         │
│                                          │
│  SYSTEMS.                                │
│  OPERATIONS.                             │
│  INTELLIGENCE.            [gradient]     │
│                                          │
│  Command Center of an Applied Statistics  │
│  student specializing in Quant Finance   │
│  and System Architecture.                │
│                                          │
│  ┌─────────────┬──────────┬──────────┐   │
│  │NETWORK_STATUS│ACTIVE_NOD│CURRENT   │   │
│  │ STABLE       │5 SECTORS │QUANT &...│   │
│  └─────────────┴──────────┴──────────┘   │
│                                          │
│  [EXECUTE_SYSTEM_SCAN] [ACCESS_HUB]      │
│                                          │
│  Scroll_to_Navigate (vertical text)      │
└──────────────────────────────────────────┘
```

- **Full-screen** (`min-h-screen`)
- **Background**: Interactive heatmap canvas (grid cells glow + follow cursor)
- **Animated pulse dot** with shadow glow
- **Heading gradient**: linear-gradient `#00f2ff → #0ea5e9 → #93f8d8`
- **3 stat cards**: Glassmorphism, border, flex row layout
- **CTA buttons**: Primary (solid) + Secondary (border/ghost)

### B. About Me Section (`AboutMe.astro`)

```
┌──────────────────────────────────────────┐
│ ─────── [ IDENTITY_LOG_V1.0 ]            │
│                                          │
│ Xây dựng        │ 01  Systems over       │
│ Trật tự         │     Isolated Tools     │
│ từ Dữ liệu.     │                        │
│                  │ 02  Data-driven Action │
│ Với nền tảng    │                        │
│ Applied...       │ 03  Minimalist         │
│                  │     Professionalism    │
│ "Intelligence is │                        │
│ the ability to   │ ◈ Designing the bridge│
│ Predict..."      │   between Math Logic  │
│                  │   and Ops Excellence  │
└──────────────────────────────────────────┘
```

- **2-column layout** (5/12 + 7/12)
- **Left**: Vietnamese tagline + personal narrative + framed quote
- **Right**: 3 Core Principles cards with hover glow effect
- **Background**: Decorative blur blobs (`animate-pulse`)
- **Card styling**: Glass-premium, `rounded-3xl`, border, hover effect

### C. Intelligence Hub (`IntelligenceHub.astro`)

```
┌──────────────────────────────────────────┐
│ ● SYSTEM_MODE: STRATEGIC_VIEW  V3.2.0    │
│                          UTC: 14:02:30   │
│                                          │
│ System Management Visualization          │
│ [ISO_Aligned]                            │
│                                          │
│ ┌──────┐┌──────┐┌──────┐┌──────────┐    │
│ │05    ││12    ││04    ││HIGH      │    │
│ │PROJ. ││STACKS││SECTOR││LEVEL     │    │
│ └──────┘└──────┘└──────┘└──────────┘    │
│                                          │
│ ┌─── PANEL 1 ───┐┌─── PANEL 2 ──────────┤
│ │Portfolio Asset ││  3D Interactive      │
│ │Registry        ││  Project Graph       │
│ │☑ finance_quant ││                      │
│ │  ✓ Mean Rev... ││  [3D force-directed  │
│ │☑ data-math    ││   nodes + links]      │
│ │  ✓ Grap4Prob  ││                      │
│ │               ││  [Auto-rotating,      │
│ │[GITHUB][LINK] ││   drag to rotate]     │
│ └───────────────┘└───────────────────────┘
└──────────────────────────────────────────┘
```

- **Dashboard-style layout** (3/12 + 9/12 panel split)
- **Terminal header bar**: Status indicators, version, UTC clock
- **4 KPI cards**: Large monospace numbers, domain labels
- **Left panel**: Project registry with checkboxes, categorized list with links
- **Center panel**: Interactive 3D force-directed graph (Canvas API)
  - 3 layers: System Core → Categories → Projects
  - Nodes colored by domain: fin (cyan), ops (green), ai (pink), sys (white)
  - Auto-rotates, draggable, hover tooltips
  - Bloom/glow effects on hover
- **Bottom**: GitHub + LinkedIn exit node buttons

### D. Project Registry (Project Cards Grid)

```
┌──────────────────────────────────────────┐
│ ──────── Audit_Asset_Log                 │
│ PROJECT.                                 │
│ REGISTRY_                     Index: ... │
│                                          │
│ ┌──────────┐┌──────────┐┌──────────┐    │
│ │[Quant]   ││[System]  ││[Data]    │    │
│ │╔════════╗││╔════════╗││╔════════╗│    │
│ │║IMG     ║││║IMG     ║││║IMG     ║│    │
│ │╚════════╝││╚════════╝││╚════════╝│    │
│ │TITLE     ││TITLE     ││TITLE     │    │
│ │Desc...   ││Desc...   ││Desc...   │    │
│ │● Impact  ││● Impact  ││● Impact  │    │
│ │[tag][→]  ││[tag][→]  ││[tag][→]  │    │
│ └──────────┘└──────────┘└──────────┘    │
│                                          │
│ [VIEW_FULL_INVENTORY_5_ASSETS]           │
└──────────────────────────────────────────┘
```

- **Grid**: 1/2/3 columns responsive (sm/md/lg)
- **Each card contains**:
  - **Thumbnail**: 16:9 aspect ratio, grayscale filter initially, full-color + scale on hover
  - **Category badge**: Glassmorphism, top-left overlay
  - **WIP badge**: Animated pulse for "In Progress" status
  - **Title**: Uppercase, bold, hover turns primary
  - **Year badge**: Top-right
  - **Description**: 3-line clamp
  - **Impact section**: Green text with `//` prefix, success border, animated dot
  - **Tags**: Max 3 pill badges, 8px mono
  - **CTA**: "DECRYPT_CASE →" link
- **Card hover**: `-translate-y-2`, border transition primary, 500ms duration
- **Decorative corner**: Bottom-right rotated border accent

### E. Footer / Connect Section (`Footer.astro`)

```
┌──────────────────────────────────────────┐
│                                          │
│ Sẵn sàng                                 │
│ Kết nối.        ┌─────────────────────┐  │
│ ● System Online │ Identity_Name       │  │
│                  │ ─────────────────── │  │
│ Communication_   │ Identity_Email     │  │
│ Channel          │ ─────────────────── │  │
│ trankhang...     │ Context_Inquiry    │  │
│                  │ ─────────────────── │  │
│ Global_Base      │                    │  │
│ Ho Chi Minh City │ [TRANSMIT_SIGNAL]  │  │
│                  └─────────────────────┘  │
│ [LinkedIn][GitHub][Behance]               │
│                                          │
├──────────────────────────────────────────┤
│ © 2026 Ryan Tran          v4.2.0-Prod    │
│ Precision_Systems_Specialist  [↑]        │
└──────────────────────────────────────────┘
```

- **Full-screen footer**, centered content
- **2-column**: Contact info (5/12) + Contact form (7/12)
- **Status badge**: "System Status: Online" with green pulse
- **Contact details**: Email (clickable), Location
- **Social buttons**: Border-only, hover fills with primary
- **Contact form**: `glass-premium` container
  - Inputs: Border-bottom style, transparent background, fancy labels
  - Submit button: Full-width, `Transmit_Signal` text, slide reveal hover
- **Bottom bar**: Avatar + copyright + version badge + scroll-to-top button

---

## 6. Interactive Elements

| Element | Technology | Behavior |
|---|---|---|
| **Heatmap Background** | Canvas 2D API | Grid diffusion simulation, cursor-reactive with velocity |
| **3D Graph** | Canvas 2D (simulated 3D) | Force-directed layout, auto-rotate, drag to rotate, hover tooltips |
| **Scroll Reveal** | IntersectionObserver | Elements fade + translate up on scroll into view |
| **Theme Toggle** | Vanilla JS + localStorage | Toggles `dark` class on `<html>`, stores preference |
| **UTC Clock** | setInterval | Real-time clock in Intelligence Hub header |
| **Project Card Hover** | CSS transitions | Grayscale→color, scale, translate, border effects |
| **Scroll-to-top** | Vanilla JS | Smooth scroll to `window.scrollTo({ top: 0 })` |

---

## 7. Responsive Behavior

| Section | Mobile (<768px) | Desktop (≥768px) |
|---|---|---|
| **Navigation** | Logo + hamburger-style toggle, simplified | Full terminal menu, avatar + name |
| **Hero** | Single column, stacked text | 3 stat cards inline |
| **About Me** | Stacked vertically | 2-column grid (5+7) |
| **Intelligence Hub** | Full-width panels stacked | 3+9 column sidebar + graph |
| **Projects** | 1 column | 2-3 columns |
| **Footer** | Stacked | 2-column layout |

---

## 8. Micro-Interactions & Animations

- **Pulse dot**: `animate-pulse` on status indicators
- **Hover effects**: All interactive elements have `transition-all duration-XXX`
- **Button hover**: Scale `105%`, shadow glow on primary buttons
- **Glassmorphism**: `backdrop-filter: blur(12px–24px)` on nav, cards, forms
- **Gradient transitions**: Corner effects, text gradients
- **Link underlines**: `border-b` with hover color transition
- **Form inputs**: Border color change on focus

---

## 9. Key CSS Patterns

```css
.glass {
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
}
.reveal {
  opacity: 0; transform: translateY(4px);
  transition: all 0.7s ease-out;
}
.reveal.active {
  opacity: 1; transform: translateY(0);
}
.text-gradient {
  background: linear-gradient(to right, #00f2ff, #0ea5e9, #93f8d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 10. Domain Color Mapping

Used across the Intelligence Hub 3D graph and project badges:

| Domain | Color | Hex |
|---|---|---|
| Finance / Quant | Cyan | `#00f2ff` |
| Operations | Emerald | `#10b981` / `#93f8d8` |
| AI / ML | Pink | `#fb7185` |
| System / UI | White | `#ffffff` |
