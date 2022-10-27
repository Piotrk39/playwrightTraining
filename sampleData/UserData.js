const { expect } = require('@playwright/test');

const userData = {
    name: "Bob",
    surname: "Ross",
    email: "bob.ross@gmail.com",
    phone: "00308954652137",
    sideBarName: "Bob R",
    upName: "Bobby",
    upSurname: "Rossi",
    upEmail: "bobby.rossi@gmail.com",
    upPhone: "0030444555666",
    upSideBarName: "Bobby R",
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
      this.sideBarName = page.locator('[data-test="sidenav-user-full-name"]');
      //Heading
      this.title = page.getByRole('heading', { name: 'User Settings' });
      //Error messages
      this.errName = page.getByText('Enter a first name');
      this.errSurname = page.getByText('Enter a last name')
      this.errEmail = page.getByText('Enter an email address');
      this.errPhone = page.getByText('Enter a phone number');
    }

    async navigateUserSetings() {
        await this.myAccount.click();
        await expect(this.title).toHaveText('User Settings');
    }

    async forceErrors() {
        //trigger name input error
        await this.name.click()
        for (const element of userData.name) {
            await this.name.press('Backspace');
        }
        await expect(this.errName).toHaveText('Enter a first name');
        //trigger surname input error
        await this.surname.click()
        for (const element of userData.surname) {
            await this.surname.press('Backspace');
        }
        await expect(this.errSurname).toHaveText('Enter a last name');
        //trigger email input error
        await this.email.click()
        for (const element of userData.email) {
            await this.email.press('Backspace');
        }
        await expect(this.errEmail).toHaveText('Enter an email address');
        //trigger phone input error
        await this.phoneNumber.click()
        for (const element of userData.phone) {
            await this.phoneNumber.press('Backspace');
        }
        await expect(this.errPhone).toHaveText('Enter a phone number');
        //Save button should be disabled
        await expect(this.saveButton).toBeDisabled();
    }

    async addEmailAndPhone() {
        await this.email.type(userData.email);
        await this.phoneNumber.type(userData.phone);
        await this.saveButton.click();
    }

    async updateUser () {
        //Update Name
        await this.name.click()
        for (const element of userData.name) {
            await this.name.press('Backspace');
        }
        await this.name.type(userData.upName)
        //Update Surname
        await this.surname.click()
        for (const element of userData.surname) {
            await this.surname.press('Backspace');
        }
        await this.surname.type(userData.upSurname);
        //Update Email
        await this.email.click()
        for (const element of userData.email) {
            await this.email.press('Backspace');
        }
        await this.email.type(userData.upEmail);
        //Update Phone
        await this.phoneNumber.click()
        for (const element of userData.phone) {
            await this.phoneNumber.press('Backspace');
        }
        await this.phoneNumber.type(userData.upPhone);
        await this.saveButton.click();
    }

    async veryfiUpdate() {
        await expect(this.sideBarName).toHaveText(userData.upSideBarName);
    }

    async updateUserAgain () {
        //Update Name
        await this.name.click()
        for (const element of userData.upName) {
            await this.name.press('Backspace');
        }
        await this.name.type(userData.name)
        //Update Surname
        await this.surname.click()
        for (const element of userData.upSurname) {
            await this.surname.press('Backspace');
        }
        await this.surname.type(userData.surname);
        //Update Email
        await this.email.click()
        for (const element of userData.upEmail) {
            await this.email.press('Backspace');
        }
        await this.email.type(userData.email);
        //Update Phone
        await this.phoneNumber.click()
        for (const element of userData.upPhone) {
            await this.phoneNumber.press('Backspace');
        }
        await this.phoneNumber.type(userData.phone);
        await this.saveButton.click();
    }

    async veryfiUpdateAgain() {
        await expect(this.sideBarName).toHaveText(userData.sideBarName);
    }
}