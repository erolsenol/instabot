import Browser from "./browser.js";

class Instagram {
  constructor() {
    this.browser = new Browser(true);
    this.baseUrl = "https://www.instagram.com/";
  }

  async isLoggedIn() {
    const page = await this.browser.getPage();

    const classNames = await page.$eval("html", el => el.className);

    return classNames.split(" ").includes("logged-in");
  }

  async login(username, password) {
    const page = await this.browser.getPage();

    const response = await page.goto(this.baseUrl, { waitUntil: "networkidle0" });

    if (!response.ok() || response.status() !== 200) {
      throw new Error("An error occurred while executing http request");
    }

    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);

    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    return this.isLoggedIn();
  }

  async profileInfo(username) {
    const url = `https://www.instagram.com/${username}/?__a=1`;

    const page = await this.browser.getPage();
    const response = await page.goto(url);


    // TODO: check 403 redirect login
    // TODO: create constants and put error messages

    if (!response.ok() || response.status() !== 200) {
      throw new Error("An error occurred while executing http request");
    }
    console.log(response.status());
    console.log(response.json());

    const results = await response.json();
    let post = results.graphql.user.edge_owner_to_timeline_media.count;
    let follower = results.graphql.user.edge_followed_by.count;
    let follow = results.graphql.user.edge_follow.count;
    
    //console.log(username, post, follower, follow);

    return {username, post, follower, follow};

   // return response.json();
  }

  /**
   * Search instagram accounts
   * @param {string} query - search term
   */
  async search(query) {
    const url = `https://www.instagram.com/web/search/topsearch/?query=${query}`;

    const page = await this.browser.getPage();
    const response = await page.goto(url);

    // TODO: check 403 redirect login
    // TODO: create constants and put error messages

    if (!response.ok() || response.status() !== 200) {
      throw new Error("An error occurred while executing http request");
    }

    const results = await response.json();

    return results.users.map(function (item) {
      return item.user.username;
    });
  }

  async close() {
    return this.browser.close();
  }
}

export default Instagram;
