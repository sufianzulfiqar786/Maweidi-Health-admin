import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import "../../assets/css/blooddonation.scss";
import Searchbar from "../../components/common/Searchbar";
import BloodDonationTable from "./../../components/blooddonation/BloodDonationTable";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { CSVLink, CSVDownload } from "react-csv";
import useFetch from "../../customHook/useFetch";

const BloodDonation = () => {
  // const [rows, setRows] = useState([
  //   {
  //     number: 1,
  //     name: "Ahmed",
  //     age: 35,
  //     gender: "male",
  //     bloodgroup: "AB+",
  //     mobileNo: "+965-12345678",
  //     city: "Kuwait City",
  //     address: "123 Kuwait Street",
  //     status: "Available",
  //   },
  //   {
  //     number: 2,
  //     name: "Fatima",
  //     age: 28,
  //     gender: "female",
  //     bloodgroup: "A-",
  //     mobileNo: "+965-98765432",
  //     city: "Hawally",
  //     address: "456 Hawally Avenue",
  //     status: "Unavailable",
  //   },
  //   {
  //     number: 3,
  //     name: "Ali",
  //     age: 42,
  //     gender: "male",
  //     bloodgroup: "O+",
  //     mobileNo: "+965-55555555",
  //     city: "Farwaniya",
  //     address: "789 Farwaniya Road",
  //     status: "Available",
  //   },
  //   {
  //     number: 4,
  //     name: "Layla",
  //     age: 31,
  //     gender: "female",
  //     bloodgroup: "B+",
  //     mobileNo: "+965-22222222",
  //     city: "Salmiya",
  //     address: "321 Salmiya Street",
  //     status: "Unavailable",
  //   },
  //   {
  //     number: 5,
  //     name: "Hassan",
  //     age: 39,
  //     gender: "male",
  //     bloodgroup: "A+",
  //     mobileNo: "+965-77777777",
  //     city: "Jahra",
  //     address: "987 Jahra Avenue",
  //     status: "Available",
  //   },
  //   {
  //     number: 6,
  //     name: "Aisha",
  //     age: 29,
  //     gender: "female",
  //     bloodgroup: "O-",
  //     mobileNo: "+965-44444444",
  //     city: "Mubarak Al-Kabeer",
  //     address: "543 Mubarak Al-Kabeer Road",
  //     status: "Available",
  //   },
  //   {
  //     number: 7,
  //     name: "Yousef",
  //     age: 45,
  //     gender: "male",
  //     bloodgroup: "B-",
  //     mobileNo: "+965-66666666",
  //     city: "Ahmadi",
  //     address: "876 Ahmadi Street",
  //     status: "Unavailable",
  //   },
  //   {
  //     number: 8,
  //     name: "Noura",
  //     age: 33,
  //     gender: "female",
  //     bloodgroup: "AB+",
  //     mobileNo: "+965-88888888",
  //     city: "Sabah Al-Salem",
  //     address: "234 Sabah Al-Salem Avenue",
  //     status: "Available",
  //   },
  //   {
  //     number: 9,
  //     name: "Khaled",
  //     age: 37,
  //     gender: "male",
  //     bloodgroup: "A+",
  //     mobileNo: "+965-99999999",
  //     city: "Jabriya",
  //     address: "765 Jabriya Road",
  //     status: "Unavailable",
  //   },
  //   {
  //     number: 10,
  //     name: "Amira",
  //     age: 26,
  //     gender: "female",
  //     bloodgroup: "B-",
  //     mobileNo: "+965-77777777",
  //     city: "Salmiya",
  //     address: "543 Salmiya Street",
  //     status: "Available",
  //   },
  // ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getHospital = useFetch(
    `${process.env.REACT_APP_LIST_BLOOD_DONATION}`
  );

  const rows = getHospital?.data
//   console.log("roesssasd", rows?.data?.data.map(m=>([m.id , m.name, m.age, m.gender, m.blood_group, m.contact, m.city
// , m.address, m.status === 0 ? "Unavailable" : "Available" ])))

  const dataaa = rows?.data?.data?.map(m=>([m?.id , m?.name, m?.age, m?.gender, m?.blood_group, m?.contact, m?.city
    , m?.address, m?.status === 0 ? "Unavailable" : "Available"])) ||[]

  const csvData = [
    ["ID", "Name", "Age", "Gender", "Blood Group", "Mobile No", "City", "Address", "Status"],
   ...dataaa
  ];


  return (
    <>
      <div className="row pl-3 pr-2 pt-4 blooddonation-tab">
        <div className="col-12">
          <p className="mb-0 blooddonation-heading">Manage Blood Donors</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-12">
              <BreadCrum
                firstLink="/blood-donation"
                firstText="BLOOD DONATION"
                secondText="DONOR DETAILS"
              />
              {/* <p className="blooddonation-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span> BLOOD DONATION</span>
                <img src={Chevron} />
                <span className="current-tab"> DONOR DETAILS</span>
              </p> */}
            </div>
          </div>
          <div className="row m-0 p-0 w-100 ">
            <div className="col-6 d-flex px-0">
              <Searchbar onChange={handleSearchChange} value={searchQuery} />
            </div>
            <div className="col-6 d-flex justify-content-end px-0 pt-4 mt-3">
            <CSVLink filename={"Blood_Donation.csv"}  data={csvData}><button className="export-me" >Export me</button></CSVLink>
            </div>
          </div>
        </div>

        <div className="col-12 mb-5 pb-5">
          <BloodDonationTable rows={rows} searchQuery={searchQuery}  />
        </div>
      </div>
    </>
  );
};

export default BloodDonation;
