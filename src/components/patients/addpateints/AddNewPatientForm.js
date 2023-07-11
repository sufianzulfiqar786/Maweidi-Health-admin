import { useState, useRef } from "react";
import camera from "../../../assets/images/common/camera.svg";
import CustomSelect from "../../common/CustomSelect";
import "../../../assets/css/patients/addpatients/addnewpatientform.scss";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
import Location from "../../../atoms/Location/Location";
import { optionHostpital } from "../../../Data/DoctorData";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";
import GoogleMap from "../../common/GoogleMap";

const AddNewPatient = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [dropdownValueChange, setDropdownValueChange] =
    useState("Adan Hospital");
  const [showMap, setShowMap] = useState(false);
  const [locationProp, setLocationProp] = useState("");


  const handleLocationIconClick = () => {
    !showMap ? setShowMap(true): setShowMap(false)
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeSelect = (value) => {
    setDropdownValueChange(value);
  };
  const gender = [
    {
      value: "Male",
      value: "Male",
    },
    {
      value: "Female",
      value: "Female",
    },
    {
      value: "Other",
      value: "Other",
    },
  ];

  return (
    <div className="add-new-patient-form-wrapper">
      <div className="add-profile">
        <div className="image-uploader">
          <div className="left">
            <div className="image-preview">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <img src={camera} onClick={handleUploadClick} />
              )}
            </div>
            <div>Profile Picture</div>
          </div>
          <div className="right">
            <div className="upload-text" onClick={handleUploadClick}>
              Upload Image
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      <form className="add-new-patient-form">
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
            <label for="visit-date-input">Visit Date</label>
            <div className="border" style={{ borderRadius: "5px" }}>
              <DatePicker
                size="large"
                style={{ width: "100%", border: "none" }}
              />
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label>Visit Time</label>
            <div className="border" style={{ borderRadius: "5px" }}>
              <TimePicker
                size="large"
                style={{ width: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Age</label>
            <input type="text" id="age-input" name="age" />
          </div>
          <div class="form-group col-lg-6">
            <label>Gender</label>
            <CustomSelect options={gender} />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="phone-number-input">Phone Number</label>
            <input
              type="text"
              id="phone-number-input"
              name="phone-number-input"
            />
          </div>
          <div class="form-group col-lg-6">
            <label for="email-input">Email</label>
            <input type="email" id="email-input" name="email-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="patient-id-input">Patient ID no </label>
            <input type="text" id="patient-id-input" name="patient-id" />
          </div>
          <div class="form-group col-lg-6">
            <label for="kuwait-no-location-input">Kuwait ID no </label>
            <input
              type="text"
              id="kuwait-no-location-input"
              name="kuwait-no-location"
            />
          </div>
        </div>
       
        <div class="form-row">
        <div class="form-group col-lg-6">
        <label for="Location">Hospital</label>
            <CustomDropDown
              selectLabel="Adan Hospital"
              option={optionHostpital}
              handleChangeSelect={handleChangeSelect}
            />
          </div>
          <div class="form-group col-lg-6">
            <label for="Location">Address</label>
            <Location handleLocation={handleLocationIconClick} locationProp={locationProp}/>
                  {showMap && (
                    <GoogleMap locationProp = {locationProp} setLocationProp={setLocationProp}/>
                  )}
          </div>
        </div>

        <button type="button" className="add-patient">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddNewPatient;
