const { By } = require('selenium-webdriver')
const {Builder} = require('selenium-webdriver');
const DashboardPage = require('../WebComponent/DashboardPage.js');

const assert = require('assert');

class CartPage {


    constructor(driver) {
        this.driver = driver;
        this.verifyCartPage = By.xpath("//div[@id='header_container']/div[2]/span");
        this.cartQuantity = By.xpath("//div[@class='cart_quantity']");
        this.itemName = By.xpath("//div[@class='inventory_item_name']");
        this.itemPrice = By.xpath("//div[@class='inventory_item_price']");


        //Input Data
        this.inputFirstName = By.xpath("//input[@id='first-name']");
        this.inputLastName = By.xpath("//input[@id='last-name']");
        this.inputZipCode = By.xpath("//input[@id='postal-code']");


        //Button
        this.btnCheckout = By.xpath("//button[@id='checkout']");
        this.btnContinue = By.xpath("//input[@id='continue']");
        this.btnFinish = By.xpath("//button[@id='finish']");
        this.btnBackHome = By.xpath("//button[@id='back-to-products']");


        //Verify Text
        this.verifyText = By.xpath("//span[@class='title']");
        this.verifySuccesCheckout = By.xpath("//h2[@class='complete-header']");
        this.verifyTextComplete = By.xpath("//div[@class='complete-text']");

        //verify Icon
        this.verifyIcon = By.xpath("//img[@alt='Pony Express']");


    }
    async isOnCartPage() {
        let verifyCartPageText = await this.driver.findElement(this.verifyCartPage).getText();
        return verifyCartPageText;
    }

    async getDataQuantity() {

        let cartQuantity = await this.driver.findElement(this.cartQuantity).getText();
        return cartQuantity;

    }

    async getDataItemName() {
        let itemName = await this.driver.findElement(this.itemName).getText();
        return itemName;

    }

    async getDataItemPrice() {

        let itemPrice = await this.driver.findElement(this.itemPrice).getText();
        return itemPrice;

    }

    async verifyAddItemToCart() {
        let verifyCartPageText = await this.isOnCartPage();
        let cartQuantity = await this.getDataQuantity();
        let itemName = await this.getDataItemName();
        let itemPrice = await this.getDataItemPrice();

        assert.strictEqual(verifyCartPageText.includes('Your Cart'), true, 'Title does not include "Your Cart"');
        assert.strictEqual(cartQuantity.includes(1), true, 'Cart Quantity Item Not Match');
        assert.strictEqual(itemName.includes('Sauce Labs Backpack'), true, 'Item Name Product Not Match');
        assert.strictEqual(itemPrice.includes('$29.99'), true, 'Item Price Not Match');

    }

    async checkoutYourInformation(firstName, lastName, zipCode) {
        await this.driver.findElement(this.btnCheckout).click();
        // Page Checkout Your Information
        let text = await this.driver.findElement(this.verifyText).getText();
        assert.strictEqual(text.includes('Checkout: Your Information'), true, 'Title does not include "Checkout: Your Information"')
        await this.driver.findElement(this.inputFirstName).sendKeys(firstName);
        await this.driver.findElement(this.inputLastName).sendKeys(lastName);
        await this.driver.findElement(this.inputZipCode).sendKeys(zipCode);
        await this.driver.findElement(this.btnContinue).click();

    }

    async checkoutOverview() {

        // Page Checkout Overview
        let cartQuantity = await this.getDataQuantity();
        let itemName = await this.getDataItemName();
        let itemPrice = await this.getDataItemPrice();
        let text = await this.driver.findElement(this.verifyText).getText();

        assert.strictEqual(text.includes('Checkout: Overview'), true, 'Title does not include "Checkout: Overview"')
        assert.strictEqual(cartQuantity.includes(1), true, 'Cart Quantity Item Not Match');
        assert.strictEqual(itemName.includes('Sauce Labs Backpack'), true, 'Item Name Product Not Match');
        assert.strictEqual(itemPrice.includes('$29.99'), true, 'Item Price Not Match');
        await this.driver.findElement(this.btnFinish).click();
    }

    async verifyTextCheckoutCompletePage() {
        let text = await this.driver.findElement(this.verifyText).getText();
        return text;

    }

    async verifyIconCheckoutComplete() {
        let iconPresent = await this.driver.findElement(this.verifyIcon)
        return iconPresent;
    }

    async verifyTextCheckoutHeaderComplete() {
        let text = await this.driver.findElement(this.verifySuccesCheckout).getText();
        return text;
    }

    async verifyTextCheckoutTitleComplete() {
        let text = await this.driver.findElement(this.verifyTextComplete).getText();
        return text;
    }

    async verifyBtnBackHome() {
        let iconBackHome = await this.driver.findElement(this.btnBackHome);
        return iconBackHome;
    }

    async backHome() {
        await this.driver.findElement(this.btnBackHome).click();
    }


}

module.exports = CartPage;