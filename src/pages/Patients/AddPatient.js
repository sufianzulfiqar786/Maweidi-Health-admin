import Chevron from "../../assets/images/common/chevron-right.svg";
import DoctorsList from "../../components/patients/addpateints/DoctorsList";
import AddAppointmentCard from "./../../components/patients/addpateints/AddAppointmentCard";
import AddNewPatientForm from "../../components/patients/addpateints/AddNewPatientForm";
import "../../assets/css/patients/addpatients/addpatientsheader.scss";

import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import { useState } from "react";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { useEffect } from "react";
import useDeleteData from "../../customHook/useDelete";

const AddPatient = ({ Id }) => {
  const [click, setClick] = useState(true);


  

  return (
    <>
      <div className="row px-3  pt-4 addpatient-tab">
        <div className="col-12">
          <p className="mb-0 addpatient-heading">{Id ? 'Edit' : 'Add'} Patient</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-lg-12 ">
              <BreadCrum
                firstLink="/patients"
                firstText="PATIENTS"
                secondText={Id ? "Edit PATIENTS" : "ADD PATIENTS"}
              />

            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="row  m-0 first-row">
            <div class="col-lg-8 ">
              <div class="left-div">
                <AddNewPatientForm Id={Id} />
              </div>
            </div>
            {/* <div class="col-lg-4 ">
              <div class="right-div">
                <DoctorsList />
              </div>
            </div> */}
          </div>

          {/* <div className="row pb-5 mb-lg-5 m-0 second-row">
            {click ? (
              <div
                className="col-12 mb-5 py-4 d-flex align-items-center"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <img
                  className="cursor-pointer"
                  // onClick={handleAddItem}

                  src={AddRoleIcon}
                  alt=""
                />{" "}
                <span
                  // onClick={handleAddItem}
                  className="cursor-pointer add-doc-role pl-3 "
                >
                  Add an Appointment
                </span>
              </div>
            ) : (
              <div className="col-lg-8">
                <AddAppointmentCard
                  click={click}
                  setClick={(data) => {
                    setClick(data);
                  }}
                />
              </div>
            )}
          </div> */}
          <div className="row">
            <div className="col-lg-12 ml-2">
              {/* <img alt="" /> <span className="">Add a Role</span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
