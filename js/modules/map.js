//some code taken from http://bl.ocks.org/d3noob/9267535 https://www.d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html
//hoverover code modified fro https://jsfiddle.net/gerardofurtado/wxh95e9u/
//Number formatting from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
//Ideas for the tspan https://stackoverflow.com/questions/16701522/how-to-linebreak-an-svg-text-within-javascript

import {mapDataHandler} from "./data-handlers.js";

export function drawMap(collection, sliderStartDate) {
    collection = mapDataHandler(collection, sliderStartDate)

    var map = L.map("map").setView([0, 0], 2);
    L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
            maxZoom: 18,
        }
    ).addTo(map);

    function style(feature) {
        return {
            weight: 3,
            opacity: 1,
            stroke: "#D9FCFF",
            fill: "#D9FCFF",
        };
    }

    L.svg().addTo(map);

    L.Control.date = L.Control.extend({
        onAdd: function (map) {
            var text = L.DomUtil.create("div");
            text.id = "info_text";
            return text;
        },
        onRemove: function (map) {
        },
    });
    L.control.date = function (opts) {
        return new L.Control.date(opts);
    };
    L.control.date({position: "bottomleft"}).addTo(map);

    /* Initialize the SVG layer */
    //map._initPathRoot();

    /* We simply pick up the SVG from the map object */
    var svg = d3.select(map.getPanes().overlayPane).select("svg");

    var g = svg.select("g").attr("class", "leaflet-zoom-hide");
    //console.log(g);

    var time = 0;
    //console.log(time);


    var covidcases = g
        .selectAll("circle")
        .data(collection)
        .enter()
        .append("circle")
        .attr("pointer-events", "visible")
        .attr("id", "cases")
        .attr("country", (d) => d.country)
        .style("cursor", "pointer")
        .style("opacity", 0.6)
        .style("fill", "#ff3d71")
        .on("mouseover", function (d, i) {
            const circle = d3.select(this)
            const maxWidth = [
                circle.node().getBBox().width,
                circle.node().getBBox().width,
                circle.node().getBBox().width
            ]

            d3.select(this).style("stroke", "#ff3d71").style("opacity", 0.8).style("stroke-width", 10);
            var toshow = texts.filter(function (e) {
                return e.latLng === i.latLng;
            });
            var toshowboxes = rects.filter(function (e) {
                return e.latLng === i.latLng;
            });
            toshow.style("opacity", 1);

            const recoveredTextLength = toshow.select('#recoveredtext').node().textContent.length
            const countryTextLength = toshow.select('#countrytext').node().firstChild.textContent.length
            const boxWidth = Math.max(recoveredTextLength * 8, countryTextLength * 12)
            toshowboxes.style("opacity", 0.9).style("width", boxWidth.toString() + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", "none").style("opacity", 0.6);
            texts.style("opacity", 0);
            rects.style("opacity", 0);
        })
        .on("click", function (d, i) {
            map.setView([i.latLng.lat, i.latLng.lng], map.getZoom());
        });

    var deathstate = 3000;
    var deaths = g
        .selectAll("circles")
        .data(collection)
        .enter()
        .append("circle")
        .attr("pointer-events", "visible")
        .attr("id", "deaths")
        .attr("country", (d) => d.country)
        .style("cursor", "pointer")
        .style("opacity", 0.6)
        .style("display", "none")
        .style("fill", "#ffaa00")
        .on("mouseover", function (d, i) {
            d3.select(this).style("stroke", "#ffaa00").style("opacity", 0.8).style("stroke-width", 10);
            var toshow = texts.filter(function (e) {
                return e.latLng === i.latLng;
            });
            var toshowboxes = rects.filter(function (e) {
                return e.latLng === i.latLng;
            });
            toshow.style("opacity", 1);

            const recoveredTextLength = toshow.select('#recoveredtext').node().textContent.length
            const countryTextLength = toshow.select('#countrytext').node().firstChild.textContent.length
            const boxWidth = Math.max(recoveredTextLength * 8, countryTextLength * 12)
            toshowboxes.style("opacity", 0.7).style("width", boxWidth.toString() + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", "none").style("opacity", 0.6);
            texts.style("opacity", 0);
            rects.style("opacity", 0);
        })
        .on("click", function (d, i) {
            map.setView([i.latLng.lat, i.latLng.lng], map.getZoom());
        });

    var recovered = g
        .selectAll("circless")
        .data(collection)
        .enter()
        .append("circle")
        .attr("pointer-events", "visible")
        .attr("id", "recovered")
        .attr("country", (d) => d.country)
        .style("cursor", "pointer")
        .style("cursor", "pointer")
        .style("opacity", 0.6)
        .style("display", "none")
        .style("fill", "#00d68f")
        .on("mouseover", function (d, i) {
            d3.select(this).style("stroke", "#00d68f").style("opacity", 0.8).style("stroke-width", 10);
            var toshow = texts.filter(function (e) {
                return e.latLng === i.latLng;
            });
            var toshowboxes = rects.filter(function (e) {
                return e.latLng === i.latLng;
            });
            toshow.style("opacity", 1);

            const recoveredTextLength = toshow.select('#recoveredtext').node().textContent.length
            const countryTextLength = toshow.select('#countrytext').node().firstChild.textContent.length
            const boxWidth = Math.max(recoveredTextLength * 8, countryTextLength * 12)
            toshowboxes.style("opacity", 0.7).style("width", boxWidth.toString() + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", "none").style("opacity", 0.6);
            texts.style("opacity", 0);
            rects.style("opacity", 0);
        })
        .on("click", function (d, i) {
            map.setView([i.latLng.lat, i.latLng.lng], map.getZoom());
        });

    var rects = g
        .selectAll("rect")
        .data(collection)
        .enter()
        .append("rect")
        .style("opacity", 0)
        .style("width", "200px")
        .style("height", "113px")
        .attr("x", "-60")
        .attr("y", "-130")
        .style("fill", "white")
        .style("rx", "2");

    var texts = g
        .selectAll("text")
        .data(collection)
        .enter()
        .append("text")
        .attr("id", "texts")
        .style("opacity", 0)
        .style("fill", "black")
        .style("font-size", "16px")


    var date = d3
        .select("#info_text")
        .append("text")
        .text(formatSliderDateText(sliderStartDate));

    map.on("zoom", update);
    initCirclesR()
    update();

    function update() {
        texts.attr("transform", function (d) {
            return (
                "translate(" +
                map.latLngToLayerPoint(d.latLng).x +
                "," +
                map.latLngToLayerPoint(d.latLng).y +
                ")"
            );
        });
        rects.attr("transform", function (d) {
            return (
                "translate(" +
                map.latLngToLayerPoint(d.latLng).x +
                "," +
                map.latLngToLayerPoint(d.latLng).y +
                ")"
            );
        });
        covidcases.attr("transform", function (d) {
            return (
                "translate(" +
                map.latLngToLayerPoint(d.latLng).x +
                "," +
                map.latLngToLayerPoint(d.latLng).y +
                ")"
            );
        });
        texts.select("tspan").remove();

        var textbox = texts
            .append("tspan")
            .attr("id", "countrytext")
            .attr("x", -50)
            .attr("dy", -100)
            .style("font-size", "16px")
            .text(function (d) {
                return d.country;
            }).style("font-weight", 700)
        /* .append("tspan")
        .attr("x", -50)
        .attr("dy", 25)
        .text(function (d) {
          var pop = d.Population;
          var fullpop = String(pop).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return "Population: " + fullpop;
        }).style("font-weight", 600).style("font-size", "14px") */

        textbox.append("tspan")
            .attr("id", "casetext")
            .attr("x", -50)
            .attr("dy", 25)
            .style("fill", "#ff3d71")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.size[0]
                var casenumber = String(cases).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                return "Cases: " + casenumber;
            }).style("font-weight", 600).style("font-size", "12px")
        textbox.append("tspan")
            .attr("id", "deathtext")
            .attr("x", -50)
            .attr("dy", 20)
            .style("fill", "rgb(255, 170, 0)")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.size[1]
                var deaths = String(cases).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return "Deaths: " + deaths;
            }).style("font-weight", 600).style("font-size", "12px")
        textbox.append("tspan")
            .attr("id", "recoveredtext")
            .attr("x", -50)
            .attr("dy", 20)
            .style("fill", "rgb(0, 214, 143)")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.size[2]
                var recovered = String(cases).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                return "Recovered: " + recovered;
            }).style("font-weight", 600).style("font-size", "12px")
        deaths.attr("transform", function (d) {
            return (
                "translate(" +
                map.latLngToLayerPoint(d.latLng).x +
                "," +
                map.latLngToLayerPoint(d.latLng).y +
                ")"
            );
        });
        recovered.attr("transform", function (d) {
            return (
                "translate(" +
                map.latLngToLayerPoint(d.latLng).x +
                "," +
                map.latLngToLayerPoint(d.latLng).y +
                ")"
            );
        });
    }

    return map;
}

