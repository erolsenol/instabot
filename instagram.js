const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/'

const instagram = {
    browser:null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false,
            devtools: true
        });
        instagram.page = await instagram.browser.newPage();

    },

login: async(username, password) =>{
    await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'});

    // let loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');

    // await loginButton[0].click();

    await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});
    console.log("asd");

    await instagram.page.waitFor(1000);
    await instagram.page.type('input[name="username"]',username, {delay:50});
    await instagram.page.type('input[name="password"]',password, {delay:50});
    debugger;
}
}

module.exports = instagram;