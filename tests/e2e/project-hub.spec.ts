import { test, expect } from "@playwright/test";

const fixtureUrl = "http://127.0.0.1:4174/hub.html";

test("populated Hub orders, filters and resolves project selection", async ({ page }) => {
  await page.goto(fixtureUrl);
  const panel = page.locator("#project-overview-panel");
  await expect(page.locator("[data-project-select]")).toHaveText(["Data First", "Software First", "Software Later"]);
  await expect(panel).toContainText("Overview of the first data engineering project.");
  const listBox = await page.getByRole("navigation", { name: "Choose a project" }).boundingBox();
  const panelBox = await panel.boundingBox();
  expect(panelBox!.x).toBeGreaterThan(listBox!.x + listBox!.width);
  await page.locator('[data-project-select="software-later"]').click();
  await expect(panel).toContainText("Software Later");
  await expect(panel.getByRole("link")).toHaveAttribute("href", "https://github.com/example/software-later");
  await expect(panel.getByRole("link")).toHaveAttribute("target", "_blank");
  await page.locator('[data-project-category="software-engineering"]').click();
  await expect(panel).toContainText("Software Later");
  await page.locator('[data-project-category="data-engineering"]').click();
  await expect(panel).toContainText("Data First");
  await page.locator('[data-project-category="ai-engineering"]').click();
  await expect(panel).toHaveCount(0);
  await expect(page.locator("[data-project-empty]")).toHaveText("No projects in this category yet.");
  await page.locator('[data-project-category="software-engineering"]').click();
  await expect(panel).toContainText("Software First");
  await page.locator('[data-project-category="all"]').click();
  await expect(panel).toContainText("Software First");
});

test("populated Hub supports keyboard selection and narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(fixtureUrl);
  await page.locator('[data-project-select="data-first"]').focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-project-select="software-first"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#project-overview-panel")).toContainText("Software First");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
