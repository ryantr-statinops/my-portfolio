import { test, expect, type Page } from "@playwright/test";
const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
] as const;

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
        };

        await screenshotSectionViewport(page, "section#main", `${theme}-${viewport.name}-home-hero.png`, screenshotOptions);
        // Isolate the full section from viewport-fixed navigation during the tall capture.
        const sectionCaptureStyle = await page.addStyleTag({
          content: 'nav[aria-label="Primary"] { visibility: hidden !important; }',
        });
        await expect(page.locator("section#about-me")).toHaveScreenshot(`${theme}-${viewport.name}-home-about.png`, screenshotOptions);
        await sectionCaptureStyle.evaluate(element => element.parentNode?.removeChild(element));
        await screenshotSectionViewport(page, "section#projects", `${theme}-${viewport.name}-home-project-hub.png`, screenshotOptions);
        await screenshotSectionViewport(page, "footer#connect", `${theme}-${viewport.name}-home-footer.png`, screenshotOptions);

        await page.goto("http://127.0.0.1:4174/hub.html");
        await stabilize(page);
        await page.locator('[data-project-select="software-later"]').click();
        await expect(page.locator("[data-project-hub]")).toHaveScreenshot(`${theme}-${viewport.name}-populated-project-hub.png`, screenshotOptions);
      });
    });
  }
}
