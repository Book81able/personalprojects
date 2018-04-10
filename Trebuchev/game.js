var treb;
var rope;
var stones = [];
var bounces;

function setup(){
	var can = createCanvas(windowWidth,windowHeight);
  	can.parent("sketch-holder");
  	angleMode(DEGREES);
  	treb = new Treb();
  	rope = new Rope();
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
		this.postion.add(this.velo);
		this.velo.add(this.accel);
	}
	bounce(){
		bounces = createVector(2,1);
		if(this.postion.y>height-200-this.diam/2){
			this.velo.y *= -1;
			this.postion.y = height-200-this.diam/2
			this.velo.mult(.8);
		}
		if(this.postion.y > .5*(width-this.postion.x+725)){
			var PXV = bounces.mult(p5.Vector.dot(this.velo,bounces));
			var projection = PXV.mult(-2/5);
			this.velo.add(projection);
			print(bounces);
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
		this.topArm = 90;
		this.bottArm = 30;
		this.grav = this.bottArm/100;
	}
	display(){
		beginShape();
			vertex(this.x,height-200);
			vertex(this.x+this.width,height-200);
			vertex(this.x+(this.width/2),height-200-this.height);
		endShape();
		push();
			translate(this.topX,this.topY);
			rotate(this.theta);
			line(-this.topArm,0,this.bottArm,0);
			ellipse(this.bottArm+20,0,40);
		pop();
		rope.display(this.theta);
	}
	turn(){
		this.rotV += this.grav*cos(this.theta);
		this.theta += this.rotV;
		this.rotV *= .99
	}
	throw(){
		var stone = new Stone(this.topArm * -cos(this.theta)+this.topX,this.topArm * -sin(this.theta)+this.topY,
					sin(this.theta)*this.rotV*this.topArm/80,
					-cos(this.theta)*this.rotV*this.topArm/80);
		stones.push(stone);
	}
}

class Rope{
	constructor(){
		this.backTheta = 0;
		this.length = 10;
	}
	display(trebTheta){
		line(treb.topArm * -cos(trebTheta)+treb.topX, treb.topArm * -sin(trebTheta)+treb.topY,0,0);
	}
	move(){
		
	}
	throw(){

	}
}