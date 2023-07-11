import React from "react";

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
      link:"/hospitals",
    },
    {
      id: 2,
      count: 302,
      detail: "Appoinments",
      img: PulseIcon,
      link:"/appointment",
    },
    {
      id: 3,
      count: 308,
      detail: "Doctors",
      img: BloodIcon ,
      link:"/doctors",
    },
    {
      id: 4,
      count: 301,
      detail: "Laboratories",
      img: LaboratoryIcon,
      link:"/laboratory",
    },
    {
      id: 5,
      count: 301,
      detail: "Pharmacies",
      img: PharmacyIcon,
      link:"/pharmacy",
    },
  ];

  return (
    <>
      <div className="row  px-2 pt-4" style={{overflowX:"hidden"}}>
        <div className="col-12 mb-3 mb-lg-0">
          <p className="mb-0 dashboard-com-top-text">Dashboard</p>
        </div>

        <div className="col-12 mt-1">
          <div className="row">
            {data.map(({ id, count, detail, img, link }) => {
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
            })}
          </div>
        </div>

        <div className="col-12 mt-lg-4 pt-lg-2 ">
          <div className="row ">
            <div className="col-lg-8    ">
              <div className=" bar-chart pb-4">
                <p class="mb-0 bar-chart-text1 pt-3 pb-4 pl-4 ml-3">
                   Visited Patients
                </p>

                <div className="bar-chart-padding ">
                  <DashboardBarChart />
                </div>

                <p class="bar-chart-text2">Patients</p>
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0 mt-4" >
              <div className="Radial-bar-border  " >
                <p class="mb-0 bar-chart-text1 pt-3 pb-4 d-flex justify-content-center ">
                Patients By Department
                </p>

                <div
                  className="d-flex justify-content-center align-items-center "
                  // style={{ height: "78%" }}
                  style={{minHeight:"85%"}}
                >
                  {/* <DashboardRadialBar /> */}
                  <PieChart/>
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
