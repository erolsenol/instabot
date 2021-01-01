const jsdom = require("jsdom");
const puppeteer = require("puppeteer");

const { JSDOM } = jsdom;

const BASE_URL = "https://www.instagram.com/";

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false,
      devtools: true
    });
    instagram.page = await instagram.browser.newPage();
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});

    await instagram.page.type('input[name="username"]', username, { delay: 15 });
    await instagram.page.type('input[name="password"]', password, { delay: 15 });
    await instagram.page.waitFor(250);
    // let loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]');
    await instagram.page.keyboard.press("Enter");
    await instagram.page.waitFor(4000);
    await instagram.page.click('section>div>button')[1];
    await instagram.page.waitFor(3500);
    await instagram.page.click('div>button')[1];
    await instagram.page.waitFor(1000);

},
search: async(searchName) => {
    const url = "https://www.instagram.com/" + searchName + "/";
    await instagram.page.goto(url, {waitUntil: 'networkidle2'});

    const followingStr = await instagram.page.$eval('ul', el => el.innerHTML);

    const followingDom = new JSDOM(followingStr); // TODO: add jsdom npm package and convert to dom

    debugger;
    let posts, followers, following;
    posts = followingDom.window.document.body.firstChild.firstChild.firstChild.innerHTML;
    followers = parseFloat(followingDom.window.document.body.children[1].firstChild.firstChild.getAttribute("title").replace(/,/g, ''));
    following = followingDom.window.document.body.children[2].firstChild.firstChild.innerHTML;
    console.log(posts);
    console.log(followers);
    console.log(following);

    //await instagram.page.$x('div > input[placeholder="Search"]',searchName, {delay:50});
    //await instagram.page.type('div > input',searchName, {delay:50});
},
searchUser: async(searchString) => {
  const url = "https://www.instagram.com/web/search/topsearch/?query=" + searchString;
  instagram.page.on('response', async response => {
    try{
      const req = response.request();
      const orig = await req.url();
      const text = await response.text();
      const js = await JSON.parse(text);
     
       console.log(js.users[user]);

    }catch (err){
      console.error('Failer getting data from: ${url}');
      console.error(err);
    }
  });
await instagram.page.goto(url);
},
}



module.exports = instagram;
