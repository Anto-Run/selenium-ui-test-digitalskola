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

describe('Checkout Item #Regression #Checkout', function () {

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
        const cartPage = new CartPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.loginSucces(username, password);
        await dashboardPage.addToCart();
        await dashboardPage.navigateToPageCart();
        await cartPage.verifyAddItemToCart();
        await cartPage.checkoutYourInformation('Runanto', 'Testing', '12121');
        await cartPage.checkoutOverview();
    });

    it('Checkout Item Succesfull', async function () {
        const cartPage = new CartPage(driver);

        const verifyCheckoutTextCompletePage = await cartPage.verifyTextCheckoutCompletePage();
        let verifyIconCheckoutComplete = await cartPage.verifyIconCheckoutComplete();
        const verifyTextCheckoutHeaderComplete = await cartPage.verifyTextCheckoutHeaderComplete();
        const verifyTextCheckoutTitleComplete = await cartPage.verifyTextCheckoutTitleComplete();
        let verifyBtnBackHome = await cartPage.verifyBtnBackHome();

        // Validasi Assertion
        assert.ok(verifyCheckoutTextCompletePage.includes('Checkout: Complete!'), 'Title does not include "Checkout: Complete!"');
        assert.strictEqual(await verifyIconCheckoutComplete.isDisplayed(), true, "Icon Checkout Complete is not visible");
        assert.ok(verifyTextCheckoutHeaderComplete.includes('Thank you for your order!'), 'Title does not include "Thank you for your order!"');
        assert.ok(verifyTextCheckoutTitleComplete.includes('Your order has been dispatched, and will arrive just as fast as the pony can get there!'), 'Title does not include "Your order has been dispatched, and will arrive just as fast as the pony can get there!"');
        assert.strictEqual(await verifyBtnBackHome.isDisplayed(), true, "Button Back Home is not visible");

        // Klik kembali ke home
        await cartPage.backHome();
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.ok(title.includes('Swag Labs'), 'Title does not include "Swag Labs"');
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
