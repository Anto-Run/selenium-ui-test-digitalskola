const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');

class BrowserComponent {

    async browserPlatform(browser) {
        let options;
        let driver;

        switch (browser.toLowerCase()) {
            case 'firefox-headless':
                options = new firefox.Options();
                options.addArguments('--headless');
                driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
                break;
            case 'firefox':
                options = new firefox.Options();
                driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
                break;
            case 'chrome-headless':
                options = new chrome.Options();
                options.addArguments('--headless');
                driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
                break;
            case 'chrome':
                options = new chrome.Options();
                driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
                break;
            default:
                console.log("Chrome browser selected");
                options = new chrome.Options();
                driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
                break;
        }

        // Mengembalikan driver untuk digunakan
        return driver;
    }
}

module.exports = BrowserComponent;
