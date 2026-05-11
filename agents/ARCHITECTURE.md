# ARCHITECTURE.md - Technical Blueprint

## 1. Tech Stack Selection

Hệ thống được xây dựng dựa trên tiêu chí: **Tốc độ cực cao, SEO tốt, và Quản lý dữ liệu tập trung.**

* **Framework:** [Astro](https://astro.build/) (Ưu tiên) hoặc **Next.js**.
* *Lý do:* Astro hỗ trợ "Zero JS by default", cực kỳ phù hợp cho Portfolio cần tốc độ load nhanh để gây ấn tượng với Investors/HR.


* **Data Format:** **MDX (Markdown + JSX)**.
* *Lý do:* Cho phép viết nội dung dự án bằng Markdown nhưng vẫn có thể chèn các Component tương tác (như biểu đồ TradingView hoặc LaTeX) vào giữa bài viết.


* **Styling:** **Tailwind CSS** + **shadcn/ui**.
* *Lý do:* Tạo giao diện chuyên nghiệp, tối giản nhanh chóng.


* **Deployment & Analytics:** **Vercel** + **Vercel Analytics**.

## 2. Directory Structure (Quy hoạch thư mục)

Cấu trúc này được thiết kế để tách biệt giữa **Dữ liệu (Content)**, **Giao diện (UI)** và **Logic (System)**:

```text
/
├── agents/             # Prompts & Rules cho AI (VibeCode)
├── content/            # NƠI QUẢN LÝ DỮ LIỆU (Scaling Core)
│   ├── projects/       # Mỗi file .mdx là một dự án (Quant, Ops, System...)
│   └── legal/          # Các điều khoản freelance/startup (nếu có)
├── src/
│   ├── components/
│   │   ├── ui/         # Atomic components (Button, Card, Input từ shadcn)
│   │   ├── interactive/# Các component phức tạp (Charts, Terminal, LaTeX)
│   │   └── layout/     # Header, Footer, Navigation
│   ├── layouts/        # Page templates (MainLayout, ProjectLayout)
│   └── lib/            # Utils, Constants, Data Fetching Logic
├── public/             # Assets tĩnh (Images, SVGs, PDF CV)
└── astro.config.mjs    # Cấu hình hệ thống

```

## 3. Scalability Logic (Cơ chế mở rộng)

### A. Content Collections

Sử dụng tính năng **Collections** để quản lý dữ liệu chặt chẽ. Mỗi dự án trong `/content/projects/` buộc phải tuân thủ một Schema (kiểu dữ liệu) cố định:

* `title`, `description`, `date`, `category`, `tags`, `image`, `github_url`, `demo_url`.
* Điều này giúp hệ thống tự động sinh ra các trang lọc (filter) theo category (Quant, Math...) mà không cần sửa code giao diện.

### B. Module-based Interaction

Các tính năng nâng cao sẽ được tách thành các module độc lập trong `/src/components/interactive/`:

* **`TradingChart.tsx`**: Dùng Lightweight Charts để vẽ dữ liệu tài chính.
* **`MathRenderer.tsx`**: Dùng KaTeX để hiển thị công thức toán học $E=mc^2$.
* **`SystemTerminal.tsx`**: Giả lập terminal cho các dự án Distro/System.

## 4. Deployment Pipeline

1. **Develop:** Viết nội dung dự án mới vào file `.mdx`.
2. **Preview:** Vercel tự động tạo link preview để kiểm tra giao diện và lỗi nội dung.
3. **Production:** Merge vào nhánh `main`, hệ thống tự động rebuild và kích hoạt Analytics.

## 5. AI Agent Rules (Dành cho thư mục `/agents`)

Để AI hỗ trợ tốt nhất, các Agent cần tuân thủ:

* **UI Agent:** Chỉ được dùng các component trong `/src/components/ui` để đảm bảo tính nhất quán (Consistent UI).
* **Content Agent:** Khi viết nội dung cho dự án mới, phải đọc file `STRATEGY.md` để giữ tone giọng chuyên nghiệp, không phóng đại.
* **Logic Agent:** Luôn kiểm tra tính đúng đắn của Schema trong MDX trước khi lưu.

