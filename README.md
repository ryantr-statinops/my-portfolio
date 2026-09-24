# Tech Portfolio & AI Workflow

Chào mừng bạn đến với không gian cá nhân của mình! Đây là nơi mình chia sẻ các dự án công nghệ, tư duy phát triển phần mềm và cách mình ứng dụng AI để tối ưu hóa quy trình làm việc.

---

## Tech Stack

Website portfolio là ứng dụng React/TypeScript tĩnh, được prerender cho GitHub Pages dưới `/my-portfolio/`:

- **Framework:** React 19, TypeScript và React Router 7 Framework Mode.
- **Build:** Vite với route HTML tĩnh cho trang chủ, registry và năm trang project; không dùng SPA fallback.
- **Styling:** Tailwind CSS 4 qua Vite.
- **Content:** Catalog project đã validate bằng Zod; nội dung detail viết bằng Markdown.
- **Math/Scientific:** Remark Math, Rehype KaTeX và stylesheet/font KaTeX đóng gói local.
- **Tests:** Vitest và Playwright trên static artifact.

### Local development

Requires Node.js `>=22.12.0`.

```sh
npm ci
npm run dev
npm run check
npm test
npm run build
npm run preview
```

---

## AI-Powered Workflow

Mình không chỉ sử dụng AI như một công cụ hỗ trợ, mà mình tích hợp AI vào sâu trong quy trình phát triển (AI-native development).

- **AI Pair Programming:** Sử dụng các mô hình ngôn ngữ lớn (LLM) để xây dựng kiến trúc component, tối ưu hóa logic xử lý và debug.
- **Agentic Automation (`/agents`):** Mình xây dựng các `agents` tùy chỉnh nhằm tự động hóa các tác vụ lặp đi lặp lại:
    - *Content Processing:* Tự động hóa việc xử lý và định dạng dữ liệu đầu vào.
    - *Workflow Optimization:* Giảm thiểu thời gian setup và triển khai dự án.
- **Human-in-the-loop:** AI đóng vai trò là "đồng nghiệp" đề xuất giải pháp, mình là người kiểm soát và tinh chỉnh cuối cùng để đảm bảo chất lượng code.

---

## Portfolio

Bạn muốn tìm hiểu chi tiết hơn về các dự án và hành trình phát triển của mình?
 **[Truy cập Portfolio chính thức tại đây](https://ryantr-statinops.github.io/my-portfolio/)**

 **GitHub Pages:** [https://ryantr-statinops.github.io/my-portfolio/](https://ryantr-statinops.github.io/my-portfolio/)

---

*Dự án này là minh chứng cho việc kết hợp giữa kỹ năng lập trình thủ công và sức mạnh của trí tuệ nhân tạo hiện đại.*
