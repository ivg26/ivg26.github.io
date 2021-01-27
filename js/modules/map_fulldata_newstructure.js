//some code taken from http://bl.ocks.org/d3noob/9267535 https://www.d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html
//hoverover code modified fro https://jsfiddle.net/gerardofurtado/wxh95e9u/
//Number formatting from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
//Ideas for the tspan https://stackoverflow.com/questions/16701522/how-to-linebreak-an-svg-text-within-javascript

import { loadMapOverlay } from "./map-overlay.js";

export function showmapfullnew(collection, geodata, datesone) {
  var dates= []
  for (var i in datesone['0']){
    dates.push(datesone['0'][i])
  }
  dates.shift()
  console.log(dates)

  var slider = document.getElementsByClassName("slider")[0];
  var sliderx = document.getElementsByClassName("slider")[0].attributes.d.value;
  var slidervalue = sliderx.split(",")[0].substring(1);

  var coronaviewbox = document.getElementsByClassName("viewbox")[0];
  console.log(coronaviewbox);
  var cviewboxvalue = coronaviewbox.attributes.viewBox.value.split(",")[2];
  console.log(cviewboxvalue);

  var viewbox = document.getElementsByClassName("viewbox")[0].attributes.viewBox
    .value;
  var heightvalue = viewbox.split(",")[3];
  console.log("test");
  console.log(heightvalue);

  //var date = "11/11/20";
  //console.log(slidervalue);
  slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
  var arrayvalue = Math.round(
    ((slidervalue - 45) / (cviewboxvalue - 65)) * 323
  );
  if (arrayvalue == 323) {
    arrayvalue = 322;
  }
  var chosendate = dates[arrayvalue];
  console.log(arrayvalue)
  console.log(chosendate)

  var map = L.map("map").setView([0, 0], 2);
  var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
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

  var geojson = L.geoJson(geodata, { style: style }).addTo(map);

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
  console.log(collection);

  //collection[time].objects.forEach(function (d) {
  collection.forEach(function (d) {
    console.log(d['0'])
    if (d['0'].split('|').length == 1){
      d.LatLng = new L.LatLng(90,90)
      d.Name = "none"
    }else{
      d.LatLng = new L.LatLng(d['0'].split('|')[1], d['0'].split('|')[2]);
      d.Name = d['0'].split('|')[0]
    }
    console.log(d[arrayvalue])
    d.size = d[arrayvalue].split("|");

  });

  collection.sort(
    (a, b) =>
      parseInt(b[arrayvalue].split("|")[0]) -
      parseInt(a[arrayvalue].split("|")[0])
  );
  console.log(collection);

  var covidcases = g
    .selectAll("circle")
    .data(collection)
    .enter()
    .append("circle")
    .attr("pointer-events", "visible")
    .attr("id", "cases")
      .style("opacity", 0.6)
      .style("fill", "#ff3d71")
    .attr("r", function (d) {
      if ((d.size == undefined) | (d.size[0] < 0)) {
        return 0;
      } else {
        return d.size[0] / (3000/ Math.pow(map.getZoom(), 2));
      }
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
      toshowboxes.style("opacity", 0.9);
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
    .style("opacity", 0)
    .style("display", "none")
    .style("fill", "#ffaa00")
    .attr("r", function (d) {
      if ((d.size == undefined) | (d.size[1] < 0)) {
        return 0;
      } else {
        return d.size[1] / (300 / Math.pow(map.getZoom(), 2));
      }
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
    .style("opacity", 0)
    .style("display", "none")
    .style("fill", "#00d68f")
    .attr("r", function (d) {
      if ((d.size == undefined) | (d.size[2] < 0)) {
        return 0;
      } else {
        return d.size[2] / (3000 / Math.pow(map.getZoom(), 2));
      }
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
    .style("width", "210")
    .style("height", "140")
    .attr("x", "-60")
    .attr("y", "-130")
    .style("fill", "white")
    .style("rx", "2");

  var texts = g
    .selectAll("text")
    .data(collection)
    .enter()
    .append("text")
    .style("opacity", 0)
    .style("font-weight", 600)
    .style("fill", "black")



  var date = d3
    .select("#info_text")
    .append("text")
    .style("font-weight", "700")
    .style("font-size", "25px")
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
      if ((d.size == undefined) | (d.size[0] < 0)) {
        return 0;
      } else {
        return d.size[0] / (3000/ Math.pow(map.getZoom(), 2));
      }
    });
    texts.select("tspan").remove();

    texts
      .append("tspan")
      .attr("x", -50)
      .attr("dy", -100)
      .text(function (d) {
        return d.Name;
      }).style("font-weight", 700).style("font-size", "18px")
      /* .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .text(function (d) {
        var pop = d.Population;
        var fullpop = String(pop).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "Population: " + fullpop;
      }).style("font-weight", 600).style("font-size", "14px") */

      .append("tspan")
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
      })
      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .style("fill", "rgb(255, 170, 0)")
        .style("stroke-width", 0)
        .text(function (d) {
        var cases = d.size[1]
        var deaths = String(cases).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "Deaths: " + deaths;
      })
      .append("tspan")
      .attr("x", -50)
      .attr("dy", 25)
      .style("fill", "rgb(0, 214, 143)")
      .style("stroke-width", 0)
      .text(function (d) {
        var cases = d.size[2]
        var recovered = String(cases).replace(
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
      if ((d.size == undefined) | (d.size[1] < 0)) {
        return 0;
      } else {
        return d.size[1] / (300 / Math.pow(map.getZoom(), 2));
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
      if ((d.size == undefined) | (d.size[2] < 0)) {
        return 0;
      } else {
        return d.size[2] / (3000 / Math.pow(map.getZoom(), 2));
      }
    });
  }

  function updatex() {
    slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
    cviewboxvalue = coronaviewbox.attributes.viewBox.value.split(",")[2];
    var arrayvalue = Math.round(
      ((slidervalue - 45) / (cviewboxvalue - 65)) * 323
    );
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
/*       if (d['0'].split('|').length == 1){
        d.LatLng = new L.LatLng(90,90)
        d.Population = 0
      }else{
        d.LatLng = new L.LatLng(d['0'].split('|')[1], d['0'].split('|')[2]);
        d.Population = d['0'].split('|')[0]
      } */

      d.size = d[arrayvalue].split("|");
    });
    collection.sort(
      (a, b) =>
        parseInt(b[arrayvalue].split("|")[0]) -
        parseInt(a[arrayvalue].split("|")[0])
    );
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
