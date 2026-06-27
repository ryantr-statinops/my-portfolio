# ROADMAP.md - Implementation Phases

## 1. Phase 1: Foundation (Khởi tạo nền tảng)

* [ ] **Framework Setup:** Khởi tạo dự án bằng Astro (hoặc Next.js) tại thư mục gốc.
* [ ] **Shadcn/ui Integration:** Cài đặt hệ thống component cơ bản (Button, Card, Badge).
* [ ] **Analytics:** Đăng ký project trên Vercel và bật Vercel Analytics (Free).
* [ ] **Font & Theme:** Cấu hình Meslo Nerd Font và thiết lập Dark Mode mặc định theo `DESIGN_SYSTEM.md`.

## 2. Phase 2: Data Architecture (Cấu trúc dữ liệu)

* [ ] **Content Collections:** Định nghĩa Schema cho dự án trong file `src/content/config.ts`.
* [ ] **MDX Setup:** Cấu hình plugin để hỗ trợ $LaTeX$ (Remark-math/Rehype-katex) và syntax highlighting cho code.
* [ ] **Migration:** Chuyển 5 dự án hiện tại từ repo cũ sang định dạng `.mdx` mới theo đúng `CONTENT_GUIDE.md`.

## 3. Phase 3: Core UI Development (Phát triển giao diện)

* [ ] **Home Page:** Xây dựng bố cục "Efficient Minimalist".
* Khu vực giới thiệu (Hero section) cực ngắn gọn.
* Hệ thống Filter dự án theo Domain (Quant, Ops, System...).


* [ ] **Project Detail Page:** Tạo template hiển thị nội dung MDX chuyên nghiệp, hỗ trợ ảnh WebP và bảng biểu.
* [ ] **Responsive:** Đảm bảo giao diện mượt mà trên cả mobile (dành cho HR/Investors xem nhanh).

## 4. Phase 4: Advanced Features (Tính năng nâng cao)

* [ ] **Interactive Components:** * Build `TradingChart` component (Lightweight Charts).
* Build `SystemTerminal` giả lập.


* [ ] **AI Agents Refinement:** Viết các file hướng dẫn (Instructions) trong thư mục `agents/` để AI có thể tự viết bài dựa trên Strategy và Content Guide.
* [ ] **SEO Optimization:** Cấu hình OpenGraph (để khi gửi link qua LinkedIn/Facebook hiện ảnh thumbnail dự án chuyên nghiệp).

## 5. Phase 5: Deployment & Maintenance (Vận hành)

* [ ] **CI/CD:** Kết nối GitHub với Vercel để tự động deploy khi push code.
* [ ] **Domain:** Trỏ domain cá nhân về Vercel (nếu có).
* [ ] **Final Review:** Kiểm tra lại toàn bộ nội dung, đảm bảo không có từ ngữ phóng đại.

---

## 🛠 Cách sử dụng bộ file quản trị này với AI (VibeCode/Cursor/Copilot)

Để đạt hiệu quả "nâng tầm AI" như bạn muốn, khi bắt đầu làm bất cứ tính năng nào, hãy gửi lệnh cho AI như sau:

> *"Tôi muốn triển khai Phase 1 trong **ROADMAP.md**. Hãy đọc **ARCHITECTURE.md** để biết cấu trúc thư mục và **DESIGN_SYSTEM.md** để biết quy chuẩn UI. Hãy bắt đầu bằng việc khởi tạo project Astro."*