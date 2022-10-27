import sample from '../sampleData/loginLogoutData';
import sampleTransaction from '../sampleData/TransactionData';
const { test, expect } = require('@playwright/test');

test.describe("Transaction workflow test", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

    test("New Transaction", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.navigateNewTransaction();

    });

    test("navigates to the new transaction form, selects a user and submits a transaction payment", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.createNewPayTransaction();
        await transaction.paymentVerification();
    });

    test("navigates to the new transaction form, selects a user and submits a transaction request", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.createNewRequestTransaction();
        await transaction.requestVerification();
    });

    test("displays new transaction errors", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.triggerTransactionErrors();
    });

    test("submits a transaction payment and verifies the deposit for the receiver", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.paymentVerification();
    });

    test("submits a transaction request and accepts the request for the receiver", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);

        await data.logIn();
        await transaction.requestVerification();
    });
});