function initCirclesR() {
    d3.select("#map").select("svg").selectAll("circle").attr("r", function (d) {
        return scaleCircle(this.id, d.size)
    })
}

export function scaleCircle(circleId, data) {
    let radius = 0
    if (circleId === 'cases') {
        // scale cases circles here
        radius = data[0] / 1000
    }
    if (circleId === 'deaths') {
        // scale deaths circles here
        radius = data[1] / 25
    }
    if (circleId === 'recovered') {
        // scale recovered circles here
        radius = data[2] / 1000
    }
    if (radius < 0) {
        radius = 0
    }

    return radius !== 0 && radius < 4 ? 4 : radius;
}


/* export function updateTexts(date) {
    var texts = d3
    .selectAll("#texts")

    texts.select("tspan").remove();
    texts.append("tspan")
    .attr("x", -50)
    .attr("dy", -100)
    .text(function (d) {
        return d.country;
    }).style("font-weight", 700).style("font-size", "18px")
    .append("tspan")
            .attr("x", -50)
            .attr("dy", 25)
            .style("fill", "#ff3d71")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.data && d.data[date] && d.data[date][1][0]
                var casenumber = String(cases).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                return "Cases: " + casenumber;
            })
            .append("tspan")
            .attr("x", -50)
            .attr("dy", 25)
            .style("fill", "rgb(255, 170, 0)")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.data && d.data[date] && d.data[date][1][1]
                return "Deaths: " + 'aa';
            })
            .append("tspan")
            .attr("x", -50)
            .attr("dy", 25)
            .style("fill", "rgb(0, 214, 143)")
            .style("stroke-width", 0)
            .text(function (d) {
                var cases = d.data && d.data[date] && d.data[date][1][2]
                var recovered = String(cases).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                return "Recovered: " + recovered;
            });
} */

export function updateTexts(date) {
    d3
        .selectAll("#casetext").text(function (d) {
        var cases = d.data && d.data[date] && d.data[date][1][0]
        var casenumber = String(cases).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );
        return "Cases: " + casenumber;
    })
    d3
        .selectAll("#deathtext").text(function (d) {
        var deaths = d.data && d.data[date] && d.data[date][1][1]
        var deathnumber = String(deaths).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );
        return "Deaths: " + deathnumber;
    })
    d3
        .selectAll("#recoveredtext").text(function (d) {
        var recovered = d.data && d.data[date] && d.data[date][1][2]
        var recoverednumber = String(recovered).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );
        return "Recovered: " + recoverednumber;
    })
}

export function formatSliderDateText(date) {
    return date.toDateString()
}

