# Layer 2 — Smoke Test (Routing & HTTP)

> **Mục đích:** Đảm bảo 7 routes của portfolio đều trả về HTTP 200 và render đúng cấu trúc HTML cơ bản.

---

## 1. Vấn đề (Problem)

CI hiện tại chỉ check `test -f dist/index.html` — quá yếu. Không phát hiện được:
- Slug MDX bị rename mà link internal chưa update.
- Page nào trả 404, 500, hoặc timeout.
- Sitemap thiếu URL.
- Asset (`/images/*`) bị tham chiếu nhưng không tồn tại.

## 2. Mục tiêu (Goals)

- Mỗi route phải trả `200 OK`.
- HTML response chứa các marker quan trọng (`<title>`, `<meta name="description">`, `<h1>`).
- Tất cả asset path trong HTML resolve được (không 404).
- Sitemap chứa đủ 7 URL.

## 3. Routes cần test

| # | Path | Source |
|---|------|--------|
| 1 | `/` | `src/pages/index.astro` |
| 2 | `/cluster/` | `src/pages/cluster/index.astro` |
| 3 | `/projects/grap4prob/` | dynamic `[slug].astro` |
| 4 | `/projects/mean-reversion-bot/` | dynamic `[slug].astro` |
| 5 | `/projects/orbit-system-manager/` | dynamic `[slug].astro` |
| 6 | `/projects/project-01/` | dynamic `[slug].astro` |
| 7 | `/projects/project-02/` | dynamic `[slug].astro` |

> **Lưu ý:** Slug được derive từ filename MDX. Test phải **dynamic** — không hardcode 7 slug mà đọc từ `dist/projects/`.

## 4. Test Cases

### 4.1. Homepage loads
```ts
test('homepage returns 200', async ({ request }) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)
})
```

### 4.2. Cluster page loads
```ts
test('/cluster/ returns 200', async ({ request }) => {
  const res = await request.get('/cluster/')
  expect(res.status()).toBe(200)
})
```

### 4.3. All dynamic project pages load
```ts
test('all project pages return 200', async ({ request }) => {
  const projects = await readdir('dist/projects')
  for (const slug of projects) {
    const res = await request.get(`/projects/${slug}/`)
    expect(res.status(), `Project ${slug} should be 200`).toBe(200)
  }
})
```

### 4.4. Homepage has expected sections
```ts
test('homepage has Hero section markers', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByText('CURRENT FOCUS')).toBeVisible()
})
```

### 4.5. Project page has metadata
```ts
test('project page has title and description meta', async ({ page }) => {
  await page.goto('/projects/grap4prob/')
  const title = await page.title()
  expect(title.length).toBeGreaterThan(0)
  const desc = await page.locator('meta[name="description"]').getAttribute('content')
  expect(desc?.length).toBeGreaterThan(10)
})
```

### 4.6. Sitemap integrity
```ts
test('sitemap-index.xml is valid XML and lists all pages', async ({ request }) => {
  const res = await request.get('/sitemap-index.xml')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain('<sitemap>')
})
```

### 4.7. Robots.txt exists
```ts
test('robots.txt exists', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
})
```

### 4.8. No 404 internal links on homepage
```ts
test('all internal links on homepage return 200', async ({ page }) => {
  await page.goto('/')
  const links = await page.locator('a[href^="/"]').evaluateAll(
    els => els.map(e => (e as HTMLAnchorElement).href)
  )
  const unique = [...new Set(links)]
  for (const link of unique) {
    const res = await page.request.get(link)
    expect(res.status(), `Link ${link} should not 404`).toBe(200)
  }
})
```

## 5. Implementation Plan

### 5.1. Cài đặt dependencies
```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

### 5.2. Cấu hình `playwright.config.ts`
```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
```

### 5.3. Cấu trúc thư mục
```
tests/
├── unit/
│   └── content.test.ts        # Layer 1
└── e2e/
    ├── smoke.spec.ts          # Layer 2
    └── visual.spec.ts         # Layer 3
```

### 5.4. Thêm script vào `package.json`
```json
{
  "scripts": {
    "test:smoke": "playwright test tests/e2e/smoke.spec.ts",
    "test:e2e": "playwright test",
    "test:visual": "playwright test tests/e2e/visual.spec.ts"
  }
}
```

## 6. Acceptance Criteria

- [ ] `npm run test:smoke` chạy 8 test cases pass.
- [ ] Khi đổi slug một project và không update link → test fail với message chỉ slug cụ thể.
- [ ] Khi xóa `robots.txt` → test fail rõ ràng.
- [ ] Chạy được cả local và CI.

## 7. Edge Cases cần cover

- Trailing slash: `/projects/grap4prob` vs `/projects/grap4prob/`.
- External links: chỉ test `href^="/"`, không gọi domain ngoài.
- Hash links: bỏ qua `href*="#"`.

## 8. Maintenance

- Khi thêm project mới → smoke test **tự động** cover (đọc `dist/projects/` dynamic).
- Khi thêm page mới (ví dụ `/blog/`) → thêm 1 test case explicit.
- Khi đổi UI framework (vd từ Astro sang Next) → update `webServer.command`.

## 9. Out of scope

- Form submission (portfolio không có form user-facing ngoài Footer email link).
- Login flow (không có auth).
- Cross-browser test (chỉ Chromium).
- Mobile viewport (test ở L3 visual).
