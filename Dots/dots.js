var pixelSize = .1

function setup(){
	var canvas = createCanvas(100*pixelSize, 100*pixelSize);
  canvas.parent('sketch-holder');
  background(240);
  drawDots();
}

function drawDots(){
	noStroke();
	for (var x = 0; x < width;x+=pixelSize){
		for (var y = 0; y < height;y+=pixelSize) {
			fill(colorMaker());
			rect(x,y,pixelSize,pixelSize);
		}
	}
	print(width);
}

function colorMaker(){
	var p = random();
	if(p<=.465){
		return [47, 212, 249];
	}else if(p>.465 && p<=.745){
		return [255, 174, 0];
	}else if(.745<p && p<=.9){
		return [0, 255, 2];
	}else if (.9<p && p<=.97){
		return [255, 45, 17];
	}else if(p>.97){
		return [114, 59, 17];
	}
}