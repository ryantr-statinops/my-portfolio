import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-portfolio/",
  plugins: [tailwindcss(), reactRouter()],
});
