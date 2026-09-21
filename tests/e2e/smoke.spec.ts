import { test, expect } from "@playwright/test";

test("homepage is served by the static preview", async ({ page }) => {
  await page.goto("./");

  await expect(page).toHaveTitle(/Ryan Tran/i);
  await expect(page.locator("main")).toBeVisible();
});
