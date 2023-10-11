const listButtoms = document.querySelectorAll(".bar .list li");
// const searchBarInput = document.getElementById("input[type='text']");
const searchBarInput = document.querySelector("#searchBar");
const searchBarContainer = document.querySelector("#searchBarContainer");
const searchBarSimulator = document.querySelector("#searchBarSimulator");
const searchBarIcon = document.querySelector("#searchBarContainer .icon");
const searchBarIconSvg = document.querySelector("#searchBarContainer .icon svg");
const resultsGrid = document.querySelector("#resultsGrid");

let result_docs = [];
const console_log = console.log.bind(console);

listButtoms.forEach(item => {
    item.onclick = function () {
        var selected_buttom = document.querySelector(".bar .list li.selected");
        if (selected_buttom != null) selected_buttom.classList.remove('selected');
        item.classList.add('selected');
    }
});

searchBarInput.addEventListener('focus', (event) => {

    searchBarIcon.classList.add("searching");
    event.target.style.padding = "10px";
    event.target.style.paddingLeft = "40px";
    searchBarSimulator.style.height = '70px';
});
searchBarInput.addEventListener('blur', (event) => {
    // event.target.style.background = 'white';
    searchBarIcon.classList.remove('searching')
    event.target.style.padding = "5px";
    event.target.style.paddingLeft = "40px";
    searchBarSimulator.style.height = '60px';
});
searchBarInput.addEventListener('input', (event) =>{
    // event.target.value = 'K'.fontcolor("white");
    
})
searchBarInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        const query = searchBarInput.value;
        const page = 0;
        FetchDataFromServer(0, query == "" ? "texts" : query);
        console.log(`query: ${query}`);
    }
});


document.addEventListener('scroll', (event) =>{
    searchBarContainer.style.top =  (parseFloat(searchBarContainer.style.top) - 1) + 'px';
    console.log(searchBarContainer.style.top);
});





function Loading(pos_x, pos_y, ratio) {
    const circle = document.createElement('div');

    circle.style.position = 'absolute';
    circle.style.bottom = '10px';
    circle.style.right = '10px';
    circle.style.width = '20px';
    circle.style.height = '20px';
    // circle.style.background = 'rgba(220, 40, 40, 1)'
    circle.style.border = '0 solid transparent';
    circle.style.borderTop = '1px solid rgb(233, 72, 72)';
    circle.style.borderRadius = '60px';
    circle.style.animation = 'loading_animation 1s linear infinite'

    document.body.appendChild(circle);
}
// Loading();


class Result {
    constructor(title, details) {
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('result');
        visual.innerText = `${title} \n ${details}`;
        
        
        resultsGrid.appendChild(visual);
        result_docs.push(this);

    }
}


function SeeResults(docs_list, details_list) {
    for (let i = 0; i < Math.min(docs_list.length, details_list.length); i++) {
        doc_title = docs_list[i];
        doc_details = details_list[i];
        if (doc_title === null || doc_details === null) continue;
        if (doc_title.length > 30) {
            doc_title = doc_title.substring(0, 30) + "   ... ";
        }
        if (doc_details.length > 200) {
            doc_details = doc_details.substring(0, 200) + "   ........ ";
        }
        resultObject = new Result(doc_title, doc_details);
    }
}
function SeeJSONresults(JSONdocs){
    for(const child of resultsGrid.querySelectorAll(".result")){
        resultsGrid.removeChild(child);
    }
    const docs = JSONdocs;
    for(let doc_title in docs){
        let doc_details = docs[doc_title];
        const reg_exp = /.txt/gi;
        doc_title = doc_title.substring(0, ((reg_exp.exec(doc_title))["index"]));
        if (doc_title.length > 30) {
            doc_title = doc_title.substring(0, 30) + "   ... ";
        }
        if (doc_details.length > 200) {
            doc_details = doc_details.substring(0, 200) + "   ........ ";
        }
        resultObject = new Result(doc_title, doc_details);
    }
}


async function FetchDataFromServer(page=0, query="texts"){
    if(query === "texts"){
        console_log(`page?=${page}texts`);
        const response = await fetch(`page?=${page}texts`);
        
        if (!response.ok) {
            console.log("no he terminado de recibir response y ya se esta llamando el callback");
            throw new Error(`HTTP error: ${response.status}`);
        }
        SeeJSONresults(await response.json());
    }
    else{
        console_log(`page?=${page}texts`);
        const response = await fetch(`page?=${page}query?=${query}`);

        if (!response.ok) {
            console.log("no he terminado de recibir response y ya se esta llamando el callback");
            throw new Error(`HTTP error: ${response.status}`);
        }
        SeeJSONresults(await response.json());
    }
}









// SeeResults(["Lorem Ipsum", "Seminario de JavaScript (LP)", "Agua y jabon", "Rusia gana la guerra a la fuerza", "Objetos de JavaScript", "Literal Objects. Un enfoque desde JS", "Lorem Ipsum", "Seminario de JavaScript (LP)", "Agua y jabon", "Rusia gana la guerra a la fuerza", "Objetos de JavaScript", "Literal Objects. Un enfoque desde JS"], 
// ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consequuntur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.", 
// "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
// "Sin descripcion... Es la cancion que siempre oiamos que nos cantaban nuestros padres",
// "Trata sobre la guerra que viven actualmente los Rusos y Ucranianos",
// "JavaScript, al ser un lenguaje libremente tipado, nunca hace castings. El linaje de un objeto es irrelevante. Lo que importa de un objeto es lo que puede hacer, no de qué desciende.",
// "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
// "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consequuntur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.", 
// "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
// "Sin descripcion... Es la cancion que siempre oiamos que nos cantaban nuestros padres",
// "Trata sobre la guerra que viven actualmente los Rusos y Ucranianos",
// "JavaScript, al ser un lenguaje libremente tipado, nunca hace castings. El linaje de un objeto es irrelevante. Lo que importa de un objeto es lo que puede hacer, no de qué desciende.",
// "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores."]);

// fetch("../Docs/docs.json")
//     .then((response) => SeeJSONresults(response.json()))
//     .catch(err=> console.log(err));
