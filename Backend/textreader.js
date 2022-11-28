const fs = require('fs');
const {readFile, readdir} = require('fs/promises');

function readSync(){
    var texts = [];
    for(txt of fs.readdirSync('../Docs/')){
        texts.push(fs.readFileSync('../Docs/' + txt, 'utf-8'));
    }
    return texts;
}
async function read() {
    var texts = [];
    try {
        for(direc of await readdir('../Docs/')){
            const textFile = await readFile('../Docs/' + direc, 'utf-8');
            texts.push(textFile);
        }
    }
    catch (err) {
        console.log(err);
    }
    return texts;
}


module.exports = {
    read,
    readSync
};

