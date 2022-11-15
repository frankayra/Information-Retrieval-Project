var listButtoms = document.querySelectorAll(".bar .list li");




listButtoms.forEach(item=> {
    item.onclick = function (){
        var selected_buttom = document.querySelector(".bar .list li.selected");
        selected_buttom.classList.remove('selected')
        item.classList.add('selected')
    }
})


