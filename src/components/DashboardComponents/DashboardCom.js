import React, { useState } from "react";

import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';


//svg
import HospitalIcon from "../../assets/images/dashboard/HospitalIconBlue.svg";
import PulseIcon from "../../assets/images/dashboard/PulseIconBlue.svg";
import PatientIcon from "../../assets/images/dashboard/PatientIconBlue.svg";
import LaboratoryIcon from "../../assets/images/dashboard/LaboratoryBlueIcon.svg";
import PharmacyIcon from "../../assets/images/dashboard/PharmacyIcon.svg";
import BloodIcon from "../../assets/images/dashboard/BloodIcon.svg";
import DashboardBarChart from "./DashboardBarChart";
import DashboardRadialBar from "./DashboardRadialBar";
import Appoinment from "./Appoinment";
import Doctor from "./Doctor";
import { gender, optionHostpital } from "../../Data/DoctorData";
import CustomDropDownMulti from "../../atoms/CustomDropDown/CustomDropDownMulti";



//scss
import "../../assets/css/dashboard.scss";
import PieChart from "../../atoms/PieChart/PieChart";
import { Link } from "react-router-dom";

const DashboardCom = () => {
  const data = [
    {
      id: 1,
      count: 301,
      detail: "Hospitals",
      img: HospitalIcon,
      link: "/hospitals",
    },
    {
      id: 2,
      count: 302,
      detail: "Appoinments",
      img: PulseIcon,
      link: "/appointment",
    },
    {
      id: 3,
      count: 308,
      detail: "Doctors",
      img: BloodIcon,
      link: "/doctors",
    },
    {
      id: 4,
      count: 301,
      detail: "Laboratories",
      img: LaboratoryIcon,
      link: "/laboratory",
    },
    {
      id: 5,
      count: 301,
      detail: "Pharmacies",
      img: PharmacyIcon,
      link: "/pharmacy",
    },
  ];

  const data1 = [
    {
      id: 1,
      text: 'Total Revenue',
      total: '12312',
      progress: 123,
    },
    {
      id: 1,
      text: 'Completed Orders',
      total: '1312',
      progress: 23,
    },
    {
      id: 1,
      text: 'Orders Revenue',
      total: '12212',
      progress: -13,
    },
    {
      id: 1,
      text: 'Total Users',
      total: '1212',
      progress: 16,
    },
  ];

  const [dropdownValueChange, setDropdownValueChange] = useState("Adan Hospital");

  const handleChangeSelect = (value) => {
    setDropdownValueChange(value)
  }

  const progress = 10


  const { RangePicker } = DatePicker;

  const onChange = (date) => {
    if (date) {
      console.log('Date: ', date);
    } else {
      console.log('Clear');
    }
  };
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From22: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ];

  return (
    <>
      <div className="row  px-2 pt-4" style={{ overflowX: "hidden" }}>
        <div className="col-12 mb-3 mb-lg-0">
          <p className="mb-0 dashboard-com-top-text">Dashboard</p>
        </div>

        <div className="col-12 mt-1">
          <div className="row">
            {data1.map(({ text, total, progress }) => {
              return (
                <div className="px-3 col-3" >
                  <Link to='/'  >
                    <div className="dashboard-right-side-top-card my-lg-3 w-100 box-shadow-hover d-flex pl-1 py-3">

                      <div className="px-3 w-100 ">
                        <div className="d-flex justify-content-between pb-3">
                          <span className=" m-0 p-0  dashboard-left-icon-top-text1" style={{ color: '#111827', fontSize: "14px" }}>
                            {text}
                          </span>

                          <div className="px-2" style={{
                            backgroundColor: progress > 0 ? '#D1FAE5' : '#FEE2E2',
                            color: progress > 0 ? "#059669" : '#DC2626',
                            fontSize: '12px',
                            borderRadius: '10px',

                          }}>{progress > 0 ? <i class="fa-solid fa-arrow-up pr-1" style={{ fontSize: '10px' }}></i> :
                            <i class="fa-solid fa-arrow-down pr-1" style={{ fontSize: '10px' }}></i>
                            }{progress}%</div>

                        </div>

                        <hr className="m-0 " />

                        <div className="dashboard-left-icon-top-text2 pt-3 d-flex justify-content-center w-100">
                          <div className="" style={{ color: '#111827', fontSize: "18px" }}> {text === 'Total Users' || text === 'Completed Orders' ? "" : "KWD"} {total}</div>

                        </div>

                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}


            {/* {data.map(({ id, count, detail, img, link }) => {
              return (
                <div className="px-3 dashboard-card" >
                  <Link to={link} >
                  <div className="dashboard-right-side-top-card my-lg-3   d-flex pl-3 py-4">
                    <div className="  dashboard-left-icon">
                      <img className="py-1" src={img} alt="" />
                    </div>

                    <div className="pl-3">
                      <p className=" m-0 p-0 dashboard-left-icon-top-text1">
                        {count}
                      </p>
                      <p className=" m-0 p-0 dashboard-left-icon-top-text2">
                        {detail}
                      </p>
                    </div>
                  </div>
                </Link>
                </div>
              );
            })} */}

          </div>
        </div>

        <div className="col-12 mt-lg-4 pt-lg-2 ">
          <div className="row ">
            <div className="col-lg-8    " >
              <div className=" bar-chart pb-4 ">
                <div className="d-flex justify-content-between align-items-center px-4 mx-2 py-4">
                  <span class="mb-0 bar-chart-text1 ">
                    Revenue by entity
                  </span>
                  <div className="border " style={{ width: "250px", borderRadius: '5px' }}>
                    <RangePicker style={{ border: 'none' }} presets={rangePresets} onChange={onRangeChange} />

                    {/* <CustomDropDownMulti selectLabel='Adan Hospital' option={optionHostpital} handleChangeSelect={handleChangeSelect} /> */}
                  </div>
                </div>

                <div className="bar-chart-padding ">
                  <div className="pt-3">
                    <DashboardBarChart />
                  </div>

                </div>

                <p class="bar-chart-text2">Revenue</p>
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0 mt-4" >
              <div className="Radial-bar-border  pt-2" >
                <p class="mb-0 bar-chart-text1 pt-3 pb-4 d-flex justify-content-between align-items-center px-3">
                  <div className="d-flex justify-content-between w-100 flex-wrap align-items-center">
                    <div>Total Users</div>
                    <div className="border " style={{ width: "210px", borderRadius: '5px' }}>
                    <RangePicker style={{ border: 'none' }} presets={rangePresets} onChange={onRangeChange} />

                    {/* <CustomDropDownMulti selectLabel='Adan Hospital' option={optionHostpital} handleChangeSelect={handleChangeSelect} /> */}
                  </div>
                    {/* <div className="pt-1"><span style={{fontWeight:"bold"}}>1214</span></div> */}
                  </div>
                  {/* <div>
                    <div className="px-2 " style={{
                      backgroundColor: progress > 0 ? '#D1FAE5' : '#FEE2E2',
                      color: progress > 0 ? "#059669" : '#DC2626',
                      fontSize: '12px',
                      borderRadius: '10px',

                    }}>{progress > 0 ? <i class="fa-solid fa-arrow-up pr-1" style={{ fontSize: '10px' }}></i> :
                      <i class="fa-solid fa-arrow-down pr-1" style={{ fontSize: '10px' }}></i>
                      }{progress}%
                    </div>
                  </div> */}
                </p>

                <div
                  className="d-flex justify-content-center align-items-center "
                  // style={{ height: "78%" }}
                  style={{ minHeight: "85%" }}
                >
                  {/* <DashboardRadialBar /> */}
                  <div className="mx-3" style={{ width: '100%' }}>
                    <PieChart />
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 my-lg-5 pt-4 pb-lg-5">
          <div className="row pb-lg-5">
            <div className="col-lg-6 pb-lg-5 mt-lg-0 mt-0 dashboardCom-scroller-appoinment ">
              <div className="appoinment pb-lg-4 ">
                <Appoinment />
              </div>
            </div>

            <div className="col-lg-6 pb-lg-5 mt-lg-0 mt-4 mb-lg-0 mb-5 pb-lg-5 pb-5 dashboardCom-scroller-doctor">
              <div className="doctor ">
                <Doctor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCom;
