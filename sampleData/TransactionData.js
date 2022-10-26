const { expect } = require('@playwright/test');
import sample from './loginLogoutData';
import sampleBank from './BankAccountData';

const transactionInfo = {
    amountPay: "35",
    notePay: "I pay you pay we all pay",
    amountReq: "120",
    noteReq: "Sushi was great payback is better",
    searchPartialPay: "home",
    searchPartialReq: "Beck",
    searchPartialErr: "Ibra",
};

export default class sampleTransaction {

    //Banks data
    constructor(page) {
      //imported locators
      const data = new sample(page);
      this.bankNameField = data.bankName;
      //New Transaction Locators
      this.newTransactionButton = page.locator('[data-test="nav-top-new-transaction"]');
      this.newTransactioHeader = page.getByText('Select Contact');
      this.searchRecipientInput = page.locator('[data-test="user-list-search-input"]');
      this.kaylin = page.getByText('Kaylin Homenick');
      this.devon = page.getByText('Devon Becker');
      this.ibrahim = page.getByText('Ibrahim Dickens');
      //Transaction form
      this.amount = page.getByPlaceholder('Amount');
      this.note = page.getByPlaceholder('Add a note');
      this.pay = page.locator('[data-test="transaction-create-submit-payment"]');
      this.request = page.locator('[data-test="transaction-create-submit-request"]');
      this.confirmation = page.locator('div:nth-child(2) > div:nth-child(2) > div');
      this.returnToTransactions = page.locator('[data-test="new-transaction-return-to-transactions"]');
      //My transaction tab
      this.myTransactions = page.locator('[data-test="nav-personal-tab"]');
      this.transactionPaid = page.getByRole('grid', { name: 'grid' }).locator('div:has-text("Bob Ross paid Kaylin HomenickI pay you pay we all pay00-$35.00")').nth(1).first();
      this.transactionReq = page.getByRole('grid', { name: 'grid' }).locator('div:has-text("Bob Ross requested Devon BeckerSushi was great payback is better00+$120.00")').nth(1).first();
      //Error Message
      this.errAmount = page.getByText('Please enter a valid amount');
      this.errNote = page.getByText('Please enter a note');
    }

    async navigateNewTransaction() {
        await this.newTransactionButton.click();
        await expect(this.newTransactioHeader).toHaveText('Select Contact');
    }

    async createNewPayTransaction() {
      await this.searchRecipientInput.type(transactionInfo.searchPartialPay);
      await expect(this.kaylin).toHaveText('Kaylin Homenick');
      await this.kaylin.click();
      await this.amount.type(transactionInfo.amountPay);
      await this.note.type(transactionInfo.notePay);
      await this.pay.click();
      await expect(this.confirmation).toHaveText('Paid $35.00 for I pay you pay we all pay')
      await this.returnToTransactions.click();
      await this.myTransactions.click();
      await expect(this.transactionPaid).toHaveText('Bob Ross paid Kaylin HomenickI pay you pay we all pay00-$35.00');
    }

    async createNewRequestTransaction() {
        await this.searchRecipientInput.type(transactionInfo.searchPartialReq);
        await expect(this.devon).toHaveText('Devon Becker');
        await this.devon.click();
        await this.amount.type(transactionInfo.amountReq);
        await this.note.type(transactionInfo.noteReq);
        await this.request.click();
        await expect(this.confirmation).toHaveText('Requested $120.00 for Sushi was great payback is better')
        await this.returnToTransactions.click();
        await this.myTransactions.click();
        await expect(this.transactionReq).toHaveText('Bob Ross requested Devon BeckerSushi was great payback is better00+$120.00');
      }

    async triggerTransactionErrors() {
        await this.searchRecipientInput.type(transactionInfo.searchPartialReq);
        await expect(this.ibrahim).toHaveText('Ibrahim Dickens');
        await this.ibrahim.click();
        await this.amount.click();
        await this.note.click();
        await this.amount.click();
        await expect(this.errAmount).toHaveText('Please enter a valid amount');
        await expect(this.errNote).toHaveText('Please enter a note');
    }
}