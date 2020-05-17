var menu = document.getElementById("menu");
var columns = document.getElementById("columns");
var exit = document.getElementById("exit");

columns.addEventListener('click', function(){
    menu.style.right = "0px";
});

exit.addEventListener('click',function(){
    menu.style.right = "-50%";
});