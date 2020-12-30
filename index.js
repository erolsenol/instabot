
const ig = require('./instagram');

(async ()=> {

    await ig.initialize();

    console.log("started");

    await ig.login('erolsnlpoke@gmail.com','pistols987');

    debugger;

})();
