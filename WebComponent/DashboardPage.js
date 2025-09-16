import { By } from "selenium-webdriver";

export default class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.titleDashboardPage = By.xpath("//div[@class='app_logo']");
        this.btnAddItemToCart = By.id("add-to-cart-sauce-labs-backpack");
        this.btnCart = By.id("shopping_cart_container");
    }

    async isOnDashboard() {
        return await this.driver.findElement(this.titleDashboardPage).getText();
    }

    async addToCart() {
        await this.driver.findElement(this.btnAddItemToCart).click();
    }

    async navigateToPageCart() {
        await this.driver.findElement(this.btnCart).click();
    }
}
