import React from 'react'
import { useState } from 'react';
import useFetch from '../../customHook/useFetch';
import usePost from '../../customHook/usePost';
import { useEffect } from 'react';
import Phone from '../../atoms/phone';
import CustomDropDown from '../../atoms/CustomDropDown/Index';
import { language, optionSpecialization } from '../../Data/DoctorData';
import UploadFile from '../../molecules/UploadFile/UploadFile';
import IncreDecreBtn from '../../components/doctors/IncreDecreBtn';

// img png
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import TimeTable from '../../components/doctors/TimeTable';
// scss
import '../../assets/css/doctor.scss'

const DoctorForm = ({ id = null }) => {


  const [errorData, setErrorData] = useState(0);
  const [formDataState, setFormDataState] = useState({});
  const [hospitalOption, setHospitalOption] = useState([]);

  const realHospitalData = useFetch(process.env.REACT_APP_GET_HOSPITAL_DATA);
  const { data, isLoading, error, postData } = usePost();
  useEffect(() => {
    if (realHospitalData?.data?.data?.length > 0) {
      const opt =
        realHospitalData?.data?.data &&
        realHospitalData?.data?.data.map((val) => ({
          label: val?.name,
          value: val?.id,
        }));
      setHospitalOption(opt);
    }
  }, [realHospitalData?.data]);

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
    console.log("formDataState", formDataState);
  };

  const handleSelect = (value, name) => {
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (const key in formDataState) {
      formData.append(key, formDataState[key]);
    }
    postData(`${process.env.REACT_APP_ADD_DOCTORS}`, formData, () => { });
  };



  const handleDoctorImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        setErrorData(0);
        return;
      }
      const fileType = file.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        setErrorData(1);
        return;
      } else {
        setErrorData(0);
      }
      setFormDataState({ ...formDataState, profile_image: file });
      setImage(URL.createObjectURL(file));
    };
    input.click();
  };


  return (
    <>

      <div className="col-md-12 pt-2 d-flex align-items-center doc-cam">
        <div
          className="mt-4 mb-md-4 mb-0 d-flex align-items-center justify-content-center 
        add-doc-camera-upload cursor-pointer"
          onClick={handleDoctorImageClick}
        >
          {image ? (
            <img
              className="add-doc-camera-upload-1st "
              src={image}
              alt="Uploaded image"
            />
          ) : (
            <img src={CameraIcon} alt="" />
          )}
        </div>

        <span className="pl-4 ml-2 doc-cam-text">
          Profile Picture
        </span>
      </div>

      <div className="col-12" style={{ marginTop: "-20px" }}>
        {errorData === 1 ? (
          <span className="error-message">
            Please select a valid image file (JPEG or PNG)
          </span>
        ) : (
          ""
        )}
      </div>

      <div className="col-12 mt-3">
        <div className="row">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2">First Name</p>
            <input
              type="text"
              name="first_name"
              value={formDataState?.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
            <p className="mb-2"> Last Name </p>
            <input
              type="text"
              name="last_name"
              value={formDataState?.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Email </p>
            <input
              className=""
              type="email"
              name="email"
              value={formDataState?.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
            <Phone
              handleChange={handleSelect}
              name="contact"
              value={formDataState?.phone}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 mt-lg-0 mt-4 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Gender </p>
            <CustomDropDown
              handleChangeSelect={handleSelect}
              name="gender"
              option={[
                {
                  label: "Male​​",
                  value: "Male​​",
                },
                {
                  label: "Female",
                  value: "Female",
                },
              ]}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
            <p className="mb-2"> Hospital </p>
            <CustomDropDown
              handleChangeSelect={handleSelect}
              option={hospitalOption}
              name="hospital"
              mode="multiple"
              value={formDataState?.hospital}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Specialization </p>
            <CustomDropDown
              selectLabel="Select"
              option={optionSpecialization}
              handleChange={handleSelect}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
            <p className="mb-2">Experience in years </p>
            <IncreDecreBtn
              formDataState={formDataState}
              setFormDataState={setFormDataState}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Council Registration no </p>
            <input
              type="text"
              name="council_registration_no"
              value={formDataState?.council_registration_no}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
            <p className="mb-2"> Facebook </p>
            <div className="d-flex  ">
              <img className="" src={FacebookInput} alt="" />
              <input
                className="add-doc-social-input"
                type="text"
                placeholder="Username"
                name="facebook"
                value={formDataState.facebook}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Instagram </p>
            <div className="d-flex  ">
              <img className="" src={InstaInput} alt="" />
              <input
                className="add-doc-social-input"
                type="text"
                placeholder="Username"
                name="instagram"
                value={formDataState.instagram}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
            <p className="mb-2"> Linkedin </p>
            <div className="d-flex  ">
              <img className="" src={LinkedInInput} alt="" />
              <input
                className="add-doc-social-input"
                type="text"
                name="linkedin"
                value={formDataState.linkedin}
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 pr-lg-1 doc-setting-input">
            <p className="mb-2"> Certificates </p>
            <UploadFile
              formDataState={formDataState}
              setFormDataState={setFormDataState}
            />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
            <p className="mb-2"> Language </p>
            <CustomDropDown
              handleChangeSelect={handleSelect}
              name="language"
              option={language}
              mode="multiple"
            />
          </div>
        </div>
        <TimeTable />
      
        <div className="row my-5 pt-2 pb-3 ">
          <div className="col-lg-6">
            <button
              className="apply-filter add-doc-changes"
              onClick={handleSubmit}
            >
              {id ? 'Update' : 'Add'} Doctor
            </button>
          </div>
          
          <div className="col-lg-6"></div>
        </div>
      </div>
    </>
  )
}

export default DoctorForm