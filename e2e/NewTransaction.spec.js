import sample from '../sampleData/loginLogoutData';
const { test, expect } = require('@playwright/test');

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

    test("main navigation", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("http://localhost:3000/signin");
    });
});

