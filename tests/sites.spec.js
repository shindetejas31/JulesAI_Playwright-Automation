const { test } = require('@playwright/test');
const loginTestData = require('../testData/loginPage.json');
const sitesTestData = require('../testData/SuppliersAndCustomers/SuppliersAndSites/sites.json');
const { LoginPage } = require('../pageObjects/loginPage');
const { HomePage } = require('../pageObjects/homePage/homePage');
const { Sites } = require('../pageObjects/homePage/SuppliersAndCustomers/SuppliersAndSites/sites');
const { CommonMethods } = require('../pageObjects/commonMethods');

/**
 * Filters the valid login user from the test data
 * @type {{ email: string, password: string, expectedSuccess: boolean }}
 */
const validUser = loginTestData.find(user => user.expectedSuccess === true);

/**
 * Playwright test suite to verify CRUD operations on Pickup Sites
 * Runs the tests in parallel for different site data entries
 */
test.describe.parallel('verify sites CRUD operations', () => {
  for (const data of sitesTestData) {
    /**
     * Test case for creating and deleting a pickup site using data-driven approach
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    test(`Create & delete pickup site: ${data.siteName}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const sites = new Sites(page);
      const commonMethods = new CommonMethods(page);

      // Login steps
      await loginPage.baseURL();
      await loginPage.login(validUser.email, validUser.password);
      await loginPage.clickLoginButton();

      // Navigate to Sites
      await sites.hoverOnSuppliersAndCustomers();
      await sites.clickOnSuppliersAndSites();
      await sites.clickOnSitesTab();

      // Create new pickup site
      await sites.clickOnAddNewPickupSite();
      await sites.selectAssociatedCompanyFromDropdown(data.associatedCompany);
      await sites.addNewSuppierDialogForm();
      await commonMethods.validateToastAlertOrMessage('Supplier saved successfully');

      await sites.enterSiteName(data.siteName);
      await sites.selectMarketTypes('Select all');
      await sites.clickNextButton();
      await sites.enterAddress(data.address1);
      await sites.enterAddress2(data.address2);
      await sites.selectCountry(data.country);
      await sites.enterState(data.state);
      await sites.enterCity(data.city);
      await sites.enterZipCode(data.zipCode);
      await sites.clickSaveButton();
      await commonMethods.validateToastAlertOrMessage('Site added successfully');

      // Delete created site
      await sites.filterAndSelectSite(data.siteName);
      await sites.clickKebabMenu();
      await sites.clickDeleteButton();
      await sites.clickConfirmButton();
      await commonMethods.validateToastAlertOrMessage('Site successfully deleted');

      //logout
      await homePage.clickOnProfileIcon();
      await homePage.clickLogoutButton();
    });
  }
});
