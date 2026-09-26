import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// A test-only entry; never imported by application routes or the production build.
export default defineConfig({
  root: "tests/fixtures",
  plugins: [tailwindcss()],
  server: { host: "127.0.0.1", port: 4174, strictPort: true },
});
