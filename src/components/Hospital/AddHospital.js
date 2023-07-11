import React, { useRef, useState } from 'react'
import {Select, DatePicker,  Checkbox } from "antd";
import { Link } from 'react-router-dom';

// css file
import "../../assets/css/doctor.scss";
import '../../assets/css/pharmacy.scss'

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import DocRoleCrossIcon from "../../assets/images/doctor/DocRoleCrossIcon.svg";
import Location from "../../atoms/Location/Location.js";
import GoogleMap from "../common/GoogleMap.js";

// img png
import LinkedInInput from "../../assets/images/doctor/LinkedInInput.png";
import InstaInput from "../../assets/images/doctor/InstaInput.png";
import FacebookInput from "../../assets/images/doctor/FacebookInput.png";
import { optionCountry, optionRoleType, optionState } from '../../Data/DoctorData';
import CustomDropDown from '../../atoms/CustomDropDown/Index';

const AddHospital = () => {

    const [errorData, setErrorData] = useState(0);
    const [nameData, setNameData] = useState('');
    const [time, setTime] = useState("00:00");
    const [time1, setTime1] = useState("00:00");
    const { RangePicker } = DatePicker;

    const [infoData, setInfoData] = useState("");

    const inputRef = useRef();
    const inputCertiRef = useRef();

    const [image, setImage] = useState(null);

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    const [selectedOptions, setSelectedOptions] = useState(["john"]);
    const [dirty, setDirty] = useState(false);
    const handleChange = (value) => {
        setSelectedOptions(value);
        setDirty(true);
        console.log("Select Changed");
    };
    const [showMap, setShowMap] = useState(false);
    const [locationProp, setLocationProp] = useState("");

    const handleLocationIconClick = () => {
        !showMap ? setShowMap(true): setShowMap(false)
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

    return (
        <div className='mb-5 pb-5'>

            <div className="row  px-2 pt-4 pb-5 ">
                <div className="col-12  ">
                    <p className="mb-0 dashboard-com-top-text">Hospitals List</p>
                </div>

                <div className="col-12  ">
                    <div className="row d-flex align-items-end">
                        <div className="col-lg-6 col-12 mt-lg-1 mt-2 pt-4">
                            <p className="mb-0 doctor-header-top-text">
                                DASHBOARD
                                <img
                                    className="mx-lg-3 ml-2 pr-1 pb-1"
                                    src={RightArrow}
                                    alt=""
                                />{" "}
                                <span style={{ color: "#4FA6D1" }}>HOSPITALS LIST</span>{" "}
                            </p>
                        </div>

                        <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">


                            {" "}
                            {/* <button className="btn-add-new-doc">
                                <Link className="add-doc-link-color" to="/hospitals/add" > Add </Link>
                            </button>{" "} */}

                        </div>

                    </div>
                </div>

                <div className="col-12">

                </div>

            </div>

            <div className="row  pt-lg-3 ">
                <div className="col-lg-12   ">
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

                            <span className="pl-4 ml-2 pt-lg-0 pt-4 doc-cam-text">
                                Profile Picture
                            </span>
                        </div>

                        <div className="col-md-6 pt-2 d-flex justify-content-md-end justify-content-center align-items-center ">
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
                                <div className="col-12  doc-setting-input">
                                    <p className="mb-2">Name </p>
                                    <input className="" type="text" onChange={(e)=>setNameData(e.target.value)} />
                                </div>


                            </div>

                            <div className="row mt-4">
                                <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                    <p className="mb-2"> Your Email </p>
                                    <input className="" type="text" />
                                </div>

                                <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                    <p className="mb-2"> Phone No </p>
                                    <input className="" type="text" />
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                    <p className="mb-2"> Country </p>
                                    <CustomDropDown selectLabel='Select' option={optionCountry} />
                                </div>

                                <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                    <p className="mb-2"> State </p>
                                    <CustomDropDown selectLabel='Select' option={optionState} />
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                    <p className="mb-2"> Specialization </p>
                                    <div className='all-doc-filter-multi-select d-flex justify-content-between '>

                                        <Select
                                            // mode="tags"
                                            onChange={handleChange}
                                            onMouseDown={(e) => {
                                                setDirty(false);
                                                console.log("Select Clicked");
                                                e.stopPropagation();
                                            }}
                                            style={{ width: "100%", minHeight: "36.6px" }}
                                            mode="multiple"
                                            options={[
                                                {
                                                    value: "Allergists/Immunologists",
                                                    label: (
                                                        <Checkbox

                                                            checked={selectedOptions.includes("Allergists/Immunologists")}
                                                        >
                                                            Allergists/Immunologists
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Anesthesiologists",
                                                    label: (
                                                        <Checkbox

                                                            checked={selectedOptions.includes("Anesthesiologists")}
                                                        >
                                                            Anesthesiologists
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Cardiologists​",
                                                    label: (
                                                        <Checkbox
                                                            checked={selectedOptions.includes("Cardiologists​")}
                                                        >
                                                            Cardiologists
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Colon and Rectal Surgeons​",
                                                    label: (
                                                        <Checkbox
                                                            checked={selectedOptions.includes("Colon and Rectal Surgeons​")}
                                                        >
                                                            Colon and Rectal Surgeons
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Dermatologists​",
                                                    label: (
                                                        <Checkbox
                                                            checked={selectedOptions.includes("Dermatologists​")}
                                                        >
                                                            Dermatologists
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Endocrinology​",
                                                    label: (
                                                        <Checkbox
                                                            checked={selectedOptions.includes("Endocrinology​")}
                                                        >
                                                            Endocrinology
                                                        </Checkbox>
                                                    )
                                                },
                                                {
                                                    value: "Gastroenterologists​",
                                                    label: (
                                                        <Checkbox
                                                            checked={selectedOptions.includes("Gastroenterologists​")}
                                                        >
                                                            Gastroenterologists
                                                        </Checkbox>
                                                    )
                                                },
                                            ]}
                                        />


                                        {/* <img className='pr-2' src={DownIcon} alt="" /> */}

                                    </div>
                                </div>

                                <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                    <p className="mb-2"> Working Hours </p>

                                    <div className="d-flex justify-content-between align-items-center datapicker-border">
                                        <div className='border-right d-flex align-items-center' style={{ height: "36.6px" }}>
                                            <img className="px-2 " src={ClockIcon} alt="" />
                                        </div>

                                        {/* <TimeChanger borderInp={'none'} imgHide='none' /> */}
                                        <div className="  d-inline-flex time-picker time-picker-hospital py-1 px-2 ">
                                            <input
                                                className=" pl-1"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                min="00:00"
                                                max="23:59"
                                                step="60"

                                            />

                                        </div>

                                        <span className="datapicker-to">To</span>


                                        <div className="  d-inline-flex time-picker time-picker-hospital py-1 px-2 ">
                                            <input
                                                className=" pl-1"
                                                type="time"
                                                value={time1}
                                                onChange={(e) => setTime1(e.target.value)}
                                                min="00:00"
                                                max="23:59"
                                                step="60"

                                            />

                                        </div>

                                        <div className='border-left d-flex align-items-center' style={{ height: "36.6px" }}>
                                            <img className="px-2 " src={ClockIcon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                    <p className="mb-2"> Working Days </p>

                                    <div className="d-flex justify-content-between align-items-center datapicker-border">
                                        <img className="pl-2 " src={CalenderIcon} alt="" />

                                        <DatePicker
                                            className="border-left rounded-0"
                                            placeholder={"start"}
                                            format={"DD/MM/YYYY"}
                                        />

                                        <span className="datapicker-to">To</span>
                                        <DatePicker
                                            className="border-right rounded-0"
                                            placeholder={"end"}
                                            format={"DD/MM/YYYY"}
                                        />

                                        <img className="pr-2" src={CalenderIcon} alt="" />
                                    </div>
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
                                        Add Hospital
                                    </button>
                                </div>

                                <div className="col-lg-6"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mt-lg-0 mt-4 ">

                </div>
            </div>


            <div className="row  py-lg-3">
                {items.map((item, index) => {
                    return (
                        <>
                            <div className={`col-lg-8 mt-lg-0 mt-4 pb-lg-3 `}>
                                <div className="row mx-0  add-doc-left-col">
                                    <div className="col-12 px-4 py-3 my-1">
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


                                            <div className="row pt-2">
                                                <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                                    <p className="mb-2"> Role Type </p>
                                                    <CustomDropDown disabled={true} selectLabel='Hospital Admin' option={optionRoleType} />
                                                </div>

                                                <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                                    <p className="mb-2"> Hospital </p>
                                                    <input type="text" disabled value={nameData} />
                                                </div>
                                            </div>

                                            <div className="row pt-4">

                                                <div className="col-12 mt-lg-0 mt-4  doc-setting-input">
                                                    <p className="mb-2"> Name </p>
                                                    <input type="text"  />
                                                </div>

                                            </div>

                                            <div className="row pt-4">

                                                <div className="col-12 mt-lg-0 mt-4  doc-setting-input">
                                                    <p className="mb-2"> Email </p>
                                                    <input type="text" />
                                                </div>

                                            </div>

                                            <div className="row  mt-4">
                                                <div className="col-lg-12   doc-setting-input">
                                                    <p className="mb-2 add-doc-role-type-detail">
                                                        {" "}
                                                        Country{" "}
                                                    </p>
                                                    <CustomDropDown selectLabel='Select' option={optionCountry} />
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

                                                <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                                    <p className="mb-2 add-doc-role-type-detail">
                                                        {" "}
                                                        State{" "}
                                                    </p>
                                                    <CustomDropDown selectLabel='Select' option={optionState} />
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

                <div className="col-12 py-4 d-flex align-items-center">
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
    )
}

export default AddHospital