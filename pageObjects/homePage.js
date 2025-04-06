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

    /**
     * Locator for the main label or header displayed on the Home Page.
     */
    this.homePageLabel = page.locator(
      `body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)`
    );
  }

  /**
   * This method is to verify the title of the Home Page.
   * It checks if the homepage label text is equal to 'Demo'.
   */
  async validateHomePageLabel() {
    await expect(this.homePageLabel).toHaveText('Demo');
  }
}

module.exports = { HomePage };
