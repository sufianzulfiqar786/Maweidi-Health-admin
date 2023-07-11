import { DatePicker } from "antd";
import { TimePicker } from "antd";
import CustomSelect from "../../common/CustomSelect";
import "../../../assets/css/patients/patientprofile/profilesetting.scss";
import { gender, optionSpecialization } from "../../../Data/DoctorData";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";

const ProfileSetting = () => {
  return (
    <div className="personal-information-wrapper">
      <div className="title">Personal Information</div>
      <form className="personal-information-form">
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="first-name-input">First Name</label>
            <input type="text" id="first-name-input" name="first-name" />
          </div>
          <div class="form-group col-lg-6">
            <label for="last-name-input">Last Name</label>
            <input type="text" id="last-name-input" name="last-name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="visit-date-input">Date</label>
            <div className="border" style={{borderRadius:"5px"}}>
            <DatePicker size="large" style={{ border:"none", width: "100%" }} />
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label>Phone No</label>
            <input type="number" id="phone-input" name="phone" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Departments</label>
            <CustomDropDown selectLabel='Select' option={optionSpecialization} />
          </div>                   

          <div class="form-group col-lg-6">
            <label>Gender</label>
            <CustomDropDown selectLabel='Select' option={gender} />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Patient ID no</label>
            <input
              type="text"
              id="patient-id-input"
              name="patient-id-input"
            />
            <span className='auto-gen-patient-id'>Auto generated patient ID no.</span>
          </div>
          
        </div>

        <button type="button" className="add-patient">
        Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSetting;
