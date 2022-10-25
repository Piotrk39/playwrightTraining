const { expect } = require('@playwright/test');

const userInfo = {
    firstName: "Bob",
    lastName: "Ross",
    username: "PainterJoy90",
    password: "s3cret",
};

export default class sample {

    //New account data
    constructor(page) {
      this.page = page;
      this.bankName = page.getByPlaceholder('Bank Name');
      this.routingNumber = page.getByPlaceholder('Routing Number');
      this.accountNumber = page.getByPlaceholder('Account Number');
      this.nextButton = page.locator('[data-test="user-onboarding-next"]');
      this.confirmButton = page.locator('[data-test="bankaccount-submit"]');
      //Login and signup data
      this.firstName = page.getByLabel('First Name *');
      this.lastName = page.getByLabel('Last Name *');
      this.username = page.getByLabel('Username *');
      this.password = page.getByRole('textbox', { name: 'Password' });
      this.confirmPassword = page.getByLabel('Confirm Password *');
      this.signUpButton = page.locator('[data-test="signup-submit"]');
      this.userNameLogin = page.getByLabel('Username');
      this.loginPasswordBox = page.getByLabel('Password');
      this.remeberCheckBox = page.getByLabel('Remember me');
      this.loginButton = page.locator('[data-test="signin-submit"]');
      //Test data verifyers
      this.signIn = page.getByRole('heading', { name: 'Sign in' });
      this.signupButton = page.locator('[data-test="signup"]');
      this.nameRequiredMsg = page.getByText('Username is required');
      this.signupPageTitle = page.locator('[data-test="signup-title"]');
      this.menu = page.locator('xpath=//*[@id="root"]/div/div/div/div[2]');
      this.userName = page.locator('[data-test="sidenav-username"]');
      this.logoutButton = page.locator('[data-test="sidenav-signout"]');
      this.accountCreationModal = page.getByRole('heading', { name: 'Get Started with Real World App' });
    }

    async navigate() {
      await this.page.goto('http://localhost:3000/signin');
    }
  
    async formFillIn() {
      await this.nextButton.click();
      await this.bankName.type('The Best Bank');
      await this.routingNumber.type('987654321');
      await this.accountNumber.type('123456789');
      await this.confirmButton.click();
      await this.nextButton.click()
    }

    async signUp() {
      await this.firstName.type(userInfo.firstName);
      await this.lastName.type(userInfo.lastName);
      await this.username.type(userInfo.username);
      await this.password.type(userInfo.password);
      await this.confirmPassword.type(userInfo.password);
      await this.signUpButton.click();
    }

    async logIn() {
      await this.userNameLogin.type(userInfo.username);
      await this.loginPasswordBox.type(userInfo.password);
      await this.remeberCheckBox.click();
      await this.loginButton.click();
    }
}