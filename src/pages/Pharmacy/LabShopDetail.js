import React from "react";
import { Link } from "react-router-dom";
import PharmacyDataTable from "../../components/Pharmacy/PharmacyDataTable";
import CustomSelect from "../../components/common/CustomSelect";
import Searchbar from "../../components/common/Searchbar";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import { useState } from "react";
import PharmacyOrderList from "../../components/Pharmacy/PharmacyOrderList";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import usePost from "../../customHook/usePost";
import { useEffect } from "react";
import LabOrderList from "../../components/Pharmacy/LabOrderList";

const LabShopDetail = () => {
  const [searchQuery, setSearchQuery] = useState("");



  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

 

  const [rows, setRows] = useState([
    {
      number: 1,
      name: "Sohaib Butt",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-25",
      time: "11:00AM",
      civilID: "40122-67366475-3",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 2,
      name: "Abdullah",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-25",
      time: "11:00AM",
      civilID: "40122-67366475-4",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 3,
      name: "Ahad",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-25",
      time: "11:00AM",
      civilID: "40122-67366475-5",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 4,
      name: "Azlan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-25",
      time: "11:00AM",
      civilID: "40122-67366475-6",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 5,
      name: "Ayan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-25",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 6,
      name: "Sohaib",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 7,
      name: "Caliph",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 8,
      name: "Johnson",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 9,
      name: "William",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 10,
      name: "Sufiyan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 11,
      name: "Malok",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 12,
      name: "Asad",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "pending",
      prescription: "Aspirin 500mg",
    },
    {
      number: 13,
      name: "Umair",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 14,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 15,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-26",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 16,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-24",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 17,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-24",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 18,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-24",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 19,
      name: "Dan",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-24",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
    {
      number: 20,
      name: "Sameer",
      email: "johndoe@example.com",
      age: 35,
      gender: "male",
      specialization: "Cardiology",
      date: "2023-03-24",
      time: "11:00AM",
      civilID: "40122-67366475-7",
      doctor: "Dr. Jane Smith",
      fees: "$50/Patient",
      appointmentStatus: "Approved",
      prescription: "Aspirin 500mg",
    },
  ]);

  return (
    <>
      <div className="row px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Laboratory</p>
        </div>

        <div className="col-12">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-4 pt-1">
              <BreadCrum
                firstLink="/bloodtest/orderlist"
                firstText="Laboratory"
                secondText="BOOKING's"
              />
              {/* <p className="mb-0 doctor-header-top-text">
                <Link className="doc-link " to="">
                  DASHBOARD
                </Link>
                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                <Link className="doc-link " to="pharmacy">
                  <span>PHARMACY</span>{" "}
                </Link>
                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                <span style={{ color: "#4FA6D1" }}>ORDERED LIST</span>{" "}
              </p> */}
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              {/* <button className="btn-add-new-doc"> Add Product </button>{" "} */}
            </div>
          </div>
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            <div className="col-12  pb-2 d-flex justify-content-start">
              <Searchbar
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Search"
              />
            </div>

            <div className="col-12 px-2">
              <LabOrderList rows={rows} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabShopDetail;
