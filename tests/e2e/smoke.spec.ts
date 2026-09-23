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
  expect(await page.title()).toMatch(/.+/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    new RegExp(`^https://ryantr-statinops\\.github\\.io${basePath}`),
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /.+/);
}

test("all generated routes expose metadata and return HTTP 200", async ({ page }) => {
  expect(projectRoutes).toHaveLength(5);

  for (const route of routes) {
    await expectSuccessfulPage(page, route);
  }
});

test("sitemap, robots and internal links are reachable", async ({ page, request }) => {
  const sitemap = await request.get("./sitemap-index.xml");
  const robots = await request.get("./robots.txt");
  expect(sitemap.status()).toBe(200);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  await page.goto("./");
  const links = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors
      .map((anchor) => (anchor as HTMLAnchorElement).href)
      .filter((href) => href.startsWith(window.location.origin) && !href.includes("#")),
  );

  for (const href of [...new Set(links)]) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test("project thumbnails resolve under the GitHub Pages base path", async ({ page, request }) => {
  await page.goto("./");
  const sources = await page.locator("img[src]").evaluateAll((images) =>
    images.map((image) => (image as HTMLImageElement).src).filter((src) => src.includes("/images/")),
  );

  expect(sources.length).toBeGreaterThan(0);
  for (const source of [...new Set(sources)]) {
    expect(new URL(source).pathname.startsWith(basePath)).toBe(true);
    expect((await request.get(source)).status(), source).toBe(200);
  }
});

test("homepage and project registry support multi-select and empty filters", async ({ page }) => {
  for (const route of ["./", "./projects/"]) {
    await page.goto(route);
    const filter = page.locator("[data-project-filter]").first();
    const all = filter.locator('[data-filter-category="all"]');
    const quant = filter.locator('[data-filter-category="finance-quant"]');
    const ops = filter.locator('[data-filter-category="ops-automation"]');
    const emptyCategory = filter.locator('[data-filter-category="ai-implementation"]');

    await expect(all).toHaveAttribute("aria-pressed", "true");
    await quant.click();
    await expect(quant).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveAttribute("aria-pressed", "false");
    await ops.click();
    await expect(ops).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-filter-empty]')).toBeHidden();

    await quant.click();
    await ops.click();
    await emptyCategory.click();
    await expect(page.locator('[data-filter-empty]')).toBeVisible();
    await expect(emptyCategory).toHaveAttribute("aria-pressed", "true");

    await all.click();
    await expect(all).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-filter-empty]')).toBeHidden();
  }
});

test("portfolio runtime terminal only accepts its whitelist", async ({ page }) => {
  await page.goto("./projects/");
  const terminal = page.locator("[data-terminal]");
  const input = terminal.locator("[data-terminal-input]");
  const output = terminal.locator("[data-terminal-output]");

  await input.fill("status");
  await input.press("Enter");
  await expect(output).toContainText("MODE: STATIC_GENERATION");
  await input.fill("uname -a");
  await input.press("Enter");
  await expect(output).toContainText("command not found");
  await input.fill("clear");
  await input.press("Enter");
  await expect(output.locator("[data-terminal-entry]")).toHaveCount(0);
});

test("theme, skip link, anchor navigation and mobile menu work", async ({ page }) => {
  await page.goto("./");
  const root = page.locator("html");
  await page.locator("#theme-toggle").click();
  await expect(root).toHaveClass(/light|dark/);

  const skipLink = page.locator('a[href="#main-content"]');
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");
  await page.locator("[data-mobile-open]").click();
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "true");
  await page.locator("[data-mobile-close]").click();
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "false");
});

