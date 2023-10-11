import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import DataTable from "../../components/patients/allpatients/DataTable";
// css file
import "../../assets/css/doctor.scss";
import "../../assets/css/patients/allpatients/allpatientsheader.scss";
import Searchbar from "../../components/common/Searchbar";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { Link } from "react-router-dom";
import ListHeader from "../../molecules/ListHeader/ListHeader";
import useFetch from "../../customHook/useFetch";

const AllPatients = () => {
  const [rows, setRows] = useState([
    {
      avatar:
        "https://previews.123rf.com/images/wavebreakmediamicro/wavebreakmediamicro1403/wavebreakmediamicro140344180/27153528-portrait-of-male-patient-relaxing-in-hospital-bed.jpg",
      name: "Sohaib",
      appointments: 3,
      mobileNo: "+91-955-555-4751",
      email: "sohaib@example.com",
      age: 35,
      gender: "male",
    },
    {
      avatar: "https://www.shutterstock.com/image-photo/bandaged-male-patient-showing-thumb-260nw-1934481503.jpg",
      name: "John Doe",
      appointments: 2,
      mobileNo: "+91-955-555-4751",
      email: "johndoe@example.com",
      age: 40,
      gender: "male",
    },
    {
      avatar: "https://media.istockphoto.com/id/481073846/photo/the-long-hard-road-to-recovery.jpg?s=612x612&w=0&k=20&c=8SK7QeWO9VZpy3ei3eBKLKLdcWpgLOOikyByYdrzkwU=",
      name: "Sarah Ahmed",
      appointments: 4,
      mobileNo: "+91-955-555-4751",
      email: "sarahahmed@example.com",
      age: 27,
      gender: "female",
    },
    {
      avatar: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25501640.jpg",
      name: "Ahmad Abdullah",
      appointments: 1,
      mobileNo: "+91-955-555-4751",
      email: "ahmadabdullah@example.com",
      age: 52,
      gender: "male",
    },
    {
      avatar: "https://static3.depositphotos.com/1005547/211/i/450/depositphotos_2113313-Man-in-Hospital-Bed.jpg",
      name: "Fatima Ali",
      appointments: 3,
      mobileNo: "+91-955-555-4751",
      email: "fatimaali@example.com",
      age: 38,
      gender: "female",
    },
    {
      avatar: "https://static.vecteezy.com/system/resources/previews/008/203/855/large_2x/male-doctor-examining-female-patient-in-hospital-room-photo.jpg",
      name: "Khalid Hasan",
      appointments: 2,
      mobileNo: "+91-955-555-4751",
      email: "khalidhasan@example.com",
      age: 45,
      gender: "male",
    },
    {
      avatar: "https://static.vecteezy.com/system/resources/previews/008/063/385/large_2x/front-view-of-asian-male-doctor-helping-female-patient-to-walk-out-the-hospital-bed-medicine-and-health-care-concept-selective-focus-point-photo.jpg",
      name: "Layla Hussain",
      appointments: 1,
      mobileNo: "+91-955-555-4751",
      email: "laylahussain@example.com",
      age: 31,
      gender: "female",
    },
    {
      avatar: "https://i.pinimg.com/736x/b6/20/93/b620935c23bed63e33519251c9d9f0b1.jpg",
      name: "Ali Ahmed",
      appointments: 2,
      mobileNo: "+91-955-555-4751",
      email: "aliahmed@example.com",
      age: 42,
      gender: "male",
    },
    {
      avatar: "https://www.shutterstock.com/shutterstock/photos/1488689741/display_1500/stock-photo-handsome-young-male-doctor-with-medical-hospital-uniform-is-taking-care-beautiful-female-patient-1488689741.jpg",
      name: "Nadia Hassan",
      appointments: 3,
      mobileNo: "+91-955-555-4751",
      email: "nadiaahassan@example.com",
      age: 29,
      gender: "female",
    },
    {
      avatar: "https://previews.123rf.com/images/macniak/macniak1810/macniak181000281/111014557-female-doctor-taking-care-of-patient-in-hospital.jpg",
      name: "Mazen Saleh",
      appointments: 1,
      mobileNo: "+91-955-555-4751",
      email: "mazensaleh@example.com",
      age: 37,
      gender: "male",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const exportData = useFetch(
    `${process.env.REACT_APP_GET_PATIENT}`
  );

  const rowss = exportData?.data
  console.log("row123", rowss?.data?.data)

  const dataaa = rowss?.data?.map(m=>([m?.id, m?.user?.first_name, m?.user?.profile_pic === ''? 'Not Uploaded' : process.env.REACT_APP_IMAGE_URL + m?.user?.profile_pic , m?.kwd_id , m?.user?.contact , m?.user?.email , m?.user.age, m?.user?.gender === 1 ? 'Male' : m?.user?.gender === 0 ? "Female" : 'Other' ])) ||[]

  const csvData = [
    ["ID", "Patient Name", "Pic", "KWD ID", "Mobile Number", "Email", "Age", "Gender"],
   ...dataaa
  ];

  return (
    <>
      <div className="row pl-3 pr-2 pt-4 allpatient-tab">
        {/* <div className="col-12">
          <p className="mb-0 allpatient-heading">Patients List</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-9">
              <BreadCrum
                firstLink="/patients"
                firstText="PATIENTS"
                secondText="ALL PATIENTS"
              />
            </div>
            <div className="col-lg-3 col-12 mt-lg-0 mt-3 d-flex justify-content-center justify-content-md-end ">
              {" "}
              <button className="btn-add-new-doc w-75">
                <Link className="add-doc-link-color" to="/patients/add">
                  {" "}
                  Add Patients{" "}
                </Link>
              </button>{" "}
            </div>
          </div>
          <div className="row m-0 p-0">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
          </div>
        </div> */}

        <div className="col-12 ">
          <ListHeader mainHeading='PATIENTS' placeholder='Search Title' btnText='Add PATIENTS' linkbtn='/patients/add' linkBreadCrum='/patients' blinkBreadCrumText='PATIENTS LIST' csvData={csvData} disabled={exportData?.isLoading} exportFileName='Patients_list' />
        </div>

        <div className="col-12 mb-5 pb-5">
          <DataTable rows={rows} searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
};

export default AllPatients;
