const { expect } = require('@playwright/test');
import sampleTransaction from './TransactionData';

const comment = {
    paymentComment: "I paied here",
    requestComment: "I requested it",
};

export default class sampleOptions {

    //Banks data
    constructor(page) {
      //import locators
      const transaction = new sampleTransaction(page);
      //imported locators
      this.paymentoptions = transaction.transactionPaid;
      this.requestOptions= transaction.transactionReq;
      //Transaction Details Locators
      this.detailHeader = page.locator('[data-test="transaction-detail-header"]');
      this.likeButton = page.locator('xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[1]/div[2]');
      this.commentInput = page.locator('input');
      this.likeCount = page.locator('xpath=//*[@id="root"]/div/main/div[2]/div/div/div/div[2]/div/div[1]/div[1]');
      this.commentSection = page.getByRole('heading', { name: 'Comments' });
      this.paymentComment = page.getByText('I paied here');
    }

    async paymentTransactionOptions() {
        await this.paymentoptions.click();
        await expect(this.detailHeader).toHaveText('Transaction Detail');
        await expect(this.likeButton).toBeVisible();
        await expect(this.likeCount).toHaveText('0');
    }

    async RequestTransactionOptions() {
        await this.requestOptions.click();
        await expect(this.detailHeader).toHaveText('Transaction Detail');
        await expect(this.likeButton).toBeVisible();
        await expect(this.likeCount).toHaveText('0');
    }

    async likeAndCommentPayment() {
        await this.likeButton.click();
        await expect(this.likeCount).toHaveText('1');
        // await expect(this.likeButton).toBeHidden(); Like button cannot be detected
        await this.commentInput.type(comment.paymentComment);
        await this.commentInput.press('Enter');
        await expect(this.commentSection).toHaveText('Comments');
        await expect(this.paymentComment).toHaveText('I paied here');
    }
}