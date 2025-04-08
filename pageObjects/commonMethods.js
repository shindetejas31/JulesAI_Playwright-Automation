const { expect } = require('@playwright/test');

class CommonMethods {
    constructor(page) {

        this.page = page;
        this.toastMessage = (text) => this.page.locator('[data-test-id="toaster-message"]', { hasText: text });

    }

    /**
     * Validates toast message for incorrect email or password login attempt.
     * 
     * @param {string} expectedText - The expected error text (not currently used)
     */
    async validateToastAlertOrMessage(expectedText) {
        const toast = this.toastMessage(expectedText);
        await expect(toast).toBeVisible({ timeout: 10000 });

        // Print the actual toast message text
        const actualText = await toast.textContent();
        console.log(`Toast message appeared: "${actualText?.trim()}"`);
    }

}

module.exports = { CommonMethods };