const http = require('http');
const fs = require('fs');
const path = require('path');
const textreader = require('./textreader');
const vectorialModel = require('./vectorial');

var config = {};
var principalpage = fs.readFileSync("../Frontend/index.html");


//#region ///////////////////////////////// Local Reading /////////////////////////////////


function RefreshSettings(){
    const jsonPath = path.resolve("config.json");
    const settingsJSON = fs.readFileSync(jsonPath, "utf-8");
    config = JSON.parse(settingsJSON);
    
}
//#endregion



//#region ///////////////////////////////// Server /////////////////////////////////


function StartServer(){
    http.createServer(function(request, response){
        response.write(principalpage);
        console.log(request.url);
        return response.end();
    }).listen(config["port"]);
    console.log(`servidor escuchando en el puerto ${config["port"]}`);
}
//#endregion






///////////////////////////////// Start /////////////////////////////////
let docs = textreader.read();
RefreshSettings();
StartServer();

