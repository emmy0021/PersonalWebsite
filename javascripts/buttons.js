var menu = document.getElementById("menu");
var columns = document.getElementById("columns");
var exit = document.getElementById("exit");

columns.addEventListener('click', function(){
    menu.style.top = "0";
});

exit.addEventListener('click',function(){
    menu.style.top = "-100%";
});