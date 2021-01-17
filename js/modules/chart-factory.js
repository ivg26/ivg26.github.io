import { syncSlider } from "./sync-slider.js";

export function ChartFactory() {
  // default values
  let width = 900,
    height = 300,
    margin = { top: 20, right: 20, bottom: 30, left: 70 },
    sliderWidth = 8,
    drag = syncSlider,
    dataHandler = (data) => data,
    title = null;

  function chart(selection) {
    selection.each(function (data) {
      data = dataHandler(data);
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(xScale));

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yScale));

      const line = d3
        .line()
        .defined((d) => !isNaN(d.value))
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.value));

      const slider = d3.line();

      const svg = d3
        .select(this)
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "viewbox");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);

      svg.append("path").datum(data).attr("d", line);
      svg
        .append("path")
        .datum([
          [xScale.range()[1] / 2, yScale.range()[0]],
          [xScale.range()[1] / 2, yScale.range()[1]],
        ])
        .attr("d", slider)
        .attr("class", "slider")
        .attr("stroke-width", sliderWidth)
        .style("cursor", "pointer")
        .call(drag(width, margin));

      if (title !== null) {
        svg
          .append("text")
          .attr("class", "title")
          .attr("x", margin.left + 10)
          .attr("y", margin.top)
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

  return chart;
}
