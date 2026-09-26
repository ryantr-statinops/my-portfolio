import { cpSync, existsSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const siteOrigin = "https://ryantr-statinops.github.io";
const basePath = "/my-portfolio";
const clientDirectory = resolve("build/client");
const siteDirectory = resolve(clientDirectory, "my-portfolio");
const artifactDirectory = resolve("dist");
const homePage = join(siteDirectory, "index.html");

if (!existsSync(homePage)) {
  throw new Error(`React Router did not prerender the homepage: ${homePage}`);
}

for (const entry of readdirSync(clientDirectory, { withFileTypes: true })) {
  if (["my-portfolio", "__spa-fallback.html", ".vite"].includes(entry.name)) continue;
  cpSync(join(clientDirectory, entry.name), join(siteDirectory, entry.name), { recursive: true, force: true });
}

const publicUrls = [`${siteOrigin}${basePath}/`];
const sitemapBody = publicUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n");
writeFileSync(join(siteDirectory, "sitemap-0.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapBody}\n</urlset>\n`);
writeFileSync(join(siteDirectory, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${siteOrigin}${basePath}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>\n`);

const globalStyles = readdirSync(join(siteDirectory, "assets")).find((file) => file.startsWith("global-") && file.endsWith(".css"));
if (!globalStyles) throw new Error("React static artifact is missing the global stylesheet");
writeFileSync(join(siteDirectory, "404.html"), `<!doctype html>\n<html lang="en" class="dark">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex">\n<title>Page Not Found | Ryan Tran</title>\n<link rel="stylesheet" href="${basePath}/assets/${globalStyles}">\n<link rel="icon" type="image/webp" href="${basePath}/images/avt.webp">\n</head>\n<body class="bg-background text-foreground antialiased">\n<main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">\n<p class="font-mono text-xs uppercase tracking-[0.3em] text-primary">404 · Route_Not_Found</p>\n<h1 class="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>\n<p class="mt-4 text-muted">This path is not part of the published portfolio.</p>\n<a class="mt-8 w-fit rounded border border-border px-4 py-3 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary" href="${basePath}/#projects">Explore Project Hub</a>\n</main>\n</body>\n</html>\n`);

const routePaths = ["index.html", "404.html", "robots.txt", "sitemap-index.xml", "sitemap-0.xml"];
for (const routePath of routePaths) {
  if (!existsSync(join(siteDirectory, routePath))) throw new Error("Static Pages artifact is incomplete: " + routePath);
}

rmSync(artifactDirectory, { recursive: true, force: true });
renameSync(siteDirectory, artifactDirectory);
console.log("Prepared GitHub Pages artifact: " + publicUrls.length + " route pages in " + artifactDirectory);
