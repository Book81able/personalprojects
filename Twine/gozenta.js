function Gozenta(){
	document.getElementById("bite").innerHTML = "Gozenta"
	var page = document.getElementById("Gozenta");
	var goz = document.createTextNode("Gozenta ");
		page.appendChild(goz);
	setTimeout(Gozenta, 100);
}