import {redrawCoronaChartWithLabel} from "./draw.js";

export function addCircleClickListeners(data, margin) {
    d3.select("#map").select("svg").selectAll("circle").on("click.country", function (d, circle) {
        const entries = document.getElementById("corona-chart-controls").children
        const countryEntry = document.getElementById("country-label")
        const circleSelection = d3.select(this)
        const newClass = circleSelection.attr("class") ?
            circleSelection.attr("class").replace("circle-selected", "").trim() : ""

        document.getElementById("country-label-country").innerText = circle.country

        countryEntry.addEventListener("click", function (click) {
            redrawCoronaChartWithLabel(data, ['country', circle.country], margin)
        })

        d3.select("#map").select("svg").selectAll("circle")
            .attr("class", newClass.replace("circle-selected", "").trim())
        d3.select("#map").selectAll("circle[country='" + circle.country + "']")
            .attr("class", (circleSelection.attr("class") + "circle-selected").trim())

        countryEntry.firstElementChild.innerHTML = 'radio_button_checked'
        countryEntry.style.display = 'initial'
        checkEntries(entries, entries.length - 1)
        redrawCoronaChartWithLabel(data, ['country', circle.country], margin)
    });
}

export function addMapControlListeners() {
    const mapControlEntries = document.getElementById("map-controls").children
    for (let i = 0; i < mapControlEntries.length; i++) {
        mapControlEntries[i].addEventListener("click", function (click) {
            const entries = document.getElementById("map-controls").children
            checkEntries(entries, i)

            const targetInnerText = click.target.innerText.toLowerCase()
            if (targetInnerText.includes('cases')) {
                d3.select("#map").select("svg").selectAll("circle[type='cases']").style("display", "block")
                d3.select("#map").select("svg").selectAll("circle[type='deaths']").style("display", "none")
                d3.select("#map").select("svg").selectAll("circle[type='recovered']").style("display", "none")
            }
            if (targetInnerText.includes('deaths')) {
                d3.select("#map").select("svg").selectAll("circle[type='cases']").style("display", "none")
                d3.select("#map").select("svg").selectAll("circle[type='deaths']").style("display", "block")
                d3.select("#map").select("svg").selectAll("circle[type='recovered']").style("display", "none")
            }
            if (targetInnerText.includes('recovered')) {
                d3.select("#map").select("svg").selectAll("circle[type='cases']").style("display", "none")
                d3.select("#map").select("svg").selectAll("circle[type='deaths']").style("display", "none")
                d3.select("#map").select("svg").selectAll("circle[type='recovered']").style("display", "block")
            }

        })
    }
}

export function addCoronaChartControlListeners(data, margin) {
    const coronaControlEntries = document.getElementById("corona-chart-controls").children
    for (let i = 0; i < coronaControlEntries.length; i++) {
        coronaControlEntries[i].addEventListener("click", function (click) {
            const entries = document.getElementById("corona-chart-controls").children
            checkEntries(entries, i)

            const targetInnerText = click.target.innerText.toLowerCase()
            if (targetInnerText.includes('cases')) {
                redrawCoronaChartWithLabel(data, ['confirmed', 'Cases'], margin)
            }
            if (targetInnerText.includes('deaths')) {
                redrawCoronaChartWithLabel(data, ['deaths', 'Deaths'], margin)
            }
            if (targetInnerText.includes('recovered')) {
                redrawCoronaChartWithLabel(data, ['recovered', 'Recovered'], margin)
            }
        })
    }
}

export function checkEntries(entries, entry) {
    for (let j = 0; j < entries.length; j++) {
        if (entry === j) {
            entries[j].classList.add("corona-chart-legend-entry-active")
            entries[j].firstElementChild.innerHTML = 'radio_button_checked'
        } else {
            entries[j].classList.remove("corona-chart-legend-entry-active")
            entries[j].firstElementChild.innerHTML = 'radio_button_unchecked'
        }
    }
}