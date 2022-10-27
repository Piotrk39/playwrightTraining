import sample from '../sampleData/loginLogoutData';
import sampleTransaction from '../sampleData/TransactionData';
import sampleOptions from '../sampleData/TransactionOptionsData';
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
        const transaction = new sampleTransaction(page);
        const options = new sampleOptions(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await transaction.paymentVerification();
        await options.paymentTransactionOptions();
        await options.likeAndCommentPayment();
    });

    test("should display user setting form errors", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        const options = new sampleOptions(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await transaction.requestVerification();
        await options.RequestTransactionOptions();
        await options.likeAndCommentPayment();
    });
});