const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage.js');
const DashboardPage = require('../WebComponent/DashboardPage.js');
const BrowserComponent = require('../WebComponent/BrowserComponent.js');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();


const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}


describe('Login with valid Credentials #Login #Regression #Smoke', function () {

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
        await loginPage.login(username, password);
    });

    it('should login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');
    });

    afterEach(async function () {
        console.log('Taking screenshot...');
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();

    });

});
