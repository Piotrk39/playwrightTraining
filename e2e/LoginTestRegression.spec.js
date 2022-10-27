// @ts-check
import sample from '../sampleData/loginLogoutData';
const { test, expect } = require('@playwright/test');

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

  test('should redirect unauthenticated user to signin page', async ({ page }) => {
    // Create locator
    const signIn = page.getByRole('heading', { name: 'Sign in' });

    // Verify that the text is visible
    await expect(signIn).toHaveText('Sign in');
  });

  test('should allow a visitor to sign-up, login, and logout', async ({ page }) => {
    const data = new sample(page);

    //signup button
    await expect(data.signupButton).toHaveAttribute('href', '/signup');
    await data.signupButton.click();
    
    //Error message visible for the second click to be initiated
    await expect.soft(data.nameRequiredMsg).toHaveText('Username is required');
    await data.signupButton.click();

    //Sign up page should be visible by title
    await expect(data.signupPageTitle).toHaveText('Sign Up');

    //Fill in the form and sign up
    data.signUp();
    
    //Confirm users redirection
    await expect(data.signIn).toHaveText('Sign in');

    //Login user
    data.logIn();

    //In case account creation modal pops up
    await expect(data.accountCreationModal).toBeVisible();
    await data.formFillIn();

    //Verify Login
    await expect(data.menu).toHaveText('$0.00Account BalanceHomeMy AccountBank AccountsNotificationsLogout');
    await expect(data.userName).toHaveText('@PainterJoy90');

    //Logout
    await data.logoutButton.click();

    //Verify Logout
    await expect(data.signIn).toHaveText('Sign in');
  });
});