import { test, expect, type Page } from "@playwright/test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const basePath = "/my-portfolio/";
const projectOutput = resolve(process.cwd(), "dist/projects");
const projectRoutes = readdirSync(projectOutput, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(projectOutput, entry.name, "index.html")))
  .map((entry) => `./projects/${entry.name}/`)
  .sort();
const routes = ["./", "./projects/", ...projectRoutes];
const projectCatalog = JSON.parse(readFileSync(resolve(process.cwd(), "app/data/projects.json"), "utf8")) as Array<{ routeSlug: string; tags: string[] }>;

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

test("SVG graph fallback responds to drag, zoom, hover, and project clicks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const graph = page.locator('section[aria-label="Interactive project intelligence graph"] svg[role="group"]');
  await graph.scrollIntoViewIfNeeded();
  const nodes = graph.locator("g").first();
  const initialTransform = await nodes.getAttribute("style");
  const bounds = await graph.boundingBox();
  expect(bounds).not.toBeNull();
  const centerX = bounds!.x + bounds!.width / 2;
  const centerY = bounds!.y + bounds!.height / 2;

  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX + 100, centerY + 30, { steps: 5 });
  await page.mouse.up();
  await expect(nodes).not.toHaveAttribute("style", initialTransform!);

  const rotatedTransform = await nodes.getAttribute("style");
  await graph.hover({ position: { x: bounds!.width / 2, y: bounds!.height / 2 } });
  await page.mouse.wheel(0, -300);
  await expect(nodes).not.toHaveAttribute("style", rotatedTransform!);

  const project = graph.getByRole("link", { name: /Open Grap4Prob/ });
  await project.hover();
  await expect(page.getByRole("tooltip")).toContainText("Grap4Prob");
  await project.click();
  await expect(page).toHaveURL(/\/my-portfolio\/projects\/grap4prob\/$/);
});

test("project graph mounts WebGL when available and retains its accessible fallback", async ({ page }) => {
  await page.goto("./");
  await page.locator(".strategic-dashboard-section").scrollIntoViewIfNeeded();
  const canvas = page.locator("canvas[data-3d-graph]");
  const fallback = page.locator('section[aria-label="Interactive project intelligence graph"] svg[role="group"]');
  await expect.poll(async () => {
    if (await canvas.isVisible()) return canvas.evaluate((element) => Boolean((element as HTMLCanvasElement).getContext("webgl2")));
    return fallback.isVisible();
  }).toBe(true);
  await expect(page.locator('ul[aria-label="Projects represented in the 3D graph"] a')).toHaveCount(5);
});

test("mobile graph keeps a usable viewport in WebGL and reduced-motion modes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("./");
  const graph = page.locator('section[aria-label="Interactive project intelligence graph"]');
  await graph.scrollIntoViewIfNeeded();
  await expect.poll(async () => (await graph.boundingBox())?.height ?? 0).toBeGreaterThan(400);
  const canvas = graph.locator("canvas[data-3d-graph]");
  const fallback = graph.locator('svg[role="group"]');
  await expect.poll(async () => (await canvas.isVisible()) || (await fallback.isVisible())).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await graph.scrollIntoViewIfNeeded();
  await expect(fallback).toBeVisible();
  await expect.poll(async () => (await graph.boundingBox())?.height ?? 0).toBeGreaterThan(400);
});

test("WebGL graph responds to drag and zoom, shows project details on hover, and opens a project on click", async ({ page }) => {
  await page.goto("./");
  const canvas = page.locator("canvas[data-3d-graph]");
  await page.locator(".strategic-dashboard-section").scrollIntoViewIfNeeded();
  await canvas.waitFor({ state: "visible", timeout: 8_000 }).catch(() => {});
  test.skip(!(await canvas.isVisible()), "WebGL is unavailable in this browser; SVG interactions are tested separately");
  await page.locator("video").evaluateAll((videos) => videos.forEach((video) => (video as HTMLVideoElement).pause()));

  const bounds = await canvas.boundingBox();
  expect(bounds).not.toBeNull();
  const centerX = bounds!.x + bounds!.width / 2;
  const centerY = bounds!.y + bounds!.height / 2;
  const initial = await canvas.screenshot({ animations: "disabled" });
  await page.waitForTimeout(350);
  const animated = await canvas.screenshot({ animations: "disabled" });
  expect(animated.equals(initial), "the idle graph should animate").toBe(false);

  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX + 100, centerY + 35, { steps: 8 });
  await page.mouse.up();
  const rotated = await canvas.screenshot({ animations: "disabled" });
  expect(rotated.equals(initial), "drag should redraw the graph at a new angle").toBe(false);

  await page.mouse.wheel(0, -300);
  const zoomed = await canvas.screenshot({ animations: "disabled" });
  expect(zoomed.equals(rotated), "wheel input should redraw the graph at a new zoom level").toBe(false);

  await page.reload();
  await page.locator(".strategic-dashboard-section").scrollIntoViewIfNeeded();
  await expect(canvas).toBeVisible();
  const resetBounds = await canvas.boundingBox();
  expect(resetBounds).not.toBeNull();

  // Raycast through pointer events to find a rendered project after the force layout has moved.
  const projectPoint = await canvas.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    for (let y = 8; y < rect.height - 8; y += 8) {
      for (let x = 8; x < rect.width - 8; x += 8) {
        element.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: rect.left + x, clientY: rect.top + y }));
        if ((element as HTMLCanvasElement).style.cursor === "pointer") return { x: rect.left + x, y: rect.top + y };
      }
    }
    return null;
  });
  expect(projectPoint, "a project sphere should be raycastable").not.toBeNull();
  await page.mouse.move(projectPoint!.x, projectPoint!.y);
  await expect(page.getByRole("tooltip")).toContainText("Complexity:");
  const firstTooltip = await page.getByRole("tooltip").boundingBox();
  await page.mouse.move(projectPoint!.x + 2, projectPoint!.y);
  const movedTooltip = await page.getByRole("tooltip").boundingBox();
  expect(movedTooltip?.x).toBeGreaterThan(firstTooltip!.x);
  await page.waitForTimeout(300);
  await expect(canvas).toHaveCSS("cursor", "pointer");
  await expect(page.getByRole("tooltip")).toBeVisible();
  await page.mouse.click(projectPoint!.x + 2, projectPoint!.y);
  await expect(page).toHaveURL(/\/my-portfolio\/projects\/(grap4prob|project-01|mean-reversion-bot|orbit-system-manager|project-02)\/$/);
});

test("every project detail shows its focus areas", async ({ page }) => {
  for (const route of projectRoutes) {
    await page.goto(route);
    const focusAreas = page.locator("article header").getByText("Focus Areas");
    await expect(focusAreas).toBeVisible();
    const slug = route.split("/").filter(Boolean).at(-1);
    const project = projectCatalog.find((entry) => entry.routeSlug === slug);
    expect(project).toBeDefined();
    expect((await focusAreas.locator("..").locator("span").allTextContents()).slice(1)).toEqual(project!.tags);
  }
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
