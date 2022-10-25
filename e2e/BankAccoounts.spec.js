// @ts-check
import sample from '../sampleData/loginLogoutData';
import sampleBank from '../sampleData/BankAccountData';
const { test, expect } = require('@playwright/test');

test.describe("User creates new bank account and deletes it", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const data = new sample(page);
    await data.navigate();
  }); 

  test("creates a new bank account", async ({ page }) => {
      const data = new sample(page);
      const bank = new sampleBank(page);
      
      await data.logIn();
      await bank.redirectToNewBankForm();
      await bank.fillInTheForm();
  });  

  test("should display bank account form errors", async ({ page }) => {
      const data = new sample(page);
      
  });  

  test("soft deletes a bank account", async ({ page }) => {
      const data = new sample(page);
      const bank = new sampleBank(page);

      await data.logIn();
      await bank.redirectToNewBankForm();
      await bank.deleteAccount();
  });
});
