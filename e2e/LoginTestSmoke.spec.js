// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("User Sign-up and Login", () => {
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

  test('should allow a visitor to sign-up, login, and logout', async ({ page }) => {
    const userInfo = {
      firstName: "Bob",
      lastName: "Ross",
      username: "PainterJoy90",
      password: "s3cret",
    };

    //signup button
    const signupButton = page.locator('[data-test="signup"]');
    await expect(signupButton).toHaveAttribute('href', '/signup');
    await signupButton.click();
    
    //Error message visible for the second click to be initiated
    const nameRequiredMsg = page.getByText('Username is required');
    await expect (nameRequiredMsg).toHaveText('Username is required');
    await signupButton.click();

    //Sign up page should be visible by title
    const signupPageTitle = page.locator('[data-test="signup-title"]');
    await expect (signupPageTitle).toHaveText('Sign Up');

    //Fill in the form and sign up
    await page.getByLabel('First Name *').type(userInfo.firstName);
    await page.getByLabel('Last Name *').type(userInfo.lastName);
    await page.getByLabel('Username *').type(userInfo.username);
    await page.getByRole('textbox', { name: 'Password' }).type(userInfo.password);
    await page.getByLabel('Confirm Password *').type(userInfo.password);

    //Sign Up
    await page.locator('[data-test="signup-submit"]').click();
    
    //Confirm users redirection
    const signIn = page.getByRole('heading', { name: 'Sign in' });
    await expect(signIn).toHaveText('Sign in');

    //Login user
    await page.getByLabel('Username').type(userInfo.username);
    await page.getByLabel('Password').type(userInfo.password);
    await page.getByLabel('Remember me').click();
    await page.locator('[data-test="signin-submit"]').click();

    //Verify Login
    const menu = page.locator('xpath=//*[@id="root"]/div/div/div/div[2]');
    const userName = page.locator('[data-test="sidenav-username"]');
    await expect(menu).toHaveText('$0.00Account BalanceHomeMy AccountBank AccountsNotificationsLogout');
    await expect(userName).toHaveText('@PainterJoy90');

    //Logout
    const logoutButton = page.locator('[data-test="sidenav-signout"]');
    await logoutButton.click();

    //Verify Logout
    await expect(signIn).toHaveText('Sign in');
  })
});