test("homepage scrolls freely and anchors jump without snap", async ({ page }) => {
  await page.goto("./");
  const scrollStyle = await page.locator("html").evaluate((element) => {
    const style = getComputedStyle(element);
    return { behavior: style.scrollBehavior, snap: style.scrollSnapType };
  });
  expect(scrollStyle).toEqual({ behavior: "auto", snap: "none" });

  await page.evaluate(() => window.scrollTo(0, 350));
  await page.waitForTimeout(450);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(400);

  await page.locator('a[href="#about-me"]').click();
  await expect(page).toHaveURL(/#about-me$/);
  expect(await page.locator("#about-me").evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBe(0);

  await page.locator("#scroll-to-top").click();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("desktop navbar smoothly scrolls between sections and respects reduced motion", async ({ page }) => {
  await page.goto("./");
  await page.evaluate(() => {
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      document.documentElement.dataset.navScrollBehavior =
        typeof options === "object" ? options.behavior : "";
      original.call(this, options);
    };
  });

  await page.locator('[data-nav-section="projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "smooth");
  await expect.poll(() => page.locator("#projects").evaluate((el) => Math.abs(Math.round(el.getBoundingClientRect().top)))).toBeLessThanOrEqual(20);

  await page.locator('[data-nav-section="about-me"]').click();
  await expect(page).toHaveURL(/#about-me$/);
  await expect.poll(() => page.locator("#about-me").evaluate((el) => Math.abs(Math.round(el.getBoundingClientRect().top)))).toBeLessThanOrEqual(20);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator('[data-nav-section="connect"]').click();
  await expect(page).toHaveURL(/#connect$/);
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "instant");
  await expect.poll(() => page.locator("#connect").evaluate((el) => Math.abs(Math.round(el.getBoundingClientRect().top)))).toBeLessThanOrEqual(20);
});

test("mobile menu keeps background scrolling available", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.locator("[data-mobile-open]").click();
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "true");
  expect(await page.locator("html").evaluate((element) => getComputedStyle(element).overflowY)).not.toBe("hidden");

  await page.mouse.move(200, 300);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
});

test("mobile menu smoothly navigates home sections and keeps cross-page links", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");
  await page.evaluate(() => {
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (options) {
      document.documentElement.dataset.navScrollBehavior =
        typeof options === "object" ? options.behavior : "";
      original.call(this, options);
    };
  });

  await page.locator("[data-mobile-open]").click();
  await page.locator('[data-mobile-link="projects"]').click();
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "false");
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "smooth");
  await expect(page).toHaveURL(/#projects$/);
  await expect.poll(() => page.locator("#projects").evaluate((el) => Math.abs(Math.round(el.getBoundingClientRect().top)))).toBeLessThanOrEqual(20);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("[data-mobile-open]").click();
  await page.locator('[data-mobile-link="about-me"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-nav-scroll-behavior", "instant");
  await expect(page.locator("#mobile-nav-overlay")).toHaveAttribute("data-open", "false");
  await expect(page).toHaveURL(/#about-me$/);

  await page.goto(projectRoutes[0]);
  await page.locator("[data-mobile-open]").click();
  await page.locator('[data-mobile-link="about-me"]').click();
  await expect(page).toHaveURL(/\/my-portfolio\/#about-me$/);
  await expect(page.locator("[data-video-background]")).toHaveCount(1);
});

test("homepage keeps one fixed video behind every section", async ({ page }) => {
  await page.goto("./");
  const background = page.locator("[data-video-background]");
  const video = page.locator("[data-background-video]");
  await expect(background).toHaveCount(1);
  await expect(video).toHaveCount(1);
  await expect(video.locator("source")).toHaveAttribute("src", `${basePath}videos/dark-wave.webm`);
  const firstVideo = await video.elementHandle();

  for (const section of ["#main", "#about-me", "#intelligence-hub", "#projects", "#connect"]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    const geometry = await background.evaluate((element) => ({
      position: getComputedStyle(element).position,
      top: Math.round(element.getBoundingClientRect().top),
      height: Math.round(element.getBoundingClientRect().height),
    }));
    expect(geometry).toEqual({ position: "fixed", top: 0, height: page.viewportSize()?.height });
    expect(await page.evaluate((element) => document.querySelector("[data-background-video]") === element, firstVideo)).toBe(true);
  }

  await page.goto("./projects/");
  await expect(page.locator("[data-video-background]")).toHaveCount(0);
  await page.goto(projectRoutes[0]);
  await expect(page.locator("[data-video-background]")).toHaveCount(0);
});

test("homepage shows a static poster with reduced motion or unavailable video", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const video = page.locator("[data-background-video]");
  const poster = page.locator("[data-video-poster]");
  await expect(video).toBeHidden();
  await expect(video).toHaveJSProperty("paused", true);
  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute("src", `${basePath}images/dark-wave-poster.jpg`);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/videos/dark-wave.webm", (route) => route.abort());
  await page.reload();
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});
