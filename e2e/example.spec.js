// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://playwright.dev/");
  });

  test("main navigation", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("https://playwright.dev/");
  });

  test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  
    // create a locator
    const getStarted = page.getByText('Get Started');
  
    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');
  
    // Click the get started link.
    await getStarted.click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });

  test('Installation title is visible', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  
    // create a locator
    const getStarted = page.getByText('Get Started');
  
    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');
  
    // Click the get started link.
    await getStarted.click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  
    // Create locator for installation
    const getTitle = page.getByRole('heading', { name: 'Installation' });
  
    // Verify that the text is visible
    await expect(getTitle).toHaveText('Installation');
  });  
});
