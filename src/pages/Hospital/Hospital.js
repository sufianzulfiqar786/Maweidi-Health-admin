import React, { useState } from "react";
import { Link } from "react-router-dom";

// css file
import "../../assets/css/doctor.scss";
import "../../assets/css/pharmacy.scss";

// components
import HospitalDataTable from "../../components/Hospital/HospitalDataTable";

// img svg
import BreadCrum from "../../atoms/breadcrum/BreadCrum";

// images png
import useFetch from "../../customHook/useFetch";
import { useEffect } from "react";
import { ValidUI } from "../privateRoutes";

const Hospital = () => {


  // const { data, isLoading, error } = useFetch(process.env.REACT_APP_GET_HOSPITAL_DATA);


  const [searchQuery, setSearchQuery] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
  // useEffect(() => {
  //   if (data) {
  //     setHospitalData(data?.data)
  //   }
  // }, [data])


  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // console.log('data', data)

  const role =JSON.parse(localStorage.getItem("userRoles"))
  const allowedhost = Object.keys(role).includes("hospitaladmin")
  const allowedlab = Object.keys(role).includes("technologist")
  const allowedphar = Object.keys(role).includes("pharmacist")
  const alloweddoc = Object.keys(role).includes("doctor")
  const isSuperAdmin = Object.keys(role).length === 0 
  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Hospitals List</p>
        </div>

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <BreadCrum firstLink="/hospitals" firstText="HOSPITALS LIST" />
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              {" "}
              {
                  isSuperAdmin ?
                  <button className="btn-add-new-doc">
                    <Link className="add-doc-link-color" to="/hospitals/add">
                      {" "}
                      Add Hospital{" "}
                    </Link>
                  </button>

              : null
}
            </div>
          </div>
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            <div className="col-12 px-2 pt-4 mt-3">
              <HospitalDataTable
                // rows={hospitalData}
                // setRows={setHospitalData}
                // loading={isLoading}
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
