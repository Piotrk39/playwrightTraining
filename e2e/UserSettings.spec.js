import sample from '../sampleData/loginLogoutData';
import sampleUserData from '../sampleData/UserData';
const { test, expect } = require('@playwright/test');

test.describe("User Settings", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

    test("renders the user settings form", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const user = new sampleUserData(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await user.navigateUserSetings();
    });

    test("updates first name, last name, email and phone number", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const user = new sampleUserData(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await user.navigateUserSetings();
        await user.updateUser();
        await data.logoutButton.click();
        await data.logIn();
        await user.navigateUserSetings();
        await user.veryfiUpdate();
    });

    test("updates again user in case the first attempt failed to assert", async ({page}) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const user = new sampleUserData(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await user.navigateUserSetings();
        await user.updateUserAgain();
        await data.logoutButton.click();
        await data.logIn();
        await user.navigateUserSetings();
        await user.veryfiUpdateAgain();
    })

    test("should display user setting form errors", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const user = new sampleUserData(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await user.navigateUserSetings();
        await user.forceErrors();
    });
});