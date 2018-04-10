var treb;
var stone;

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
	fill(200,150,50);
	treb.display();
	treb.turn();
	if(stone != null){
		stone.display();
		stone.move();
	}
}

function mouseReleased(){
	treb.throw();
}

class Stone{
	constructor(_x,_y,v_x,v_y){
		this.radius = 20;
		this.postion = createVector(_x,_y);
		this.velo = createVector(2*v_x,2*v_y);
		this.accel = createVector(0,.1);
	}
	display(){
		ellipse(this.postion.x,this.postion.y,this.radius);
	}
	move(){
		this.postion.add(this.velo);
		this.velo.add(this.accel);
	}
}

class Treb{
	constructor(){
		this.x = 80;
		this.width = 60
		this.height = 100;
		this.topX = this.x+(this.width/2);
		this.topY = height-200-this.height;
		this.theta = -30;
		this.grav = .1;
		this.rotV = 0;

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
			line(-80,0,20,0);
		pop();
	}
	turn(){
		this.rotV += this.grav*cos(this.theta);
		this.theta += this.rotV;
		this.rotV *= 1
	}
	throw(){
		stone = new Stone(80 * -cos(this.theta)+this.topX,80 * -sin(this.theta)+this.topY,
					sin(this.theta)*this.rotV,
					-cos(this.theta)*this.rotV);
	}
}