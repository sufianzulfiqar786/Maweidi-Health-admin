import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  Rate,
  Select,
  Slider,
  DatePicker,
  Space,
  Upload,
} from "antd";
import dayjs from "dayjs";

// file
import IncreDecreBtn from "../../components/doctors/IncreDecreBtn";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import DocRoleCrossIcon from "../../assets/images/doctor/DocRoleCrossIcon.svg";
import IncreIcon from "../../assets/images/doctor/IncreIcon.svg";
import DcreIcon from "../../assets/images/doctor/DcreIcon.svg";

// img png
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import DoctorList from "../../components/doctors/DoctorList";
import { Link } from "react-router-dom";
import Location from "../../atoms/Location/Location";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { optionDepartments, optionSpecialization } from "../../Data/DoctorData";
import GoogleMap from "../../components/common/GoogleMap";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const AddDoctor = () => {
  const [errorData, setErrorData] = useState(0);
  const { RangePicker } = DatePicker;

  const inputRef = useRef();

  const [image, setImage] = useState(null);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [locationProp, setLocationProp] = useState("");

  const handleLocationIconClick = () => {
    !showMap ? setShowMap(true): setShowMap(false)
  };

  const handleAddItem = () => {
    const newItemObject = {
      id: items.length + 1,
    };
    setItems([...items, newItemObject]);
    setNewItem("");
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleDoctorImageClick = () => {
    // Create a file input element and trigger a click event
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // input.accept = 'image/png,image/jpeg';  // its just show png and jpeg file rather then other
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        setErrorData(0);
        return;
      }
      const fileType = file.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        // alert('Please select a PNG or JPEG file');
        setErrorData(1);
        return;
      } else {
        setErrorData(0);
      }
      // Set the selected image as the state of the component
      setImage(URL.createObjectURL(file));
    };
    input.click();
  };

  

  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Add New Doctor</p>
        </div>

        <div className=" col-12 mt-4 pt-1">
          <BreadCrum
            firstLink="/doctors"
            firstText="DOCTORS"
            secondText="ADD DOCTOR"
          />
          {/* <p className="mb-0 doctor-header-top-text">
            <Link className="doc-link " to="/">
            DASHBOARD
            </Link>
            <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
            <Link className="doc-link " to="alldoctors">
              <span>DOCTORS</span>{" "}
            </Link>
            <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
            <span style={{ color: "#4FA6D1" }}>ADD DOCTOR</span>{" "}
          </p> */}

          <div className="row mt-5 pt-3">
            <div className="col-lg-8   ">
              <div className="row mx-0 px-2 add-doc-left-col">
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
                    ) : (
                      <img src={CameraIcon} alt="" />
                    )}
                  </div>

                  <span className="pl-4 ml-2 doc-cam-text">
                    Profile Picture
                  </span>
                </div>

                <div className="col-md-6  pt-2 d-flex justify-content-md-end justify-content-center align-items-center ">
                  {/* <div>
                    <span
                      className="doc-upload-pic cursor-pointer"
                      onClick={handleDoctorImageClick}
                    >
                      Upload Picture
                    </span>
                  </div> */}
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
                      <p className="mb-2"> First Name </p>
                      <input className="" type="text" />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                      <p className="mb-2"> Last Name </p>
                      <input className="" type="text" />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Email </p>
                      <input className="" type="text" />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                      <p className="mb-2"> Phone No </p>
                      <input className="" type="text" />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Departments </p>
                      <CustomDropDown selectLabel='Select' option={optionDepartments} />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                      <p className="mb-2"> Gender </p>
                      <Select
                        // defaultValue="lucy"
                        style={{
                          width: "100%",
                        }}
                        onChange={() => { }}
                        options={[
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
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Specialization </p>
                      <CustomDropDown selectLabel='Select' option={optionSpecialization} />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                      <p className="mb-2">Experience in years </p>
                      <IncreDecreBtn />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Council Registration no </p>
                      <input type="text" />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                      <p className="mb-2"> Facebook </p>
                      <div className="d-flex  ">
                        <img className="" src={FacebookInput} alt="" />
                        <input
                          className="add-doc-social-input"
                          type="text"
                          placeholder="Username"
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
                          placeholder="Username"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Certificates </p>
                      {/* <input type="text" /> */}
                      <UploadFile />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                      <p className="mb-2"> Working Hours </p>
                      {/* <IncreDecreBtn /> */}
                      <div className="d-flex justify-content-between align-items-center datapicker-border">
                        <img className="pl-2 " src={DcreIcon} alt="" />

                        <DatePicker
                          className="border-left rounded-0"
                          placeholder={""}
                          format={"DD/MM/YYYY"}
                        />

                        <span className="datapicker-to">To</span>
                        <DatePicker
                          className="border-right rounded-0"
                          placeholder={""}
                          format={"DD/MM/YYYY"}
                        />

                        <img className="pr-2" src={IncreIcon} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                      <p className="mb-2"> Working Days </p>
                      {/* <IncreDecreBtn /> */}
                      <div className="d-flex justify-content-between align-items-center datapicker-border">
                        <img className="pl-1 " src={CalenderIcon} alt="" />

                        <DatePicker
                          className="border-left rounded-0"
                          placeholder={"start"}
                          format={"DD/MM/YYYY"}
                        />

                        <span className="datapicker-to">To</span>
                        <DatePicker
                          className="  border-right rounded-0"
                          placeholder={"end"}
                          format={"DD/MM/YYYY"}
                        />

                        <img className="pr-1" src={CalenderIcon} alt="" />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                      <p className="mb-2"> Language </p>
                      <input className="" type="text" />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-12 mt-lg-0 mt-0  doc-setting-input">
                      <p className="mb-2"> Location </p>
                      <Location handleLocation={handleLocationIconClick} locationProp={locationProp}/>
                  {showMap && (
                    <GoogleMap locationProp = {locationProp} setLocationProp={setLocationProp}/>
                  )}
                    </div>
                  </div>

                  <div className="row my-5 pt-2 pb-3 ">
                    <div className="col-lg-6">
                      <button className="apply-filter add-doc-changes">
                        Add Doctor
                      </button>
                    </div>

                    <div className="col-lg-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0 mt-4 ">
              <div className="row   mx-0 add-doc-right-col">
                <DoctorList />

                <div className="row pt-1 pb-3  px-3  ">
                  <div className="col-lg-12">
                    <button className="apply-filter save-changes">
                      All Doctors
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5 py-lg-3">
            {items.map((item, index) => {
              return (
                <>
                  <div className={`col-lg-8 mt-lg-0 mt-4 pb-lg-3 `}>
                    <div className="row mx-0  add-doc-left-col">
                      <div className="col-12 px-4 py-3 my-1 ">
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
                          // height: 580,
                          overflow: "auto",
                          padding: "0 16px",
                          // border: '1px solid rgba(0, 0, 0, 0)',
                        }}
                      >
                        <div className="col-12 px-2">
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
                                {" "}
                                Country{" "}
                              </p>
                              <CustomDropDown selectLabel='Kuwait' option={optionSpecialization} />
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
                              <CustomDropDown selectLabel='Al Jahra' option={optionSpecialization} />
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`col-4  `}></div>
                </>
              );
            })}

            <div className="col-12 mb-5 py-4 d-flex align-items-center">
              <img
                className="cursor-pointer"
                onClick={handleAddItem}
                src={AddRoleIcon}
                alt=""
              />{" "}
              <span
                onClick={handleAddItem}
                className="cursor-pointer add-doc-role pl-3 "
              >
                Add a Role
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
