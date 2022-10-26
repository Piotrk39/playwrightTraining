const { expect } = require('@playwright/test');
import sampleTransaction from './TransactionData';

const transactionInfo = {
    
};

export default class sampleOptions {

    //Banks data
    constructor(page) {
      //import locators
      const transaction = new sampleTransaction(page);
      //imported locators
      this.paymentoptions = transaction.transactionPaid;
      //Transaction Details Locators
      this.detailHeader = page.locator('[data-test="transaction-detail-header"]');
      this.likeButton = page.locator('[data-test="transaction-like-button-JbY5_pT4g"]');
      this.commentInput = page.locator('[data-test="transaction-comment-input-JbY5_pT4g"]');
      this.likeCount = page.locator('[data-test="transaction-like-count-JbY5_pT4g"]');
    }

    async paymentTransactionOptions() {
        await this.paymentoptions.click();
        await expect(this.detailHeader).toHaveText('Transaction Detail');
        await expect(this.likeButton).toBeVisible();
    }    
}