const {Builder} = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage.js');
const DashboardPage = require('../WebComponent/DashboardPage.js');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = '../screenshots/';
if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true})
}

describe('Login with Invalid Credentials', function () {

    this.timeout(40000);
    let driver;
 

    before(async function () {
        driver = await new Builder().forBrowser('firefox').build() 
    });


    beforeEach(async function() {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard', 'secret_sauce');
    });


    //assertions
    it('Error message appears for invalid credentials', async function (){
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match')
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
        
    });
    
});
