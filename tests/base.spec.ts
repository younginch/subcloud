import { test, expect } from "@playwright/test";

test.describe("main page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://younginch.com/");
  });

  test("basic test", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("https://younginch.com/");
  });
});
