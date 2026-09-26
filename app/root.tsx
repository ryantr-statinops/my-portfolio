import type { LinksFunction, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import SiteShell from "./components/layout/SiteShell";
import stylesheet from "../src/styles/global.css?url";

const siteBase = import.meta.env.BASE_URL;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/webp", href: `${siteBase}images/avt.webp` },
  { rel: "sitemap", href: `${siteBase}sitemap-index.xml` },
];

export const meta: MetaFunction = () => [
  { title: "Ryan Tran | Command Center" },
  { name: "description", content: "Applied Statistics student — Quantitative Finance & System Architecture" },
  { name: "robots", content: "index, follow" },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Ryan Tran | Command Center" },
  { property: "og:description", content: "Applied Statistics student — Quantitative Finance & System Architecture" },
  { name: "twitter:card", content: "summary_large_image" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: `(() => { const saved = localStorage.getItem("theme"); const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.classList.toggle("dark", theme === "dark"); document.documentElement.classList.toggle("homepage-video", location.pathname === "${siteBase}" || location.pathname === "${siteBase.slice(0, -1)}"); })();` }} />
      </head>
      <body className="bg-background text-foreground selection:bg-primary/30 transition-colors duration-300 leading-relaxed antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <SiteShell><Outlet /></SiteShell>;
}
