import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import "../../assets/css/blooddonation.scss";
import Searchbar from "../../components/common/Searchbar";
import BloodDonationTable from "../../components/blooddonation/BloodDonationTable";
import HomeServiceTable from "../../components/homeservice/HomeServiceTable";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";

const HomeService = () => {
  const [rows, setRows] = useState([
    {
      number: 1,
      name: "Mehdi",
      contact: "+91-955-555-4751",
      amount: "250 KWD",
      time: "9:00 AM",
      date: "20th Dec 2022",
      experience: "2 years",
      address: "Bidadari Park Drive Singapore",
      serviceDetails: "Nursing Services",
      documentLink:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      approvalStatus: "Approved",
    },
    {
      number: 2,
      name: "Mehdi",
      contact: "+91-955-555-4751",
      amount: "250 KWD",
      time: "9:00 AM",
      date: "20th Dec 2022",
      experience: "2 years",
      address: "Bidadari Park Drive Singapore",
      serviceDetails: "Nursing Services",
      documentLink:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

      approvalStatus: "not",
    },
    {
      number: 3,
      name: "Mehdi",
      contact: "+91-955-555-4751",
      amount: "250 KWD",
      time: "9:00 AM",
      date: "20th Dec 2022",
      experience: "2 years",
      address: "Bidadari Park Drive Singapore",
      serviceDetails: "Nursing Services",
      documentLink:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

      approvalStatus: "Approved",
    },
    {
      number: 4,
      name: "Mehdi",
      contact: "+91-955-555-4751",
      amount: "250 KWD",
      time: "9:00 AM",
      date: "20th Dec 2022",
      experience: "2 years",
      address: "Bidadari Park Drive Singapore",
      serviceDetails: "Nursing Services",
      documentLink:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

      approvalStatus: "not",
    },
    {
      number: 5,
      name: "Mehdi",
      contact: "+91-955-555-4751",
      amount: "250 KWD",
      time: "9:00 AM",
      date: "20th Dec 2022",
      experience: "2 years",
      address: "Bidadari Park Drive Singapore",
      serviceDetails: "Nursing Services",
      documentLink:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",

      approvalStatus: "not",
    },
  ]);

  const handleTickClick = (rowNumber) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      const rowIndex = updatedRows.findIndex((row) => row.number === rowNumber);
      if (rowIndex !== -1) {
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          approvalStatus: "Approved",
        };
      }
      return updatedRows;
    });
  };

  const handleCrossClick = (rowNumber) => {
    setRows((prevRows) => {
      return prevRows.filter((row) => row.number !== rowNumber);
    });
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="row pl-3 pr-2 pt-4 blooddonation-tab">
        <div className="col-12">
          <p className="mb-0 blooddonation-heading">Service Provider Details</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-12">
              <BreadCrum
                firstLink="/home-service-provider"
                firstText="HOME SERVICE PROVIDER"
              />
              {/* <p className="blooddonation-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span className="current-tab"> HOME SERVICE PROVIDER</span>
              </p> */}
            </div>
          </div>
          <div className="row m-0 p-0">
            <Searchbar
              onChange={handleSearchChange}
              value={searchQuery}
              placeholder="Search"
            />
          </div>
        </div>

        <div className="col-12 mb-5 pb-5">
          <HomeServiceTable
            rows={rows}
            searchQuery={searchQuery}
            onTickClick={handleTickClick}
            onCrossClick={handleCrossClick}
          />
        </div>
      </div>
    </>
  );
};

export default HomeService;
