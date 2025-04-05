const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.homePageLabel = page.locator(
      `body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)`
    );
  }

  async validateHomePageLabel() {
    await expect(this.homePageLabel).toHaveText('Demo');
  }
}

module.exports = { HomePage };
