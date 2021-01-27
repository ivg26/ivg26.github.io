import { loadMapOverlay } from "./map-overlay.js";
export function loadevents(collection, map) {
  var viewbox = document.getElementsByClassName("viewbox")[0].attributes.viewBox
    .value;
  var heightvalue = viewbox.split(",")[3];
  var coronaviewbox = document.getElementsByClassName("viewbox")[0];
  var cviewboxvalue = coronaviewbox.attributes.viewBox.value.split(",")[2];
  var ddate = new Date("1/22/2020");
  var cchart = d3
    .select("#corona-chart")
    .select("svg")
    .selectAll("rect")
    .data(collection)
    .enter()
    .insert("rect", ":first-child")
    .attr("width", function (d) {
      return d.width;
    })
    .attr("height", function (d) {
      return heightvalue - 40;
    })
    .attr("x", function (d) {
      console.log(d);
      var thisdate = new Date(d.date);
      //algo from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
      var timepassed = Math.abs(thisdate.getTime() - ddate.getTime());
      var placement = Math.ceil(timepassed / (1000 * 60 * 60 * 24));
      var tomove = (placement / 323) * (cviewboxvalue - 90) + 70;
      //console.log(tomove);
      return tomove;
    })
    .attr("y", function (d) {
      return 11;
    })
    .style("fill", function (d) {
      var tofind = d.name;
      var titlenames = document.getElementsByTagName("text");
      for (var i = 0; i < titlenames.length; i++) {
        //console.log(titlenames[i]);
        if (titlenames[i].textContent == tofind) {
          //console.log("found");
          titlenames[i].setAttribute("fill", d.color);
        }
      }
      return d.color;
    })
    .style("opacity", 0.4)
    .style("cursor", "pointer")
    .on("click", function (d, i) {
      //console.log("test");
      //console.log(i.tozooma);
      //map.setView([i.tozooma, i.tozoomb], 4);
      //update();
      //show information on popup display?
      //console.log(i.url);
      loadMapOverlay(i.url);
    })
    .append("svg:title")
    .text(function (d) {
      return d.name;
    });
}
