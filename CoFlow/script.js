var counter = 0;
var upCount = 1;
var hexVers;
var hexRay;
var rgb;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  frameRate(10);
}

function draw(){
	mathPlace();
	background(rgb);
	textInfo();
}

function mathPlace(){
	counter += upCount;
	hexVers = hex(counter,6);
	hexRay = hexVers.match(/.{1,2}/g);
	rgb = unhex(hexRay);
	print(rgb);
}

function textInfo(){
	fill(255);
	rect(0,0,130,90);
	fill(0);
	textSize(20);
	text(counter,20,20);
	text(rgb,20,50);
	text(hexVers,20,80);
}