const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');


async function sauceDemoTest() {

    // Defined Web Driver
    let driver = await new Builder().forBrowser('firefox').build()

    try {
            //Url 
            await driver.get('https://www.saucedemo.com/');

            //Input Username
            await driver.findElement(By.id('user-name')).sendKeys('standard_user');
            
            //Input Password
            await driver.findElement(By.id('password')).sendKeys('secret_sauce');

            //click button login
            await driver.findElement(By.id('login-button')).click();

            //Verify Login
            let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
            
            assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');
            let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
            assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu button is not visible');

            // Add Item to cart
            await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()

            // Click Button Cart
            await driver.findElement(By.id("shopping_cart_container")).click()
            
            // Verify Cart Page
            let yourCartText = await driver.findElement(By.xpath("//div[@id='header_container']/div[2]/span")).getText();
            assert.strictEqual(yourCartText.includes('Your Cart'), true, 'Title does not include "Your Cart"');

            // Verify Product Item
            let cartQuantity = await driver.findElement(By.xpath("//div[@class='cart_quantity']")).getText();
            assert.strictEqual(cartQuantity.includes(1), true,'Cart Quantity Item Not Match');

            // Verify Item Name
           
            let itemName = await driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
            assert.strictEqual(itemName.includes('Sauce Labs Backpack'), true, 'Item Name Product Not Match');

            //Verify Item Price
            let itemPrice = await driver.findElement(By.xpath("//div[@class='inventory_item_price']")).getText();
            assert.strictEqual(itemPrice.includes('$29.99'), true, 'Item Price Not Match');

    } finally {
            await driver.quit();

            
    }
    
}

sauceDemoTest();