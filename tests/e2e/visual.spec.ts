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

const maskDynamic = (page: Page) => [page.locator("#utc-clock")];

async function stabilize(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  });
  await page.addStyleTag({
    content: "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; } video { visibility: hidden !important; }",
  });
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("active"));
  });
}

async function screenshotSectionViewport(
  page: Page,
  selector: string,
  name: string,
  options: {
    animations: "disabled";
    caret: "hide";
    maxDiffPixelRatio: number;
    timeout: number;
    mask: ReturnType<typeof maskDynamic>;
    maskColor: string;
  },
) {
  await page.evaluate((sectionSelector) => {
    const section = document.querySelector(sectionSelector);
    if (section) window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY);
  }, selector);
  await expect(page).toHaveScreenshot(name, options);
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
          maxDiffPixelRatio: viewport.name === "mobile" ? 0.08 : 0.05,
          timeout: 15_000,
          mask: maskDynamic(page),
          maskColor: theme === "dark" ? "#111111" : "#e5e5e5",
        };

        await screenshotSectionViewport(page, "section#main", `${theme}-${viewport.name}-home-hero.png`, screenshotOptions);
        await screenshotSectionViewport(page, "section#about-me", `${theme}-${viewport.name}-home-about.png`, screenshotOptions);
        await screenshotSectionViewport(page, "section#intelligence-hub", `${theme}-${viewport.name}-home-intelligence-hub.png`, screenshotOptions);
        await page.locator('[data-strategy-domain="data-engineering"]').click();
        await page.locator('[data-strategy-stage="build"]').click();
        await expect(page.locator("[data-strategy]")).toHaveScreenshot(`${theme}-${viewport.name}-strategy-build.png`, screenshotOptions);
        await page.locator("[data-strategy]").scrollIntoViewIfNeeded();
        await screenshotSectionViewport(page, "section#projects", `${theme}-${viewport.name}-home-project-showcase.png`, screenshotOptions);
        await screenshotSectionViewport(page, "footer#connect", `${theme}-${viewport.name}-home-footer.png`, screenshotOptions);

        await page.goto("./projects/");
        await stabilize(page);
        await expect(page.locator("[data-terminal]")).toHaveScreenshot(`${theme}-${viewport.name}-portfolio-runtime-terminal.png`, screenshotOptions);
        await page.locator('[data-filter-category="data-engineering"]').first().click();
        await stabilize(page);
        await expect(page.locator("[data-project-filter]").first()).toHaveScreenshot(`${theme}-${viewport.name}-filter-active.png`, screenshotOptions);
        await expect(page.locator("#portfolio-registry")).toHaveScreenshot(`${theme}-${viewport.name}-projects-registry.png`, screenshotOptions);

        if (projectRoutes.length > 0) {
          await page.goto(projectRoutes[0]);
          await stabilize(page);
          await expect(page.locator("article header")).toHaveScreenshot(`${theme}-${viewport.name}-project-detail-header.png`, screenshotOptions);
        }
      });
    });
  }
}
