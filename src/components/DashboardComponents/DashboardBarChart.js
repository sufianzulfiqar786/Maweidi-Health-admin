import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {

  const data = [
    {
      month: "Jan-Feb",
      gender: "Hospitals",
      value: 1350,
    },
    {
      month: "Jan-Feb",
      gender: "Doctors",
      value: 1450,
    },
    {
      month: "Jan-Feb",
      gender: "Pharmacies",
      value: 910,
    },
    {
      month: "Jan-Feb",
      gender: "Medical Equipments",
      value: 950,
    },
    {
      month: "Jan-Feb",
      gender: "Laboratories",
      value: 785,
    },
    {
      month: "Jan-Feb",
      gender: "X-ray",
      value: 945,
    },
    {
      month: "Jan-Feb",
      gender: "Service Providers",
      value: 910,
    },




    // {
    //   month: "feb",
    //   gender: "Hospitals",
    //   value: 1350,
    // },
    // {
    //   month: "feb",
    //   gender: "Laboratories1",
    //   value: 950,
    // },
    // {
    //   month: "feb",
    //   gender: "Laboratories2",
    //   value: 950,
    // },
    // {
    //   month: "feb",
    //   gender: "Laboratorie3s",
    //   value: 950,
    // },
    // {
    //   month: "feb",
    //   gender: "Laboratories4",
    //   value: 950,
    // },



  ]

  const genderTotals = {};

  // Calculate totals for each gender
  data.forEach(item => {
    const { gender, value } = item;
    genderTotals[gender] = (genderTotals[gender] || 0) + value;
  });

  console.log("Object.keys(genderTotals)", Object.keys(genderTotals))

  // const data = [
  //   {
  //     month: "Jan",
  //     gender: "Hospitals",
  //     value: 1350,
  //   },
  //   {
  //     month: "Jan",
  //     gender: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     month: "Jan",
  //     gender: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     month: "Feb",
  //     gender: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     month: "Feb",
  //     gender: "Laboratories",
  //     value: 1150,
  //   },
  //   {
  //     month: "Feb",
  //     gender: "Pharmacies",
  //     value: 950,
  //   },

  //   {
  //     month: "Mar",
  //     gender: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     month: "Mar",
  //     gender: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     month: "Mar",
  //     gender: "Pharmacies",
  //     value: 900,
  //   },

  //   {
  //     month: "Apr",
  //     gender: "Hospitals",
  //     value: 1550,
  //   },
  //   {
  //     month: "Apr",
  //     gender: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     month: "Apr",
  //     gender: "Pharmacies",
  //     value: 1250,
  //   },

  //   {
  //     month: "May",
  //     gender: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     month: "May",
  //     gender: "Laboratories",
  //     value: 1050,
  //   },
  //   {
  //     month: "May",
  //     gender: "Pharmacies",
  //     value: 850,
  //   },

  //   {
  //     month: "Jun",
  //     gender: "Hospitals",
  //     value: 1250,
  //   },
  //   {
  //     month: "Jun",
  //     gender: "Laboratories",
  //     value: 1450,
  //   },
  //   {
  //     month: "Jun",
  //     gender: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     month: "Jul",
  //     gender: "Hospitals",
  //     value: 950,
  //   },
  //   {
  //     month: "Jul",
  //     gender: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     month: "Jul",
  //     gender: "Pharmacies",
  //     value: 950,
  //   },

  //   {
  //     month: "Aug",
  //     gender: "Hospitals",
  //     value: 850,
  //   },
  //   {
  //     month: "Aug",
  //     gender: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     month: "Aug",
  //     gender: "Pharmacies",
  //     value: 1150,
  //   },

  //   {
  //     month: "Sep",
  //     gender: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     month: "Sep",
  //     gender: "Laboratories",
  //     value: 850,
  //   },
  //   {
  //     month: "Sep",
  //     gender: "Pharmacies",
  //     value: 1350,
  //   },

  //   {
  //     month: "Oct",
  //     gender: "Hospitals",
  //     value: 1550,
  //   },
  //   {
  //     month: "Oct",
  //     gender: "Laboratories",
  //     value: 890,
  //   },
  //   {
  //     month: "Oct",
  //     gender: "Pharmacies",
  //     value: 1050,
  //   },

  //   {
  //     month: "Nov",
  //     gender: "Hospitals",
  //     value: 1150,
  //   },
  //   {
  //     month: "Nov",
  //     gender: "Laboratories",
  //     value: 950,
  //   },
  //   {
  //     month: "Nov",
  //     gender: "Pharmacies",
  //     value: 1350,
  //   },

  //   {
  //     month: "Dec",
  //     gender: "Hospitals",
  //     value: 1450,
  //   },
  //   {
  //     month: "Dec",
  //     gender: "Laboratories",
  //     value: 1050,
  //   },
  //   {
  //     month: "Dec",
  //     gender: "Pharmacies",
  //     value: 1250,
  //   },
  // ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "gender",
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
      if (gender === "Medical Equipments") {
        return "red";
      }
      if (gender === "X-ray") {
        return "pink";
      }
      if (gender === "Service Providers") {
        return "purple";
      }
      if (gender === "Doctors") {
        return "brown";
      }
    },



  };

  return <>

    <Column {...config} />

    <div className="col-12 px-2 pt-4 mt-2">
     <div className="row">
     {Object.keys(genderTotals)?.map((item, index) => {
        console.log("item", item)
        return (
          <div className=" flex-nowrap  d-flex align-items-center">
            <span className="dot " style={{ backgroundColor: item === 'Hospitals' ? '#165DFF' : 
            item === "Doctors" ? "brown" : 
            item === "Pharmacies" ? "#FADC19" : 
            item === "Medical Equipments" ? "red" : 
            item === "X-ray" ? "pink" : 
            item === "Service Providers" ? "purple" : 
            item === "Laboratories" ? "#0FC6C2" : 
            'black' }}></span> <span className="pl-2 pr-4">{item}</span>
          </div>
        )

      })}
     </div>
    </div>

  </>;
};

export default DemoColumn;
