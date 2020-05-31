var menuButton = document.getElementById("close");
var nav = document.getElementById('nav');
var IO = true;

function openClose(){
    if(IO){
        nav.style.height = "100vh";
    }else{
        nav.style.height = "17vh";
    }

    IO= !IO;
    console.log("click");
}