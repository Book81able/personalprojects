var colors = ["red","blue"];
var p1, p2;
var ding;

function preload(){
	ding = loadSound("Ding-Sound-Effect.mp3");
}
function setup(){
	var can = createCanvas(windowWidth,windowHeight);
  	can.parent("sketch-holder");
  	frameRate(1);
  	fill(random(colors));
		rect(0,0,width/2,height);
		fill(random(colors));
		rect(width/2,0,width,height);
		ding.play();
}

function draw(){
	if(frameCount % 10 == 0){
		fill(random(colors));
		rect(0,0,width/2,height);
		fill(random(colors));
		rect(width/2,0,width,height);
		ding.play();
	}
	fill(0);
	textSize(64);
	text("E",width/4-32,64);
	text ("J",width*3/4 - 32, 64);
}