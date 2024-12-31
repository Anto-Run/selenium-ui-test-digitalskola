const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage.js');
const DashboardPage = require('../WebComponent/DashboardPage.js');
const CartPage = require('../WebComponent/CartPage.js');
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

describe('Add Item to Cart #Cart #Regression', function () {

    this.timeout(40000);
    let driver;

    before(async function () {
        console.log(`Platform Browser : ${browser}`);
        const browserComponent = new BrowserComponent(driver);
        driver = await browserComponent.browserPlatform(browser);

    });


    beforeEach(async function () {
        const dashboardPage = new DashboardPage(driver);
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.loginSucces(username, password);
        await dashboardPage.addToCart();
        await dashboardPage.navigateToPageCart();
    });

    it('Item Succesfull Add to Cart', async function () {
        const cartPage = new CartPage(driver);
        let verifyCartPageText = await cartPage.isOnCartPage();
        let cartQuantity = await cartPage.getDataQuantity();
        let itemName = await cartPage.getDataItemName();
        let itemPrice = await cartPage.getDataItemPrice();

        assert.strictEqual(verifyCartPageText.includes('Your Cart'), true, 'Title does not include "Your Cart"');
        assert.strictEqual(cartQuantity.includes(1), true, 'Cart Quantity Item Not Match');
        assert.strictEqual(itemName.includes('Sauce Labs Backpack'), true, 'Item Name Product Not Match');
        assert.strictEqual(itemPrice.includes('$29.99'), true, 'Item Price Not Match');

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
