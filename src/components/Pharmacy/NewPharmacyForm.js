import React, { useState, useEffect } from "react";
import SelectCountry from "../../atoms/Country";
import SelectState from "../../atoms/State";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import Phone from "../../atoms/phone";
import { Controller, useForm } from "react-hook-form";
import ButtonLoader from "../../atoms/buttonLoader";
import usePost from "../../customHook/usePost";
import { CustomToast } from "../../atoms/toastMessage";
import Location from "../../atoms/Location/Location.js";
import GoogleMap from "../common/GoogleMap.js";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import useDeleteData from "../../customHook/useDelete";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import { Modal } from "antd";
import TimeModal from "../TimeTable/TimeModal";
const TimePicker = ({ label, name, value, onChange }) => {
  return (
    <div className="d-inline-flex time-picker time-picker-Pharmacy py-1 px-2">
      <input
        className="pl-1"
        type="time"
        name={name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        min="00:00"
        max="23:59"
        step="60"
        timeFormat="HH:mm"
      />
    </div>
  );
};

const NewPharmacyForm = ({
  Id,
  lastTextBoxTitle = "About Pharmacy",
  submitButtonText = "Add Pharmacy",
  submitUpdateText = "Update Pharmacy",
  apiEndpoint = process.env.REACT_APP_ADD_PHARMACY_DATA,
  customToastMessage = "Pharmacy Added Successfully",
}) => {
  const [errorData, setErrorData] = useState(0);
  const [errorMessage, setErrorMessage] = useState(0);
  const [addPharmacyData, setAddPharmacyData] = useState("");
  const [image, setImage] = useState(null);
  const [nameData, setNameData] = useState("");
  const [formDataState, setFormDataState] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [locationProp, setLocationProp] = useState("");
  const customData = useDeleteData();
  const [documentFile, setDocumentFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addTimePostReq, setaddTimePostReq] = useState({
    doctor_id: 131,
    schedules: [{}],
  });

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

      // Set the image state to the source of the uploaded picture
      setImage(URL.createObjectURL(file));
      setAddPharmacyData({
        ...addPharmacyData,
        profile_picture: file,
      });
    };
    input.click();
  };

  const handleModalToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChangeSelect = (value, name) => {
    setAddPharmacyData({ ...addPharmacyData, [name]: value });
  };

  const formatTimeTo24Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const parsedTime = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    const formattedTime = parsedTime.toTimeString().slice(0, 5);

    return formattedTime;
  };

  const handleChangePharmacy = (e) => {
    const { name, value } = e.target;
    if (name === "start_time" || name === "end_time") {
      setAddPharmacyData((prevData) => ({
        ...prevData,
        [name]: formatTimeTo24Hour(value),
      }));
    } else {
      setAddPharmacyData({ ...addPharmacyData, [name]: value });
    }
  };
  const handleLocationIconClick = () => {
    !showMap ? setShowMap(true) : setShowMap(false);
  };

  const postDoctorAvalibility = () => {
    postData(
      `${process.env.REACT_APP_SET_DOCTOR_AVaAILABILITY}`,
      addTimePostReq
    );
  };

  const { data, isLoading, error, postData } = usePost();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (Id) {
      customData.deleteData(
        `${process.env.REACT_APP_DELETE_HOSPITAL_DETAIL}/${Id}`,
        (val) => {
          console.log("value", val?.data);
          setAddPharmacyData({
            ...val?.data,
            email: val?.data?.email?.map((l) => l.id),
          });
          Object.entries(val?.data).forEach(([fieldName, fieldValue]) => {
            setValue(fieldName, fieldValue);
          });
          setValue(
            "email",
            val?.data?.email?.map((l) => l.id)
          );
        }
      );
    }
  }, [Id]);

  const validation = () => {
    if (!addPharmacyData.profile_picture) {
      setErrorMessage(-1);
    } else if (!addPharmacyData.zip) {
      setErrorMessage(8);
    }
    // else if (!locationProp) {
    //     setErrorMessage(9)
    // }
    else {
      setErrorMessage("No Error");
    }
  };
  console.log(formDataState?.certificate);
  const handleFormSubmit = (formData) => {
    validation();
    if (errorMessage === "No Error") {
      console.log("Form Data:", formData);
      const FarmData = new FormData();

      const completeFormData = {
        ...formData,
        profile_picture: addPharmacyData.profile_picture,
        state: addPharmacyData.state,
        facebook: addPharmacyData.facebook,
        instagram: addPharmacyData.instagram,
        linkedin: addPharmacyData.linkedin,
        description: addPharmacyData.description,
        document: formDataState?.certificate,
      };
      Object.keys(completeFormData).map((ey) =>
        FarmData.append(ey, completeFormData[ey])
      );
      postData(apiEndpoint, FarmData, () => {
        CustomToast({
          type: "success",
          message: customToastMessage,
        });
        setAddPharmacyData("");
        reset();
        setImage("");
        setDocumentFile(null);
      });
    }
  };
  const handleChange = (name, value) => {
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };
  console.log(formDataState);
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="col-md-6 pt-2 d-flex align-items-center doc-cam">
          <div
            className="mt-4 mb-md-4 mb-0 d-flex align-items-center justify-content-center add-doc-camera-upload cursor-pointer"
            onClick={handleDoctorImageClick}
          >
            {image ? (
              <img
                className="add-doc-camera-upload-1st"
                src={image}
                alt="Uploaded image"
              />
            ) : addPharmacyData.profile_picture ? (
              <div className="add-doc-camera-upload">
                <img
                  className="w-100 h-100 add-doc-camera-upload-1st"
                  src={
                    process.env.REACT_APP_IMAGE_URL +
                    addPharmacyData.profile_picture
                  }
                  alt=""
                />
              </div>
            ) : (
              <img src={CameraIcon} alt="" />
            )}
          </div>
          <span className="pl-4 ml-2 pt-lg-0 pt-4 doc-cam-text">
            Profile Picture
          </span>
        </div>

        <div className="col-md-6 pt-2 d-flex justify-content-md-end justify-content-center align-items-center "></div>
        {errorMessage === -1 ? (
          <p className=" mb-0 pl-3 error-message">Please upload image</p>
        ) : null}
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
            <div className="col-12 doc-setting-input">
              <p className="mb-2">
                Name<span className="error-message">*</span>{" "}
              </p>

              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      name="name"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />

                    {errors.name && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2">
                Email<span className="error-message">*</span>{" "}
              </p>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                }}
                render={({ field }) => (
                  <>
                    <input
                      className=""
                      type="text"
                      name="email"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="error-message">
                        Invalid email address
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <Phone
                      name="phone"
                      field={field}
                      value={field.value}
                      handleChange={(e) => {
                        field.onChange(e);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errors.phone && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <Controller
                name="country"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <SelectCountry
                      handleChange={(value, name) => {
                        field.onChange(value);
                        handleChange(name, value);
                        handleChangeSelect(value, name);

                        // setAddPharmacyData({ ...addPharmacyData, state: '' })
                      }}
                      name="country"
                      field={field}
                      value={field.value}
                      onBlur={field.onBlur}
                    />

                    {errors.country && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <SelectState
                country={addPharmacyData?.country}
                disabled={!addPharmacyData?.country && true}
                name="state"
                value={addPharmacyData?.state || ""}
                handleChange={handleChangeSelect}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2">
                City<span className="error-message">*</span>{" "}
              </p>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      className=""
                      type="text"
                      name="city"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errors.city && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <p className="mb-2">
                Address<span className="error-message">*</span>{" "}
              </p>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      className=""
                      type="text"
                      name="address"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errors.address && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2">
                {" "}
                Zip Code<span className="error-message">*</span>{" "}
              </p>
              <div className="d-flex align-items-center">
                <Controller
                  name="zip"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="zip"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(e.target.name, e.target.value);
                          handleChangePharmacy(e);
                        }}
                      />
                    </>
                  )}
                />
              </div>
              {errors.zipcode && (
                <span className="error-message">This field is required</span>
              )}
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <p className="mb-2">Location</p>
              <Location
                handleLocation={handleLocationIconClick}
                locationProp={locationProp}
              />
              {showMap && (
                <GoogleMap
                  locationProp={locationProp}
                  setLocationProp={setLocationProp}
                />
              )}
              {errorMessage === 9 ? (
                <p className="mb-0 error-message">Please select location</p>
              ) : null}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2"> Facebook </p>
              <div className="d-flex">
                <img className="" src={FacebookInput} alt="" />
                <input
                  className="add-doc-social-input"
                  type="text"
                  placeholder="Username"
                  name="facebook"
                  value={addPharmacyData.facebook || ""}
                  onChange={handleChangePharmacy}
                />
              </div>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <p className="mb-2"> Instagram </p>
              <div className="d-flex">
                <img className="" src={InstaInput} alt="" />
                <input
                  className="add-doc-social-input"
                  type="text"
                  placeholder="Username"
                  name="instagram"
                  value={addPharmacyData.instagram || ""}
                  onChange={handleChangePharmacy}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2"> LinkedIn </p>
              <div className="d-flex">
                <img className="" src={LinkedInInput} alt="" />
                <input
                  className="add-doc-social-input"
                  type="text"
                  placeholder="Username"
                  name="linkedin"
                  value={addPharmacyData.linkedin || ""}
                  onChange={handleChangePharmacy}
                />
              </div>
            </div>

            <div className="col-lg-6 pr-lg-1 doc-setting-input certificates-field">
              <p className="mb-2"> Certificates </p>
              <div className="d-flex">
                <span className="upload-icon">
                  <UploadFile
                    formDataState={formDataState}
                    setFormDataState={setFormDataState}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="button" onClick={handleModalToggle}>
              Time Table
            </button>
          </div>
          <div className="row mt-4">
            <div className="col-12 mt-lg-0 mt-0  doc-setting-input">
              <p className="mb-2">{lastTextBoxTitle}</p>
              <textarea
                id=""
                className="pt-2"
                cols="30"
                rows="7"
                name="description"
                value={addPharmacyData.description || ""}
                onChange={handleChangePharmacy}
              ></textarea>
            </div>
          </div>

          <div className="row my-5 pt-2 pb-3 ">
            <div className="col-lg-6">
              <button
                type="submit"
                className="apply-filter add-doc-changes"
                disabled={isLoading}
              >
                {!isLoading ? (
                  addPharmacyData.id ? (
                    submitUpdateText
                  ) : (
                    submitButtonText
                  )
                ) : (
                  <ButtonLoader />
                )}
              </button>
            </div>

            <div className="col-lg-6"></div>
          </div>
        </div>
        <Modal
          visible={isModalVisible}
          onCancel={handleModalToggle}
          footer={
            <div className="row px-3 mt-4 mb-2">
              <div className="col-6"></div>

              <div className="col-6 d-flex justify-content-end mt-3">
                <button
                  className="apply-filter"
                  onClick={() => {
                    postDoctorAvalibility();
                    // getTimeTableData()
                  }}
                >
                  Save Schedule
                </button>
              </div>
            </div>
          }
        >
          <TimeModal />
        </Modal>
      </form>
    </>
  );
};

export default NewPharmacyForm;
