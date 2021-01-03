import Instagram from "./lib/instagram.js";
import fs from "fs";


let data = fs.readFileSync('./src/influencers.txt', 'utf8')
let influencers = data.split('\r');
//      \n

const ig = new Instagram();

const username = "erolsnlpoke@gmail.com";
const password = "testing123";

// Login to instagram via an instagram username and password
//await ig.login(username, password);

// Search on instagram accounts and get search results

for(let i = 0; i < 30; i++){
   let influencerDetails = await ig.profileInfo(influencers[i]);
   console.log(influencerDetails);
}

//influencers.for(element => {
//    let influencerDetails = await ig.profileInfo(element);
//    console.log(influencerDetails);
//});


//const searchResults = await ig.search("john");

