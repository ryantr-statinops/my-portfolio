import { test, expect, type Page } from "@playwright/test";
import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const basePath = "/my-portfolio/";
const projectOutput = resolve(process.cwd(), "dist/projects");
const projectRoutes = readdirSync(projectOutput, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(projectOutput, entry.name, "index.html")))
  .map((entry) => `./projects/${entry.name}/`)
  .sort();
const routes = ["./", "./projects/", ...projectRoutes];

async function expectSuccessfulPage(page: Page, route: string) {
  const response = await page.goto(route);
  expect(response?.status(), `HTTP status for ${route}`).toBe(200);
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    new RegExp(`^https://ryantr-statinops\\.github\\.io${basePath}`),
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator("h1").first()).toBeVisible();
}

test("all React static routes expose page metadata and return HTTP 200 directly", async ({ page }) => {
  expect(projectRoutes).toHaveLength(5);
  for (const route of routes) await expectSuccessfulPage(page, route);
});

test("showcase and detail navigation use each filename slug", async ({ page, request }) => {
  await page.goto("./");
  const projectLinks = await page.locator("#projects [data-portfolio-project] a[href*='/projects/']").evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(projectLinks).toHaveLength(5);
  for (const href of projectLinks) expect((await request.get(href)).status(), href).toBe(200);

  await page.goto(projectRoutes[0]);
  await expect(page.locator("article header h1")).toBeVisible();
  await expect(page.locator(".project-prose")).toBeVisible();
});

test("all local project and background images load beneath the base path", async ({ page, request }) => {
  await page.goto("./");
  const sources = await page.locator("img[src]").evaluateAll((images) => images.map((image) => (image as HTMLImageElement).src).filter((src) => src.includes("/images/")));
  expect(sources.length).toBeGreaterThan(0);
  for (const source of [...new Set(sources)]) {
    expect(new URL(source).pathname.startsWith(basePath)).toBe(true);
    expect((await request.get(source)).status(), source).toBe(200);
  }
});

test("project graph retains an accessible reduced-motion fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const fallback = page.locator('section[aria-label="Interactive project intelligence graph"] svg[role="group"]');
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveAttribute("aria-label", /Graph connecting 5 projects across/);
  await expect(page.locator('ul[aria-label="Projects represented in the 3D graph"] a')).toHaveCount(5);
});
test("project graph mounts WebGL when available and retains its accessible fallback", async ({ page }) => {
  await page.goto("./");
  await page.locator(".strategic-dashboard-section").scrollIntoViewIfNeeded();
  const canvas = page.locator("canvas[data-3d-graph]");
  const fallback = page.locator('section[aria-label="Interactive project intelligence graph"] svg[role="group"]');
  await expect.poll(async () => await canvas.isVisible() || await fallback.isVisible()).toBe(true);

  if (await canvas.isVisible()) {
    expect(await canvas.evaluate((element) => Boolean((element as HTMLCanvasElement).getContext("webgl2")))).toBe(true);
  } else {
    await expect(fallback).toBeVisible();
  }
  await expect(page.locator('ul[aria-label="Projects represented in the 3D graph"] a')).toHaveCount(5);
});
test("homepage category filter updates hub metrics and showcase with multi-select and empty state", async ({ page }) => {
  await page.goto("./");
  const filter = page.locator("[data-project-filter]");
  const all = filter.locator('[data-filter-category="all"]');
  const data = filter.locator('[data-filter-category="data-math"]');
  const quant = filter.locator('[data-filter-category="finance-quant"]');
  await data.click();
  await quant.click();
  await expect(data).toHaveAttribute("aria-pressed", "true");
  await expect(quant).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-kpi="projects"]')).toHaveText("03");
  await expect(page.locator("#projects [data-portfolio-project]")).toHaveCount(3);

  await all.click();
  await filter.locator('[data-filter-category="ai-implementation"]').click();
  await expect(page.locator("#projects [data-filter-empty]")).toBeVisible();
  await expect(page.locator('[data-kpi="projects"]')).toHaveText("00");
  await all.click();
  await expect(page.locator("#projects [data-portfolio-project]")).toHaveCount(5);
});

test("registry supports multi-select, accessible state, and empty categories", async ({ page }) => {
  await page.goto("./projects/");
  const filter = page.locator("[data-project-filter]");
  const all = filter.locator('[data-filter-category="all"]');
  const quant = filter.locator('[data-filter-category="finance-quant"]');
  const ops = filter.locator('[data-filter-category="ops-automation"]');
  const empty = filter.locator('[data-filter-category="ai-implementation"]');
  await quant.click();
  await ops.click();
  await expect(page.locator("tbody tr[data-portfolio-project]")).toHaveCount(2);
  await expect(all).toHaveAttribute("aria-pressed", "false");
  await all.click();
  await empty.click();
  await expect(page.locator("tbody tr[data-portfolio-project]")).toHaveCount(0);
  await expect(page.locator("[data-filter-empty]")).toBeVisible();
  await all.click();
  await expect(page.locator("tbody tr[data-portfolio-project]")).toHaveCount(5);
});

test("terminal whitelist, command history, and clear behavior work", async ({ page }) => {
  await page.goto("./projects/");
  const input = page.locator("[data-terminal-input]");
  const output = page.locator("[data-terminal-output]");
  await input.fill("status");
  await input.press("Enter");
  await expect(output).toContainText("MODE: STATIC_GENERATION");
  await input.fill("uname -a");
  await input.press("Enter");
  await expect(output).toContainText("command not found");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("uname -a");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("status");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("uname -a");
  await input.fill("clear");
  await input.press("Enter");
  await expect(output.locator("[data-terminal-entry]")).toHaveCount(0);
});

test("theme follows system preference until an explicit choice persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("./projects/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("skip link, smooth section navigation, reduced motion, and mobile menu work", async ({ page }) => {
  await page.goto("./");
  const skipLink = page.locator('a[href="#main-content"]');
  await skipLink.focus();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.evaluate(() => {
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      document.documentElement.dataset.navScrollBehavior = typeof options === "object" ? options.behavior ?? "" : "";
      original.call(this, options);
    };
  });
  await page.locator('[data-nav-section="projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "smooth");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator('[data-nav-section="about-me"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "instant");

  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");
  const opener = page.locator("[data-mobile-open]");
  await opener.click();
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator('[data-mobile-link="about-me"]')).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await opener.click();
  await page.locator('[data-mobile-link="projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "false");
});

test("project detail Markdown renders math, tables, captions, and base-prefixed local images", async ({ page, request }) => {
  await page.goto("./projects/project-01/");
  await expect(page.locator(".project-prose .katex").first()).toBeVisible();
  await expect(page.locator(".project-prose table")).toHaveCount(1);
  const images = await page.locator(".project-prose img").evaluateAll((items) => items.map((image) => (image as HTMLImageElement).src));
  expect(images.length).toBeGreaterThan(0);
  for (const source of images) {
    expect(new URL(source).pathname.startsWith(basePath)).toBe(true);
    expect((await request.get(source)).status()).toBe(200);
  }
});

test("homepage video keeps a fixed poster and is absent from non-home routes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("[data-video-background]")).toHaveCount(1);
  await expect(page.locator("[data-background-video]")).toBeHidden();
  await expect(page.locator("[data-video-poster]")).toBeVisible();
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-video-background]")).toHaveCSS("position", "fixed");
  await page.goto("./projects/");
  await expect(page.locator("[data-video-background]")).toHaveCount(0);
});
