var data;
var bOne;
var bTwo;
var firstNum;
var secNum;
var firstPlay;
var secPlay;
var list;
var elementList = [];
function preload(){
data = loadJSON("plays.json");
}

function setup(){
	print(data.list);
	list = data.list;
	shuffle(list,true);
	createCanvas(0,0)
	bOne = document.getElementById("b1");
	bTwo = document.getElementById("b2");
	bOne.onclick = function(){
		One();
	}
	bTwo.onclick = function(){
		Two();
	}
	for(var i = 0;i<list.length;i++){
		elementList.push(createElement("p",list[i]));
	}
	newComparisons();
}

function One() {
	if(firstNum > secNum){
		list.splice(firstNum,1);
		splice(list,firstPlay,secNum);
	}
	print(list);
	newComparisons();
}

function Two(){
	if(secNum > firstNum){
		list.splice(secNum,1);
		splice(list,secPlay,firstNum);
	}
	print(list);
	newComparisons();
}

function newComparisons(){
	firstNum = floor(random(list.length))
	secNum = floor(random(list.length))
	firstPlay = list[firstNum];
	secPlay = list[secNum];
	if(firstPlay == secPlay){
		newComparisons();
	}else{
		bOne.innerHTML = firstPlay;
		bTwo.innerHTML = secPlay;
	}
	for(var i = 0;i<list.length;i++){
		elementList[i].remove()
		elementList[i] = createElement("p",i+1 + ". " + list[i]);
	}
}