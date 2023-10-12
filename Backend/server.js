const http = require('http');
const fs = require('fs');
const path = require('path');
const textreader = require('./textreader');
const vectorialModel = require('./vectorial');
const console_log = console.log.bind(console);

let current_model = vectorialModel;
const documents_per_page = 12;
var config = {};

var principalpage = fs.readFileSync("../Frontend/index.html");
let my_Documents;



//#region ///////////////////////////////// Local Reading /////////////////////////////////


function RefreshSettings(){
    const jsonPath = path.resolve("config.json");
    const settingsJSON = fs.readFileSync(jsonPath, "utf-8");
    config = JSON.parse(settingsJSON);
    
}
async function RefreshDocuments(){
    my_Documents = await textreader.read();
    current_model.UpdateDocs(my_Documents[1]);
}

//#endregion




//#region ///////////////////////////////// Text Fragment /////////////////////////////////

function TextFragment(doc_index){
    let fragment = "";
    const min_length = Math.min(40, my_Documents[1][doc_index].length);
    for(let i = 0; i < min_length; i++){
        fragment += my_Documents[1][doc_index][i] + " ";
    }
    return fragment;
}

//#endregion




//#region ///////////////////////////////// Server /////////////////////////////////


function StartServer(){
    http.createServer(function(request, response){
        const reques_url = request.url;
        console.log(`solicitud: ${reques_url}`);
        // console.log(`solicitud.substring(4): ${reques_url.substring(0, 5)}`);
        if( reques_url === '/' || reques_url === ''){
            response.write(principalpage);
        }
        else if(reques_url.substring(0, 5) === '/page'){
            console.log("query recibida en el server");

            const all_texts_reg_exp = /page\?=([0-9]+)texts/g;
            const query_reg_exp = /page\?=([0-9]+)query\?=([a-z]+)/gi;

            let docs_json = {};
            
            let coincidence = all_texts_reg_exp.exec(reques_url);
            if(coincidence == null){
                coincidence = query_reg_exp.exec(reques_url);
                if(coincidence == null){
                    console.error("url no valida");
                }
                const page = coincidence[1];
                const query = coincidence[2];
                
                const q_array = query.split(" ");
                const docs_ranking = current_model.SortDocumentsRankingBy(q_array, 0);
                let docs_counter = page * config["docs-per-page"];
                console_log(`docs_ranking: ${docs_ranking}`);
                for(doc_number of docs_ranking){
                    if(docs_counter > 0){
                        docs_counter--;
                        continue;
                    }
                    docs_json[my_Documents[0][doc_number]] = TextFragment(doc_number);
                }
            }
            else{
                console_log(`solicitud de todos los textos`)
                const page = coincidence[1];
                for(let j = page * config["docs-per-page"]; j < my_Documents[0].length; j++){
                    docs_json[my_Documents[0][j]] = TextFragment(j);
                }

            }

            response.write(JSON.stringify(docs_json));
        }
        else if(reques_url === '/about'){
            response.write("about page");
        }
        else if(reques_url == "/favicon.ico"){
            var file = fs.createReadStream("./Frontend/favicon.ico")
            return file.pipe(response);
        }
        else {
            try{
                const public_resource_needed = fs.readFileSync("../Frontend" + reques_url);
                response.write(public_resource_needed);
            }
            catch(e){
                response.write(principalpage);
                console.log(`imposible to resolve the requested url: ${reques_url}`);
            }
        }
        return response.end();
    }).listen(config["port"]);
    console.log(`servidor escuchando en el puerto ${config["port"]}`);
}
//#endregion




///////////////////////////////// Start /////////////////////////////////

RefreshDocuments();
RefreshSettings();
StartServer();
