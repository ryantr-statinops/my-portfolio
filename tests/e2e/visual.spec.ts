import { test, expect, type Page } from "@playwright/test";
import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const projectOutput = resolve(process.cwd(), "dist/projects");
const projectRoutes = readdirSync(projectOutput, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(projectOutput, entry.name, "index.html")))
  .map((entry) => `./projects/${entry.name}/`)
  .sort();

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
] as const;

const maskDynamic = (page: Page) => [
  page.locator("canvas"),
  page.locator("#utc-clock"),
];

async function stabilize(page: Page) {
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; scroll-snap-type: none !important; } *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }",
  });
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("active"));
  });
}

for (const theme of ["dark", "light"] as const) {
  for (const viewport of viewports) {
    test.describe(`${theme} ${viewport.name}`, () => {
      test.use({
        colorScheme: theme,
        viewport: { width: viewport.width, height: viewport.height },
      });

      test("portfolio visual baseline", async ({ page }) => {
        await page.addInitScript((selectedTheme) => {
          window.localStorage.setItem("theme", selectedTheme);
        }, theme);
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });

        await page.goto("./");
        await stabilize(page);
        const screenshotOptions = {
          animations: "disabled" as const,
          caret: "hide" as const,
          maxDiffPixelRatio: 0.05,
          timeout: 15_000,
          mask: maskDynamic(page),
        };

        await expect(page.locator("section#main")).toHaveScreenshot(`${theme}-${viewport.name}-home-hero.png`, screenshotOptions);
        await expect(page.locator("section#projects")).toHaveScreenshot(`${theme}-${viewport.name}-home-project-showcase.png`, screenshotOptions);

        await page.goto("./projects/");
        await stabilize(page);
        await expect(page.locator("[data-terminal]")).toHaveScreenshot(`${theme}-${viewport.name}-portfolio-runtime-terminal.png`, screenshotOptions);
        await page.locator('[data-filter-category="finance-quant"]').first().click();
        await expect(page.locator("[data-project-filter]").first()).toHaveScreenshot(`${theme}-${viewport.name}-filter-active.png`, screenshotOptions);
        await expect(page.locator("#portfolio-registry")).toHaveScreenshot(`${theme}-${viewport.name}-projects-registry.png`, screenshotOptions);

        await page.goto(projectRoutes[0]);
        await stabilize(page);
        await expect(page.locator("article header")).toHaveScreenshot(`${theme}-${viewport.name}-project-detail-header.png`, screenshotOptions);
      });
    });
  }
}
