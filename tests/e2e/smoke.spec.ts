import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { projectCatalogSchema } from "../../app/data/project-schema";
const projects = projectCatalogSchema.parse(JSON.parse(readFileSync(new URL("../../app/data/projects.json", import.meta.url), "utf8")));

test("homepage exposes metadata and the Project Hub", async ({ page }) => {
  const response = await page.goto("./");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Ryan Tran/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ryantr-statinops.github.io/my-portfolio/");
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.locator("[data-project-hub]")).toHaveCount(1);
  await expect(page.locator("[data-project-overview]")).toHaveCount(projects.length ? 1 : 0);
  await expect(page.locator("[data-project-category]")).toHaveCount(5);
  await page.locator('[data-project-category="data-engineering"]').click();
  await expect(page.locator('[data-project-category="data-engineering"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-project-overview]")).toHaveCount(projects.some(p => p.category === "data-engineering") ? 1 : 0);
});

test("Hero and desktop navigation lead to the Hub", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("link", { name: "VIEW PROJECTS", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "PROJECTS", exact: true }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await expect(page.getByRole("link", { name: "STRATEGY", exact: true })).toHaveCount(0);
});

test("mobile menu and keyboard navigation work without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "PROJECTS", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await page.locator('[data-project-category="all"]').focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-project-category="software-engineering"]')).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Hub remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Project Hub." })).toBeVisible();
  await expect(page.locator("[data-project-overview]")).toHaveCount(projects.length);
  for (const project of projects) await expect(page.locator("[data-project-fallback]")).toContainText(project.title);
  await expect(page.locator("[data-project-category]")).toHaveCount(0);
  await context.close();
});

test("legacy Hub anchor and reduced motion remain supported", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./#intelligence-hub");
  await expect(page.locator("#projects")).toBeInViewport();
  await expect(page.locator("[data-background-video]")).toBeHidden();
  await expect(page.locator("[data-video-poster]")).toBeVisible();
});

test("published projects expose matching status and repository in every category", async ({ page }) => {
  await page.goto("./");
  for (const category of ["software-engineering", "data-engineering", "ai-engineering", "other"]) {
    await page.locator(`[data-project-category="${category}"]`).click();
    const entries = projects.filter(p => p.category === category);
    await expect(page.locator("[data-project-select]")).toHaveCount(entries.length);
    for (const project of entries) {
      const button = page.locator(`[data-project-select="${project.id}"]`);
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(button.locator("[data-project-status]")).toHaveAttribute("data-project-status", project.status);
      const panel = page.locator("#project-overview-panel");
      await expect(panel.getByRole("heading")).toHaveText(project.title);
      await expect(panel.locator("[data-project-status]")).toHaveAttribute("data-project-status", project.status);
      await expect(panel.getByRole("link")).toHaveAttribute("href", project.links.github);
      await expect(panel.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    }
  }
});
