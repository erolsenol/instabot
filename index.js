import puppeteer from "puppeteer";

import Instagram from "./instagram.js";

let browser = null;
let page = null;

async function launchBrowser() {
  browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  page = await browser.newPage();
}

(async () => {
  console.log("started");

  await launchBrowser();

  const ig = new Instagram(browser, page);

  await ig.login("erolsnlpoke@gmail.com", "Pistols987");

  // await ig.search('vidcg');

  await ig.searchUsers("ro");
})();
