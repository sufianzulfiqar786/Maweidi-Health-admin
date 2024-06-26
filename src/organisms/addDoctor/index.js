import React, { useMemo } from "react";
import { useState } from "react";
import useFetch from "../../customHook/useFetch";
import usePost from "../../customHook/usePost";
import { useEffect } from "react";
import Phone from "../../atoms/phone";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import CustomDropDownMulti from "../../atoms/CustomDropDown/CustomDropDownMulti";
import { optionSpecialization } from "../../Data/DoctorData";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import IncreDecreBtn from "../../components/doctors/IncreDecreBtn";

// img png
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import TwitterInput from "../../assets/images/doctor/Twitter.png";
import WebInput from "../../assets/images/doctor/website.png";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import TimeTable from "../../components/doctors/TimeTable";
// scss
import "../../assets/css/doctor.scss";
import { Controller, useForm } from "react-hook-form";
import ButtonLoader from "../../atoms/buttonLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../../atoms/toastMessage";
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";

// img svg
// import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import DocRoleCrossIcon from "../../assets/images/doctor/DocRoleCrossIcon.svg";

import ConsutancyFee from "../../components/doctors/ConsutancyFee";
import AddRole from "../../pages/Role/AddRole";
const DoctorForm = ({ id, rawData, handleAddItem, items, handleRemoveItem }) => {
  const [errorData, setErrorData] = useState(0);
  const [addRole, setAddRole] = useState({ country: "Kuwait" })
  const [roleParentValidation, setRoleParentValidation] = useState(false);
  const [roleCategoryId, setRoleCategoryId] = useState("");
  const [formDataState, setFormDataState] = useState({});
  const [hospitalOption, setHospitalOption] = useState([]);
  const [image, setImage] = useState(null);
  const [showDoctorFee, setShowDoctorFee] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const [selectdedHospital, setSelectdedHospital] = useState("");
  const navigate = useNavigate();
  const realHospitalData = useFetch(process.env.REACT_APP_GET_HOSPITAL_DATA);
  const lang = useFetch(process.env.REACT_APP_GET_LANGUAGES);
  const specializationData = useSelector(
    (state) => state.specialization.specializationData
  );

  const { data, isLoading, error, postData } = usePost();
  const AddRoleHook = usePost()

  const language = useMemo(() => {
    return lang?.data?.data?.map((l) => ({ label: l.name, value: l.id }));
  }, [lang]);
  const specialization = useMemo(() => {
    return specializationData?.data?.map((l) => ({
      label: l.name,
      value: l.id,
    }));
  }, [specializationData]);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

console.log("formDataStatewqwe", formDataState?.hospitals?.length)

  useEffect(() => {
    if (realHospitalData?.data?.data?.length > 0) {
      const opt =
        realHospitalData?.data?.data &&
        realHospitalData?.data?.data?.map((val) => ({
          label: val?.name,
          value: val?.id,
        }));
      setHospitalOption(opt);
    }
  }, [realHospitalData?.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDataState({ ...formDataState, [name]: value });
  };

  console.log("formDataStateqwe", formDataState)

  const handleSelect = (value, name) => {
    setFormDataState({ ...formDataState, [name]: value });
    if (name === "hospitals") {
      const opt = hospitalOption?.filter((hospital) =>
        value.includes(hospital.value)
      );

      // If setSelectdedHospital comes as a prop, use it to update the state
      if (typeof setSelectdedHospital === "function") {
        setSelectdedHospital(opt);
      }
    }
  };

  const onSubmit = () => {
    const formData = new FormData();

    const propertiesToRemove = [
      "id",
      "name",
      "email_verified_at",
      "age",
      "longitude",
      "longitude",
      "device_token",
      "user_type",
      "session_id",
      "updated_at",
      "created_at",
      "",
    ];

    for (const property of propertiesToRemove) {
      delete formDataState[property];
    }
    for (const key in formDataState) {
      if (
        (key === "hospitals" || key === "languages") &&
        Array.isArray(formDataState[key])
      ) {
        formDataState[key].forEach((value) => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, formDataState[key]);
      }
    }
    if (!formDataState?.profile_pic) {
      setErrorData(4);
    } 
    // else if(!formDataState?.experience_years){
    //   setErrorData(44);
    // } 
    else {
      postData(
        id
          ? `${process.env.REACT_APP_UODATE_DOCTORS}/${id}`
          : `${process.env.REACT_APP_ADD_DOCTORS}`,
        formData,
        (res) => {

          console.log("ressss", res?.data?.user_id)
          setRoleCategoryId(res?.data?.id)
          // setAddRole({...addRole, 'join_id':res?.data?.id})

          if (items?.length) {

            if (
              addRole?.name &&
              addRole?.email &&
              addRole?.password &&
              addRole?.role_type &&
              addRole?.role_type_id
            ) {
              console.log("res?.data?.id", res?.data?.id)
              setAddRole({ ...addRole, 'join_id': res?.data?.id })
              // alert('sdf', res?.data?.id)

              const updateRoleData = {
                ...addRole,
                join_id: res?.data?.id,
              }

              const formData = new FormData();
              for (const key in updateRoleData) {
                if (Array.isArray(updateRoleData[key])) {
                  updateRoleData[key].forEach((value) => {
                    formData.append(`${key}[]`, value);
                  });
                } else {
                  formData.append(key, updateRoleData[key]);
                }
              }

              AddRoleHook?.postData((`${process.env.REACT_APP_ADD_ROLE}`), formData, (response) => {

                console.log("tokenwww", response)
                navigate("/doctors");
                // alert('sdf')
                if (response?.success === true) {
                  navigate("/doctors");
                  CustomToast({
                    type: "success",
                    message: `Role added successfully`,
                  })
                  
                }
                
                // else {
                //     CustomToast({
                //         type: "error",
                //         message: `${response?.message?.role_type ? response?.message?.role_type[0] :response?.message}`,
                //     })
                // }
              })
            } else {
              setRoleParentValidation(true)
              CustomToast({
                type: "error",
                message: `Name, Email, Password, Role Type is Required for adding the Role`,
              })
            }

          }

console.log("resdoc", res)
if(res?.success === true){
  CustomToast({
    type: "success",
    message: "Doctor saved successfuly!",
  })
  setRoleParentValidation(true)
  if (!items?.length) {
    navigate("/doctors");
  }
}else{
  CustomToast({
    type: "error",
    message: "Doctor not saved!",
  })
}
          
         
        }
      );
    }
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
      setFormDataState({ ...formDataState, profile_pic: file });
      setImage(URL.createObjectURL(file));
    };
    input.click();
  };

  const role =JSON.parse(localStorage.getItem("userRoles"))
  const allowedhost = Object.keys(role).includes("hospitaladmin")
  const allowedlab = Object.keys(role).includes("technologist")
  const allowedphar = Object.keys(role).includes("pharmacist")
  const isSuperAdmin = Object.keys(role).length === 0 

  useEffect(() => {
    if (id && rawData) {
      const nameParts = rawData?.user?.name.split(" ");
      setFormDataState({
        ...formDataState,
        profile_pic: `${process.env.REACT_APP_IMAGE_URL}/${rawData?.user?.profile_pic}`,
      });
      setImage(
        `${process.env.REACT_APP_IMAGE_URL}/${rawData?.user?.profile_pic}`
      );
      setFormDataState({
        ...formDataState,
        ...rawData?.user,
        first_name: nameParts[0],
        last_name: nameParts[1],
        experience_years: rawData?.experience_years,
        facebook: rawData?.facebook,
        linkedin: rawData?.linkedin,
        instagram: rawData?.instagram,
        certificate: rawData?.certificate,
        about: rawData?.about,
        specialization_id: rawData?.specialization_id,
        council_registration_no: rawData?.council_registration_no,
        languages: rawData?.user?.languages?.map((language) => language?.id),
        hospitals: rawData?.hospitals?.map((hospital) => hospital?.id),
      });

      Object.entries(rawData?.user).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
      setValue("first_name", nameParts[0]);
      setValue("qualification", rawData?.qualification);
      setValue("last_name", nameParts[1]);
      setValue("specialization_id", rawData?.specialization_id);
      setValue("council_registration_no", rawData?.council_registration_no);
      setValue("gender", rawData?.user?.gender === 1 ? "Male" : "Female");
      setValue(
        "hospitals",
        rawData?.hospitals?.map((hospital) => hospital?.id)
      );
      setValue(
        "languages",
        rawData?.user?.languages?.map((language) => language?.id)
      );
    }
  }, [id, rawData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row px-2">
          <div className="col-md-12 pt-2 d-flex align-items-center doc-cam">
            <div
              className="mt-4 mb-md-4 mb-0 d-flex align-items-center justify-content- 
               center 
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
                <div className="d-flex text-center justify-content-center w-100">
                  <img src={CameraIcon} alt="upload" />
                </div>
              )}
            </div>

            <span className="pl-4 ml-2 doc-cam-text">Profile Picture</span>
          </div>

          <div className="col-12" style={{ marginTop: "-20px" }}>
            {errorData === 1 || errorData === 4 ? (
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
                <p className="mb-2">First Name<span className="text-danger">*</span></p>
                <Controller
                  name="first_name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="first_name"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(e);
                        }}
                      />

                      {errors.first_name && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Last Name<span className="text-danger">*</span> </p>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="last_name"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(e);
                        }}
                      />

                      {errors.last_name && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-6 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Email<span className="text-danger">*</span> </p>

                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  }}
                  render={({ field }) => (
                    <input
                      className=""
                      type="text"
                      name="email"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e);
                      }}
                    />
                  )}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="error-message">This field is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="error-message">Invalid email address</span>
                )}
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <Controller
                  name="contact"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <Phone
                        name="contact"
                        field={field}
                        value={field.value}
                        handleChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
                        }}
                      />
                      {errors.contact && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-6 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Customer Support Email </p>

                <Controller
                  name="customer_email"
                  control={control}
                  rules={{
                    required: false,
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  }}
                  render={({ field }) => (
                    <input
                      className=""
                      type="text"
                      name="customer_email"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e);
                      }}
                    />
                  )}
                />
                {errors.customer_email &&
                  errors.customer_email.type === "required" && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                {errors.customer_email &&
                  errors.customer_email.type === "pattern" && (
                    <span className="error-message">Invalid email address</span>
                  )}
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <Controller
                  name="customer_phone"
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field }) => (
                    <>
                      <Phone
                        label="Customer Support No"
                        name="customer_phone"
                        field={field}
                        value={field.value}
                        handleChange={(e) => {
                          field.onChange(e);
                          handleChange(e);
                        }}
                      />
                      {errors.customer_phone && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-6 mt-lg-0 mt-4 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Gender<span className="text-danger">*</span> </p>
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <CustomDropDown
                        handleChangeSelect={(value, name) => {
                          field.onChange(value);
                          handleSelect(value, name);
                        }}
                        option={[
                          {
                            label: "Male​​",
                            value: "1",
                          },
                          {
                            label: "Female",
                            value: "0",
                          },
                        ]}
                        name="gender"
                        field={field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />

                      {errors.gender && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Hospital<span className="text-danger">*</span> </p>
                <Controller
                  name="hospitals"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <CustomDropDownMulti
                        handleChangeSelect={(value, name) => {
                          field.onChange(value);
                          handleSelect(value, name);
                        }}
                        option={hospitalOption || []}
                        name="hospitals"
                        mode="multiple"
                        field={field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />

                      {errors.hospitals && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-4 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Specialization<span className="text-danger">*</span> </p>
                <Controller
                  name="specialization_id"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <CustomDropDown
                        handleChangeSelect={(value, name) => {
                          field.onChange(value);
                          handleSelect(value, name);
                        }}
                        option={specialization || []}
                        name="specialization_id"
                        field={field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />

                      {errors.specialization_id && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col-lg-4 pr-lg-1 mt-lg-0 mt-3 doc-setting-input">
                <p className="mb-2"> Qualification<span className="text-danger">*</span> </p>
                <Controller
                  name="qualification"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="qualification"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(e);
                        }}
                      />

                      {errors.qualification && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="col-lg-4 mt-lg-0 mt-3 pl-lg-1 doc-setting-input ">
                <p className="mb-2">Experience in years </p>
                <IncreDecreBtn
                  formDataState={formDataState}
                  setFormDataState={setFormDataState}
                />
                {/* { errorData === 44 ? (
              <span className="error-message">
                This field is required
              </span>
            ) : (
              ""
            )} */}
              </div>
            </div>

            <div className="row mt-3">
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

            <div className="row mt-3">
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

            <div className="row mt-3">
              <div className="col-lg-6 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Twitter </p>
                <div className="d-flex  ">
                  <img className="" src={TwitterInput} alt="" />
                  <input
                    className="add-doc-social-input"
                    type="text"
                    placeholder="Username"
                    name="twitter"
                    value={formDataState.twitter}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Website URL </p>
                <div className="d-flex">
                  <img className="" src={WebInput} alt="" />
                  <Controller
                    name="website"
                    control={control}
                    rules={{
                      required: false,
                      pattern:
                        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.([a-zA-Z]{2,})(:[0-9]+)?([a-zA-Z0-9\/?=_-]*)$/,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          className="add-doc-social-input"
                          type="text"
                          placeholder="Enter Web URL"
                          {...field}
                        />
                        {errors.website && (
                          <span className="error-message">
                            Invalid website URL
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-6 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Certificates </p>
                <UploadFile
                  formDataState={formDataState}
                  setFormDataState={setFormDataState}
                />
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Language<span className="text-danger">*</span> </p>
                <Controller
                  name="languages"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <CustomDropDownMulti
                        handleChangeSelect={(value, name) => {
                          field.onChange(value);
                          handleSelect(value, name);
                        }}
                        option={language || []}
                        name="languages"
                        mode="multiple"
                        field={field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />

                      {errors.languages && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="col-lg-12 mt-3 pr-lg-1 doc-setting-input">
                <p className="mb-2"> About Doctor </p>
                <textarea
                  name="about"
                  value={formDataState.about}
                  onChange={handleChange}
                  cols="30"
                  rows="7"
                  placeholder=""
                />
              </div>
              <div className="col-12 py-4 d-flex align-items-center ">
                {!showDoctorFee ? (
                  <div onClick={() => setShowDoctorFee(true)} className="ml-3">
                    <img className="cursor-pointer" src={AddRoleIcon} alt="" />{" "}
                    <span className="cursor-pointer add-doc-role pl-3 ">
                      Set Consultancy Fee
                    </span>
                  </div>
                ) : (
                  <ConsutancyFee
                    setShowDoctorFee={setShowDoctorFee}
                    setFeeData={setFeeData}
                    feeData={feeData}
                    id={id}
                    selectdedHospital={selectdedHospital}
                  />
                )}
              </div>
            </div>





          { isSuperAdmin ?  <div className="row mb-5 py-lg-3">
              {items?.map((item, index) => {
                return (
                  <>
                    <div className={`col-lg-12 mt-lg-0 mt-4 pb-lg-3 `}>
                      <div className="row mx-0  add-doc-left-col">
                        <div className="col-12 px-4  py-3 my-1 ">
                          <div className=" d-flex justify-content-between align-items-center ">
                            <p className="mb-0  add-doc-role-text">Add a Role </p>
                            <img
                              onClick={() => {
                                handleRemoveItem(index);
                              }}
                              src={DocRoleCrossIcon}
                              alt=""
                            />
                          </div>
                        </div>

                        <div
                          className="border-top pt-3"
                          id="scrollableDiv"
                          style={{
                            width: "100%",
                            overflow: "hidden",
                            padding: "0 16px",
                          }}
                        >
                          <AddRole upperData={false} roleParent={[
                            { value: 2, label: "Doctor Admin" }
                          ]}
                          setAddRole={setAddRole} addRole={addRole}
                                roleParentValidation={roleParentValidation}
                                roleCategoryId={roleCategoryId}
                                navigateLink='doctor'
                          />
                          {
                            console.log("roleCategoryIdparent", roleCategoryId)
                          }
                          {/* <div className="col-12 px-2">
                          <div className="row">
                            <div className="col-3 add-doc-role-type">
                              Role Type:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              Doctor
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Email:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              janecoper789@gmail.com
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Phone:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              03451234567
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Role Linked to:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              Civil Hospital
                            </div>
                          </div>

                          <div className="row mt-4 pt-2">
                            <div className="col-lg-12   doc-setting-input doc-setting-input-black">
                              <p className="mb-2 add-doc-role-type-detail">
                                Country{" "}
                              </p>
                              <CustomDropDown
                                selectLabel="Kuwait"
                                option={optionSpecialization}
                              />
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-6 pr-lg-1 doc-setting-input role-input-placeholder">
                              <p className="mb-2 add-doc-role-type-detail">
                                {" "}
                                Contact{" "}
                              </p>
                              <input
                                type="text"
                                placeholder="+91-955-555-4751"
                              />
                            </div>

                            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input doc-setting-input-black">
                              <p className="mb-2 add-doc-role-type-detail">
                                {" "}
                                State{" "}
                              </p>
                              <CustomDropDown
                                selectLabel="Al Jahra"
                                option={optionSpecialization}
                              />
                            </div>
                          </div>

                          <div className="row my-5 pt-2 pb-3 ">
                            <div className="col-lg-6">
                              <button className="apply-filter add-doc-changes">
                                Save Changes
                              </button>
                            </div>

                            <div className="col-lg-6"></div>
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>

                    <div className={`col-4  `}></div>
                  </>
                );
              })}

              {items?.length < 1 ? <div className="col-12 mb-0 py-0 pl-4  d-flex align-items-center "
                style={{ marginLeft: '8px' }}
              >
                <div onClick={handleAddItem}>
                  <img className="cursor-pointer" src={AddRoleIcon} alt="" />{" "}
                  <span className="cursor-pointer add-doc-role pl-3 ">
                    Add a Role
                  </span>
                </div>
              </div> : null}
            </div> : null}






            <div className="row my-5 pt-2 pb-3 ">
              <div className="col-lg-6">
                <button
                  className="apply-filter add-doc-changes"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ButtonLoader />
                  ) : (
                    <>{id ? "Update" : "Add"} Doctor</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
