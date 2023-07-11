import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {
  const data = [
    {
      month: "Jan",
      gender: "Hospitals",
      value: 1350,
    },
    {
      month: "Jan",
      gender: "Laboratories",
      value: 950,
    },
    {
      month: "Jan",
      gender: "Pharmacies",
      value: 1050,
    },

    {
      month: "Feb",
      gender: "Hospitals",
      value: 1450,
    },
    {
      month: "Feb",
      gender: "Laboratories",
      value: 1150,
    },
    {
      month: "Feb",
      gender: "Pharmacies",
      value: 950,
    },

    {
      month: "Mar",
      gender: "Hospitals",
      value: 1450,
    },
    {
      month: "Mar",
      gender: "Laboratories",
      value: 850,
    },
    {
      month: "Mar",
      gender: "Pharmacies",
      value: 900,
    },

    {
      month: "Apr",
      gender: "Hospitals",
      value: 1550,
    },
    {
      month: "Apr",
      gender: "Laboratories",
      value: 850,
    },
    {
      month: "Apr",
      gender: "Pharmacies",
      value: 1250,
    },

    {
      month: "May",
      gender: "Hospitals",
      value: 1450,
    },
    {
      month: "May",
      gender: "Laboratories",
      value: 1050,
    },
    {
      month: "May",
      gender: "Pharmacies",
      value: 850,
    },

    {
      month: "Jun",
      gender: "Hospitals",
      value: 1250,
    },
    {
      month: "Jun",
      gender: "Laboratories",
      value: 1450,
    },
    {
      month: "Jun",
      gender: "Pharmacies",
      value: 1050,
    },

    {
      month: "Jul",
      gender: "Hospitals",
      value: 950,
    },
    {
      month: "Jul",
      gender: "Laboratories",
      value: 850,
    },
    {
      month: "Jul",
      gender: "Pharmacies",
      value: 950,
    },

    {
      month: "Aug",
      gender: "Hospitals",
      value: 850,
    },
    {
      month: "Aug",
      gender: "Laboratories",
      value: 950,
    },
    {
      month: "Aug",
      gender: "Pharmacies",
      value: 1150,
    },

    {
      month: "Sep",
      gender: "Hospitals",
      value: 1450,
    },
    {
      month: "Sep",
      gender: "Laboratories",
      value: 850,
    },
    {
      month: "Sep",
      gender: "Pharmacies",
      value: 1350,
    },

    {
      month: "Oct",
      gender: "Hospitals",
      value: 1550,
    },
    {
      month: "Oct",
      gender: "Laboratories",
      value: 890,
    },
    {
      month: "Oct",
      gender: "Pharmacies",
      value: 1050,
    },

    {
      month: "Nov",
      gender: "Hospitals",
      value: 1150,
    },
    {
      month: "Nov",
      gender: "Laboratories",
      value: 950,
    },
    {
      month: "Nov",
      gender: "Pharmacies",
      value: 1350,
    },

    {
      month: "Dec",
      gender: "Hospitals",
      value: 1450,
    },
    {
      month: "Dec",
      gender: "Laboratories",
      value: 1050,
    },
    {
      month: "Dec",
      gender: "Pharmacies",
      value: 1250,
    },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "gender",
    isGroup: true,
    isStack: false,
    animation: false,

    legend: {
      position: "bottom",
      itemFormatter(val) {
        return val + " %";
      },
      marker: {
        symbol: 'circle',
      },
    },

    columnStyle: {
      radius: [0, 0, 0, 0],
    },

    color: ({ gender }) => {
      if (gender === "Hospitals") {
        return "#165DFF";
      }
      if (gender === "Laboratories") {
        return "#0FC6C2";
      }
      if (gender === "Pharmacies") {
        return "#FADC19";
      }
    },
  };

  return <Column {...config} />;
};

export default DemoColumn;
