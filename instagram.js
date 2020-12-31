const puppeteer = require('puppeteer');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;


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

    // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});

    await instagram.page.type('input[name="username"]',username, {delay: 15});
    await instagram.page.type('input[name="password"]',password, {delay: 15});
    await instagram.page.waitFor(250);
   // let loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
    await instagram.page.keyboard.press('Enter');
    await instagram.page.waitFor(4000);
    await instagram.page.click('section>div>button')[1];
    await instagram.page.waitFor(4000);
    await instagram.page.click('div>button')[0];
    await instagram.page.waitFor(1000);

},
search: async(searchName)=>{
   // await instagram.page.waitFor(1500);
    const url ="https://www.instagram.com/"+searchName+"/";
    await instagram.page.goto(url, {waitUntil: 'networkidle2'});
    // Not Found
    // await instagram.page.waitFor(500);
    // let follow = await instagram.page.$$('li>a>span');

    const followingStr = await instagram.page.$eval('ul', el => el.innerHTML);


    const followingDom = new JSDOM(followingStr); // TODO: add jsdom npm package and convert to dom

    debugger;
    console.log(followingDom.window.document.body.firstChild.firstChild.firstChild.innerHTML);
   // console.log(followingDom.firsChild.firsChild.firsChild.innerText);
   // console.log(followingDom.children[1].firsChild.firsChild.getAttribute("title"));
   // console.log(followingDom.children[2].firsChild.firsChild.innerText);

    // await instagram.page.waitFor(1000);
    // console.log(follow[0]);
    // console.log(follow[1]);
    // console.log(follow[2]);
    //await instagram.page.$x('div > input[placeholder="Search"]',searchName, {delay:50});
    //await instagram.page.type('div > input',searchName, {delay:50});
}
}

module.exports = instagram;