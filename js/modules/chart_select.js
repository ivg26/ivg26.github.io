var subset_energy = [2, 7, 20, 21, 25, 26, 27, 31, 38];
var subset_metals = [0, 6, 9, 12, 13, 16, 18, 19, 22, 23, 30, 34, 36, 41, 43, 51, 53, 55, 56, 56, 57];
var subset_food = [1, 4, 5, 8, 10, 11, 17, 28, 29, 32, 39, 42, 44, 45, 46, 47, 48, 50, 52];
var subset_misc = [3, 14, 15, 24, 33, 37, 40, 49, 54];

function b000() {
	
	for (let i = 0; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	xtyu.style.display = "block";
	}
}
function b001() {
	
	for (let i = 0; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	xtyu.style.display = "none";
	}

	for (let i = 0; i < subset_energy.length; i++) {
	var j = subset_energy[i];
	var xtyu = document.getElementById("com" + j + "");
	xtyu.style.display = "block";
	}

}
function b002() {
	
	for (let i = 0; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	xtyu.style.display = "none";
	}

	for (let i = 0; i < subset_metals.length; i++) {
	var j = subset_metals[i];
	var xtyu = document.getElementById("com" + j + "");
	xtyu.style.display = "block";
	}

}

function b003() {
	
	for (let i = 0; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	xtyu.style.display = "none";
	}

	for (let i = 0; i < subset_food.length; i++) {
	var j = subset_food[i];
	var xtyu = document.getElementById("com" + j + "");
	xtyu.style.display = "block";
	}

}
function b004() {
	
	for (let i = 0; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	xtyu.style.display = "none";
	}

	for (let i = 0; i < subset_misc.length; i++) {
	var j = subset_misc[i];
	var xtyu = document.getElementById("com" + j + "");
	xtyu.style.display = "block";
	}

}
function b005() {
	

}
function b006() {
	
	for (let i = 5; i < 7; i++) {
	var xtyu = document.getElementById("com" + i + "");
	if (xtyu.style.display === "none") {
		xtyu.style.display = "block";
	} else { 
		xtyu.style.display = "none";
	}
	}

}
function b007() {
	
	for (let i = 5; i < 7; i++) {
	var xtyu = document.getElementById("com" + i + "");
	if (xtyu.style.display === "none") {
		xtyu.style.display = "block";
	} else { 
		xtyu.style.display = "none";
	}
	}

}

function doFunction() {

//	drawCommodityCharts(data, 3, [1,2,3,4]);
	redrawDashboard(data);
}
function doFunction1() {
	
	for (let i = 55; i < 58; i++) {
	var xtyu = document.getElementById("com" + i + "");
	if (xtyu.style.display === "none") {
		xtyu.style.display = "block";
	} else { 
		xtyu.style.display = "none";
	}
	}

}
function doFunction2() {

	alert("test"); 
	var xtyu = document.getElementById("t001");
	if (xtyu.style.display === "none") {
		xtyu.style.display = "block";
	} else { 
		xtyu.style.display = "none";
	}

}

var button_id = "clickMe";
var t_test_id = "t001";
var t_test_id2 = "com2";

var elb000 = document.getElementById("b000");
if (elb000.addEventListener) 
	    elb000.addEventListener("click", b000, false);
else if (elb000.attachEvent)
	    elb000.attachEvent('onclick', b000);

var elb001 = document.getElementById("b001");
if (elb001.addEventListener) 
	    elb001.addEventListener("click", b001, false);
else if (elb001.attachEvent)
	    elb001.attachEvent('onclick', b001);

var elb002 = document.getElementById("b002");
if (elb002.addEventListener) 
	    elb002.addEventListener("click", b002, false);
else if (elb002.attachEvent)
	    elb002.attachEvent('onclick', b002);

var elb003 = document.getElementById("b003");
if (elb003.addEventListener) 
	    elb003.addEventListener("click", b003, false);
else if (elb003.attachEvent)
	    elb003.attachEvent('onclick', b003);

var elb004 = document.getElementById("b004");
if (elb004.addEventListener) 
	    elb004.addEventListener("click", b004, false);
else if (elb004.attachEvent)
	    elb004.attachEvent('onclick', b004);

var elb005 = document.getElementById("b005");
if (elb005.addEventListener) 
	    elb005.addEventListener("click", b005, false);
else if (elb005.attachEvent)
	    elb005.attachEvent('onclick', b005);

var elb006 = document.getElementById("b006");
if (elb006.addEventListener) 
	    elb006.addEventListener("click", b006, false);
else if (elb006.attachEvent)
	    elb006.attachEvent('onclick', b006);

var el = document.getElementById("i000");
if (el.addEventListener)
	    el.addEventListener("click", doFunction1, false);
else if (el.attachEvent)
	    el.attachEvent('onclick', doFunction1);

var el2= document.getElementById("i001");
if (el2.addEventListener)
	    el2.addEventListener("click", doFunction2, false);
else if (el2.attachEvent)
	    el2.attachEvent('onclick', doFunction2);

