import chrome from "selenium-webdriver/chrome.js";
import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import assert from "assert";
import fs from "fs";
import dotenv from "dotenv";
import BrowserComponent from "../WebComponent/BrowserComponent.js";
import LoginPage from "../WebComponent/LoginPage.js";

dotenv.config();

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
        const options = new chrome.Options()
            .addArguments("--headless")
            .addArguments("--no-sandbox")
            .addArguments("--disable-dev-shm-usage")
            .addArguments("--disable-gpu")
            .addArguments("--remote-debugging-port=9222")
            .addArguments("--user-data-dir=/tmp/chrome-profile-" + Date.now());

        // kalau kamu punya BrowserComponent khusus:
        // const browserComponent = new BrowserComponent(driver);
        // driver = await browserComponent.browserPlatform(browser);

        // sementara langsung buat driver pakai Builder:
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login("standard", "secret_sauce");
    });

    it('Error message appears for invalid credentials', async function () {
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(
            errorMessage,
            "Epic sadface: Username and password do not match any user in this service",
            "Expected error message does not match"
        );
    });

    afterEach(async function () {
        console.log("Taking screenshot...");
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, "_")}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, "base64");
    });

    after(async function () {
        await driver.quit();
    });

});
