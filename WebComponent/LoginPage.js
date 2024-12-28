const {By} = require('selenium-webdriver')
const assert = require('assert');
const DashboardPage = require('./DashboardPage.js');

class LoginPage {
    constructor(driver){
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMessage = By.xpath("//h3[.='Epic sadface: Username and password do not match any user in this service']");

        
    }

    async navigate(){

        await this.driver.get('https://www.saucedemo.com/');

    }

    async login(username, password) {

        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async loginSucces(username, password){
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
        const dashboardPage = new DashboardPage(this.driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');

    }
    async getErrorMessage() {
        try {
            const errorElement =  await this.driver.findElement(this.errorMessage);
            return await errorElement.getText();
        } catch (err) {
            return null; //Tidak ada message
        }
    }


}

module.exports = LoginPage;