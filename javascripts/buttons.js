var menu = document.getElementById("menu");
var columns = document.getElementById("columns");
var exit = document.getElementById("exit");
var main = document.getElementById("main");
var projects = document.getElementById("projects");
var about = document.getElementById("about");
var portfolio = document.getElementById("portfolio");
var contacts = document.getElementById("contacts");




var menuContent = [main, projects, about, portfolio, contacts];


var io = true;
exit.addEventListener('click', function () {
    
    if (io) { //open menu
  

        menuContent.forEach(show);

        exit.style.transform = "rotate(360deg)";
        exit.innerHTML = "X";




    } else { //close menu


        menuContent.forEach(hide);
        setTimeout(function(){
            exit.innerHTML = "<div class=\"column\"></div> <div class=\"column\"></div> <div class=\"column\"></div>";
        },150);


        exit.style.transform = "rotate(0deg)";

    }

    io = !io;
});




function show(item, index) {
    menu.style.bottom = 0;
    setTimeout(function () {
        item.style.transition = "opacity .8s, height .8s, width .8s";
        item.style.opacity = 1;
        item.style.visibility = "visible";
        item.style.pointerEvents = "auto";
    }, 400 + 150 * index);
}

function hide(item, index) {
    menu.style.bottom = "auto";
    setTimeout(function () {
        item.style.transition = "opacity 0s, height .6s, width .6s";
        item.style.visibility = "hidden";
        item.style.opacity = 0;
        item.style.pointerEvents = "none";

    }, 100 + 150 * (menuContent.length-index));
    
}




