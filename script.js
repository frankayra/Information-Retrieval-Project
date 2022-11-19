const listButtoms = document.querySelectorAll(".bar .list li");
// const searchBarInput = document.getElementById("input[type='text']");
const searchBarInput = document.querySelector("#searchBar");
const searchBarContainer = document.querySelector("#searchBarContainer");
const searchBarIcon = document.querySelector("#searchBarContainer .icon");
const searchBarIconSvg = document.querySelector("#searchBarContainer .icon svg");
const resultsGrid = document.querySelector("#resultsGrid");




searchBarInput.addEventListener('focus', (event) => {
    // event.target.style.background = 'pink';
    // searchBarIcon.style.left = '63px'
    // searchBarIcon.style.top = '20px'
    // searchBarIcon.style.padding = '0'

    searchBarIcon.classList.add("searching");

});

searchBarInput.addEventListener('blur', (event) => {
    // event.target.style.background = 'white';
    searchBarIcon.classList.remove('searching')
})


listButtoms.forEach(item => {
    item.onclick = function () {
        var selected_buttom = document.querySelector(".bar .list li.selected");
        if (selected_buttom != null) selected_buttom.classList.remove('selected')
        item.classList.add('selected')
    }
})

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

    }
}


// function SeeResults(lista_resultados) {
//     for (let result of lista_resultados) {
//         if (result.length > 200) {
//             result = result.substring(0, 200) + "   ........ ";
//         }
//         resultObject = new Result(result)
//     }
//     console.log({ Juguemos: "lalalala" }[Juguemos]);
// }
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
    // console.log({ Juguemos: "lalalala" }[Juguemos]);
}


SeeResults(["Lorem Ipsum", "Seminario de JavaScript (LP)", "Agua y jabon", "Rusia gana la guerra a la fuerza", "Objetos de JavaScript", "Literal Objects. Un enfoque desde JS", "Lorem Ipsum", "Seminario de JavaScript (LP)", "Agua y jabon", "Rusia gana la guerra a la fuerza", "Objetos de JavaScript", "Literal Objects. Un enfoque desde JS"], 
["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consequuntur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.", 
"Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
"Sin descripcion... Es la cancion que siempre oiamos que nos cantaban nuestros padres",
"Trata sobre la guerra que viven actualmente los Rusos y Ucranianos",
"JavaScript, al ser un lenguaje libremente tipado, nunca hace castings. El linaje de un objeto es irrelevante. Lo que importa de un objeto es lo que puede hacer, no de qué desciende.",
"Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consequuntur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.", 
"Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.",
"Sin descripcion... Es la cancion que siempre oiamos que nos cantaban nuestros padres",
"Trata sobre la guerra que viven actualmente los Rusos y Ucranianos",
"JavaScript, al ser un lenguaje libremente tipado, nunca hace castings. El linaje de un objeto es irrelevante. Lo que importa de un objeto es lo que puede hacer, no de qué desciende.",
"Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores."]);



