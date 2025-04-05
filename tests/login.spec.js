const { test } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/loginPage');
const { HomePage } = require('../pageObjects/homePage');
const loginTestData = require('../testData/loginPage.json');

let loginPage;
let homePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.baseURL();
});

test('Login with valid credentials', async () => {
  const { email, password } = loginTestData.validCredentials;
  await loginPage.login(email, password);
  await loginPage.clickLoginButton();
  await homePage.validateHomePageLabel();
});
