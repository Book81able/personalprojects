var data;
var list;
var elementList = [];

function preload(){
	data = loadJSON("Datas/sondheim.json");
}

function setup(){
	list = data.list;
	createCanvas(0,0);
	for(var i = 0;i<list.length;i++){
		elementList.push(createElement("p",list[i]));
		elementList[i].mousePressed(changeRed);
	}
}

function changeRed(){
	print()
}