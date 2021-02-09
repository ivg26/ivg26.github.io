import {formatSliderDateText, scaleCircle, updateTexts} from "./map.js";
import {formatDateKey} from "./data-handlers.js";

export function syncSlider(width, margin, dateScaler) {
    const dragHandler = function (event, d) {
        const eventTrigger = this
        const isEventTriggerCoronaChart = this.parentNode.parentNode.getAttribute('id') === 'corona-chart'

        d3.selectAll('.slider').each(function (data, i) {
            const isSelectionCoronaChart = this.parentNode.parentNode.getAttribute('id') === 'corona-chart'
            const selectionWidth = parseFloat(this.parentElement.getAttribute('viewBox').split(',')[2])
            const commodityChartWidth = parseFloat(d3.select('#commodity-charts').select('svg').attr('viewBox').split(',')[2])
            const coronaChartWidth = parseFloat(d3.select('#corona-chart').select('svg').attr('viewBox').split(',')[2])
            const xScaleCoronaToCommodity = d3.scaleLinear()
                .domain([margin.left, coronaChartWidth - margin.right])
                .range([margin.left, commodityChartWidth - margin.right])
            const xAxisBounds = [margin.left, selectionWidth - margin.right]

            let eventX = event.x

            // Don't scale dragged slider, mouse controls dragged slider
            if (eventTrigger !== this) {
                // If dragged slider is on corona chart, scale commodity sliders
                if (isEventTriggerCoronaChart) {
                    eventX = xScaleCoronaToCommodity(eventX)
                }
                // If dragged slider is on a commodity chart, scale corona slider
                if (isSelectionCoronaChart === true) {
                    eventX = xScaleCoronaToCommodity.invert(eventX)
                }
            }

            if (eventX < xAxisBounds[0]) {
                eventX = xAxisBounds[0]
            }
            if (eventX > xAxisBounds[1]) {
                eventX = xAxisBounds[1]
            }

            d3.select(this)
                .datum(
                    [
                        [eventX, data[0][1]],
                        [eventX, data[1][1]]
                    ])
                .attr('d', d3.line())
        });

        const date = dateScaler.invert(event.x)
        const sliderData = d3.select(this.parentNode).data()[0]
        const sliderXOffset = event.x > (width - 110) ? -125 : 5;
        const tooltipTextAlign = event.x > (width - 110) ? "right" : "left";
        let yValue;
        for (let i = 0; i < sliderData.length; i++) {
            if (sliderData[i].date.toDateString() === date.toDateString()) {
                yValue = sliderData[i]
                const country = d3.select("#corona-tooltip-country").node().getAttribute("country")
                if (country) {
                    for (const [key, value] of Object.entries(yValue)) {
                        if (key.split('|')[0] === country) {
                            yValue.country = parseInt(value.split('|')[0])
                        }
                    }
                }
                break
            }
        }
        d3.select("#info_text").text(formatSliderDateText(date));
        if (yValue) {
            d3.select(".slider-tooltip")
                .style("left", (event.x + sliderXOffset).toString() + "px")
                .style("text-align", tooltipTextAlign)
            d3.selectAll(".slider-tooltip-date").html(date.toDateString())
            d3.select("#corona-tooltip-cases").html(`Cases: ${d3.format(".2s")(yValue.confirmed)}`)
            d3.select("#corona-tooltip-deaths").html(`Deaths: ${d3.format(".2s")(yValue.deaths)}`)
            d3.select("#corona-tooltip-recovered").html(`Recovered: ${d3.format(".2s")(yValue.recovered)}`)
            d3.select("#corona-tooltip-country").html(`Cases: ${d3.format(".2s")(yValue.country)}`)
        }


        // scale circles with slider
        d3.select("#map").select("svg").selectAll("circle").attr("r", function (d) {
            const data = d.data[formatDateKey(date)]
            const size = data ? data[1] : [0, 0, 0]
            const circleType = this.getAttribute('type')
            return scaleCircle(circleType, size)
        })

        if (d.data) {
            updateTexts(d.data[formatDateKey(date)]);
        }
    };

    return d3.drag()
        .on("drag", dragHandler);
}
