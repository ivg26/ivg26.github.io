import {ChartFactory} from "./chart-factory.js";
import {commodityDataHandler, coronaDataHandler} from "./data-handlers.js";
import {globalCoronaEvents, commodityEvents} from "../../data/events.js";

export function drawCommodityCharts(data, sliderWith, margin) {

    for (let i = 0; i < data.length; i++) {
        const commodityChartWidth = document.getElementById("commodity-charts")
            .offsetWidth;
        const commodityChartHeight =
            document.getElementById("commodity-charts").offsetHeight / 4;

        let events = commodityEvents.filter(event => {
            return event.commodity === Object.keys(data[i])[0]
        })
        events = events.length > 0 ? events : null

        const commodityChart = ChartFactory()
            .width(commodityChartWidth)
            .height(commodityChartHeight)
            .margin(margin)
            .sliderWidth(sliderWith)
            .dataHandler(commodityDataHandler)
            .events(events)
            .title(Object.keys(data[i])[0]);

        var subset_energy = [2, 7, 20, 21, 25, 26, 27, 31, 38];
        var subset_metals = [0, 6, 9, 12, 13, 16, 18, 19, 22, 23, 30, 34, 36, 41, 43, 51, 53, 55, 56, 56, 57];
        var subset_food = [1, 4, 5, 8, 10, 11, 17, 28, 29, 32, 39, 42, 44, 45, 46, 47, 48, 50, 52];
        var subset_misc = [3, 14, 15, 24, 33, 37, 40, 49, 54];

        var catVar;
        if (subset_energy.includes(i)) {
            catVar = "commodity-charts-subset-energy";
        } else if (subset_metals.includes(i)) {
            catVar = "commodity-charts-subset-metals";
        } else if (subset_food.includes(i)) {
            catVar = "commodity-charts-subset-food";
        } else if (subset_misc.includes(i)) {
            catVar = "commodity-charts-subset-misc";
        }

        const commodityChartDiv = document.getElementById(catVar);
        const comContainerDiv = document.createElement("div");

        comContainerDiv.id = "com" + i + "";
        comContainerDiv.classList.add("commodity");

        commodityChartDiv.appendChild(comContainerDiv);

        d3.select("#" + comContainerDiv.id + "")
            .datum(data[i])
            .call(commodityChart);
    }
}

export function drawCoronaChart(data, sliderWith, labels, sliderStart, margin) {
    const coronaChartWidth = document.getElementById("corona-chart").offsetWidth;
    const coronaChartHeight = document.getElementById("corona-chart")
        .offsetHeight;
    const coronaChart = ChartFactory()
        .width(coronaChartWidth)
        .height(coronaChartHeight)
        .margin(margin)
        .sliderWidth(sliderWith)
        .title("Worldwide Corona Data")
        .labels(labels)
        .sliderStart(sliderStart)
        .events(globalCoronaEvents)
        .dataHandler(coronaDataHandler);
    d3.select("#corona-chart").datum(data).call(coronaChart);
}

export function redrawCoronaChartWithLabel(data, label, margin) {
    const height = document.getElementById("corona-chart").offsetHeight
    const width = document.getElementById("corona-chart").offsetWidth;
    data = label[0] === 'country' ? coronaDataHandler(data, label[1]) : coronaDataHandler(data);
    const yMax = d3.max(data, (d) => d[label[0]])

    const yScale = d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([height - margin.bottom, margin.top]);
    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([margin.left, width - margin.right]);

    let lineColor
    if (label[0] === 'country') {
        lineColor = '#17a2b8'
        d3.select("#corona-tooltip-cases").style("display", "none")
        d3.select("#corona-tooltip-deaths").style("display", "none")
        d3.select("#corona-tooltip-recovered").style("display", "none")
        d3.select("#corona-tooltip-country").style("display", "initial")
        d3.select("#corona-tooltip-country").attr("country", label[1])
    } else if (label[0] === 'deaths') {
        lineColor = "rgb(255, 170, 0)"
        d3.select("#corona-tooltip-cases").style("display", "none")
        d3.select("#corona-tooltip-deaths").style("display", "initial")
        d3.select("#corona-tooltip-recovered").style("display", "none")
        d3.select("#corona-tooltip-country").style("display", "none")
    } else if (label[0] === 'recovered') {
        lineColor = "rgb(0, 214, 143)"
        d3.select("#corona-tooltip-cases").style("display", "none")
        d3.select("#corona-tooltip-deaths").style("display", "none")
        d3.select("#corona-tooltip-recovered").style("display", "initial")
        d3.select("#corona-tooltip-country").style("display", "none")
    } else {
        lineColor = "#ff3d71"
        d3.select("#corona-tooltip-cases").style("display", "initial")
        d3.select("#corona-tooltip-deaths").style("display", "none")
        d3.select("#corona-tooltip-recovered").style("display", "none")
        d3.select("#corona-tooltip-country").style("display", "none")
    }

    const newCurve = d3.line()
        .x(function (d) {
            return xScale(d.date);
        })
        .y(function (d) {
            return yScale(d[label[0]])
        })
        .curve(d3.curveBasis);

    d3.select("#corona-chart")
        .select("svg")
        .select(".labeled-curve")
        .transition().duration(1000)
        .attr("d", newCurve(data))
        .attr("id", label[0])
        .style("stroke", lineColor)

    const yAxis = (g) =>
        g.call(d3.axisLeft(yScale)
            .tickSizeOuter(0)
            .tickValues(d3.range(0, yMax + 0.01, yMax / 4))
            .tickFormat(d3.format(".2s")
            )
        );

    d3.select("#corona-chart")
        .select("#yAxis")
        .transition().duration(1000)
        .call(yAxis)



}
