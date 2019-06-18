var data;
var bOne;
var bTwo;
var firstNum;
var secNum;
var lastFN;
var lastSN;
var firstPlay;
var secPlay;
var list;
var compra = 0;
var elementList = [];
var alreadyComps = [];
function preload(){
data = loadJSON("Datas/olympics.json");
}

function setup(){
	list = data.list;
	shuffle(list,true);
	createCanvas(0,0)
	bOne = document.getElementById("b1");
	bTwo = document.getElementById("b2");
	comps = document.getElementById("comps");
	for(var i = 0; i<data.list.length;i++){
		compra += i;
	}
	comps.innerHTML = "Comparisons Left: " + compra;
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
		newComparisons("switch");
	}else{
		newComparisons("Null");
	}
	compra--;
	comps.innerHTML = "Comparisons Left: " + compra;
}

function Two(){
	if(secNum > firstNum){
		list.splice(secNum,1);
		splice(list,secPlay,firstNum);
		newComparisons("switches");
	}else{
		newComparisons("Null");
	}
	compra--;
	comps.innerHTML = "Comparisons Left: " + compra;
}

function newComparisons(test){
	if(test == "switch"){
		lastFN = secNum;
		lastSN = secNum+1;
	}else if(test == "switches"){
		lastFN = firstNum+1;
		lastSN = firstNum;
	}else if(test == "Null"){
		lastFN = firstNum;
		lastSN = secNum;
	}
	firstNum = floor(random(list.length))
	secNum = floor(random(list.length))
	firstPlay = list[firstNum];
	secPlay = list[secNum];
	for(var i = 0;i<alreadyComps.length;i++){
		if(firstPlay + secPlay == alreadyComps[i] || secPlay + firstPlay == alreadyComps[i]){
			newComparisons();
			return;
		}
	}
	if(firstPlay == secPlay){
		newComparisons();
		return;
	}else{
		bOne.innerHTML = firstPlay;
		bTwo.innerHTML = secPlay;
	}

	alreadyComps.push(firstPlay + secPlay);
	for(var i = 0;i<list.length;i++){
		elementList[i].remove()
		elementList[i] = createElement("p",i+1 + ". " + list[i]);
	}
	styles();
}

function styles(){
	elementList[lastFN].style('background-color', "#e4a3ed");
	elementList[lastFN].style('color', "#ffffff");
	elementList[lastSN].style('background-color', "#e4a3ed");
	elementList[lastSN].style('color', "#ffffff");
	elementList[firstNum].style('background-color', "#684a6d");
	elementList[firstNum].style('color', "#ffffff");
	elementList[secNum].style('background-color', "#684a6d");
	elementList[secNum].style('color', "#ffffff");
}