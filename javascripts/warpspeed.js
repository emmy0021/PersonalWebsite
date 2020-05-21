var w = window.innerWidth;
var h = window.innerHeight;
var centerX = w / 2;
var centerY = h / 2;
let numStars = 175;
var warpSpeed = false;

var biggestSize = 1;

var canvas = document.getElementById("myCanvas");
canvas.width = w;
canvas.height = h;

var c = canvas.getContext("2d");

var worldImg = document.getElementById("worldImg");
var pause = document.getElementById("pause");


/* */
window.addEventListener('resize', function () {
	w = window.innerWidth;
	h = window.innerHeight;
	centerX = w / 2;
	centerY = h / 2;
	resize();
});

pause.addEventListener('mousedown', function () {
	p = !p;

	if (p) {
		pause.innerHTML = "<div class=\"play\"></div>";
	} else {
		pause.innerHTML = "<div class=\"verticalStripe\"></div>";
		pause.innerHTML += "<div class=\"verticalStripe\"></div>";
	}
});

pause.addEventListener('hover', function () {
	console.log("here");
});

function resize() {
	canvas.width = w;
	canvas.height = h;

	if (window.innerWidth >= 600) {
		phone = false;
	}

}

function Star() {
	var radius = Math.random() * biggestSize;
	var speedMult = .01;
	var x = (w * .05) + Math.random() * (w * .9);
	// if(x < centerX - 15 || x > centerX+15){
	// 	x+= Math.random()*30;
	// }

	var y = (h * .05) + Math.random() * (h * .9);
	// if(y < centerY - 15 || y > centerY+15){
	// 	y+= Math.random()*30;
	// }

	var dx = (x - centerX) * speedMult;
	var dy = (y - centerY) * speedMult;




	var dr = .003;

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.dr = dr;
	this.speedMult = .007; //.007 is nice





	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.strokeStyle = 'white';
		c.stroke();
		c.fillStyle = 'white';
		c.fill();
	}

	this.update = function () {
		if (this.x - this.radius < 0 || this.x + this.radius > w || this.y - this.radius < 0 || this.y + this.radius > h) {
			var radius = Math.random() * biggestSize;
			var speedMult = this.speedMult;
			var x = (w * .05) + Math.random() * (w * .9);
			var y = (h * .05) + Math.random() * (h * .9);
			var dx = (x - centerX) * speedMult;
			var dy = (y - centerY) * speedMult;



			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;
		}



		this.x += this.dx;
		this.y += this.dy;
		this.dx *= 1.018;
		this.dy *= 1.018;
		this.radius += this.dr;
		this.draw();
	}


}

var stars = [];

for (var i = 0; i < numStars; i++) {
	stars.push(new Star());
}


var p = false;

function animate() {

	requestAnimationFrame(animate);


	if (!p) {
		if (!warpSpeed) {
			c.clearRect(0, 0, w, h);
		}

		for (var i = 0; i < numStars; i++) {
			stars[i].update();
		}
	}

}

animate();


document.onmousedown = function (event) {
	//console.log(event.path[0].className);
	if (event.path[0] != pause || event.path[1] != pause) {
		if (event.path[0] == exit) {
			warpSpeed = false;
		} else if (event.path[0].className == 'hoverable' && event.path[0].className == 'nav-link noSelect') {
			warpSpeed = true;
			setTimeout(function () {
				warpSpeed = false;
			}, 2000);

		} else {
			warpSpeed = true
			let timeOut;

			if (phone) {
				timeOut = 100;
			} else {
				timeOut = 1500;
			}
			setTimeout(function () {
				worldImg.style.left = "-70%";
			}, timeOut);
		}
	} else {
		warpSpeed = false;
	}


}
document.onmouseup = function (event) {
	//console.log(event.path[0].className);
	if (event.path[0].className != 'hoverable' && event.path[0].className != 'nav-link noSelect') {
		setTimeout(function () {
			worldImg.style.left = "17%";
		}, 300);
	}



	if (!phone) {
		setTimeout(function () {
			warpSpeed = false;
		}, 1500);
	}
}