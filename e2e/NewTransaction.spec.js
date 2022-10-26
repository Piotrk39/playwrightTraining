import sample from '../sampleData/loginLogoutData';
import sampleTransaction from '../sampleData/TransactionData';
const { test, expect } = require('@playwright/test');

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  });

    test("New Transaction", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");

        await data.logIn();
        await transaction.navigateNewTransaction();

    });

    test("navigates to the new transaction form, selects a user and submits a transaction payment", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.createNewPayTransaction();
    });

    test("navigates to the new transaction form, selects a user and submits a transaction request", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.createNewRequestTransaction();
    });

    test("displays new transaction errors", async ({ page }) => {
        // Assertions use the expect API.
        const data = new sample(page);
        const transaction = new sampleTransaction(page);
        await expect(page).toHaveURL("http://localhost:3000/signin");

        await data.logIn();
        await transaction.navigateNewTransaction();
        await transaction.triggerTransactionErrors();
    });

    test("submits a transaction payment and verifies the deposit for the receiver", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("http://localhost:3000/signin");
    });

    test("submits a transaction request and accepts the request for the receiver", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("http://localhost:3000/signin");
    });
});

