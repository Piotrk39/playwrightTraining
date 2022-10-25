const { expect } = require('@playwright/test');
import sample from './loginLogoutData';

const bankAccountInfo = {
    bankName: "Bobs Bank",
    routingNumber: "987654321",
    accountNumber: "123456789",
    WrongbankName: "Bo",
    WrongroutingNumber: "54321",
    WrongaccountNumber: "123456",
};

export default class sampleBank {

    //Banks data
    constructor(page) {
      //imported locators
      const data = new sample(page);
      this.bankNameField = data.bankName;
      this.accountNumberField = data.accountNumber;
      this.routingNumberField = data.routingNumber;
      this.saveAccount = data.confirmButton;
      //Bank Account navigation & Details
      this.accountsButton = page.locator('[data-test="sidenav-bankaccounts"]');
      this.accountsPage = page.getByRole('heading', { name: 'Bank Accounts' });
      this.createNewBankAccout = page.locator('[data-test="bankaccount-new"]');
      this.formBankName = page.getByPlaceholder('Bank Name');
      this.newBanksFormName = page.getByRole('heading', { name: 'Create Bank Account' });
      this.newAccount = page.getByText('Bobs Bank Delete');
      this.deleteButton = page.locator('text=Delete >> nth=-1');
      //New Bank Account form Errors
      this.nameError = page.getByText('Must contain at least 5 characters');
      this.accountnumberError = page.getByText('Must contain at least 9 digits');
      this.routingNumberError = page.getByText('Must contain a valid routing number');
    }

    async redirectToNewBankForm() {
      await this.accountsButton.click();
      await expect(this.accountsPage).toHaveText('Bank Accounts');
    }

    async fillInTheForm() {
      await this.createNewBankAccout.click();
      await expect(this.newBanksFormName).toHaveText('Create Bank Account');
      await this.bankNameField.type(bankAccountInfo.bankName);
      await this.accountNumberField.type(bankAccountInfo.accountNumber);
      await this.routingNumberField.type(bankAccountInfo.routingNumber);
      await this.saveAccount.click();
      await expect(this.newAccount).toHaveText('Bobs Bank Delete');
    }

    async deleteAccount() {
      await this.deleteButton.click();
    }

    async triggerErrors() {
      await this.createNewBankAccout.click();
      await expect(this.newBanksFormName).toHaveText('Create Bank Account');
      await this.bankNameField.type(bankAccountInfo.WrongbankName);
      await expect(this.nameError).toHaveText('Must contain at least 5 characters');
      await this.accountNumberField.type(bankAccountInfo.WrongaccountNumber);
      await expect(this.accountnumberError).toHaveText('Must contain at least 9 digits');
      await this.routingNumberField.type(bankAccountInfo.WrongroutingNumber);
      await expect(this.routingNumberError).toHaveText('Must contain a valid routing number');
    }
}