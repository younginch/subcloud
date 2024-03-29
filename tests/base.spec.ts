import { test, expect } from "@playwright/test";

const baseUrl = "https://subcloud.app";

test.describe("main page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(baseUrl);
  });

  test("basic test", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL(baseUrl);
  });
});
