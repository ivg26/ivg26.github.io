var comSubsetId = document.getElementById("commodity-charts-subset-energy");
comSubsetId.style.display = "none";
var comSubsetId = document.getElementById("commodity-charts-subset-metals");
comSubsetId.style.display = "none";
var comSubsetId = document.getElementById("commodity-charts-subset-food");
comSubsetId.style.display = "none";
var comSubsetId = document.getElementById("commodity-charts-subset-misc");
comSubsetId.style.display = "none";

var comSubsetId = document.getElementById("commodity-charts-subset-energy");
comSubsetId.style.display = "block";
document.getElementById("b201").style["boxShadow"] = "0 0 0 3px rgb(51, 102, 255) inset";

export function showenergy() {

    var comSubsetId = document.getElementById("commodity-charts-subset-energy");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-metals");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-food");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-misc");
    comSubsetId.style.display = "none";

    var comSubsetId = document.getElementById("commodity-charts-subset-energy");
    comSubsetId.style.display = "block";
    document.getElementById("b201").style["boxShadow"] = "0 0 0 3px rgb(51, 102, 255) inset";
    document.getElementById("b202").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b203").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b204").style["boxShadow"] = "0 0 0 1px black inset";
}


export function showmetals() {
    var comSubsetId = document.getElementById("commodity-charts-subset-energy");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-metals");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-food");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-misc");
    comSubsetId.style.display = "none";

    var comSubsetId = document.getElementById("commodity-charts-subset-metals");
    comSubsetId.style.display = "block";
    document.getElementById("b201").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b202").style["boxShadow"] = "0 0 0 3px rgb(51, 102, 255) inset";
    document.getElementById("b203").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b204").style["boxShadow"] = "0 0 0 1px black inset";

}

export function showfood() {

    var comSubsetId = document.getElementById("commodity-charts-subset-energy");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-metals");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-food");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-misc");
    comSubsetId.style.display = "none";

    var comSubsetId = document.getElementById("commodity-charts-subset-food");
    comSubsetId.style.display = "block";
    document.getElementById("b201").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b202").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b203").style["boxShadow"] = "0 0 0 3px rgb(51, 102, 255) inset";
    document.getElementById("b204").style["boxShadow"] = "0 0 0 1px black inset";

}

export function showmis() {

    var comSubsetId = document.getElementById("commodity-charts-subset-energy");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-metals");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-food");
    comSubsetId.style.display = "none";
    var comSubsetId = document.getElementById("commodity-charts-subset-misc");
    comSubsetId.style.display = "none";

    var comSubsetId = document.getElementById("commodity-charts-subset-misc");
    comSubsetId.style.display = "block";
    document.getElementById("b201").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b202").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b203").style["boxShadow"] = "0 0 0 1px black inset";
    document.getElementById("b204").style["boxShadow"] = "0 0 0 3px rgb(51, 102, 255) inset";

}

document.getElementById("b201").onclick = function () {
    showenergy();
}

document.getElementById("b202").onclick = function () {
    showmetals();
}

document.getElementById("b203").onclick = function () {
    showfood();
}

document.getElementById("b204").onclick = function () {
    showmis();
}

