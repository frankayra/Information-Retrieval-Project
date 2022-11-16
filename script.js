const listButtoms = document.querySelectorAll(".bar .list li");
// const searchBarInput = document.getElementById("input[type='text']");
const searchBarInput = document.querySelector("#searchBar");
const searchBarIcon = document.querySelector("#searchBarContainer .icon");
const searchBarIconSvg = document.querySelector("#searchBarContainer .icon svg");

searchBarInput.addEventListener('focus', (event) => {
    // event.target.style.background = 'pink';
    // searchBarIcon.style.left = '63px'
    // searchBarIcon.style.top = '20px'
    // searchBarIcon.style.padding = '0'

    searchBarIcon.classList.add("searching");

});

searchBarInput.addEventListener('blur', (event)=>{
    // event.target.style.background = 'white';
    searchBarIcon.classList.remove('searching')
})


listButtoms.forEach(item=> {
    item.onclick = function (){
        var selected_buttom = document.querySelector(".bar .list li.selected");
        selected_buttom.classList.remove('selected')
        item.classList.add('selected')
    }
})

function printCircle(pos_x, pos_y, ratio){
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
printCircle();




