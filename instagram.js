import jsdom from "jsdom";

const { JSDOM } = jsdom;

class Instagram {
  constructor(browser, page) {
    this.browser = browser;
    this.page = page;
    this.baseUrl = "https://www.instagram.com/";
  }

  async login(username, password) {
    await this.page.goto(this.baseUrl, { waitUntil: "networkidle2" });

    await this.page.type('input[name="username"]', username, { delay: 15 });
    await this.page.type('input[name="password"]', password, { delay: 15 });
    await this.page.waitFor(250);
    await this.page.keyboard.press("Enter");
    await this.page.waitFor(4000);
    await this.page.click("section>div>button")[1];
    await this.page.waitFor(3500);
    await this.page.click("div>button")[1];
    await this.page.waitFor(1000);
  }

  async getUser(username) {
    const url = "https://www.instagram.com/" + username + "/";
    await this.page.goto(url, { waitUntil: "networkidle2" });

    const followingStr = await this.page.$eval("ul", el => el.innerHTML);

    const followingDom = new JSDOM(followingStr); // TODO: add jsdom npm package and convert to dom

    debugger;
    let posts, followers, following;
    posts = followingDom.window.document.body.firstChild.firstChild.firstChild.innerHTML;
    followers = parseFloat(
      followingDom.window.document.body.children[1].firstChild.firstChild.getAttribute("title").replace(/,/g, "")
    );
    following = followingDom.window.document.body.children[2].firstChild.firstChild.innerHTML;
    console.log(posts);
    console.log(followers);
    console.log(following);
  }

  async searchUsers(keyword) {
    const url = "https://www.instagram.com/web/search/topsearch/?query=" + keyword;
    const response = await this.page.goto(url);
    console.log(response.status);
    const responseText = await response.text();

    const data = await JSON.parse(responseText);

    const results = data.users.map(function (item) {
      return item.user.username;
    });

    console.log(results);
  }
}

export default Instagram;
