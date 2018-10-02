var colors = ["red","blue","green","black","pink","yellow","purple"];
var p1, p2;
var ding;
var time = 90;

function preload(){
	ding = loadSound("Ding-Sound-Effect.mp3");
}
function setup(){
	var can = createCanvas(windowWidth,windowHeight);
  	can.parent("sketch-holder");
  	frameRate(1);
  	p1 = random(colors);
		p2 = random(colors);
		ding.play();
}

function draw(){
	if(frameCount % time == 0){
		p1 = random(colors);
		p2 = random(colors);
		ding.play();
	}
	fill(p1);
	rect(0,0,width/2,height);
	fill(p2);
	rect(width/2,0,width,height);
	fill(255);
	textSize(64);
	text("E",width/4-32,64);
	text ("J",width*3/4 - 32, 64);
	text (time - frameCount % time,width/2-32,64);
}