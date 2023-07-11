import React, { useState } from "react";
import Chevron from "../../../assets/images/common/chevron-right.svg";
import "../../../assets/css/patients/patientprofile/patientprofile.scss";
import Profile from "../../../components/patients/patientprofile/Profile";
import ProfileOverview from "../../../components/patients/patientprofile/ProfileOverview";
import MedicalHistoryForm from "../../../components/patients/patientprofile/MedicalHistoryForm";
import ProfileSetting from "./../../../components/patients/patientprofile/ProfileSetting";
import ChangePasswordForm from "./../../../components/patients/patientprofile/ChangePasswordForm";

const PatientProfile = () => {
  const [profileActive, setProfileActive] = useState(true);
  const [settingsActive, setSettingsActive] = useState(false);

  return (
    <div className="row px-3 mb-lg-5 mb-4 pb-5 pt-4 patientprofile-tab">
      <div className="col-12">
        <p className="mb-0 patientprofile-heading">Profile</p>
      </div>

      <div className="col-12 my-4">
        <div className="row ">
          <div className="col-lg-12 ">
            <p className="patientprofile-breadcrumb">
              <span>DASHBOARD</span>
              <img src={Chevron} />
              <span className="current-tab">ALL PATIENTS</span>
            </p>
          </div>
        </div>
      </div>

      <div class="wrapper">
        {/* Profile Form */}
        <div class="row  m-0 first-row">
          <div class="col-lg-8 ">
            <div class="left-div">
              <div className="tabs">
                <button
                  onClick={() => {
                    setProfileActive(true);
                    setSettingsActive(false);
                  }}
                  style={{
                    background: profileActive
                      ? "white"
                      : "linear-gradient(323.79deg, #125A77 35.68%, #397D99 92.17%)",
                    color: profileActive ? "#193F52" : "white",
                    borderTopLeftRadius: "6px",
                  }}
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setProfileActive(false);
                    setSettingsActive(true);
                  }}
                  style={{
                    background: settingsActive
                      ? "white"
                      : "linear-gradient(323.79deg, #125A77 35.68%, #397D99 92.17%)",
                    color: settingsActive ? "#193F52" : "white",
                    borderTopRightRadius: "6px",
                  }}
                >
                  Profile Settings
                </button>
              </div>
              <div className="tabs-body">
                {profileActive ? <Profile /> : <ProfileSetting />}
              </div>
            </div>
          </div>
          <div class="col-lg-4 ">
            <div class="right-div">
              <ProfileOverview />
            </div>
          </div>
        </div>

        {/* Medical History Form */}
        {settingsActive ? (
          <div class="row  m-0 first-row">
            <div class="col-lg-8 ">
              <MedicalHistoryForm />
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Change Password form */}
        {settingsActive ? (
          <div class="row  m-0 first-row">
            <div class="col-lg-8 ">
              <ChangePasswordForm />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
