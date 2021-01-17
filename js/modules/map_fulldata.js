//some code taken from http://bl.ocks.org/d3noob/9267535 https://www.d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html
//hoverover code modified fro https://jsfiddle.net/gerardofurtado/wxh95e9u/
//Number formatting from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
//Ideas for the tspan https://stackoverflow.com/questions/16701522/how-to-linebreak-an-svg-text-within-javascript

import { loadMapOverlay } from "./map-overlay.js";

export function showmapfull(collection) {
  var dates = collection.columns;
  dates.splice(0, 4);
  console.log(dates);

  var slider = document.getElementsByClassName("slider")[0];
  var sliderx = document.getElementsByClassName("slider")[0].attributes.d.value;
  var slidervalue = sliderx.split(",")[0].substring(1);

  var coronaviewbox = document.getElementsByClassName("viewbox")[0];
  console.log(coronaviewbox);
  var cviewboxvalue = coronaviewbox.attributes.viewBox.value.split(",")[2];
  console.log(cviewboxvalue);

  //todo: get the viewbox heights and use that as the overlay heights
  var viewbox = document.getElementsByClassName("viewbox")[0].attributes.viewBox
    .value;
  var heightvalue = viewbox.split(",")[3];
  console.log("test");
  console.log(heightvalue);

  //var date = "11/11/20";
  //console.log(slidervalue);
  slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
  var arrayvalue = Math.round(
    ((slidervalue - 70) / (cviewboxvalue - 90)) * 323
  );
  if (arrayvalue == 323) {
    arrayvalue = 322;
  }
  var chosendate = dates[arrayvalue];

  var map = L.map("map").setView([0, 0], 2);
  var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; " + mapLink + " Contributors",
    maxZoom: 18,
  }).addTo(map);

  L.svg().addTo(map);

  L.Control.date = L.Control.extend({
    onAdd: function (map) {
      var text = L.DomUtil.create("div");
      text.id = "info_text";
      return text;
    },
    onRemove: function (map) {},
  });
  L.control.date = function (opts) {
    return new L.Control.date(opts);
  };
  L.control.date({ position: "bottomleft" }).addTo(map);

  /* Initialize the SVG layer */
  //map._initPathRoot();

  /* We simply pick up the SVG from the map object */
  var svg = d3.select(map.getPanes().overlayPane).select("svg");

  var g = svg.select("g").attr("class", "leaflet-zoom-hide");
  //console.log(g);

  var time = 0;
  //console.log(time);

  /* Add a LatLng object to each item in the dataset */
  //console.log(collection);

  //collection[time].objects.forEach(function (d) {
  collection.forEach(function (d) {
    d.LatLng = new L.LatLng(d.Lat, d.Long);
    d.size = d[chosendate];
  });

  collection.sort(
    (a, b) =>
      parseInt(b[chosendate].split(",")[0].substring(1)) -
      parseInt(a[chosendate].split(",")[0].substring(1))
  );
  console.log(collection);

  /*   var cdata = [
    {
      name: "Crude Oil Falls Part 1",
      width: 10,
      height: 255,
      date: 46,
      color: "#FF3030",
      tozooma: 40.0,
      tozoomb: -100.0,
    },
    {
      name: "Crude Oil Falls Part 2",
      width: 10,
      height: 255,
      date: 89,
      color: "#FF1A1A",
      tozooma: 40.0,
      tozoomb: -90.0,
    },
    {
      name: "Milk and Cheese Rise",
      width: 10,
      height: 255,
      date: 135,
      color: "#A2FF9f",
      tozooma: 20.593684,
      tozoomb: 78.96288,
    },
    {
      name: "Natural Gas Rises",
      width: 10,
      height: 255,
      date: 192,
      color: "#3EFF38",
      tozooma: 61.52401,
      tozoomb: 105.318756,
    },
    {
      name: "Lumber Rises",
      width: 10,
      height: 255,
      date: 186,
      color: "#08FF00",
      tozooma: 53.9333,
      tozoomb: -116.5765,
    },
    {
      name: "Lumber Falls",
      width: 10,
      height: 255,
      date: 240,
      color: "#FF0000",
      tozooma: 64.2823,
      tozoomb: -135.0,
    },
  ];

  var cchart = d3
    .select("#corona-chart")
    .select("svg")
    .selectAll("rect")
    .data(cdata)
    .enter()
    .insert("rect", ":first-child")
    .attr("width", function (d) {
      return d.width;
    })
    .attr("height", function (d) {
      return heightvalue - 40;
    })
    .attr("x", function (d) {
      var tomove = (d.date / 323) * (cviewboxvalue - 90) + 70;
      console.log(tomove);
      return tomove;
    })
    .attr("y", function (d) {
      return 11;
    })
    .style("fill", function (d) {
      return d.color;
    })
    .style("opacity", 0.4)
    .style("cursor", "pointer")
    .on("click", function (d, i) {
      console.log("test");
      console.log(i.tozooma);
      map.setView([i.tozooma, i.tozoomb], 4);
      update();
      //show information on popup display?
      loadMapOverlay("");
    })
    .append("svg:title")
    .text(function (d) {
      return d.name;
    }); */

  var covidcases = g
    .selectAll("circle")
    .data(collection)
    .enter()
    .append("circle")
    .attr("pointer-events", "visible")
    .attr("id", "cases")
    .style("stroke", "black")
    .style("opacity", 0.6)
    .style("fill", "red")
    .attr("r", function (d) {
      var cases = d.size.split(",");
      var casehere = cases[0].substring(1);
      console.log(parseInt(casehere) / d.Population);
      return parseInt(casehere) / d.Population;
    })
    .on("mouseover", function (d, i) {
      d3.select(this).style("stroke", "black").style("stroke-width", 2);
      var toshow = texts.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      var toshowboxes = rects.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      toshow.style("opacity", 1);
      toshowboxes.style("opacity", 0.7);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke", "none");
      texts.style("opacity", 0);
      rects.style("opacity", 0);
    })
    .on("click", function (d, i) {
      console.log(d.LatLng);
      console.log(i.LatLng);
      map.setView([i.Lat, i.Long], 5);
    });

  var deathstate = 3000;
  var deaths = g
    .selectAll("circles")
    .data(collection)
    .enter()
    .append("circle")
    .attr("pointer-events", "visible")
    .attr("id", "deaths")
    .style("stroke", "black")
    .style("opacity", 0)
    .style("display", "none")
    .style("fill", "blue")
    .attr("r", function (d) {
      var cases = d.size.split(",");
      var casehere = cases[1];
      return (parseInt(casehere) / d.Population) * (100000 * map.getZoom());
    })
    .on("mouseover", function (d, i) {
      d3.select(this).style("stroke", "black").style("stroke-width", 2);
      var toshow = texts.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      var toshowboxes = rects.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      toshow.style("opacity", 1);
      toshowboxes.style("opacity", 0.7);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke", "none");
      texts.style("opacity", 0);
      rects.style("opacity", 0);
    })
    .on("click", function (d, i) {
      console.log(d.LatLng);
      console.log(i.LatLng);
      map.setView([i.Lat, i.Long], 5);
    });

  var recovered = g
    .selectAll("circless")
    .data(collection)
    .enter()
    .append("circle")
    .attr("pointer-events", "visible")
    .attr("id", "recovered")
    .style("stroke", "black")
    .style("opacity", 0)
    .style("display", "none")
    .style("fill", "yellow")
    .attr("r", function (d) {
      var cases = d.size.split(",");
      if (cases.length == 1) {
        cases = ["0", "0", "0]"];
      }
      var casehere = cases[2].slice(0, -1);
      return (parseInt(casehere) / d.Population) * (10000 * map.getZoom());
    })
    .on("mouseover", function (d, i) {
      d3.select(this).style("stroke", "black").style("stroke-width", 2);
      var toshow = texts.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      var toshowboxes = rects.filter(function (e) {
        return e.LatLng === i.LatLng;
      });
      toshow.style("opacity", 1);
      toshowboxes.style("opacity", 0.7);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke", "none");
      texts.style("opacity", 0);
      rects.style("opacity", 0);
    })
    .on("click", function (d, i) {
      console.log(d.LatLng);
      console.log(i.LatLng);
      map.setView([i.Lat, i.Long], 5);
    });

  var rects = g
    .selectAll("rect")
    .data(collection)
    .enter()
    .append("rect")
    .style("opacity", 0)
    .style("width", "200")
    .style("height", "140")
    .attr("x", "-60")
    .attr("y", "-130")
    .style("fill", "white")
    .style("rx", "15");

  var texts = g
    .selectAll("text")
    .data(collection)
    .enter()
    .append("text")
    .style("opacity", 0)
    .style("font-weight", "bold")
    .style("stroke", "black")
    .style("stroke-width", "0.5")
    .style("fill", "black")
    .style("font-size", "20px");

  var date = d3
    .select("#info_text")
    .append("text")
    .style("font-weight", "bold")
    .style("font-size", "50px")
    .text(function (d) {
      return chosendate;
    });

  map.on("zoom", update);
  update();

  function update() {
    texts.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    rects.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    covidcases.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    covidcases.attr("r", function (d) {
      if ((d.size == undefined) | (d.size < 0)) {
        return 0;
      } else {
        //var marker = L.marker(d.LatLng).addTo(map);
        //marker.bindPopup(`<b>Test!</b><br>${d.size}`).openPopup();
        var cases = d.size.split(",");
        var casehere = cases[0].substring(1);
        return (parseInt(casehere) / d.Population) * (10000 * map.getZoom());
      }
    });
    texts.select("tspan").remove();

    texts
      .append("tspan")
      .attr("x", -50)
      .attr("dy", -100)
      .text(function (d) {
        return d["Country/Region"];
      })
      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .text(function (d) {
        var pop = d.Population;
        var fullpop = String(pop).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "Population: " + fullpop;
      })

      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .style("stroke", "red")
      .text(function (d) {
        var cases = d.size.split(",");
        var covidcases = cases[0].substring(1);
        var casenumber = String(covidcases).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return "Cases: " + casenumber;
      })
      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .style("stroke", "blue")
      .text(function (d) {
        var cases = d.size.split(",");
        var coviddeaths = cases[1];
        var deaths = String(coviddeaths).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "Deaths: " + deaths;
      })
      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .style("stroke", "yellow")
      .text(function (d) {
        var cases = d.size.split(",");
        if (cases.length == 1) {
          cases = ["[0", "0", "0]"];
        }
        var covidrecovered = cases[2].slice(0, -1);
        var recovered = String(covidrecovered).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return "Recovered: " + recovered;
      });

    deaths.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    deaths.attr("r", function (d) {
      if ((d.size == undefined) | (d.size < 0)) {
        return 0;
      } else {
        //var marker = L.marker(d.LatLng).addTo(map);
        //marker.bindPopup(`<b>Test!</b><br>${d.size}`).openPopup();
        var cases = d.size.split(",");
        var casehere = cases[1];
        return (parseInt(casehere) / d.Population) * (300000 * map.getZoom());
      }
    });

    recovered.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    recovered.attr("r", function (d) {
      if ((d.size == undefined) | (d.size < 0)) {
        return 0;
      } else {
        //var marker = L.marker(d.LatLng).addTo(map);
        //marker.bindPopup(`<b>Test!</b><br>${d.size}`).openPopup();
        var cases = d.size.split(",");
        if (cases.length == 1) {
          cases = ["0", "0", "0]"];
        }
        var casehere = cases[2].slice(0, -1);
        return (parseInt(casehere) / d.Population) * (10000 * map.getZoom());
      }
    });
  }

  function updatex() {
    slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
    cviewboxvalue = coronaviewbox.attributes.viewBox.value.split(",")[2];
    arrayvalue = Math.round(((slidervalue - 70) / (cviewboxvalue - 90)) * 323);
    //console.log(arrayvalue);
    if (arrayvalue == 323) {
      arrayvalue = 322;
    } else if (arrayvalue > 323) {
      //console.log(arrayvalue);
    }
    chosendate = dates[arrayvalue];
    date.text(function (d) {
      return chosendate;
    });
    //console.log(chosendate);

    collection.forEach(function (d) {
      d.LatLng = new L.LatLng(d.Lat, d.Long);
      d.size = d[chosendate];
    });
    collection.sort((a, b) => b[chosendate] - a[chosendate]);
    //console.log(collection);
    update();
  }

  //cases button
  L.Control.layered = L.Control.extend({
    onAdd: function (map) {
      var input = L.DomUtil.create("input");
      input.type = "button";
      input.title = "cases";
      input.value = "cases";
      input.style.width = "80px";

      input.onclick = function () {
        console.log("clicked");
        covidcases.style("opacity", 0.6);
        covidcases.style("display", "block");
        deaths.style("opacity", 0);
        deaths.style("display", "none");
        recovered.style("opacity", 0);
        recovered.style("display", "none");
        deathstate = 3000;
      };

      return input;
    },
    onRemove: function (map) {},
  });
  L.control.layered = function (opts) {
    return new L.Control.layered(opts);
  };

  //deaths button
  L.Control.layeredD = L.Control.extend({
    onAdd: function (map) {
      var input = L.DomUtil.create("input");
      input.type = "button";
      input.title = "deaths";
      input.value = "deaths";
      input.style.width = "80px";

      input.onclick = function () {
        console.log("clicked");
        covidcases.style("opacity", 0);
        covidcases.style("display", "none");
        deaths.style("opacity", 0.6);
        deaths.style("display", "block");
        recovered.style("opacity", 0);
        recovered.style("display", "none");
        deathstate = 100;
        update();
      };

      return input;
    },
    onRemove: function (map) {},
  });
  L.control.layeredD = function (opts) {
    return new L.Control.layeredD(opts);
  };

  //recovered button
  L.Control.layeredR = L.Control.extend({
    onAdd: function (map) {
      var input = L.DomUtil.create("input");
      input.type = "button";
      input.title = "recovered";
      input.value = "recovered";
      input.style.width = "80px";

      input.onclick = function () {
        console.log("clicked");
        covidcases.style("opacity", 0);
        covidcases.style("display", "none");
        deaths.style("opacity", 0);
        deaths.style("display", "none");
        recovered.style("opacity", 0.6);
        recovered.style("display", "block");
        deathstate = 3000;
      };

      return input;
    },
    onRemove: function (map) {},
  });
  L.control.layeredR = function (opts) {
    return new L.Control.layeredR(opts);
  };

  //reset button
  L.Control.layeredRS = L.Control.extend({
    onAdd: function (map) {
      var input = L.DomUtil.create("input");
      input.type = "button";
      input.title = "reset";
      input.value = "reset";
      input.style.width = "80px";

      input.onclick = function () {
        console.log("clicked");
        covidcases.style("opacity", 0.6);
        covidcases.style("display", "block");
        deaths.style("opacity", 0.4);
        deaths.style("display", "block");
        recovered.style("opacity", 0.2);
        recovered.style("display", "block");
        deathstate = 3000;
        update();
      };

      return input;
    },
    onRemove: function (map) {},
  });
  /*   L.control.layeredRS = function (opts) {
    return new L.Control.layeredRS(opts);
  }; */

  L.control.layered({ position: "topright" }).addTo(map);
  L.control.layeredD({ position: "topright" }).addTo(map);
  L.control.layeredR({ position: "topright" }).addTo(map);
  //L.control.layeredRS({ position: "topright" }).addTo(map);

  $("document").ready(function () {
    slider.addEventListener("pointermove", updatex);
    var ss = document.getElementById("commodity-charts");
    var ssa = ss.getElementsByClassName("slider");
    Array.from(ssa).forEach(function (element) {
      element.addEventListener("pointermove", updatex);
    });
  });
  return map;
}
