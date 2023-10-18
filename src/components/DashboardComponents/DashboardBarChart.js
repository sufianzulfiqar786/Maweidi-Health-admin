import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {

  const data = [
    {
      range: "Jan", // may be days or in month ( Please flow the Google sheet )
      type: "Hospitals",
      value: 1350,
    },
    {
      range: "Jan",
      type: "Doctors",
      value: 1450,
    },
    {
      range: "Jan",
      type: "Pharmacies",
      value: 910,
    },
    {
      range: "Jan",
      type: "Medical Equipments",
      value: 950,
    },
    {
      range: "Jan",
      type: "Laboratories",
      value: 785,
    },
    {
      range: "Jan",
      type: "X-ray",
      value: 945,
    },
    {
      range: "Jan",
      type: "Service Providers",
      value: 910,
    },




    {
      range: "Feb",
      type: "Hospitals",
      value: 1050,
    },
    {
      range: "Feb",
      type: "Doctors",
      value: 1350,
    },
    {
      range: "Feb",
      type: "Pharmacies",
      value: 710,
    },
    {
      range: "Feb",
      type: "Medical Equipments",
      value: 950,
    },
    {
      range: "Feb",
      type: "Laboratories",
      value: 1185,
    },
    {
      range: "Feb",
      type: "X-ray",
      value: 1045,
    },
    {
      range: "Feb",
      type: "Service Providers",
      value: 810,
    },


   



  ]

  const typeTotals = {};

  // Calculate totals for each type
  data.forEach(item => {
    const { type, value } = item;
    typeTotals[type] = (typeTotals[type] || 0) + value;
  });

  console.log("Object.keys(typeTotals)", Object.keys(typeTotals))

  // const data = [
  //   {
  //     range: "Jan",
  //     type: "Hospitals",
  //     value: 1350,
  //   },
  //   {
  //     range: "Jan",
  //     type: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     range: "Jan",
  //     type: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     range: "Feb",
  //     type: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     range: "Feb",
  //     type: "Laboratories",
  //     value: 1150,
  //   },
  //   {
  //     range: "Feb",
  //     type: "Pharmacies",
  //     value: 950,
  //   },

  //   {
  //     range: "Mar",
  //     type: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     range: "Mar",
  //     type: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     range: "Mar",
  //     type: "Pharmacies",
  //     value: 900,
  //   },

  //   {
  //     range: "Apr",
  //     type: "Hospitals",
  //     value: 1550,
  //   },
  //   {
  //     range: "Apr",
  //     type: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     range: "Apr",
  //     type: "Pharmacies",
  //     value: 1250,
  //   },

  //   {
  //     range: "May",
  //     type: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     range: "May",
  //     type: "Laboratories",
  //     value: 1050,
  //   },
  //   {
  //     range: "May",
  //     type: "Pharmacies",
  //     value: 850,
  //   },

  //   {
  //     range: "Jun",
  //     type: "Hospitals",
  //     value: 1250,
  //   },
  //   {
  //     range: "Jun",
  //     type: "Laboratories",
  //     value: 1450,
  //   },
  //   {
  //     range: "Jun",
  //     type: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     range: "Jul",
  //     type: "Hospitals",
  //     value: 950,
  //   },
  //   {
  //     range: "Jul",
  //     type: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     range: "Jul",
  //     type: "Pharmacies",
  //     value: 950,
  //   },

  //   {
  //     range: "Aug",
  //     type: "Hospitals",
  //     value: 850,
  //   },
  //   {
  //     range: "Aug",
  //     type: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     range: "Aug",
  //     type: "Pharmacies",
  //     value: 1150,
  //   },

  //   {
  //     range: "Sep",
  //     type: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     range: "Sep",
  //     type: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     range: "Sep",
  //     type: "Pharmacies",
  //     value: 1350,
  //   },

  //   {
  //     range: "Oct",
  //     type: "Hospitals",
  //     value: 1550,
  //   },
  //   {
  //     range: "Oct",
  //     type: "Laboratories",
  //     value: 890,
  //   },
  //   {
  //     range: "Oct",
  //     type: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     range: "Nov",
  //     type: "Hospitals",
  //     value: 1150,
  //   },
  //   {
  //     range: "Nov",
  //     type: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     range: "Nov",
  //     type: "Pharmacies",
  //     value: 1350,
  //   },

  //   {
  //     range: "Dec",
  //     type: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     range: "Dec",
  //     type: "Laboratories",
  //     value: 1050,
  //   },
  //   {
  //     range: "Dec",
  //     type: "Pharmacies",
  //     value: 1250,
  //   },
  // ];

  const config = {
    data,
    xField: "range",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    isStack: false,
    animation: false,

    // legend: {
    //   position: "bottom",
    //   itemFormatter(val) {
    //     return val + " %";
    //   },
    //   marker: {
    //     symbol: 'circle',
    //   },
    // },
    legend: false,

    columnStyle: {
      radius: [8, 8, 0, 0],
    },

    color: ({ type }) => {
      if (type === "Hospitals") {
        return "#5588FF";
      }
      if (type === "Laboratories") {
        return "#FFCE00";
      }
      if (type === "Pharmacies") {
        return "#11B3CF";
      }
      if (type === "Medical Equipments") {
        return "#6555C5";
      }
      if (type === "X-ray") {
        return "#A501F4";
      }
      if (type === "Service Providers") {
        return "#BAC94A";
      }
      if (type === "Doctors") {
        return "#35A28F";
      }
    },



  };

  return <>

    <Column {...config} />

    <div className="col-12 px-2 pt-4 mt-2">
     <div className="row">
     {Object.keys(typeTotals)?.map((item, index) => {
        console.log("item", item)
        return (
          <div className=" flex-nowrap  d-flex align-items-center">
            <span className="dot " style={{ backgroundColor: item === 'Hospitals' ? '#5588FF' : 
            item === "Doctors" ? "#35A28F" : 
            item === "Pharmacies" ? "#11B3CF" : 
            item === "Medical Equipments" ? "#6555C5" : 
            item === "X-ray" ? "#A501F4" : 
            item === "Service Providers" ? "#BAC94A" : 
            item === "Laboratories" ? "#FFCE00" : 
            'black' }}></span> <span className="pl-2 pr-4">{item}</span>
          </div>
        )

      })}
     </div>
    </div>

  </>;
};

export default DemoColumn;
