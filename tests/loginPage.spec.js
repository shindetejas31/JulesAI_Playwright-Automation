const { test, expect } = require('@playwright/test');
const loginTestData = require('../testData/loginPage.json');
const { LoginPage } = require('../pageObjects/loginPage');
const { HomePage } = require('../pageObjects/homePage');

/**
 * @description
 * This test suite covers Login Functionality using a Data Driven approach.
 * It executes multiple login scenarios based on the test data JSON file.
 */
test.describe('Login Functionality - Data Driven (Multiple Scenarios)', () => {
    let loginPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.baseURL();
    });

    for (const data of loginTestData) {
        test(`${data.scenario}`, async ({ page }) => {

            /**
             * Scenario 1: Login with valid email and password.
             * Expectation: User should be navigated to home page (purchases).
             */

            await loginPage.login(data.email || '', data.password || '');
            await loginPage.clickLoginButton();

            if (data.expectedSuccess) {
                await homePage.validateHomePageLabel();
                await expect(page).toHaveURL(/.*purchases/i);

                /**
                 * Scenario 2: Invalid email format missing '.com'.
                 * Expectation: Only invalid email alert appears. Tooltip is not shown.
                 */
            } else if (data.invalidEmailFormatAlertOnly) {
                await loginPage.validateInvalidEmailFormatAlert();
                const tooltipMessage = await loginPage.getEmailValidationTooltip();
                expect(tooltipMessage).toBe(""); // Tooltip does not appear

                /**
                 * Scenario 3: Invalid email format missing '@'.
                 * Expectation: Both alert and tooltip should appear.
                 */
            } else if (data.invalidEmailFormatAlertAndTooltip) {
                await loginPage.validateInvalidEmailFormatAlert();
                const tooltipMessage = await loginPage.getEmailValidationTooltip();
                expect(tooltipMessage).toContain("include an '@' in the email address");

                /**
                 * Scenario 4: Email and password fields are empty.
                 * Expectation: Required field messages should be shown for both.
                 */
            } else if (data.requiredField) {
                await loginPage.validateRequiredFieldMessages({ email: true, password: true });

                /**
                 * Scenario 5: Only email is empty.
                 * Expectation: Required field message for email only.
                 */
            } else if (data.requiredEmail) {
                await loginPage.validateRequiredFieldMessages({ email: true });

                /**
                 * Scenario 6: Only password is empty.
                 * Expectation: Required field message for password only.
                 */
            } else if (data.requiredPassword) {
                await loginPage.validateRequiredFieldMessages({ password: true });

                /**
                 * Scenario 7, 8, 9: Any invalid credential combination (email or password or both).
                 * Expectation: Incorrect email or password alert should be shown.
                 */
            } else if (data.invalidEmailAndValidPassword || data.validEmailAndInvalidPassword || data.invalidEmailAndInvalidPassword) {
                await loginPage.validateIncorrectEmailOrPasswordAlert();
            }

            /**
           * Scenario 10: Check if the password field input is masked.
           * Expectation: Password input type should be 'password'.
           */
            if (data.checkPasswordMasking) {
                await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
                const inputType = await loginPage.passwordInput.getAttribute('type');
                console.log('Password input type is:', inputType);
                expect(inputType).toBe('password');
                return;
            }
        });
    }
});
