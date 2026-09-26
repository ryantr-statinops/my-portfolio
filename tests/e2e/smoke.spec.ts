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
  await expect(page.locator("h1").first()).toBeVisible();
}

test("all published React routes expose metadata and return HTTP 200", async ({ page }) => {
  expect(projectRoutes).toEqual([]);
  for (const route of routes) await expectSuccessfulPage(page, route);
});

test("portfolio pages show the empty state and the terminal reports no published projects", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator("[data-project-filter]")).toHaveCount(0);
  await expect(page.locator("#projects [data-project-empty]")).toHaveText("Projects are being rebuilt.");

  await page.goto("./projects/");
  await expect(page.locator("[data-filter-category]")).toHaveCount(5);
  await expect(page.locator("[data-project-empty]")).toHaveText("Projects are being rebuilt.");
  await page.locator("[data-terminal-input]").fill("ls /projects");
  await page.locator("[data-terminal-input]").press("Enter");
  await expect(page.locator("[data-terminal-output]")).toContainText("No projects published yet.");
});

test("Strategy selection covers all capability-stage combinations and resets to Frame", async ({ page }) => {
  await page.goto("./");
  const domainButtons = page.locator("[data-strategy-domain]");
  const stageButtons = page.locator("[data-strategy-stage]");
  await expect(domainButtons).toHaveCount(4);
  await expect(stageButtons).toHaveCount(3);

  for (const domain of ["software-engineering", "data-engineering", "ai-engineering", "other"]) {
    const domainButton = page.locator(`[data-strategy-domain="${domain}"]`);
    await domainButton.click();
    await expect(domainButton).toHaveAttribute("aria-pressed", "true");
    for (const stage of ["frame", "test", "build"]) {
      const stageButton = page.locator(`[data-strategy-stage="${stage}"]`);
      await stageButton.click();
      await expect(stageButton).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("[data-strategy-status]")).toContainText(`${stage[0]?.toUpperCase()}${stage.slice(1)} content is being prepared.`);
    }
    await page.locator(`[data-strategy-stage="build"]`).click();
    await domainButton.click();
    await expect(page.locator('[data-strategy-stage="frame"]')).toHaveAttribute("aria-pressed", "true");
  }
});

test("Strategy controls stay local and do not change Projects", async ({ page }) => {
  await page.goto("./");
  await page.locator('[data-strategy-domain="ai-engineering"]').click();
  await page.locator('[data-strategy-stage="test"]').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#projects [data-project-empty]")).toHaveText("Projects are being rebuilt.");
});

test("Strategy remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("./");
  await expect(page.locator("[data-strategy-panel]")).toContainText("Content is being prepared.");
  await expect(page.locator("[data-strategy-domain]:visible")).toHaveCount(0);
  await expect(page.locator("[data-strategy-stage]:visible")).toHaveCount(0);
  await context.close();
});

test("keyboard selection works and narrow viewport has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  const firstDomain = page.locator('[data-strategy-domain="software-engineering"]');
  await firstDomain.focus();
  await page.keyboard.press("Tab");
  await expect(page.locator('[data-strategy-domain="data-engineering"]')).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-strategy-domain="data-engineering"]')).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("unknown project routes receive a 404 page", async ({ request, baseURL }) => {
  const response = await request.get(new URL("projects/not-a-published-project/", baseURL).href);
  expect(response.status()).toBe(404);
  await expect(response.text()).resolves.toContain("Project not found");
});

test("homepage video keeps its poster and is absent from the registry route", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("[data-video-background]")).toHaveCount(1);
  await expect(page.locator("[data-background-video]")).toBeHidden();
  await expect(page.locator("[data-video-poster]")).toBeVisible();
  await page.goto("./projects/");
  await expect(page.locator("[data-video-background]")).toHaveCount(0);
});
