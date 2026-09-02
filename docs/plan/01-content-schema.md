# Layer 1 — Content Schema Validation

> **Mục đích:** Đảm bảo 5 file MDX trong `src/content/projects/` luôn hợp lệ với Zod schema đã định nghĩa trong `src/content.config.ts`.

---

## 1. Vấn đề (Problem)

Hiện tại schema validation chỉ chạy **lúc Astro build** thông qua Content Layer. Nếu build fail vì lý do khác (network, dependency), lỗi schema có thể bị che lấp. Hơn nữa, không có:
- Tài liệu rõ ràng schema mong đợi là gì cho từng field.
- Test tách biệt để dev local chạy nhanh không cần full build.
- Cảnh báo sớm trong CI trước khi bước build tốn thời gian.

## 2. Mục tiêu (Goals)

- Chạy validation trong < 2 giây, không phụ thuộc vào full Astro build.
- Mỗi field trong schema có test case riêng.
- Khi thêm project mới mà thiếu field, test fail với message rõ ràng.

## 3. Schema hiện tại (Reference)

Từ `src/content.config.ts`:

```ts
{
  id: string,
  title: string (min 5),
  description: string (min 10),
  date: string (regex YYYY-MM-DD),
  category: enum [
    "finance-quant",
    "ops-automation",
    "data-math",
    "system-ui",
    "ai-implementation",
    "software-engineering"
  ],
  status: enum [
    "In Progress", "Production", "Archived",
    "Research & Development", "Audit Pending"
  ],
  priority: number (1-10),
  tags: string[] (max 12),
  impact: string (min 20),
  thumbnail: string (must start with "/images/"),
  github?: string URL,
  demo?: string URL,
  stack: string[] (max 12)
}
```

## 4. Test Cases

### 4.1. Project count
```ts
test('should have exactly 5 projects', () => {
  expect(projects).toHaveLength(5)
})
```
> **Lý do:** Cố định số lượng để phát hiện ngay khi file MDX bị xóa nhầm.

### 4.2. Required fields
Mỗi project phải có đầy đủ: `id`, `title`, `description`, `date`, `category`, `priority`, `impact`, `thumbnail`.

### 4.3. Date format
```ts
projects.forEach(p => {
  expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
})
```

### 4.4. Category whitelist
```ts
const validCategories = [
  'finance-quant', 'ops-automation', 'data-math',
  'system-ui', 'ai-implementation', 'software-engineering'
]
projects.forEach(p => {
  expect(validCategories).toContain(p.category)
})
```

### 4.5. Priority range
```ts
projects.forEach(p => {
  expect(p.priority).toBeGreaterThanOrEqual(1)
  expect(p.priority).toBeLessThanOrEqual(10)
})
```

### 4.6. Thumbnail path
```ts
projects.forEach(p => {
  expect(p.thumbnail).toMatch(/^\/images\//)
})
```
> **Lý do:** Phát hiện path relative hoặc absolute URL ngoài.

### 4.7. URL validation (nếu có)
Nếu `github` hoặc `demo` được cung cấp, phải là URL hợp lệ (regex `^https?://`).

### 4.8. ID uniqueness
```ts
const ids = projects.map(p => p.id)
expect(new Set(ids).size).toBe(ids.length)
```

### 4.9. Title min length
```ts
projects.forEach(p => {
  expect(p.title.length).toBeGreaterThanOrEqual(5)
})
```

### 4.10. Description min length
```ts
projects.forEach(p => {
  expect(p.description.length).toBeGreaterThanOrEqual(10)
})
```

## 5. Implementation Plan

### 5.1. Cài đặt dependencies
```bash
npm install -D vitest @vitest/ui
```

### 5.2. Cấu hình `vitest.config.ts`
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
})
```

### 5.3. File test `tests/content.test.ts`
Sử dụng **gray-matter** để parse frontmatter trực tiếp từ file MDX (không qua Astro Content Layer để test độc lập):

```ts
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = 'src/content/projects'

const projects = readdirSync(PROJECTS_DIR)
  .filter(f => f.endsWith('.mdx'))
  .map(f => {
    const raw = readFileSync(join(PROJECTS_DIR, f), 'utf-8')
    return { file: f, ...matter(raw).data }
  })

describe('Content Schema Validation', () => {
  it('should have exactly 5 projects', () => {
    expect(projects).toHaveLength(5)
  })
  // ... các test khác
})
```

### 5.4. Thêm script vào `package.json`
```json
{
  "scripts": {
    "test:unit": "vitest run",
    "test:watch": "vitest"
  }
}
```

## 6. Acceptance Criteria

- [ ] `npm run test:unit` chạy thành công, output hiển thị 10 test cases pass.
- [ ] Test fail rõ ràng nếu bất kỳ field nào sai (với message chỉ field + file).
- [ ] Thời gian chạy < 2 giây.
- [ ] Không phụ thuộc Astro build pipeline.

## 7. Khi nào cần update test

- Khi thêm field mới vào Zod schema → thêm test case tương ứng.
- Khi thêm project mới (lên 6, 7...) → update test count.
- Khi đổi whitelist category/status.

## 8. Out of scope

- Test nội dung body MDX (Markdown rendering) — đó là trách nhiệm của L2/Smoke test.
- Test syntax highlight code block.
- Test asset files trong `public/images/` có tồn tại hay không (xử lý ở L2).
