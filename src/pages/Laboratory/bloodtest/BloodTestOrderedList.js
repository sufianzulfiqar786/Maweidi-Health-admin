import React, { useState } from "react";
import Chevron from "../../../assets/images/common/chevron-right.svg";
import OrderListTable from "../../../components/common/OrderListTable";
import "../../../assets/css/laboratory/bloodtest/orderedlist.scss";
import Searchbar from "../../../components/common/Searchbar";

// images png
import pic1 from "../../../assets/images/doctor/doc1.png";
import pic2 from "../../../assets/images/doctor/doc2.png";
import pic3 from "../../../assets/images/doctor/doc3.png";
import pic4 from "../../../assets/images/doctor/doc4.png";
import pic5 from "../../../assets/images/doctor/doc5.png";
import pic6 from "../../../assets/images/doctor/doc6.png";
import pic7 from "../../../assets/images/doctor/doc7.png";
import pic8 from "../../../assets/images/doctor/doc8.png";

const BloodTestOrderedList = () => {
  const [rows, setRows] = useState([
    {
      number: 1,
      pic:pic1,
      name: "Ahmed Al-Mansour",
      email: "ahmed@example.com",
      address: "Kuwait City",
      mobileNo: "96512345678",
      test: "Blood Test",
      total: "KWD 25.000",
      details: "show",
      status: true,
    },
    {
      number: 2,
      pic:pic2,
      name: "Fatima Abdullah",
      email: "fatima@example.com",
      address: "Hawalli",
      mobileNo: "96598765432",
      test: "Blood Test",
      total: "KWD 40.000",
      details: "show",
      status: true,
    },
    {
      number: 3,
      pic:pic3,
      name: "Khaled Al-Rashed",
      email: "khaled@example.com",
      address: "Salmiya",
      mobileNo: "96523456789",
      test: "Blood Test",
      total: "KWD 60.000",
      details: "show",
      status: false,
    },
    {
      number: 4,
      pic:pic4,
      name: "Layla Hassan",
      email: "layla@example.com",
      address: "Jabriya",
      mobileNo: "96587654321",
      test: "Blood Test",
      total: "KWD 35.000",
      details: "show",
      status: true,
    },
    {
      number: 5,
      pic:pic5,
      name: "Mohammed Ali",
      email: "mohammed@example.com",
      address: "Farwaniya",
      mobileNo: "96534567890",
      test: "Blood Test",
      total: "KWD 50.000",
      details: "show",
      status: true,
    },
    {
      number: 6,
      pic:pic6,
      name: "Sara Khalid",
      email: "sara@example.com",
      address: "Ahmadi",
      mobileNo: "96598765432",
      test: "Blood Test",
      total: "KWD 30.000",
      details: "show",
      status: true,
    },
    {
      number: 7,
      pic:pic7,
      name: "Abdullah Hamad",
      email: "abdullah@example.com",
      address: "Fahaheel",
      mobileNo: "96523456789",
      test: "Blood Test",
      total: "KWD 45.000",
      details: "show",
      status: false,
    },
    {
      number: 8,
      pic:pic8,
      name: "Hala Saleh",
      email: "hala@example.com",
      address: "Mangaf",
      mobileNo: "96587654321",
      test: "Blood Test",
      total: "KWD 55.000",
      details: "show",
      status: true,
    },
    {
      number: 9,
      pic:pic5,
      name: "Yousef Ahmed",
      email: "yousef@example.com",
      address: "Abbasiya",
      mobileNo: "96534567890",
      test: "Blood Test",
      total: "KWD 20.000",
      details: "show",
      status: true,
    },
    {
      number: 10,
      pic:pic2,
      name: "Lina Hassan",
      email: "lina@example.com",
      address: "Rumaithiya",
      mobileNo: "96598765432",
      test: "Blood Test",
      total: "KWD 40.000",
      details: "show",
      status: true,
    },
    {
      number: 11,
      pic:pic2,
      name: "Ali Al-Awadhi",
      email: "ali@example.com",
      address: "Salwa",
      mobileNo: "96523456789",
      test: "Blood Test",
      total: "KWD 30.000",
      details: "show",
      status: true,
    },
    {
      number: 12,
      pic:pic4,
      name: "Nora Ahmed",
      email: "nora@example.com",
      address: "Jahra",
      mobileNo: "96587654321",
      test: "Blood Test",
      total: "KWD 25.000",
      details: "show",
      status: false,
    },
    {
      number: 13,
      pic:pic1,
      name: "Abdulaziz Saleh",
      email: "abdulaziz@example.com",
      address: "Sabah Al-Salem",
      mobileNo: "96534567890",
      test: "Blood Test",
      total: "KWD 35.000",
      details: "show",
      status: true,
    },
    {
      number: 14,
      pic:pic8,
      name: "Amira Khalid",
      email: "amira@example.com",
      address: "Shuwaikh",
      mobileNo: "96598765432",
      test: "Blood Test",
      total: "KWD 50.000",
      details: "show",
      status: true,
    },
    {
      number: 15,
      pic:pic7,
      name: "Omar Hassan",
      email: "omar@example.com",
      address: "Adailiya",
      mobileNo: "96523456789",
      test: "Blood Test",
      total: "KWD 45.000",
      details: "show",
      status: true,
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="row pl-3 pr-2 pt-4 orderedlist-tab">
        <div className="col-12">
          <p className="mb-0 orderedlist-heading">Ordered List</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-12">
              <p className="orderedlist-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span> LABORATORY</span>
                <img src={Chevron} />
                <span className="current-tab"> ORDERED LIST</span>
              </p>
            </div>
          </div>
          <div className="row m-0 p-0">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
          </div>
        </div>

        <div className="col-12 mb-5 pb-5">
          <OrderListTable rows={rows} searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
};

export default BloodTestOrderedList;
