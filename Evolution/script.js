var animals = [];
var pellets = [];
var deadcells = [];

var animalNum = 50;
var pelletnum = 15;
var startSpeed = 1;
var startDiam = 20;
var genNum = 1;

var avgSize = startDiam;
var avgSpeed = startSpeed;

var state = "moving";
function setup(){
	var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  background(200);
  angleMode(DEGREES);
  for(var i = 0;i<animalNum;i++){
  	animals.push(new Animal(startSpeed,startDiam));
  }
  for(var e = 0;e<pelletnum;e++){
  	pellets.push(new Food());
  }
}

function draw(){
	background(200);
	fill(0);
	text(avgSpeed,20,20);
	text(avgSize,20,40);
	text(genNum,20,60)
	if(state == "moving"){
		for(var i = 0;i<animals.length;i++){
			animals[i].display();
			animals[i].move();
		}
		for(var e =0;e<pellets.length;e++){
			pellets[e].display();
		}
		if(pellets.length == 0){
			state = "setting";
		}
	}
	if(state == "setting"){
		deadcells = [];
		for(var i = animals.length - 1;i>=0;i--){
			animals[i].reset(i);
		}
		for(var e = 0;e<pelletnum;e++){
  			pellets.push(new Food());
 		 }
 		 avSpeed();
 		 genNum++;
		state = "moving";
	}
}

function avSpeed(){
	var overSpeed = 0;
	var overSize = 0
	for(var a = 0; a<animals.length;a++){
		overSpeed += animals[a].speed
		overSize += animals[a].rad;
	}
	avgSpeed = overSpeed/animals.length;
	avgSize = overSize/animals.length;
}
class Animal{
	constructor(speed,radius){
		this.rad = radius;
		this.x = random(this.rad,width-this.rad);
		this.y = random(this.rad,height-this.rad);
		this.speed = speed;
		this.angle = random(-180,180);
		this.xVel = cos(this.angle)*this.speed;
		this.yVel = sin(this.angle)*this.speed;
		this.health = 0;
	}
	display(){
		fill(255-this.health*100,0,0);
		ellipse(this.x,this.y,this.rad);
	}
	move(){
		this.x += this.xVel;
		this.y += this.yVel;
		this.wallCollide();
		this.pelletCollide();
	}
	wallCollide(){
		if(this.x>width-this.rad/2||this.x<0+this.rad/2){
			this.xVel *= -1;
		}
		if(this.y>height-this.rad/2||this.y<0+this.rad/2){
			this.yVel *= -1;
		}
	}
	pelletCollide(){
		for(var i = 0; i<pellets.length;i++){
			if(dist(this.x,this.y,pellets[i].x,pellets[i].y)<this.rad/2+pellets[i].rad/2){
				this.health++;
				pellets.splice(i,1);
			}
		}
	}
	reset(index){
		if(this.health == 0){
			animals.splice(index,1);
		}
		if(this.health >= 2){
			animals.push(new Animal(randomGaussian(this.speed,1),randomGaussian(this.rad,1)));
		}
		this.health = 0;
	}
}

class Food{
	constructor(){
		this.rad = 10;
		this.x = random(0+this.rad,width-this.rad);
		this.y = random(0,height);
	}
	display(){
		fill(20,200,50);
		ellipse(this.x,this.y,this.rad);
	}
}