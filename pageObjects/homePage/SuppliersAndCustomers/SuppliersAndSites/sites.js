const { expect } = require('@playwright/test');

/**
 * Page Object Model class for interacting with the 'Sites' section.
 */
class Sites {
  /**
   * Initializes locators for the Sites page.
   * @param {import('@playwright/test').Page} page - The Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    this.suppliersAndCustomers = page.locator(`div[permission='SUPPLIERS,CUSTOMERS,CONTACTS']`);
    this.suppliersAndSitesLink = page.locator(`//a[normalize-space()='Suppliers & Sites']`);
    this.sitesTab = page.locator(`//div[normalize-space()='Sites']`);
    this.addNewPickUpSite = page.locator(`//span[normalize-space()='Add a new pick up site']`);
    this.associatedCompanyDropDown = this.page.locator('[data-test-id="Site\\.company"]').getByRole('textbox', { name: 'Search' });
    this.siteName = page.locator('[data-test-id="Site\\.siteName"]').getByRole('textbox');
    this.marketTypesDropDown = page.locator('[data-test-id="Site\\.marketTypes"]').getByRole('button', { name: 'Open' });
    this.getMarketTypeCheckbox = (optionName) => this.page.getByRole('option', { name: optionName }).getByRole('checkbox');
    this.taxCode = page.locator(`div[data-test-id='Site.taxCode'] div div input[type='text']`);
    this.registrationCode = page.locator(`div[data-test-id='Site.registrationCode'] div div input[type='text']`);
    this.licenseNumber = page.locator(`div[data-test-id='Site.registrationCode'] div div input[type='text']`);
    this.address = page.locator('[data-test-id="AddressForm\\.address"]').getByRole('textbox');
    this.address2 = page.locator('[data-test-id="AddressForm\\.address2"]').getByRole('textbox');
    this.countryDropDown = page.locator('[data-test-id="AddressForm\\.country"]').getByRole('textbox', { name: 'Search' });
    this.countryList = (countryName) => page.getByText(countryName, { exact: true });
    this.StateRegion = page.locator('[data-test-id="AddressForm\\.stateText"]').getByRole('textbox');
    this.city = page.locator('[data-test-id="AddressForm\\.city"]').getByRole('textbox');
    this.zipCode = page.locator('[data-test-id="AddressForm\\.zipCode"]').getByRole('textbox');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.siteNameFilterTextBox = page.getByRole('textbox', { name: 'Site names' });
    this.kebabMenu = page.locator('div:nth-child(2) > div > div > .sc-gsnTZi > .MuiButtonBase-root');
    this.deleteButton = page.getByRole('menuitem', { name: 'Delete' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
  }

  /** Hovers over the "Suppliers and Customers" section. */
  async hoverOnSuppliersAndCustomers() {
    await this.suppliersAndCustomers.hover();
  }

  /** Clicks on the "Suppliers & Sites" link. */
  async clickOnSuppliersAndSites() {
    await this.suppliersAndSitesLink.click();
  }

  /** Clicks on the "Sites" tab. */
  async clickOnSitesTab() {
    await this.sitesTab.click();
  }

  /** Clicks the "Add a new pick up site" button. */
  async clickOnAddNewPickupSite() {
    await this.addNewPickUpSite.click();
  }

  /**
   * Selects an associated company from the dropdown.
   * @param {string} value - The company name to select.
   */
  async selectAssociatedCompanyFromDropdown(value) {
    const textbox = this.associatedCompanyDropDown;
    await textbox.click();
    await textbox.fill(value);
    await this.page.keyboard.press('Enter');
  }

  /** Fills out and submits the new supplier form dialog. */
  async addNewSuppierDialogForm() {
    await this.nextButton.click();
    await this.saveButton.click();
  }

  /**
   * Enters the site name.
   * @param {string} name - The site name to enter.
   */
  async enterSiteName(name) {
    await this.siteName.fill(name);
  }

  /**
   * Selects one or more market types from the dropdown.
   * @param {string} optionName - The market type to select.
   */
  async selectMarketTypes(optionName) {
    await this.marketTypesDropDown.click();
    await this.getMarketTypeCheckbox(optionName).check();
  }

  /** Clicks the 'Next' button. */
  async clickNextButton() {
    await this.nextButton.click();
  }

  /**
   * Enters the first line of address.
   * @param {string} text - The address line.
   */
  async enterAddress(text) {
    await this.address.fill(text);
  }

  /**
   * Enters the second line of address.
   * @param {string} text - The address line 2.
   */
  async enterAddress2(text) {
    await this.address2.fill(text);
  }

  /**
   * Selects the country from the dropdown.
   * @param {string} countryName - Country name to select.
   */
  async selectCountry(countryName) {
    await this.countryDropDown.click();
    await this.countryDropDown.fill(countryName);
    await this.page.waitForSelector(`text=${countryName}`); 
    await this.countryList(countryName).click();
  }

  /**
   * Enters the state/region.
   * @param {string} text - State or region.
   */
  async enterState(text) {
    await this.StateRegion.fill(text);
  }

  /**
   * Enters the city name.
   * @param {string} text - City name.
   */
  async enterCity(text) {
    await this.city.fill(text);
  }

  /**
   * Enters the ZIP/postal code.
   * @param {string} text - ZIP code.
   */
  async enterZipCode(text) {
    await this.zipCode.fill(text);
  }

  /** Clicks the save button. */
  async clickSaveButton(text) {
    await this.saveButton.click(text);
  }

  /**
   * Filters the site list by site name and selects the result.
   * @param {string} siteName - The site name to filter and select.
   */
  async filterAndSelectSite(siteName) {
    await this.siteNameFilterTextBox.click();               
    await this.siteNameFilterTextBox.fill(siteName);         

    const suggestion = this.page.locator(`li[role="option"] >> text=${siteName}`);
    await suggestion.first().click();                
  }

  /** Clicks on the kebab menu for a site entry. */
  async clickKebabMenu() {
    await this.kebabMenu.click();
  }

  /** Clicks on the delete option from the kebab menu. */
  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  /** Clicks the confirmation button to delete a site. */
  async clickConfirmButton() {
    await this.confirmButton.click();
  }
}

module.exports = { Sites };
