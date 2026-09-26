import type { Config } from "@react-router/dev/config";

export default {
  basename: "/my-portfolio/",
  ssr: false,
  prerender: ["/"],
} satisfies Config;
