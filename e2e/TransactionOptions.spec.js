import sample from '../sampleData/loginLogoutData';
import sampleTransaction from '../sampleData/TransactionData';
import sampleOptions from '../sampleData/TransactionOptionsData';
const { test, expect } = require('@playwright/test');

test.describe("Transaction View options", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

    test("transactions navigation tabs are visible on a transaction view page", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        const options = new sampleOptions(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");
    
        await data.logIn();
        await transaction.paymentVerification();
        await options.paymentTransactionOptions();
    });

    test("transaction options: like and comment", async ({ page }) => {
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
});