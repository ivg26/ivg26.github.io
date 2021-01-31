import {syncSlider} from "./sync-slider.js";
import {loadMapOverlay} from './map-overlay.js';
import {showenergy, showmetals, showfood, showmis} from './chart-select.js'

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

            const slider = d3.line()
            let sliderPosition = typeof sliderStart.getMonth === 'function' ? xScale(sliderStart) : sliderStart
            let sliderMouseoverDiv;
            let tooltipY = 40
            if(labels) {
                const yValue = data.filter(d => {
                    return d.date.toDateString() === xScale.invert(sliderPosition).toDateString()
                })[0]
                sliderMouseoverDiv = d3.select(this).append("div")
                    .attr("class", "slider-tooltip")
                    .attr("type", labels[0][0])
                    .style("opacity", 0)
                    .style("display", "none")
                    .html(`
                    <div class="slider-tooltip-date">
                    ${xScale.invert(sliderPosition).toDateString()}
                    </div>
                    <div id="corona-tooltip-cases">Cases: ${yValue.confirmed}</div>
                    <div style="display: none" id="corona-tooltip-deaths">Deaths: ${d3.format(".2s")(yValue.deaths)}</div>
                    <div style="display: none" id="corona-tooltip-recovered">Recovered: ${d3.format(".2s")(yValue.recovered)}</div>
                    <div style="display: none" id="corona-tooltip-country">Cases: ${d3.format(".2s")(yValue.deaths)}</div>
                    `)
                    .style("left", (sliderPosition + 5).toString() + "px")
                    .style("top", (tooltipY).toString() + "px");
            }
            else {
                sliderMouseoverDiv = d3.select(this).append("div")
            }

            svg
                .append("path")
                .datum([
                    [sliderPosition, yScale.range()[0]],
                    [sliderPosition, yScale.range()[1]],
                ])
                .attr("d", slider)
                .attr("class", "slider")
                .attr("stroke-width", sliderWidth)
                .on("mouseover", function (d) {
                    sliderMouseoverDiv.transition()
                        .duration(200)
                        .style("display", "initial")
                        .style("opacity", .9)
                })
                .on("mouseout", function (d) {
                    sliderMouseoverDiv.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
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
                        .attr("r", 4)
                        .attr("class", "chart-event")
                        .attr("cy", yScale.range()[0])
                        .attr("cx", xScale(events[i].date))
                        .attr("stroke", "rgb(102, 16, 242)")
                        .attr("fill", "rgba(102, 16, 242, 0.5)")
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
                            d3.selectAll('.chart-event')
                                .attr("fill", "rgba(102, 16, 242, 0.5)")
                                .attr("stroke", "rgba(102, 16, 242)")

                            if (events[i].type === "energy") {
                                showenergy();
                            } else if (events[i].type === "metals") {
                                showmetals();
                            } else if (events[i].type === "food") {
                                showfood();
                            } else if (events[i].type === "misc") {
                                showmis();
                            }

                            d3.select(this)
                                .attr("fill", "rgba(232, 62, 140, 0.5)")
                                .attr("stroke", "rgba(232, 62, 140)");

                            const commodityCharts = document.querySelectorAll(".commodity")
                            for (let j = 0; j < commodityCharts.length; j++) {
                                commodityCharts[j].classList.remove("active-commodity-chart");
                            }

                            if (events[i].commoditynumber) {
                                const selectedCommodityChart = document.getElementById(events[i].commoditynumber)
                                selectedCommodityChart.classList.add("active-commodity-chart");
                                setTimeout(function () {
                                    selectedCommodityChart.classList.remove("active-commodity-chart");
                                }, 500);
                                const scrollPosition = selectedCommodityChart.offsetTop
                                document.getElementById("commodity-charts").scrollTop = scrollPosition - 100
                            }

                            loadMapOverlay(events[i].title, events[i].content, events[i].url, d3.select(this), events[i].date)


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