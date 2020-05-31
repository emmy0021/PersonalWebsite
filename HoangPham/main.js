var menuTxt = document.getElementsByClassName('txt')[0];

var buttons = document.getElementsByClassName('button');
var nameBtn = buttons[0];
var menuBtn = buttons[1];
var aboutMeBtn = buttons[2];
var contactBtn = buttons[3];

var ul = document.getElementById('ul');

var mainContent = document.getElementById('mainContent');

var IO = true;


menuBtn.addEventListener('click', function (e) {
    moveFromTo(mainContent, "20vh", "29vh");
    clckTextColor(menuTxt);
    hide(ul);
    showBorder(menuBtn);
    IO = !IO;
});
nameBtn.addEventListener('click', function (e) {
    showBorder(nameBtn);
    changeBackground(nameBtn, "lightblue");
    setTimeout(function () {
        moveFromTo(mainContent, "20vh", "29vh");
        hide(ul);
        changeBackground(nameBtn, "lightblue");
        showBorder(nameBtn);
        
    }, 350);

    setText(mainContent, "Main page");
    
    if(IO){
        IO = !IO;
        setText(mainContent, "Main page");
    }
    

});

aboutMeBtn.addEventListener('click', function (e) {
    setTimeout(function () {
        moveFromTo(mainContent, "20vh", "29vh");
        hide(ul);
        showBorder(menuBtn);
        clckTextColor(menuTxt);
        setText(mainContent, aboutMeBtn.innerHTML);
        IO = !IO;
    }, 350);

});


contactBtn.addEventListener('click', function (e) {
    setTimeout(function () {
        moveFromTo(mainContent, "20vh", "29vh");
        hide(ul);
        showBorder(menuBtn);
        clckTextColor(menuTxt);
        setText(mainContent, contactBtn.innerHTML);
        IO = !IO;
    }, 350);

});




function setText(e, txt) {
    //console.log("setting text to " + txt);
    //console.log(e);
    if (!IO) {
        e.innerHTML = txt + " page";

    } else {
        e.innerHTML = "";
    }
}



function moveFromTo(e, from, to) {
    if (IO) {
        e.style.top = to;

    } else {
        e.style.top = from;
    }
}

function clckTextColor(elmnt) {
    if (IO) {
        elmnt.style.color = "red";
    } else {
        elmnt.style.color = "var(--text-color)";
    }
}

function hide(e) {
    if (IO) {
        e.style.visibility = "visible";
    } else {
        e.style.visibility = "hidden";
    }
}

function showBorder(e) {
    if (IO) {
        e.style.border = "#C0B8C3 solid 1px";
    } else {
        e.style.border = "#C0B8C3 solid 0px";
    }
}

function changeBackground(e, color) {

    if (IO) {
        e.style.background = color;
    } else {
        e.style.background = "transparent";

    }
}

function t(e) {
    if (IO) {

    } else {

    }
}