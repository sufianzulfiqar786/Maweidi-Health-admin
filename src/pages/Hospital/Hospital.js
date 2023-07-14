import React, { useState } from "react";
import { Link } from "react-router-dom";

// css file
import "../../assets/css/doctor.scss";
import "../../assets/css/pharmacy.scss";

// components
import HospitalDataTable from "../../components/Hospital/HospitalDataTable";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";
import pic2 from "../../assets/images/doctor/doc2.png";
import pic3 from "../../assets/images/doctor/doc3.png";
import pic4 from "../../assets/images/doctor/doc4.png";
import pic5 from "../../assets/images/doctor/doc5.png";
import pic6 from "../../assets/images/doctor/doc6.png";
import pic7 from "../../assets/images/doctor/doc7.png";
import pic8 from "../../assets/images/doctor/doc8.png";
import useFetch from "../../customHook/useFetch";
import { useEffect } from "react";

const Hospital = () => {


  const { data, isLoading, error } = useFetch(process.env.REACT_APP_GET_HOSPITAL_DATA);


  const [searchQuery, setSearchQuery] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
  useEffect(() => {
    if (data) {
      setHospitalData(data?.data)
    }
  }, [data])


  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const data = [
  //   {
  //     name: "Al Sabah name",
  //     pic: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "alsabahname@example.com",
  //     mobile: "+965 5000 0000",
  //     address: "123 Main Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "12345",
  //   },
  //   {
  //     name: "Mubarak Al-Kabeer name",
  //     pic: "https://images.pexels.com/photos/9741487/pexels-photo-9741487.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "mubarakname@example.com",
  //     mobile: "+965 5000 1111",
  //     address: "456 Elm Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "23456",
  //   },
  //   {
  //     name: "Amiri name",
  //     pic: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "amiriname@example.com",
  //     mobile: "+965 5000 2222",
  //     address: "789 Oak Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "34567",
  //   },
  //   {
  //     name: "Chest Diseases name",
  //     pic: "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "chestname@example.com",
  //     mobile: "+965 5000 3333",
  //     address: "321 Pine Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "45678",
  //   },
  //   {
  //     name: "Al-Razi Orthopedic name",
  //     pic: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "raziname@example.com",
  //     mobile: "+965 5000 4444",
  //     address: "654 Cedar Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "56789",
  //   },
  //   {
  //     name: "Ibn Sina name",
  //     pic: "https://images.pexels.com/photos/534219/pexels-photo-534219.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "ibnsinaname@example.com",
  //     mobile: "+965 5000 5555",
  //     address: "987 Walnut Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "67890",
  //   },
  //   {
  //     name: "Jaber Al-Ahmad Al-Sabah name",
  //     pic: "https://images.pexels.com/photos/2959588/pexels-photo-2959588.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "jabername@example.com",
  //     mobile: "+965 5000 6666",
  //     address: "543 Birch Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "78901",
  //   },
  //   {
  //     name: "Al Jahra name",
  //     pic: "https://images.pexels.com/photos/7314559/pexels-photo-7314559.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "jahraname@example.com",
  //     mobile: "+965 5000 7777",
  //     address: "876 Maple Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "89012",
  //   },
  //   {
  //     name: "Adan name",
  //     pic: "https://images.pexels.com/photos/534219/pexels-photo-534219.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "adanname@example.com",
  //     mobile: "+965 5000 8888",
  //     address: "234 Cherry Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "90123",
  //   },
  //   {
  //     name: "Al-Adan Maternity name",
  //     pic: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "adanmaternity@example.com",
  //     mobile: "+965 5000 9999",
  //     address: "567 Olive Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "01234",
  //   },
  //   {
  //     name: "Al-Farwaniya Maternity name",
  //     pic: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "farwaniyamaternity@example.com",
  //     mobile: "+965 5000 1234",
  //     address: "890 Chestnut Street",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "12340",
  //   },
  //   {
  //     name: "Kuwait Cancer Control Center",
  //     pic: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "cancercontrol@example.com",
  //     mobile: "+965 5000 2345",
  //     address: "123 Walnut Avenue",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "23450",
  //   },
  //   {
  //     name: "Al-Razi Mental Health name",
  //     pic: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "razimentalhealth@example.com",
  //     mobile: "+965 5000 3456",
  //     address: "456 Elm Avenue",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "34560",
  //   },
  //   {
  //     name: "Kuwait National Guard name",
  //     pic: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "nationalguard@example.com",
  //     mobile: "+965 5000 4567",
  //     address: "789 Oak Avenue",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "45670",
  //   },
  //   {
  //     name: "Al-Mowasat name",
  //     pic: "https://images.pexels.com/photos/1018084/pexels-photo-1018084.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     email: "mowasatname@example.com",
  //     mobile: "+965 5000 5678",
  //     address: "321 Pine Avenue",
  //     state: "Kuwait City",
  //     country: "Kuwait",
  //     zipcode: "56780",
  //   },
  // ];

  // Rest of the code remains the same


  // const { data, isLoading, error } = useFetch(`https://api.maweidi.com.kw/api/admin/get_hostpitals`);
  console.log('data', data)
  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Hospitals List</p>
        </div>

        {/* <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <p className="mb-0 doctor-header-top-text">
                DASHBOARD
                <img
                  className="mx-lg-3 ml-2 pr-1 pb-1"
                  src={RightArrow}
                  alt=""
                />
                <span style={{ color: "#4FA6D1" }}>HOSPITALS LIST</span>
              </p>
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              <button className="btn-add-new-doc">
                <Link className="add-doc-link-color" to="/hospitals/add">
                  {" "}
                  Add{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            <div className="col-12 px-2 pt-4 mt-3">
              <PharmacyDataTable rows={rows} searchQuery={searchQuery} />
            </div>
          </div>
        </div> */}

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <BreadCrum firstLink="/hospitals" firstText="HOSPITALS LIST" />
              {/* <p className="mb-0 doctor-header-top-text">
                DASHBOARD
                <img
                  className="mx-lg-3 ml-2 pr-1 pb-1"
                  src={RightArrow}
                  alt=""
                />{" "}
                <span style={{ color: "#4FA6D1" }}>HOSPITALS LIST</span>{" "}
              </p> */}
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              {" "}
              <button className="btn-add-new-doc">
                <Link className="add-doc-link-color" to="/hospitals/add">
                  {" "}
                  Add{" "}
                </Link>
              </button>{" "}
            </div>
          </div>
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            <div className="col-12 px-2 pt-4 mt-3">
              {/* <PharmacyDataTable rows={data} searchQuery={searchQuery} title='Edit a Hospital' /> */}
              <HospitalDataTable
                rows={hospitalData}
                setRows={setHospitalData}
                loading={isLoading}
                searchQuery={searchQuery}
                title="Edit a Hospital"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hospital;
