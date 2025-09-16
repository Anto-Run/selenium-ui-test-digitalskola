import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";
import edge from "selenium-webdriver/edge.js";

export default class BrowserComponent {
    async browserPlatform(browser) {
        let options;
        let driver;

        switch (browser.toLowerCase()) {
            case "firefox-headless":
                options = new firefox.Options();
                options.addArguments("--headless");
                driver = await new Builder()
                    .forBrowser("firefox")
                    .setFirefoxOptions(options)
                    .build();
                break;

            case "firefox":
                options = new firefox.Options();
                driver = await new Builder()
                    .forBrowser("firefox")
                    .setFirefoxOptions(options)
                    .build();
                break;

            case "chrome-headless":
                options = new chrome.Options();
                options.addArguments("--headless");
                driver = await new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(options)
                    .build();
                break;

            case "chrome":
                options = new chrome.Options();
                driver = await new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(options)
                    .build();
                break;

            default:
                console.log("Chrome browser selected");
                options = new chrome.Options();
                driver = await new Builder()
                    .forBrowser("chrome")
                    .setChromeOptions(options)
                    .build();
                break;
        }

        return driver;
    }
}