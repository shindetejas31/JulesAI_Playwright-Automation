const { BASE_URL } = require('../utils/config');
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator(`input[name='email']`);
    this.passwordInput = page.locator(`input[name='password']`);
    this.loginButton = page.locator(`button[type='submit'] span[class='MuiButton-label']`);
    this.emailRequiredMsg = page.locator(`div[class='sc-ksZaOG kDhRPt'] div:nth-child(1) div:nth-child(3)`);
    this.passwordRequiredMsg = page.locator(`body div[id='root'] div div div:nth-child(2) div:nth-child(3)`);
  }

  async baseURL() {
    await this.page.goto(BASE_URL);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async validateRequiredFieldMessages() {
    await expect(this.emailRequiredMsg).toBeVisible();
    await expect(this.emailRequiredMsg).toHaveText('Required');
    await expect(this.passwordRequiredMsg).toBeVisible();
    await expect(this.passwordRequiredMsg).toHaveText('Required');
  }
}

module.exports = { LoginPage };