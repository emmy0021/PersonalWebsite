var menuTxt = document.getElementsByClassName('txt')[0];

var buttons = document.getElementsByClassName('button');
var nameBtn = buttons[0];
var menuBtn = buttons[1];
var aboutMeBtn = buttons[2];
var contactBtn = buttons[3];

var ul = document.getElementById('ul');

var mainContent = document.getElementById('mainContent');

var IO = true;
window.onload = function () {

    document.addEventListener('click', function (e) {
        let div = e.path[0];
        if (div === menuBtn) {
            moveFromTo(mainContent, "20vh", "29vh");
            clckTextColor(menuTxt);
            hide(ul);
            showBorder(menuBtn);
            IO = !IO;
        }
        if (div === nameBtn) {
            showBorder(nameBtn);
            changeBackground(nameBtn, "lightblue");
            setTimeout(function () {
                changeBackground(nameBtn, "lightblue");
                showBorder(nameBtn);
            }, 350);

            setText(mainContent, "Main page");
            IO = !IO;
            
        }

        if (div === aboutMeBtn || div === contactBtn) {
            setTimeout(function () {
                moveFromTo(mainContent, "20vh", "29vh");
                hide(ul);
                showBorder(menuBtn);
                clckTextColor(menuTxt);
                setText(mainContent, div.innerHTML);
                IO = !IO;
            }, 350);

        }

    });

}

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
    console.log(e);
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