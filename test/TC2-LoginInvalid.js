const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage.js');
const BrowserComponent = require('../WebComponent/BrowserComponent.js');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Login with Invalid Credentials #Login #Regression', function () {

    this.timeout(40000);
    let driver;

    before(async function () {
        console.log(`Platform Browser : ${browser}`);
        const browserComponent = new BrowserComponent(driver);
        driver = await browserComponent.browserPlatform(browser);

    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login('standard', 'secret_sauce');
    });

    // Assertions
    it('Error message appears for invalid credentials', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match');
    });

    afterEach(async function () {
        console.log('Taking screenshot...');
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });

});
