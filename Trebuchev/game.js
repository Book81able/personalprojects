var treb;
var stones = [];
var bounces;

function setup(){
	var can = createCanvas(windowWidth,windowHeight);
  	can.parent("sketch-holder");
  	angleMode(DEGREES);
  	treb = new Treb();
}

function draw(){
	background(255);
	fill(0,200,50);
	rect(0,height-200,width,200);
	line(width-400,height-200,width,height-400);
	fill(200,150,50);
	treb.display();
	treb.turn();
	if(stones.length>0){
		for(ston of stones){
			ston.display();
			ston.move();
			ston.bounce();
		}
	}
}

function mouseReleased(){
	treb.throw();
}

class Stone{
	constructor(_x,_y,v_x,v_y){
		this.diam = 20;
		this.postion = createVector(_x,_y);
		this.velo = createVector(2*v_x,2*v_y);
		this.accel = createVector(0,.1);
	}
	display(){
		ellipse(this.postion.x,this.postion.y,this.diam);
	}
	move(){
		//Set's the position of the stone based on velocity and changes the velocity based on accelration
		this.postion.add(this.velo);
		this.velo.add(this.accel);
	}
	bounce(){
		bounces = createVector(2,1);
		// Reflection if the ball hits the ground
		if(this.postion.y>height-200-this.diam/2){
			this.velo.y *= -1;
			this.postion.y = height-200-this.diam/2
			// Drops the velocity by 20% everytime the ball bounces
			this.velo.mult(.8);
		}
		//Reflection off the slope
		if(this.postion.y > .5*(width-this.postion.x+725)){ // Tests for the slope
			//Runs the velocity through the projection equation
			var PXV = bounces.mult(p5.Vector.dot(this.velo,bounces));
			var projection = PXV.mult(-2/5);
			//Sets the velocity to the new one.
			this.velo.add(projection);
		}
	}
}

class Treb{
	constructor(){
		this.x = 80;
		this.width = 60
		this.height = 100;
		this.topX = this.x+(this.width/2);
		this.topY = height-200-this.height;
		this.theta = -60;
		this.rotV = 0;
		this.topArm = 80;
		this.bottArm = 30;
		this.grav = this.bottArm/100;
	}
	display(){
		//The Triangle
		beginShape();
			vertex(this.x,height-200);
			vertex(this.x+this.width,height-200);
			vertex(this.x+(this.width/2),height-200-this.height);
		endShape();
		push();
		// The Arm
			translate(this.topX,this.topY);
			rotate(this.theta);
			line(-this.topArm+20,0,this.bottArm,0);
			bezier(-this.topArm+20,0,-this.topArm+20,20,-this.topArm-20,0,-this.topArm-20,-20);
			ellipse(this.bottArm+20,0,40);
		pop();
		//rope.display(this.theta);
	}
	turn(){
		//Handles turning, basically setting accelration to gravity to it's projection realtive to the angle of the arm.
		this.rotV += this.grav*cos(this.theta);
		this.theta += this.rotV;
		//Drops by 1% everyframe
		this.rotV *= .99
	}
	throw(){
		//Throws the stone perpidicular to the current angle of the arm
		var stone = new Stone(this.topArm * -cos(this.theta)+this.topX,this.topArm * -sin(this.theta)+this.topY,
					sin(this.theta)*this.rotV*this.topArm/80,
					-cos(this.theta)*this.rotV*this.topArm/80);
		stones.push(stone);
	}
}