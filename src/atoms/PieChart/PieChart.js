import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const PieChart = () => {
  const data = [
    {
      type: 'Non Service Provider',
      value: 5,
    },
    {
      type: 'Service Provider',
      value: 10,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: '0.7',
    label: {
      type: 'outer',
      content: '{percentage}',
    },
    
    legend: {
        position: "top",
        itemFormatter(val) {
          return val + " %";
        },
        marker: {
          symbol: 'circle',
        },
      },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart
