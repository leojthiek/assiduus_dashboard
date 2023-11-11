import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { dummyData } from '../data/data';

export default function CashFlowChart({ selectedMonth }) {
  const chartRef = useRef();

  useEffect(() => {
    const selectedMonthIndex = dummyData.findIndex((month) => month.month === selectedMonth);

    // Calculate the starting index for the slice, considering the wrap-around
    const startIndex = (selectedMonthIndex - 5 + dummyData.length) % dummyData.length;

    // Slice the data based on the start index
    const data = Array.from({ length: 6 }, (_, i) => dummyData[(startIndex + i) % dummyData.length]);


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

      const xScale = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([margin.left, innerWidth + margin.left])
        .paddingInner(0.8)
        .paddingOuter(0.8);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.in + d.out)]) 
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(xScale);

      svg.append('g')
        .attr('transform', `translate(0, ${innerHeight + margin.top})`)
        .call(xAxis)
        .selectAll('path')
        .style('display', 'none');

      svg.selectAll('.tick line').style('display', 'none');

      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.month))
        .attr('y', d => yScale(d.in + d.out) + margin.top)
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(d.in + d.out))
        .attr('rx', 9)
        .attr('ry', 9)
        .attr('fill', (d) => {
          const gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', `gradient-${d.month}`)
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');
          
          gradient.append('stop')
          .attr('offset', `${(d.out / (d.in + d.out)) * 100}%`)
          .style('stop-color', 'green');
          gradient.append('stop')
          .attr('offset', `${(d.in / (d.in + d.out)) * 100}%`)
            .style('stop-color', 'blue');
          
          return `url(#gradient-${d.month})`;
        });

    };

    drawChart();

    window.addEventListener('resize', drawChart);

    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [selectedMonth]);

  return <svg ref={chartRef} />;
}
