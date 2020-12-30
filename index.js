
const ig = require('./instagram');

console.log("started");

(async ()=> {

    await ig.initialize();

    console.log("asd");

    await ig.login('erolsnlpoke@gmail.com','pistols987');
    
    debugger;

})();
