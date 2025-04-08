const { expect } = require('@playwright/test');

/**
 * This class contains the elements and methods
 * used to interact with and validate the Home Page.
 */
class HomePage {
  constructor(page) {
    /**
     * Initializes the page and locators for home page validation.
     * 
     * @param {object} page - The Playwright page object
     */
    this.page = page;
    this.homePageLabel = page.locator(`body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)`);
    this.profileIcon = page.locator(`//div[contains(text(),'Qa JULES')]`);
    this.logoutButton = page.locator(`//div[normalize-space()='Log out']`);
  }

  /**
  * This method is to verify the title of the Home Page.
  * It checks if the homepage label text is equal to 'Demo'.
  * @returns {Promise<void>}
  */
  async validateHomePageLabel() {
    await expect(this.homePageLabel).toBeVisible({ timeout: 10000 });
    await expect(this.homePageLabel).toHaveText('Demo');
  }
  
  /**
   * Clicks on the profile icon to expand the user menu.
   * @returns {Promise<void>}
   */
  async clickOnProfileIcon() {
    await this.profileIcon.click();
  }

  /**
   * Clicks the logout button and logs a confirmation message.
   * @returns {Promise<void>}
   */
  async clickLogoutButton() {
    await this.logoutButton.click();
    console.log('User logged out successfully');
  }
}

module.exports = { HomePage };