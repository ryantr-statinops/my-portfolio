# DESIGN_SYSTEM.md - Visual & UX Guidelines

## 1. Design Philosophy (Triết lý thiết kế)

* **Efficiency First:** Thông tin quan trọng nhất (Impact, Techstack) phải được nhìn thấy ngay lập tức.
* **Clean & Dark:** Ưu tiên giao diện tối (Dark Mode) để làm nổi bật các đoạn code và biểu đồ.
* **Bento-Lite:** Sử dụng bố cục ô (grid) nhưng không quá dày đặc, tạo không gian thở (white space) cho mắt.

## 2. Typography & Color Palette

Hệ thống sử dụng bảng màu trung tính, tập trung vào độ tương phản cao để hỗ trợ đọc dữ liệu (Data-heavy content).

### Colors

* **Background:** `#0a0a0a` (Pure Dark) hoặc `#0f172a` (Deep Slate).
* **Surface/Card:** `#161616` với viền (border) mỏng `#262626`.
* **Primary Action:** `#ffffff` (White) hoặc một màu nhấn nhẹ như `Deep Blue` cho các link Quant/Tech.
* **Success (Impact):** `#10b981` (Emerald) - Dùng để highlight kết quả dự án (ví dụ: +15% profit).

### Typography

* **Heading/Body:** Inter hoặc Geist Sans (Tạo cảm giác hiện đại, tech-oriented).
* **Monospace:** `Meslo Nerd Font` hoặc `JetBrains Mono` (Dành cho code snippets, Terminal và các thông số toán học).

## 3. UI Components (Chuẩn hóa giao diện)

### A. Project Card (Play Store Style)

Mỗi card dự án phải bao gồm:

1. **Icon/Logo:** Nhỏ gọn, bo góc (Radius: 8px).
2. **Title:** Bold, size 1.1rem.
3. **Short Desc:** Tối đa 2 dòng, màu text hơi mờ (muted).
4. **Tech Tags:** Badge nhỏ, nền tối, text sáng.
5. **Hover Effect:** Border sáng nhẹ hoặc hiệu ứng Glassmorphism (blur background).

### B. Interactive Elements

* **Glassmorphism:** Sử dụng `backdrop-filter: blur(12px)` cho các phần Header hoặc Modal để tạo chiều sâu.
* **Micro-interactions:** Hiệu ứng chuyển cảnh (Transition) 200ms cho các nút bấm và link.
* **LaTeX Support:** Các công thức toán học phải được render bằng KaTeX với độ hiển thị sắc nét, căn giữa nếu là công thức quan trọng.

## 4. Layout Grid (Bố cục)

* **Desktop:** Hệ thống 12 cột (Standard Grid). Các dự án nổi bật (Featured) chiếm 2/3 chiều rộng, dự án phụ chiếm 1/3.
* **Mobile:** 1 cột duy nhất, ưu tiên các card dự án xếp chồng lên nhau, đảm bảo touch target đủ lớn.

## 5. Assets & Media

* **Images:** Toàn bộ ảnh dự án phải qua nén (WebP format) để tối ưu tốc độ.
* **Icons:** Sử dụng [Lucide Icons](https://lucide.dev/) để đồng bộ về nét vẽ (Stroke width: 2px).
* **Animations:** Chỉ sử dụng khi cần thiết (ví dụ: Loading state hoặc biểu đồ nhảy số).

## 6. AI Instructions for UI (Quy định cho AI)

* **Rule 1:** "Không được tự ý thêm các màu gradient rực rỡ nếu không có yêu cầu."
* **Rule 2:** "Mọi khoảng cách (margin/padding) phải tuân theo hệ số 4 (4px, 8px, 16px, 24px...)."
* **Rule 3:** "Luôn ưu tiên tính dễ đọc (Readability) trước tính thẩm mỹ (Aesthetics)."
