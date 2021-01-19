import { ChartFactory } from "./chart-factory.js";
import { showmapfull } from "./map_fulldata.js";
import { commodityDataHandler, coronaDataHandler } from "./data-handlers.js";
import { loadevents } from "./events-overlay.js";

d3.json("data/data_1y.json").then(function (data) {
  console.log(data);
  drawCommodityCharts(data, 3, [1, 3, 5]);
  // window.addEventListener("resize", redrawDashboard(data));
});

d3.csv("data/global_cases.csv", d3.autoType).then(function (data) {
  drawCoronaChart(data, 8);
  // window.addEventListener("resize", redrawDashboard(data));
});

/* d3.csv("data/fullcovidcsv.csv").then(function (collection) {
  showmap(collection);
}); */
d3.csv("data/full_withpop_front.csv").then(function (collection) {
  //https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json
  d3.json("data/countries.geo.json").then(function (geodata) {
    var map = showmapfull(collection, geodata);
  });
  d3.csv("data/events.csv").then(function (c2) {
    console.log(c2);
    loadevents(c2, map);
  });
});

function drawCommodityCharts(data, sliderWith) {
  for (let i = 0; i < data.length; i++) {
    var j = i;

    const commodityChartWidth = document.getElementById("commodity-charts")
      .offsetWidth;
    const commodityChartHeight =
      document.getElementById("commodity-charts").offsetHeight / 4;
    const commodityChart = ChartFactory()
      .width(commodityChartWidth)
      .height(commodityChartHeight)
      .sliderWidth(sliderWith)
      .dataHandler(commodityDataHandler)
      .title(Object.keys(data[j])[0]);

    var commodityChartDiv = document.getElementById("commodity-charts"),
      comContainerDiv = document.createElement("div");
    comContainerDiv.id = "com" + j + "";
    //var containerId = "com" + j + "";
    commodityChartDiv.appendChild(comContainerDiv);

    d3.select("#" + comContainerDiv.id + "")
      .datum(data[j])
      .call(commodityChart);
    //d3.select("#" + containerId + "").datum(data[j]).call(commodityChart);
  }
}

function drawCoronaChart(data, sliderWith) {
  const coronaChartWidth = document.getElementById("corona-chart").offsetWidth;
  const coronaChartHeight = document.getElementById("corona-chart")
    .offsetHeight;
  const coronaChart = ChartFactory()
    .width(coronaChartWidth)
    .height(coronaChartHeight)
    .sliderWidth(sliderWith)
    .dataHandler(coronaDataHandler);
  d3.select("#corona-chart").datum(data).call(coronaChart);
}

function redrawDashboard(data) {
  return function redraw() {
    const coronaChartSliderWidth = d3
      .select("#corona-chart * .slider")
      .attr("stroke-width");
    d3.select("#corona-chart").select("svg").remove();
    drawCoronaChart(data, coronaChartSliderWidth);

    const commodityChartSliderWidth = d3
      .select("#commodity-charts * .slider")
      .attr("stroke-width");
    d3.select("#commodity-charts").selectAll("svg").remove();
    drawCommodityCharts(data, commodityChartSliderWidth);
  };
}
