import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { dummyData } from '../data/data';

export default function BarChart({ selectedMonth }) {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 0, bottom: 40, left: 0 };

    const drawChart = () => {
      const parent = chartRef.current.parentElement;
      const width = parent.clientWidth;
      const height = 300;

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current);

      svg.selectAll('*').remove();

      svg.attr('width', width).attr('height', height);

      const filteredData = dummyData.filter(
        (entry) => entry.month === selectedMonth
      )[0].dateRange; // Assuming there's only one entry for the selected month

      const xScale = d3.scaleBand()
        .domain(filteredData.map(d => d.dateRange))
        .range([margin.left, innerWidth + margin.left])
        .paddingInner(0.8)
        .paddingOuter(0.8);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.value)])
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(xScale);

      svg.append('g')
        .attr('transform', `translate(0, ${innerHeight + margin.top})`)
        .call(xAxis)
        .selectAll('path')
        .style('display', 'none');

      svg.selectAll('.tick line').style('display', 'none');

      svg.selectAll('rect')
        .data(filteredData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.dateRange))
        .attr('y', d => yScale(d.value) + margin.top)
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.value))
        .attr('rx', 9)
        .attr('ry', 9) 
        .attr('fill', 'green');
    };

    drawChart();

    window.addEventListener('resize', drawChart);

    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [selectedMonth]);

  return <svg ref={chartRef} />;
}
