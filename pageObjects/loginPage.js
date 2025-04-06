const { BASE_URL } = require('../utils/config');
const { expect } = require('@playwright/test');

/**
 * This class contains all the page objects and methods
 * related to the Login page for the application under test.
 */
class LoginPage {
  constructor(page) {
    /**
     * Initializes the page and element locators used for login functionality.
     */
    this.page = page;
    this.emailInput = page.locator(`input[name='email']`);
    this.passwordInput = page.locator(`input[name='password']`);
    this.loginButton = page.locator(`button[type='submit'] span[class='MuiButton-label']`);
    this.emailRequiredMsg = page.locator(`div[class='sc-ksZaOG kDhRPt'] div:nth-child(1) div:nth-child(3)`);
    this.passwordRequiredMsg = page.locator(`body div[id='root'] div div div:nth-child(2) div:nth-child(3)`);
    this.toastMessage = page.locator(`[data-test-id="toaster-message"]`);
    this.invalidEmailFormat = page.locator(`//div[normalize-space()='Email not valid']`);
  }

  /**
   * Navigates to the base URL of the application.
   */
  async baseURL() {
    await this.page.goto(BASE_URL);
  }

  /**
   * Fills in the login form with the given email and password.
   * 
   * @param {string} email - User's email address
   * @param {string} password - User's password
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login button to submit the login form.
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Validates if required field messages are displayed when fields are left empty.
   * 
   * @param {object} options - Flags for which fields to validate
   * @param {boolean} options.email - Whether to check the email required message
   * @param {boolean} options.password - Whether to check the password required message
   */
  async validateRequiredFieldMessages(options = { email: false, password: false }) {
    const { email, password } = options;

    if (email) {
      await expect(this.emailRequiredMsg).toBeVisible();
      await expect(this.emailRequiredMsg).toHaveText('Required');
      const emailAlert = await this.emailRequiredMsg.textContent();
      console.log('Email alert appeared as:', emailAlert);
    }

    if (password) {
      await expect(this.passwordRequiredMsg).toBeVisible();
      await expect(this.passwordRequiredMsg).toHaveText('Required');
      const passwordAlert = await this.passwordRequiredMsg.textContent();
      console.log('Password alert appeared as:', passwordAlert);
    }
  }

  /**
   * Validates toast message for incorrect email or password login attempt.
   * 
   * @param {string} expectedText - The expected error text (not currently used)
   */
  async validateIncorrectEmailOrPasswordAlert(expectedText) {
    await expect(this.toastMessage).toBeVisible();
    await expect(this.toastMessage).toHaveText('Your email and/or password are incorrects');
    const toastText = await this.toastMessage.textContent();
    console.log(toastText);
  }

  /**
   * Validates the alert message shown for invalid email format.
   * 
   * @param {string} expectedText - The expected validation message (not currently used)
   */
  async validateInvalidEmailFormatAlert(expectedText) {
    await expect(this.invalidEmailFormat).toBeVisible();
    await expect(this.invalidEmailFormat).toHaveText('Email not valid');
    const toastText = await this.invalidEmailFormat.textContent();
    console.log(toastText);
  }

  /**
   * Gets the native browser tooltip message shown for email validation.
   * 
   * @returns {Promise<string>} - The tooltip message from the browser
   */
  async getEmailValidationTooltip() {
    const tooltip = await this.emailInput.evaluate(el => el.validationMessage);
    console.log('Email Tooltip Message:', tooltip);
    return tooltip;
  }
}

module.exports = { LoginPage };
