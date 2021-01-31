import {drawMap} from "./map.js";
import {drawCoronaChart, drawCommodityCharts} from "./draw.js";
import {addCircleClickListeners, addCoronaChartControlListeners, addMapControlListeners} from "./listeners.js";


d3.csv("data/corona_data.csv", d3.autoType).then(function (data) {
    const coronaChartLabels = [
        ['confirmed', 'Cases'],
        ['deaths', 'Deaths'],
        ['recovered', 'Recovered'],
    ]
    const sliderStart = new Date(2020, 4, 1)
    const margin = {top: 40, right: 20, bottom: 45, left: 50}

    drawCoronaChart(data, 8, [coronaChartLabels[0]], sliderStart, margin);
    drawMap(data, sliderStart);

    addCircleClickListeners(data, margin)
    addMapControlListeners()
    addCoronaChartControlListeners(data, margin)
});

d3.json("data/commodity_data.json").then(function (data) {
    const margin = {top: 40, right: 20, bottom: 30, left: 50}
    drawCommodityCharts(data, 6, margin);
});

window.addEventListener('resize', function () {
    setTimeout(() => window.location.reload(), 500);
});