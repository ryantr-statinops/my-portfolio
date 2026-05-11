# CONTENT_GUIDE.md - Project Documentation Standards

## 1. The "Power User" Writing Style

* **Tone:** Chuyên nghiệp, khách quan, tập trung vào giải pháp và kết quả (Problem-Solution-Impact).
* **Diction:** Sử dụng các thuật ngữ chuyên ngành (ví dụ: *backtesting, latency, scalability, operational efficiency*) nhưng phải giải thích đơn giản ở phần mô tả tổng quan.
* **Banned Phrases:** Tránh các từ sáo rỗng như "rất nhanh", "cực kỳ tốt", "giao diện đẹp". Hãy thay bằng: "tối ưu 20% latency", "đạt 95 điểm Lighthouse", "giảm 2 giờ vận hành/ngày".

## 2. Project Schema (The Metadata)

Mọi dự án khi đẩy lên hệ thống phải có phần Header (Frontmatter) như sau để hệ thống tự động phân loại:

```markdown
---
id: "unique-slug-01"
title: "Tên dự án rõ ràng"
category: "finance-quant" # [finance-quant, ops-automation, data-math, system-ui]
status: "Completed" # [In Progress, Production, Archived]
priority: 1 # 1 là cao nhất (đưa lên đầu trang)
stack: ["Python", "Pandas", "React"]
impact: "Mô tả ngắn gọn kết quả (Ví dụ: Tự động hóa 80% quy trình)"
thumbnail: "/images/projects/thumb-01.webp"
github: "https://github.com/..."
demo: "https://..."
---

```

## 3. Content Structure (Cấu trúc nội dung chi tiết)

Một bài viết chi tiết cho dự án nên đi theo lộ trình:

### A. Context (Bối cảnh)

* Dự án này giải quyết vấn đề gì? (Ví dụ: "XAUUSD trading thường bị nhiễu bởi tin tức, cần một bot lọc tín hiệu dựa trên Statistical Arbitrage").
* Vai trò của bạn: (Ví dụ: Founder & Lead Developer).

### B. Technical Implementation (Triển khai kỹ thuật)

* Sử dụng công nghệ gì và **tại sao**?
* Đoạn code "tinh túy" nhất (Code Snippet).
* Nếu là dự án Math/Quant: Chèn các công thức chứng minh bằng $LaTeX$.

### C. Challenges & Solutions (Thách thức)

* Bạn đã gặp khó khăn gì (ví dụ: lỗi tràn bộ nhớ, dữ liệu thiếu) và bạn đã xử lý nó như thế nào? (Đây là phần HR và Investors đánh giá cao nhất).

### D. Final Impact (Kết quả cuối cùng)

* Showcase hình ảnh/video demo.
* Các con số biết nói (Performance metrics).

## 4. Media Standards (Quy chuẩn hình ảnh)

* **Screenshot:** Phải là ảnh Dark Mode để đồng bộ với website.
* **Diagrams:** Ưu tiên dùng Mermaid.js hoặc SVG để sơ đồ hóa kiến trúc (Architecture) thay vì chụp ảnh vẽ tay.
* **Alt-text:** Luôn có mô tả ảnh để hỗ trợ SEO và Accessibility.

## 5. AI Prompting Workflow (Dành cho thư mục `/agents`)

Khi muốn AI viết nội dung cho một dự án mới, hãy dùng lệnh:

> "Dựa trên log GitHub/File README này, hãy soạn thảo một file .mdx theo tiêu chuẩn của CONTENT_GUIDE.md. Tập trung vào mục Impact và Technical Implementation."