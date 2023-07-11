import React from "react";
import "../../../assets/css/patients/patientprofile/medicalhistoryform.scss";
import { DatePicker } from "antd";
import CustomSelect from "./../../common/CustomSelect";

const MedicalHistoryForm = () => {
  return (
    <div className="medical-history-wrapper">
      <div className="title">Medical History</div>
      <form className="medical-history-form">
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label>Current Diseases</label>
            <input type="text" />
          </div>
          <div class="form-group col-lg-6">
            <label>Family Diseases</label>
            <input type="text" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label>History of Surgeries</label>
            <input type="text" />
          </div>
          <div class="form-group col-lg-6">
            <label>Family Members</label>
            <input type="text" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Medical Reports</label>
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;
