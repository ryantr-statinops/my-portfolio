# Refactor Plan — Sau Hero Section (Post 57922a9, update 2026-09-04)

> Trạng thái (verify 2026-09-04): `main` tại `954dc64` (sau `f78dbb2` rename Navbar.ios → Navbar + merge PR #4 iOS variant).
> Hero visual coi như xong (gradient + bento + CTA + heatmap sync). Navbar dual-variant đã chốt: Direction B thắng, `src/components/layout/Navbar.astro` + `MobileOverlay` + `ScrollSpy` DONE. Còn lại P1 (Footer move), P2 (sections extract), P3 (ProjectLayout/WebP/CI) CHƯA làm.

## 0. Mục tiêu V2 nhắc lại

`docs/ARCHITECTURE_V2.md:6` Dependency Rule: `ui <- sections <- pages`, `lib` không import `.astro`, `content` không import gì. `index.astro` cuối cùng chỉ compose sections (~20 dòng).

## 1. Hiện trạng đã verify (re-check 2026-09-04, code thực tế)

| Khu vực | File | Tình trạng |
|---|---|---|
| Lib | `src/lib/constants.ts:18` `NAV_LINKS`, `content.ts:5` `sortByPriority`, `seo.ts:3`, `utils.ts:3` | Đã tạo nhưng thiếu `validateUniquePriority()` theo `ARCHITECTURE_V2.md:168`; `NAV_LINKS` chết (Navbar dùng `NAV_ITEMS` trong `Navbar.types.ts`) |
| Layout | `src/layouts/MainLayout.astro:3-6` import `Navbar` + `MobileOverlay` + `ScrollSpy`, `Footer` vẫn ở `components/Footer.astro` | Navbar DONE (iOS pill, PR #4), Footer CHƯA move vào `layout/`, spec cũ ghi `Header.astro` đã lỗi thời |
| Hero | `src/pages/index.astro:16-73` inline hero + bento + CTA (137 dòng) | Done visual nhưng chưa tách `sections/Hero.astro` |
| Sections | `src/components/AboutMe.astro:9`, `IntelligenceHub.astro:1` (306 dòng), `PortfolioRegistry.astro:12`, `ProjectCard.astro:1` nằm ở `components/` root; `src/components/sections/` RỖNG | Phải move vào `components/sections/` |
| Registry | `index.astro:103` grid `ProjectCard` inline, `PortfolioRegistry.astro:45` sort inline riêng | Duplicate sort, cần unify (card grid ở `index`, table ở `/cluster`) |
| Islands | `HeatmapBackground.astro:11` (290 dòng canvas) + `IntelligenceHub.astro:136` script 170 dòng graph, inline `<script>` không `client:*` | Vi phạm Islands rule |
| Config | `astro.config.mjs:11`, `package.json:18` sitemap, `avt.png` vẫn PNG | OK build, chưa WebP |
| Docs | `docs/UI_OVERVIEW.md`, `FrameworksHub.astro` hidden `index.astro:120`, `archive/` còn | Cần quyết định (P3 cleanup) |
| Test/CI | `docs/plan/01-04` mới là spec, `.github/workflows/deploy.yml` chỉ build + verify sitemap | Chưa có L1/L2/L3, chưa `astro check` |

## 2. Phasing — 3 ưu tiên tuần tự

### P1 — Shell & Navigation (làm NGAY, unblock P2/P3)

**Why first:** `MainLayout` là root của mọi page (`index`, `projects/[slug]`, `cluster`). Tách xong áp dụng đồng bộ.

**Tasks:**
1. **Tạo `src/components/layout/Header.astro`** (new)
   - Move `<nav class="fixed top-0...">` từ `MainLayout.astro:64-84`
   - Import `NAV_LINKS` từ `lib/constants.ts:18` thay vì hardcode `[IDENTITY] [STRATEGY] [PROJECTS] [CONNECT]`
   - Import `ThemeToggle` từ `ui/ThemeToggle.astro:1`
   - Props: `currentPath?: string` để highlight active (optional)
   - Giữ `glass` + `border-b` visual 100% như cũ
2. **Sửa `src/layouts/MainLayout.astro:1-107`**
   - Chỉ còn: `import Header from components/layout/Header`, `import Footer`, `import global.css`, SEO meta `13-17`
   - Body: `<Header /> <slot /> <Footer />` + scroll-reveal script `90-104` giữ nguyên
   - Xóa hardcoded links `73-77`
3. **Move `src/components/Footer.astro → src/components/layout/Footer.astro`**
   - Giữ file cũ 1 commit rồi xóa (tránh break import `MainLayout.astro:4`)
   - Update import trong `MainLayout`
4. **Fix snap:** grep `snap-` toàn repo — theo `ARCHITECTURE_V2.md:183` bỏ `snap-mandatory`, chỉ giữ `scroll-smooth` ở `html` (`MainLayout.astro:21`). Nếu còn `snap-y snap-mandatory` ở section nào thì xóa.
5. **Verify:** `npm run build` + `astro check`, screenshot so sánh hero/nav không đổi, `getBaseUrl` vẫn chạy với `base:/my-portfolio`.

**Files touch:** `Header.astro (new)`, `MainLayout.astro`, `Footer` move, `constants.ts` (dùng NAV_LINKS).

**Risk:** Import path break → test build ngay sau move.

---

### P2 — Sections Extraction (Hero đã xong, chỉ còn tách file + 3 sections còn lại)

**P2.1 Hero extract (recommend làm đầu P2):**
- Tạo `src/components/sections/Hero.astro` — cut `index.astro:16-73` nguyên khối (kể cả `<HeatmapBackground />` + `space-y-10` + bento `CURRENT FOCUS` `39-53` + CTA `62-68`)
- Không cần props (hero static), chỉ import `HeatmapBackground` từ `interactive/`
- `index.astro` sau đó: `import Hero from "components/sections/Hero.astro"` + `<Hero />`
- Giữ `text-gradient` style `128-131` và `glass` blur trong Hero scope

**P2.2 Move existing sections:**
- `AboutMe.astro:9 → sections/AboutMe.astro` (đã là sections logic, chỉ relocate + fix import)
- `IntelligenceHub.astro:1 → sections/IntelligenceHub.astro`
  - Refactor: hiện `IntelligenceHub.astro:2` gọi `await getCollection("projects")` trực tiếp → vi phạm `sections -> lib` rule. Đổi thành props: `interface Props { projects: ProjectEntry[] }`, để `index.astro` truyền `projects` từ `getCollection` + `sortByPriority`
  - Tách script `136-299` ra thành island rõ ràng: thêm `client:load` nếu cần interact, hoặc giữ inline nhưng document là island
- `ProjectCard.astro:1` — theo V2 `ui/` là atomic, `ProjectCard` là composite → giữ ở `components/ProjectCard.astro` hoặc move vào `sections/PortfolioRegistry/` subfolder. Recommend giữ nguyên path để đỡ churn, nhưng import via `sections`

**P2.3 PortfolioRegistry unify:**
- Tạo `src/components/sections/PortfolioRegistry.astro` (hoặc refactor file hiện `PortfolioRegistry.astro:12`)
- Refactor `index.astro:88-117` grid `projects.slice(0,6).map(ProjectCard)` thành component nhận `projects: ProjectEntry[]` prop
- Dùng `sortByPriority` từ `lib/content.ts:5` thay vì inline `sort((a,b)=>b.data.priority-a.data.priority)` như `PortfolioRegistry.astro:45`
- Thống nhất 1 pattern: Card grid (Command Center) làm default ở `index.astro`, Table registry (`PortfolioRegistry.astro:33` table `ID/Asset_Name`) expose ở `/cluster` nếu cần — tránh duplicate
- `index.astro` cuối cùng chỉ còn:
  ```astro
  import Hero from "components/sections/Hero.astro"
  import AboutMe from "components/sections/AboutMe.astro"
  import IntelligenceHub from "components/sections/IntelligenceHub.astro"
  import PortfolioRegistry from "components/sections/PortfolioRegistry.astro"
  const projects = (await getCollection("projects")).sort(sortByPriority)
  <MainLayout><Hero/><AboutMe id="about-me"/><IntelligenceHub projects={projects}/><PortfolioRegistry projects={projects.slice(0,6)}/></MainLayout>
  ```

**P2.4 Lib helpers:**
- Thêm `validateUniquePriority(projects)` vào `lib/content.ts:8` như `ARCHITECTURE_V2.md:168` — check duplicate `priority 1-10`
- Thêm `getSortedProjects()` wrapper nếu muốn `pages` không gọi `getCollection` trực tiếp

**Files touch:** `sections/Hero.astro (new)`, `sections/AboutMe.astro`, `sections/IntelligenceHub.astro`, `sections/PortfolioRegistry.astro`, `index.astro`, `lib/content.ts`, `IntelligenceHub` props.

**Verify:** Mỗi sub-step build riêng, visual diff không đổi, `Index: BY_PRIORITY` badge `index.astro:99` vẫn đúng.

---

### P3 — ProjectLayout + Perf + CI (làm cuối, cần P1+P2 xong)

1. **Tạo `src/layouts/ProjectLayout.astro`** (new) theo `ARCHITECTURE_V2.md:60`
   - Tách khỏi `src/pages/projects/[slug].astro:1` hiện đang dùng `MainLayout` chung
   - Props: `project: ProjectEntry`, inject `buildTitle`/`buildCanonical` từ `lib/seo.ts:3` để OG per project (`MainLayout.astro:13-17` đã làm global nhưng chưa có `ogImage` per project)
   - Template: Header + article MDX slot + Footer
2. **Ảnh WebP migration** (`ARCHITECTURE_V2.md:165`):
   - Convert `public/images/projects/*` sang `WebP`, structure `/{slug}/thumbnail.webp`
   - Update `src/content.config.ts:32` refine `thumbnail.startsWith("/images/")` thành stricter `"/images/projects/<slug>/thumbnail.webp"`
   - Cập nhật MDX frontmatter `thumbnail` paths
3. **CI tighten** (`ARCHITECTURE_V2.md:176`):
   - Update `.github/workflows/deploy.yml` thêm `npm audit` report + verify `astro build` (refactor branch đã có `660d9f6` nhưng main chưa full)
   - Thêm `astro check` step
4. **Cleanup:**
   - Xóa `archive/` sau verify (V2:182)
   - Quyết định `docs/UI_OVERVIEW.md` untracked — commit hay add to `.gitignore`?
   - Quyết định `FrameworksHub.astro` hidden `index.astro:120` — xóa hẳn hay re-enable sau P2?

**Files touch:** `ProjectLayout.astro (new)`, `projects/[slug].astro`, `content.config.ts`, `deploy.yml`, `public/images/*`.

---

## 3. Dependency Graph

```
P1 Header (MainLayout shell)
  ↓
P2.1 Hero extract ─┐
P2.2 AboutMe/Hub move ├→ P2.3 Registry unify → P2.4 lib helpers
  ↓                                              ↓
P3 ProjectLayout + WebP + CI
```

- P1 unblock tất cả (Header dùng ở mọi page)
- P2.1-2.2 có thể song song sau P1
- P3 cần P1+P2 xong vì dùng `lib/seo` + `sections` pattern

## 4. Quyết định cần bạn chốt trước khi code

| # | Câu hỏi | Recommend | Ảnh hưởng nếu không chốt |
|---|---|---|---|
| 1 | Hero tách file ngay hay giữ inline? | Tách ngay (0 visual change) | Vi phạm V2 tree nếu giữ inline |
| 2 | PortfolioRegistry chọn card grid hay table? | Card grid ở `index`, table ở `/cluster` | Duplicate logic nếu giữ cả 2 inline |
| 3 | FrameworksHub xóa hay re-enable? | Xóa comment, giữ file nhưng không render đến khi có spec | Dead code trong `index.astro:120` |
| 4 | Mobile hamburger có cần? | Giữ `hidden md:flex` hiện tại, chưa cần island | Thêm scope nếu làm hamburger |

## 5. Execution Order & Verification Checklist

**Order commit:** `P1 Header` → `P2.1 Hero` → `P2.2 AboutMe/Hub` → `P2.3 Registry` → `P2.4 lib` → `P3 ProjectLayout` → `P3 WebP/CI`

**Mỗi commit:**
- `npm run build` pass
- `npx astro check` pass
- Visual: `http://localhost:4321/my-portfolio/` hero/nav/heatmap không lệch, `ProjectCard` hover `-translate-y-2` vẫn chạy, `IntelligenceHub` 3D graph tooltip `IntelligenceHub.astro:121` vẫn hiện

## 6. Risks & Mitigations

- **Move Footer path break** `MainLayout.astro:4` → test build ngay, giữ re-export shim 1 commit
- **IntelligenceHub props refactor** break 3D `groupedProjects` `IntelligenceHub.astro:6` → truyền `projects` từ page, fallback `[]` nếu undefined
- **Heatmap resize** `HeatmapBackground.astro:286` listener mất khi tách Hero → đảm bảo `resize()` vẫn gọi sau mount
- **BASE_URL** `lib/utils.ts:3` `getBaseUrl` đã đúng prod `/my-portfolio/` vs dev `/` → không đổi logic

## 7. Next Step nếu bạn approve

Tôi sẽ bắt đầu **P1 Header** (tạo `src/components/layout/Header.astro` + sửa `MainLayout.astro` + move Footer) trong 1 commit, giữ hero visual intact như bạn vừa xong. Bạn muốn tôi start P1 luôn hay chỉnh plan này trước?

---
*Generated: 2026-08-31 — SSOT: `ARCHITECTURE_V2.md`, `index.astro:137`, `MainLayout.astro:107`*
