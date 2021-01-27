import {syncSlider} from "./sync-slider.js";
import {loadMapOverlay} from './map-overlay.js';
import {showenergy, showmetals, showfood, showmis} from './chart_select.js'


// TODO:
// DONE - load more lines in corona chart
// DONE - add legend with hide/show
// on click show country cases
//
// do we need population scaling?
// wrong display? no turkey?
// china data?
// display events differently
//
// better circle mouseover
// style buttons, why input?
//
// dropdown
// mouseover with cases
//
// maybe add grid
// maybe add lockdown data


export function ChartFactory() {
    // default values
    let width = 900,
        height = 300,
        margin = {top: 40, right: 20, bottom: 45, left: 45},
        sliderWidth = 8,
        drag = syncSlider,
        dataHandler = (data) => data,
        title = null,
        labels = null,
        sliderStart = new Date(2020, 4, 1),
        events = null;

    function chart(selection) {
        selection.each(function (data) {
            data = labels && labels[0][0] === 'country' ? dataHandler(data, labels[0][1]) : dataHandler(data);
            const xScale = d3
                .scaleTime()
                .domain(d3.extent(data, (d) => d.date))
                .range([margin.left, width - margin.right]);

            let yMax
            if (labels) {
                const yMaxes = []
                for (let i = 0; i < labels.length; i++) {
                    yMaxes.push(d3.max(data, (d) => d[labels[i][0]]))
                }
                yMax = Math.max(...yMaxes)
            } else {
                yMax = d3.max(data, (d) => d.value)
            }

            const yScale = d3
                .scaleLinear()
                .domain([0, yMax])
                .nice()
                .range([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .attr("class", "axis")
                    .attr("id", "xAxis")
                    .call(
                        d3.axisBottom(xScale)
                            .tickSizeOuter(0)
                            .ticks(d3.timeMonth, 1)
                            .tickFormat(d3.timeFormat('%b')
                            )
                    );
            const yAxis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .attr("class", "axis")
                    .attr("id", "yAxis")
                    .call(d3.axisLeft(yScale)
                        .tickSizeOuter(0)
                        .tickValues(d3.range(0, yMax + 0.01, yMax / 4))
                        .tickFormat(d3.format(".2s")
                        )
                    );


            const svg = d3
                .select(this)
                .append("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("class", "viewbox");

            svg.append("g").call(xAxis);
            svg.append("g").call(yAxis);

            if (labels) {
                for (let i = 0; i < labels.length; i++) {
                    let line = d3
                        .line()
                        .defined((d) => !isNaN(d[labels[i][0]]))
                        .x((d) => xScale(d.date))
                        .y((d) => yScale(d[labels[i][0]]))
                        .curve(d3.curveBasis);
                    svg
                        .append("path")
                        .datum(data)
                        .attr("d", line)
                        .attr("class", "curve labeled-curve")
                        .attr("id", labels[i][0])
                        .style("stroke", "#ff3d71");
                }
            } else {
                const line = d3
                    .line()
                    .defined((d) => !isNaN(d.value))
                    .x((d) => xScale(d.date))
                    .y((d) => yScale(d.value))
                    .curve(d3.curveBasis);

                svg
                    .append("path")
                    .datum(data)
                    .attr("d", line)
                    .attr("class", "curve")
                    .style("stroke", "rgb(0, 214, 143)");

        

            }

            const slider = d3.line();
            const sliderPosition = typeof sliderStart.getMonth === 'function' ? xScale(sliderStart) : sliderStart
            svg
                .append("path")
                .datum([
                    [sliderPosition, yScale.range()[0]],
                    [sliderPosition, yScale.range()[1]],
                ])
                .attr("d", slider)
                .attr("class", "slider")
                .attr("stroke-width", sliderWidth)
                .style("cursor", "pointer")
                .call(drag(width, margin, xScale));

            if (events) {
                const isCommodityChart = this.parentNode.getAttribute('id').includes("commodity")
                const id = isCommodityChart ? "#commodity-charts" : "#corona-chart"
                for (let i = 0; i < events.length; i++) {
                    const div = d3.select(this).append("div")
                        .attr("class", "chart-event-tooltip")
                        .style("opacity", 0)
                        .style("display", "none");
                    svg.append("circle")
                        .attr("r", 8)
                        .attr("class", "chart-event")
                        .attr("cy", yScale.range()[0])
                        .attr("cx", xScale(events[i].date))
                        .attr("stroke", "rgb(102, 16, 242)")
                        .attr("fill", "rgba(102, 16, 242, 0.5)")
                        .attr('id', "eventcircle" + i)
                        .on("mouseover", function (d) {
                            let cx, cy
                            if (id === "#commodity-charts") {
                                cx = (d3.select(this).node().getBoundingClientRect().x + 10).toString() + "px"
                                cy = (d3.select(this).node().getBoundingClientRect().y - 30).toString() + "px"
                            } else {
                                cx = (d3.select(this).attr("cx") + 50).toString() + "px"
                                cy = (d3.select(this).attr("cy") - 40).toString() + "px"
                            }
                            div.transition()
                                .duration(200)
                                .style("display", "initial")
                                .style("opacity", .9);
                            div.html(events[i].title)
                                .style("left", cx)
                                .style("top", cy);
                        })
                        .on('click', function (d) {
                            /* window.open(
                                events[i].url,
                                '_blank' // <- This is what makes it open in a new window.
                            ); */
                            d3.select(this).attr("stroke", "rgb(50, 98, 168)");
                            d3.select(this).attr("fill", "rgba(50, 98, 168, 0.5)");
                            loadMapOverlay(events[i].title, events[i].content, events[i].url, d3.select(this))
                            if (events[i].type == "energy"){
                                showenergy();
                            }else if(events[i].type == "metal"){
                                showmetals();
                            }else if(events[i].type == "food"){
                                showfood();
                            }else if(events[i].type == "mis"){
                                showmis();
                            }
                        })
                        .on("mouseout", function (d) {
                            div.transition()
                                .duration(500)
                                .style("opacity", 0);
                        });
                }
            }

            if (title !== null) {
                svg
                    .append("text")
                    .attr("class", "title")
                    .attr("x", margin.left)
                    .attr("y", margin.top - 12)
                    .attr("text-anchor", "start")
                    .text(title);
            }
        });
    }

    chart.width = function (value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function (value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function (value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.sliderWidth = function (value) {
        if (!arguments.length) return sliderWidth;
        sliderWidth = value;
        return chart;
    };

    chart.drag = function (value) {
        if (!arguments.length) return drag;
        drag = value;
        return chart;
    };

    chart.dataHandler = function (value) {
        if (!arguments.length) return dataHandler;
        dataHandler = value;
        return chart;
    };

    chart.title = function (value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };
    chart.labels = function (value) {
        if (!arguments.length) return labels;
        labels = value;
        return chart;
    };
    chart.sliderStart = function (value) {
        if (!arguments.length) return sliderStart;
        sliderStart = value;
        return chart;
    };
    chart.events = function (value) {
        if (!arguments.length) return events;
        events = value;
        return chart;
    };

    return chart;
}
