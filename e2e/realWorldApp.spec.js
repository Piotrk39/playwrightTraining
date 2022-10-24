// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/signin");
  });

  test("main navigation", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:3000/signin");
  });

  test('should redirect unauthenticated user to signin page', async ({ page }) => {
    // Create locator
    const signIn = page.getByRole('heading', { name: 'Sign in' });

    // Verify that the text is visible
    await expect(signIn).toHaveText('Sign in');
  });
});
