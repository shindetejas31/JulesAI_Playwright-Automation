// login.spec.js
const { test, expect } = require('@playwright/test');

//1st test
test('Open Harold Waste Demo Site', async ({ page }) => {
  await page.goto('https://demo.haroldwaste.com');
  await expect(page).toHaveTitle(/Jules.ai/);
});
