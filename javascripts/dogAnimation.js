var left = 10;
var imageNum = 0;
var dog = document.getElementById("dog");
var dogImg = document.getElementById("dogImg");
var img = new Image();
var moving = false;
var w, h, l = 100;
const origYoff = 87.5;
var yOffset = origYoff;
var numFrames = 8;
w = window.innerWidth;
h = window.innerHeight;
console.log("width:" + w);

var canvas = document.getElementById("dogCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

window.addEventListener('resize', function () {
    w = window.innerWidth;
    h = window.innerHeight;
    centerX = w / 2;
    centerY = h / 2;
    resize();
});

function resize() {
    canvas.width = w;
    canvas.height = h;

    if (window.innerWidth >= 600) {
        phone = false;
    }

}

function update() {
    this
}

function animate() {

    requestAnimationFrame(animate);
    img.draw();

}

animate();

function Image() {
    this.draw = function () {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(dogImg, left, h - yOffset, l, l);
    }
}




if (!moving) {
    console.log("stop");
}

var count = 0;
document.addEventListener('keydown', (e) => {
    //console.log(e.code);
    name = "public/runFrames/runR-" + Math.abs(imageNum % numFrames) + ".png";
    console.log(name);
    moving = true;
    switch (e.code) {
        case "Space":
        case "ArrowUp":
            console.log("up");
            dogImg.src = name;
            l = 250;
            yOffset = 162;
            while(yOffset < 500) {
                yOffset+=.2;
                //console.log(yOffset);
                img.draw();
            }

           
            break;
        case "ArrowDown":
            console.log("down");
            dogImg.src = "public/layDown.png";
            break;
        case "ArrowLeft":
            if (count == 0) {
                console.log("left");
            }
            imageNum -= 1;
            left-=10;

            dogImg.src = name;

            if (left < -150) {
                left = w-20;
            }
            console.log("left:"+left);    
            yOffset = 162;
            l = 250;


            break;
        case "ArrowRight":

            if (count == 0) {
                console.log("right");
            }
            imageNum += 1;
            left+=10;
            dogImg.src = name;
            yOffset = 162;
            l = 250;
            if (left > w-20) {
                left = -150;
            }

            console.log("left:"+left);     



            break;

    }
    count++;
});

document.addEventListener('keyup', (e) => {
    moving = false;
    console.log("stop");
    dogImg.src = "public/sit.png";
    yOffset = origYoff;
    count = 0;
    l = 100;
});

