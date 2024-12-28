const {By} = require('selenium-webdriver')

class CartPage{


    constructor(driver){
        this.driver = driver;
        this.verifyCartPage = By.xpath("//div[@id='header_container']/div[2]/span");
        this.cartQuantity = By.xpath("//div[@class='cart_quantity']");
        this.itemName = By.xpath("//div[@class='inventory_item_name']");
        this.itemPrice = By.xpath("//div[@class='inventory_item_price']");
    }
    async isOnCartPage(){
        let verifyCartPageText = await this.driver.findElement(this.verifyCartPage).getText();
        return verifyCartPageText;
    }

    async getDataQuantity(){

        let cartQuantity = await this.driver.findElement(this.cartQuantity).getText();
        return cartQuantity;

    }

    async getDataItemName(){
        let itemName = await this.driver.findElement(this.itemName).getText();
        return itemName;

    }

    async getDataItemPrice(){

        let itemPrice = await this.driver.findElement(this.itemPrice).getText();
        return itemPrice;

    }
    
}

module.exports = CartPage;