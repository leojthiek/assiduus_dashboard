import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { dummyData } from "../data/data";

const SimpleLineChart = ({ selectedMonth, manage }) => {
  const chartRef = useRef();

  useEffect(() => {
    const filterMonth = dummyData.filter((m) => m.month === selectedMonth);

    let data = [];

    if (manage === "profit") {
      filterMonth.find((item) => (data = item.profit));
    } else if (manage === "expense") {
      filterMonth.find((item) => (data = item.expense));
    } else if (manage === "income") {
      filterMonth.find((item) => (data = item.income));
    }

    console.log(data);

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const updateDimensions = () => {
      // Check if chartRef.current is null or undefined
      if (!chartRef.current) {
        return;
      }

      const width = chartRef.current.clientWidth - margin.left - margin.right;

      // Check if width is not a positive number
      if (!(width > 0)) {
        return;
      }

      const height = 300 - margin.top - margin.bottom;

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .nice()
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.value))
        .curve(d3.curveBasis);

      const svg = d3
        .select(chartRef.current)
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .selectAll("g")
        .data([null])
        .join("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svg.selectAll(".line").remove();

      svg
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("fill", "none");

      svg.selectAll(".x-axis").remove();

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%d"))
            .tickSize(0)
        )
        .select(".domain")
        .remove();
    };

    // Check if chartRef.current is null or undefined before adding event listener
    if (chartRef.current) {
      window.addEventListener("resize", updateDimensions);
    }

    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, [selectedMonth, manage]);

  return <svg ref={chartRef}></svg>;
};

export default SimpleLineChart;
