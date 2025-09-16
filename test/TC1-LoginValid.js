import chrome from "selenium-webdriver/chrome.js";
import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import assert from "assert";
import fs from "fs";
import dotenv from "dotenv";

import LoginPage from "../WebComponent/LoginPage.js";
import DashboardPage from "../WebComponent/DashboardPage.js";
import BrowserComponent from "../WebComponent/BrowserComponent.js";

dotenv.config();

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
        const options = new chrome.Options()
            .addArguments("--headless")
            .addArguments("--no-sandbox")
            .addArguments("--disable-dev-shm-usage")
            .addArguments("--disable-gpu")
            .addArguments("--remote-debugging-port=9222")
            .addArguments("--user-data-dir=/tmp/chrome-profile-" + Date.now());

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
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
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});
