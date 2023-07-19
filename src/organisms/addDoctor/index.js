import React, { useMemo } from "react";
import { useState } from "react";
import useFetch from "../../customHook/useFetch";
import usePost from "../../customHook/usePost";
import { useEffect } from "react";
import Phone from "../../atoms/phone";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { optionSpecialization } from "../../Data/DoctorData";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import IncreDecreBtn from "../../components/doctors/IncreDecreBtn";

// img png
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";

// scss
import "../../assets/css/doctor.scss";
import { Controller, useForm } from "react-hook-form";
import ButtonLoader from "../../atoms/buttonLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../../atoms/toastMessage";

const DoctorForm = ({ id, rawData }) => {
  const [errorData, setErrorData] = useState(0);
  const [formDataState, setFormDataState] = useState({});
  const [hospitalOption, setHospitalOption] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const realHospitalData = useFetch(process.env.REACT_APP_GET_HOSPITAL_DATA);
  const lang = useFetch(process.env.REACT_APP_GET_LANGUAGES);
  const specializationData = useSelector(
    (state) => state.specialization.specializationData
  );

  const { data, isLoading, error, postData } = usePost();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleSelect = (value, name) => {
    setFormDataState({ ...formDataState, [name]: value });
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

    postData(
      id
        ? `${process.env.REACT_APP_UODATE_DOCTORS}/${id}`
        : `${process.env.REACT_APP_ADD_DOCTORS}`,
      formData,
      () => {
        CustomToast({
          type: "success",
          message: "Doctor Saved Successfuly!",
        });
        navigate("/doctors");
      }
    );
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
        certificate:rawData?.certificate,
        specialization_id:rawData?.specialization_id,
        council_registration_no: rawData?.council_registration_no,
        languages: rawData?.user?.languages?.map((language) => language?.id),
        hospitals: rawData?.hospitals?.map((hospital) => hospital?.id),
      });

      Object.entries(rawData?.user).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
      setValue("first_name", nameParts[0]);
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
    <>
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
                <p className="mb-2"> Last Name </p>
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
                <p className="mb-2"> Email </p>

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
              <div className="col-lg-6 mt-lg-0 mt-4 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Gender </p>
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
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
                    </>
                  )}
                />
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Hospital </p>
                <Controller
                  name="hospitals"
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
              <div className="col-lg-6 pr-lg-1 doc-setting-input">
                <p className="mb-2"> Specialization </p>
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

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                <p className="mb-2">Experience in years </p>
                <IncreDecreBtn
                  formDataState={formDataState}
                  setFormDataState={setFormDataState}
                />
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
                <p className="mb-2"> Certificates </p>
                <UploadFile
                  formDataState={formDataState}
                  setFormDataState={setFormDataState}
                />
              </div>

              <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                <p className="mb-2"> Language </p>
                <Controller
                  name="languages"
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
            </div>

            <div className="row my-5 pt-2 pb-3 ">
              <div className="col-lg-6">
                <button
                  className="apply-filter add-doc-changes"
                  onClick={handleSubmit}
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
    </>
  );
};

export default DoctorForm;
