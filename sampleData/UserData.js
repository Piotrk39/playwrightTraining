const { expect } = require('@playwright/test');

const userData = {
    paymentComment: "I paied here",
    requestComment: "I requested it",
};

export default class sampleUserData {

    //User Details
    constructor(page) {
      //User Settings Locators
      this.myAccount = page.locator('[data-test="sidenav-user-settings"]');
      this.name = page.locator('[data-test="user-settings-firstName-input"]');
      this.surname =page.locator('[data-test="user-settings-lastName-input"]');
      this.email = page.locator('[data-test="user-settings-email-input"]');
      this.phoneNumber = page.locator('[data-test="user-settings-phoneNumber-input"]');
      this.saveButton = page.locator('[data-test="user-settings-submit"]');
      //Heading
      this.title = page.getByRole('heading', { name: 'User Settings' });
    }

    async navigateUserSetings() {
        await this.myAccount.click();
        await expect(this.title).toHaveText('User Settings');
    }
}