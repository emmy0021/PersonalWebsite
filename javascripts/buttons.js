var menu = document.getElementById("menu");
var columns = document.getElementById("columns");
var exit = document.getElementById("exit");
var main = document.getElementById("main");
var projects = document.getElementById("projects");
var about = document.getElementById("about");
var portfolio = document.getElementById("portfolio");
var contacts = document.getElementById("contacts");

columns.addEventListener('click', function(){
    menu.style.top = "0";
    main.style.opacity = "visible";
    setTimeout(function(){
        main.style.opacity = 1;
    },1000);

    setTimeout(function(){
        projects.style.opacity = 1;
    },1150);


    setTimeout(function(){
        about.style.opacity = 1;
    },1300);

    setTimeout(function(){
        portfolio.style.opacity = 1;
    },1450);

    setTimeout(function(){
        contacts.style.opacity = 1;
    },1600);


});

exit.addEventListener('click',function(){
    menu.style.top = "-100%";
    main.style.opacity = 0;
    projects.style.opacity = 0;
    about.style.opacity = 0;
    portfolio.style.opacity = 0;
    contacts.style.opacity = 0;
});


function show(){
    
}