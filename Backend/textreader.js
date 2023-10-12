const fs = require('fs');
const {readFile, readdir} = require('fs/promises');
const path = require('path');


//#region ///////////////////////////////// Reding Functions /////////////////////////////////

function readSync(){
    var texts = [];
    for(txt of fs.readdirSync('../Docs/')){
        texts.push(fs.readFileSync('../Docs/' + txt, 'utf-8'));
    }
    return split_lowerCase_replace(texts);
}
async function read() {
    var texts_titles = [];
    var texts = [];
    try {
        for(direc of await readdir('../Docs/')){
            const textFile = await readFile('../Docs/' + direc, 'utf-8');
            texts.push(textFile);
            texts_titles.push(direc);
        }
    }
    catch (err) {
        console.log(err);
    }
    return [texts_titles, split_lowerCase_replace(texts)];
}
//#endregion

//#region ///////////////////////////////// Text Treatment /////////////////////////////////

function split_lowerCase_replace(docs){
    let new_docs = [];
    for(const doc of docs){

        new_docs.push(doc.split(" "));



        //////////// RegExp ////////////
        // new_docs.push(doc.replaceAll(/,|./, " "));
    }
    return new_docs;
}

//#endregion

//#region ///////////////////////////////// Exports /////////////////////////////////
module.exports = {
    read,
    readSync,
    TreatTexts: split_lowerCase_replace
};
//#endregion

