//some code taken from http://bl.ocks.org/d3noob/9267535 https://www.d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html
//hoverover code modified from https://jsfiddle.net/gerardofurtado/wxh95e9u/
//Number formatting from https://stackoverflow.com/questions/5731193/how-to-format-numbers Answer Two
export function showmap(collection) {
  var dates = collection.columns;
  dates.splice(0, 4);
  console.log(dates);

  var slider = document.getElementsByClassName("slider")[0];
  var sliderx = document.getElementsByClassName("slider")[0].attributes.d.value;
  var slidervalue = sliderx.split(",")[0].substring(1);

  //var date = "11/11/20";
  //console.log(slidervalue);
  slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
  var arrayvalue = Math.round(((slidervalue - 70) / 1056) * 323);
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

  collection.sort((a, b) => b[chosendate] - a[chosendate]);
  console.log(collection);

  var feature = g
    .selectAll("circle")
    .data(collection)
    .enter()
    .append("circle")
    .attr("pointer-events", "visible")
    .style("stroke", "black")
    .style("opacity", 0.6)
    .style("fill", "red")
    .attr("r", function (d) {
      //var marker = L.marker(d.LatLng).addTo(map);
      //marker.bindPopup(`<b>Test!</b><br>${d.size}`).openPopup();
      return d.size / (300000 / Math.pow(map.getZoom(), 2));
    })
    .on("mouseover", function (d, i) {
      d3.select(this).style("stroke", "black").style("stroke-width", 2);
      //console.log(d);
      //console.log(i);
      var toshow = texts.filter(function (e) {
        //console.log(e.LatLng);
        //console.log(d.LatLng);
        return e.LatLng === i.LatLng;
      });
      toshow.style("opacity", 1);
      //console.log(i.size);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke", "none");
      texts.style("opacity", 0);
    })
    .on("click", function (d, i) {
      console.log(d.LatLng);
      console.log(i.LatLng);
      map.setView([i.Lat, i.Long], 5);
    });

  var texts = g
    .selectAll("text")
    .data(collection)
    .enter()
    .append("text")
    .style("opacity", 0)
    .style("font-weight", "bold")
    .style("stroke", "red")
    .style("fill", "black")
    .style("font-size", "30px")
    .text(function (d) {
      var number = String(d.size).replace(/(.)(?=(\d{3})+$)/g, "$1,");

        return d.country + ": " + number;
    });

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
    feature.attr("transform", function (d) {
      return (
        "translate(" +
        map.latLngToLayerPoint(d.LatLng).x +
        "," +
        map.latLngToLayerPoint(d.LatLng).y +
        ")"
      );
    });
    feature.attr("r", function (d) {
      if (d.size == undefined) {
        return 0;
      } else {
        //var marker = L.marker(d.LatLng).addTo(map);
        //marker.bindPopup(`<b>Test!</b><br>${d.size}`).openPopup();
        return d.size / (300000 / Math.pow(map.getZoom(), 2));
      }
    });
    texts.text(function (d) {
      var number = String(d.size).replace(/(.)(?=(\d{3})+$)/g, "$1,");
      if (d["Province/State"]) {
        return d["Province/State"] + ", " + d["Country/Region"] + ": " + number;
      } else {
        return d["Country/Region"] + ": " + number;
      }
    });
  }

  function updatex() {
    //console.log("test");
    //console.log(slider.attributes.d.value.split(",")[0].substring(1));
    slidervalue = slider.attributes.d.value.split(",")[0].substring(1);
    arrayvalue = Math.round(((slidervalue - 70) / 1056) * 323);
    //console.log(arrayvalue);
    if (arrayvalue == 323) {
      arrayvalue = 322;
    } else if (arrayvalue > 323) {
      //console.log(arrayvalue);
    }

    /* if (slidervalue < 100) {
      date = "1/22/20";
    } else if (slidervalue < 200) {
      date = "2/2/20";
    } else if (slidervalue < 300) {
      date = "3/3/20";
    } else if (slidervalue < 400) {
      date = "4/4/20";
    } else if (slidervalue < 500) {
      date = "5/5/20";
    } else if (slidervalue < 600) {
      date = "6/6/20";
    } else if (slidervalue < 700) {
      date = "7/7/20";
    } else if (slidervalue < 800) {
      date = "8/8/20";
    } else if (slidervalue < 900) {
      date = "9/9/20";
    } else if (slidervalue < 1000) {
      date = "10/10/20";
    } else {
      date = "11/11/20";
    } */
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

  $("document").ready(function () {
    slider.addEventListener("pointermove", updatex);
    var ss = document.getElementById("commodity-charts");
    var ssa = ss.getElementsByClassName("slider");
    Array.from(ssa).forEach(function (element) {
      element.addEventListener("pointermove", updatex);
    });
  });
}
