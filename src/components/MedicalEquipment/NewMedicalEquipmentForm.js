import React, { useState, useEffect } from "react";
import SelectCountry from "../../atoms/Country";
import SelectState from "../../atoms/State";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import closeIcon from "../../assets/images/common/close.svg";
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
import TwitterInput from "../../assets/images/doctor/Twitter.png";
import WebInput from "../../assets/images/doctor/website.png";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import TimeTablePencil from "../../assets/images/doctor/TimeTablePencil.svg";
import useDeleteData from "../../customHook/useDelete";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import { useNavigate } from "react-router-dom";
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";

import { Modal } from "antd";
import PharmacyTimings from "./PharmacyTimings";
import { Link } from "react-router-dom";
import NewPharnacyRole from "./NewPharnacyRole";
import MuiltiplesImages from "../../atoms/MuiltiplesImages/MuiltiplesImages";
import AddRole from "../../pages/Role/AddRole";
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

const NewMedicalEquipmentForm = ({
  id,
  lastTextBoxTitle = "About Medical Equipment",
  submitButtonText = "Add Equipment",
  submitUpdateText = "Update Equipment",
  apiEndpoint = process.env.REACT_APP_ADD_PHARMACY_DATA,
  updateApiEndPoint = process.env.REACT_APP_UPDATE_PHARMACY_DATA,
  timeSetApi = process.env.REACT_APP_SET_PHARMACY_SLOT,
  timeGetApi = process.env.REACT_APP_GET_PHARMACY_SLOT,
  getByIdAPI = process.env.REACT_APP_GET_PHARMACY_DATA_ID,
  entityType = "pharmacy",
  customToastMessage = "Medical Equipment Added Successfully",
  updateToastMessage = "Medical Equipment Details Updated Successfully!",
  click, setClick
}) => {
  const [errorData, setErrorData] = useState(0);
  const [errorMessage, setErrorMessage] = useState(0);
  const [addPharmacyData, setAddPharmacyData] = useState("");
  const [image, setImage] = useState(null);
  const [nameData, setNameData] = useState("");
  const [formDataState, setFormDataState] = useState({ country: "Kuwait" });
  const [showMap, setShowMap] = useState(false);
  const [locationProp, setLocationProp] = useState("");
  const customData = useDeleteData();
  const [documentFile, setDocumentFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedTimings, setAddedTimings] = useState([]);
  const [addRole, setAddRole] = useState({ country: "Kuwait" })
  const [roleParentValidation, setRoleParentValidation] = useState(false);
  const [roleCategoryId, setRoleCategoryId] = useState("");
  const [addTimePostReq, setaddTimePostReq] = useState({
    doctor_id: 131,
    schedules: [{ day: 0, time_slots: [{ start_time: "", end_time: "" }] }],
  });
  console.log("idffff", id)
  const navigate = useNavigate();
  const AddRoleHook = usePost()
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

  const role =JSON.parse(localStorage.getItem("userRoles"))
  const allowedhost = Object.keys(role).includes("hospitaladmin")
  const allowedlab = Object.keys(role).includes("technologist")
  const allowedphar = Object.keys(role).includes("pharmacist")
  const isSuperAdmin = Object.keys(role).length === 0 

  const handleChangeSelect = (value, name) => {
    setAddPharmacyData({ ...addPharmacyData, [name]: value });
    setFormDataState((pre)=>({...pre, [name]:value}))
  };

  const formatTimeTo24Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const parsedTime = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    const formattedTime = parsedTime.toTimeString().slice(0, 5);

    return formattedTime;
  };

  console.log("addTimePostReqQQ", addTimePostReq);

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

  console.log("addTimePostReq.schedules", addTimePostReq.schedules);

  const savePharmacySchedule = (res) => {
    console.log("response", res);
    const requestBody = {
      [`${entityType}_id`]: res.id,
      schedules: addTimePostReq.schedules,
    };

    postData(timeSetApi, requestBody, () => {
      // CustomToast({
      //   type: "success",
      //   message: "Schedule saved successfully",
      // });

      setAddedTimings(addTimePostReq.schedules);
    });
  };
  const { data, isLoading, error, postData } = usePost();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { deleteData } = useDeleteData();
  useEffect(() => {
    if (id) {
      deleteData(`${getByIdAPI}/${id}`, (response) => {
        Object.entries(response?.data).forEach(([fieldName, fieldValue]) => {
          setValue(fieldName, fieldValue);
        });
        setFormDataState((prev) => ({ ...prev, state: response?.data.state }));
        setFormDataState((prev) => ({
          ...prev,
          certificate: response?.data.document,
        }));
        setAddPharmacyData(response?.data);
        console.log("responseeee", response, data);
      });
    }
  }, [id]);

  const validation = () => {
    if (!addPharmacyData.profile_picture) {
      setErrorMessage(-1);
    } else if(formDataState?.certificate == undefined){
      setErrorMessage(222)
    } else if(formDataState?.state == undefined){
      setErrorMessage(333)
    }
    // else if (!addPharmacyData.zip) {
    //   setErrorMessage(8);
    // }
    // else if (!locationProp) {
    //     setErrorMessage(9)
    // }
    else {
      setErrorMessage("No Error");
    }
  };
  console.log(formDataState?.country);
  console.log("clickccc", click)
  const handleFormSubmit = async (formData) => {
    validation();
    if (errorMessage === "No Error") {
      console.log('sdf', errorMessage)
      console.log("Form Data:", formData);
      const FarmData = new FormData();

      const completeFormData = {
        ...formData,
        profile_picture: !id ?  addPharmacyData.profile_picture : '',
        state: addPharmacyData.state,
        facebook: addPharmacyData.facebook,
        instagram: addPharmacyData.instagram,
        linkedin: addPharmacyData.linkedin,
        description: addPharmacyData.description,
        document: !id ?  formDataState?.certificate : '',
        status:0,
      };

      Object.keys(completeFormData).forEach((key) => {
        const value = completeFormData[key];
        FarmData.append(key, value !== undefined && value !== null ? value : "");
      });
      

      // Object.keys(completeFormData).forEach((key) =>
      //   FarmData.append(key, completeFormData[key])
      // );
      
     
        postData(
          id ? `${updateApiEndPoint}/${id}` : `${apiEndpoint}`,
          FarmData,
          (response) => {
            savePharmacySchedule(response?.data);

            console.log("ressss", response?.data?.user_id)
            setRoleCategoryId(response?.data?.id)
            

            if (click === false) {
              if (
                addRole?.name &&
                addRole?.email &&
                addRole?.password &&
                addRole?.role_type &&
                addRole?.role_type_id
              ) {
                console.log("res?.data?.id", response?.data?.id)
                setAddRole({ ...addRole, 'join_id': response?.data?.id })
                // alert('sdf', res?.data?.id)
  
                const updateRoleData = {
                  ...addRole,
                  join_id: response?.data?.id,
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
                  // navigate("/pharmacy");
                  // alert('sdf')
                  if (response?.success === true) {
                    navigate("/medical/equipment");
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




            CustomToast({
              type: "success",
              message: `${id ? updateToastMessage : customToastMessage}`,
            })
            !id && setAddPharmacyData({});
            !id && reset();
            !id && setImage("");
            if (!click === false) {
            navigate("/medical/equipment");
            }
          }
        );
    
    }
  };

  const handleChange = (name, value) => {
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  function getDayName(dayNumber) {
    switch (dayNumber) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
      default:
        return null;
    }
  }

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
                    "/" +
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
              <p className="mb-2">
                Customer Support Email<span className="error-message"></span>{" "}
              </p>
              <Controller
                name="customer_email"
                control={control}
                rules={{
                  required: false,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                }}
                render={({ field }) => (
                  <>
                    <input
                      className=""
                      type="text"
                      name="customer_email"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                    />
                    {errors.customer_email &&
                      errors.customer_email.type === "required" && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    {errors.customer_email &&
                      errors.customer_email.type === "pattern" && (
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
                        handleChange(e.target.name, e.target.value);
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

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <Controller
                name="country"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue="Kuwait"
                render={({ field }) => (
                  <>
                    <SelectCountry
                      handleChange={(value, name) => {
                        field.onChange(value);
                        handleChange(name, value);
                        handleChangeSelect(value, name);
                      }}
                      name="country"
                      field={field}
                      value={field.value}
                      onBlur={field.onBlur}
                      isDisabled={true}
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
                country={formDataState?.country}
                disabled={!formDataState?.country}
                name="state"
                value={formDataState?.state || ""}
                handleChange={handleChangeSelect}
                req={true}
              />
               {
              errorMessage === 333 ? <span className="error-message">
              This field is required
            </span> : null
            }
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
              <p className="mb-2"> Zip Code </p>
              <div className="d-flex align-items-center">
                <Controller
                  name="zip"
                  control={control}
                  rules={{
                    required: false,
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
              <p className="mb-2"> Twitter </p>
              <div className="d-flex">
                <img className="" src={TwitterInput} alt="" />
                <input
                  className="add-doc-social-input"
                  type="text"
                  placeholder="Username"
                  name="twitter"
                  value={addPharmacyData.twitter || ""}
                  onChange={handleChangePharmacy}
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

            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
              <p className="mb-2"> Certificates </p>
              <div className="d-flex">
                <UploadFile
                  formDataState={formDataState}
                  setFormDataState={setFormDataState}
                  value={formDataState?.certificate || ""}
                />
              </div>
              {
                errorMessage === 222 ? <span className="error-message">
                This field is required
              </span> : null
              }
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 pr-lg-1 doc-setting-input">
              <p className="mb-2">Pharmacy Timings</p>
              <div className="pharmacy-schedule-shadow">
                <div className=" pharmacy-schedule d-flex w-100 justify-content-between flex-column border-left border-right border-top border-bottom">
                  <div className="d-flex w-100 justify-content-between px-2">
                    <span className="mb-2  input-field-timings" style={{ fontSize: "14px", color: "#535353" }}>
                      Set Schedule
                    </span>
                    <img
                      onClick={handleModalToggle}
                      src={TimeTablePencil}
                      alt="TimeTablePencil"
                      className="input-field-icon input-field-timings cursor-pointer"
                    />
                  </div>
                </div>

                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th className="text-left pharmacy-timings pl-3 border-left border-right" >Day</th>
                      <th className="text-center pharmacy-timings border-left border-right" >
                        Opening Time
                      </th>
                      <th className="text-center pharmacy-timings  border-left border-right" >
                        Closing Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addTimePostReq?.schedules.map((time) => {
                      const hasTimeSlots = time?.time_slots;
                      return (
                        <tr key={time.day} className="border pharmacy-time-cell">
                          <td className="" style={{ fontSize: '14px', color: '#535353' }}>{getDayName(time?.day) ? getDayName(time?.day) : "Days"}</td>
                          <td className="text-center " style={{ fontSize: '14px', color: '#535353' }}>
                            {time?.time_slots[0]?.start_time ? time?.time_slots[0]?.start_time : "Off"}
                          </td>
                          <td className="text-center  pl-3" style={{ fontSize: '14px', color: '#535353' }}>
                            {time?.time_slots[0]?.end_time ? time?.time_slots[0]?.end_time : "Off"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 px-3">
          <div className="col-12 mt-lg-0 mt-0 doc-setting-input">
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
        <div className="pl-3">
          <MuiltiplesImages />
        </div>
        { isSuperAdmin ?   <div className="row pb-5 mb-lg-5 m-0 second-row pl-2 mt-3">
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
                Add a Role
              </span>
            </div>
          ) : (
            <div className="col-lg-8 mt-3">

              {/* <NewPharnacyRole
                  click={click}
                  setClick={(data) => {
                    setClick(data);
                  }}
                /> */}

              <div className="add-appointment-card-wrapper">
                <div className="title-header">
                  <div className="title">Add a Role</div>
                  <img
                    src={closeIcon}
                    onClick={() => {
                      setClick(!click);
                    }}
                  />
                </div>
                <hr />

                <AddRole upperData={false} roleParent={[
                  { value: 7, label: "Medical Equipment Admin" }
                ]}
                  setAddRole={setAddRole} addRole={addRole}
                  roleParentValidation={roleParentValidation}
                  roleCategoryId={roleCategoryId}
                  navigateLink='pharmacy'
                />

              </div>
            </div>
          )}
        </div> : null}

        <div className="row my-5 pt-2 pb-3 ">
          <div className="col-lg-6">
            <button
              type="submit"
              className="apply-filter add-doc-changes ml-2"
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

        <Modal
          title="Time Table"
          visible={isModalVisible}
          onCancel={handleModalToggle}
          footer={
            <div className="row px-3 mt-4 mb-2">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end mt-3">
                <button className="apply-filter" onClick={handleModalToggle}>
                  Save Schedule
                </button>
              </div>
            </div>
          }
        >
          <hr />
          <div className="row px-3 mt-4">
            <p className=" mb-0 time-edit-text1">Set Standard Hours</p>
          </div>
          <br />
          <PharmacyTimings
            addTimePostReq={addTimePostReq}
            setaddTimePostReq={setaddTimePostReq}
          />
        </Modal>
      </form>
    </>
  );
};

export default NewMedicalEquipmentForm;
