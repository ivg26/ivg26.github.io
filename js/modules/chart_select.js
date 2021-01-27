var subset_energy = [2, 7, 20, 21, 25, 26, 27, 31, 38];
var subset_metals = [0, 6, 9, 12, 13, 16, 18, 19, 22, 23, 30, 34, 36, 41, 43, 51, 53, 55, 56, 56, 57];
var subset_food = [1, 4, 5, 8, 10, 11, 17, 28, 29, 32, 39, 42, 44, 45, 46, 47, 48, 50, 52];
var subset_misc = [3, 14, 15, 24, 33, 37, 40, 49, 54];

	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "none";

	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "block";
	document.getElementById("b201").style["background-color"] = "rgba(50, 98, 168, 0.5)";

export function showenergy(){
		
	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "none";

	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "block";
	document.getElementById("b201").style["background-color"] = "rgba(50, 98, 168, 0.5)";
	document.getElementById("b202").style["background-color"] = "white";
	document.getElementById("b203").style["background-color"] = "white";
	document.getElementById("b204").style["background-color"] = "white";
}

export function showmetals(){
	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "none";

	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "block";
	document.getElementById("b201").style["background-color"] = "white";
	document.getElementById("b202").style["background-color"] = "rgba(50, 98, 168, 0.5)";
	document.getElementById("b203").style["background-color"] = "white";
	document.getElementById("b204").style["background-color"] = "white";

}

export function showfood(){
		
	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "none";

	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "block";
	document.getElementById("b201").style["background-color"] = "white";
	document.getElementById("b202").style["background-color"] = "white";
	document.getElementById("b203").style["background-color"] = "rgba(50, 98, 168, 0.5)";
	document.getElementById("b204").style["background-color"] = "white";

}

export function showmis(){
		
	var xtyu = document.getElementById("commodity-charts-subset-energy");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-metals");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-food");
	xtyu.style.display = "none";
	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "none";

	var xtyu = document.getElementById("commodity-charts-subset-misc");
	xtyu.style.display = "block";
	document.getElementById("b201").style["background-color"] = "white";
	document.getElementById("b202").style["background-color"] = "white";
	document.getElementById("b203").style["background-color"] = "white";
	document.getElementById("b204").style["background-color"] = "rgba(50, 98, 168, 0.5)";

}
document.getElementById("b201").onclick = function(){showenergy();}

document.getElementById("b202").onclick = function() {showmetals();}

document.getElementById("b203").onclick = function() {showfood();}

document.getElementById("b204").onclick = function() {showmis();}

