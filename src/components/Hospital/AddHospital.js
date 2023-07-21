import React, { useRef, useState } from 'react'

// css file
import "../../assets/css/doctor.scss";
import '../../assets/css/pharmacy.scss'
import '../../App.scss'

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
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
import usePost from '../../customHook/usePost';
import SelectCountry from '../../atoms/Country';
import SelectState from '../../atoms/State';
import useDeleteData from '../../customHook/useDelete';
import { useEffect } from 'react';
import Phone from '../../atoms/phone';
import { Controller, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import ButtonLoader from '../../atoms/buttonLoader';
import { CustomToast } from '../../atoms/toastMessage';

const AddHospital = ({ Id }) => {
    const customData = useDeleteData()

    const [errorData, setErrorData] = useState(0);
    const [errorMessage, setErrorMessage] = useState(0);
    const [nameData, setNameData] = useState('');

    const [image, setImage] = useState(null);

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [addHospitalData, setAddHospitalData] = useState("");

    const specializationData = useSelector((state) => state.specialization.specializationData);
    const { data, isLoading, error, postData } = usePost()
    const {
        reset,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const specialization = useMemo(() => {
        return specializationData?.data?.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [specializationData]);
    const [showMap, setShowMap] = useState(false);
    const [locationProp, setLocationProp] = useState("");

    const handleLocationIconClick = () => {
        !showMap ? setShowMap(true) : setShowMap(false)
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
            setAddHospitalData({ ...addHospitalData, 'profile_picture': file })
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
    const formatTimeTo24Hour = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const parsedTime = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
        const formattedTime = parsedTime.toTimeString().slice(0, 5);

        return formattedTime;
    };

    const handleChangeHospital = (e) => {

        const { name, value } = e.target;
        if (name === "start_time" || name === "end_time") {
            setAddHospitalData((prevData) => ({
                ...prevData,
                [name]: formatTimeTo24Hour(value),
            }));
        } else {
            setAddHospitalData({ ...addHospitalData, [name]: value });
        }

    };

    console.log("addHospitalData", addHospitalData);
    const handleChangeSelect = (value, name) => {
        setAddHospitalData({ ...addHospitalData, [name]: value })

    }

    useEffect(() => {
        if (Id) {
            customData.deleteData(`${process.env.REACT_APP_DELETE_HOSPITAL_DETAIL}/${Id}`, (val) => {
                console.log("value", val?.data)
                setAddHospitalData(val?.data)
                Object.entries(val?.data).forEach(([fieldName, fieldValue]) => {
                    setValue(fieldName, fieldValue);
                });
                setValue("specialties", val?.data?.specialities?.map(l => (l.id)))
            })
        }
    }, [Id])

    const validation = () => {
        if (!addHospitalData.profile_picture) {
            setErrorMessage(-1)
        }
        // else if (!locationProp) {
        //     setErrorMessage(9)
        // }
        else {
            setErrorMessage('No Error')
        }
    }

    const handleHospitalSubmit = () => {




        validation()
        console.log("name", addHospitalData)



        const updatedPostData = {
            ...addHospitalData,
            working_hours: '08:00-16:00',
            working_days: 'Monday,Wednesday,Friday',
            lat: '3456789',
            long: '456789',
            experience_years: '2',
        };


        const updatedPostData1 = {
            ...addHospitalData,
            'address': '123 Main Street',
            'lat': '34.56789',
            'long': '45.6789',
            'updated_at': '2023-07-17 10:30:00',
            'created_at': '2023-07-16 14:20:00'
        }


        const formData = new FormData();
        for (const key in updatedPostData1) {
            if (
                (key === "specialties") &&
                Array.isArray(updatedPostData1[key])
            ) {
                updatedPostData1[key].forEach((value) => {
                    formData.append(`${key}[]`, value);
                });
            } else {
                formData.append(key, updatedPostData1[key]);
            }
        }

        if (errorMessage === 'No Error') {
            postData((Id ? `${process.env.REACT_APP_UPDATE_HOSPITAL_DATA}/${Id}` : `${process.env.REACT_APP_ADD_HOSPITAL_DATA}`), formData, () => {
                CustomToast({
                    type: "success",
                    message: `${Id ? 'Hospital Details Updated Successfully!' : 'Add Hospital Successfuly!'}`,
                });
                !Id ??  setAddHospitalData('')
                !Id ??  reset()
                !Id ?? setImage('')
            })
        }


    }
  

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
                                />
                                <span style={{ color: "#4FA6D1" }}>HOSPITALS LIST</span>{" "}
                            </p>
                        </div>

                        <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">

                        </div>

                    </div>
                </div>

                <div className="col-12">

                </div>

            </div>
            <form onSubmit={handleSubmit(handleHospitalSubmit)}>
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
                                        addHospitalData.profile_picture ?
                                            <div className='add-doc-camera-upload'>
                                                <img className='w-100 h-100 add-doc-camera-upload-1st' src={process.env.REACT_APP_IMAGE_URL + addHospitalData.profile_picture} alt="" />
                                            </div>
                                            : <img src={CameraIcon} alt="" />

                                    )}
                                </div>

                                <span className="pl-4 ml-2 pt-lg-0 pt-4 doc-cam-text">
                                    Profile Picture
                                </span>
                            </div>

                            <div className="col-md-6 pt-2 d-flex justify-content-md-end justify-content-center align-items-center ">

                            </div>
                            {
                                errorMessage === -1 ? <p className=' mb-0 pl-3 error-message'>Please upload image</p> : null
                            }
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
                                        <p className="mb-2">Name<span className='error-message'>*</span> </p>

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
                                                            setNameData(e.target.value)
                                                            handleChangeHospital(e)
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
                                        <p className="mb-2"> Your Email<span className='error-message'>*</span> </p>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: true,
                                                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    className=""
                                                    type="text"
                                                    name="email"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        handleChangeHospital(e);
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
                                            name="phone_no"
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <Phone

                                                        name="phone_no"
                                                        field={field}
                                                        value={field.value}
                                                        handleChange={(e) => {

                                                            field.onChange(e);
                                                            handleChangeHospital(e);
                                                        }}
                                                    />
                                                    {errors.phone_no && (
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
                                                    <SelectCountry handleChange={(value, name) => {
                                                        field.onChange(value);
                                                        handleChangeSelect(value, name);
                                                        setValue('state', '')
                                                        setAddHospitalData({ ...addHospitalData, ['state']: '' })
                                                    }} name="country"
                                                        field={field}
                                                        value={field.value}
                                                        onBlur={field.onBlur} />

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

                                        <SelectState country={addHospitalData?.country} disabled={!addHospitalData?.country && true} name="state" value={addHospitalData?.state} handleChange={handleChangeSelect} />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                                        <p className="mb-2"> Specialization </p>
                                        <Controller
                                            name="specialties"
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    <CustomDropDown
                                                        handleChangeSelect={(value, name) => {
                                                            field.onChange(value);
                                                            handleChangeSelect(value, name);
                                                        }}
                                                        option={specialization}
                                                        name="specialties"
                                                        mode="multiple"
                                                        field={field}
                                                        value={field.value}
                                                        onBlur={field.onBlur}
                                                    />

                                                    {errors.specialties && (
                                                        <span className="error-message">
                                                            This field is required
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        />
                                        
                                    </div>

                                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                                        <p className="mb-2"> Operational Hours<span className='error-message'>*</span> </p>

                                        <div className="d-flex justify-content-between align-items-center datapicker-border">
                                            <div className='border-right d-flex align-items-center' style={{ height: "36.6px" }}>
                                                <img className="px-2 " src={ClockIcon} alt="" />
                                            </div>

                                            {/* <TimeChanger borderInp={'none'} imgHide='none' /> */}
                                            <div className="  d-inline-flex time-picker time-picker-hospital py-1 px-2 ">

                                                <Controller
                                                    name="start_time"
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                className=" pl-1"
                                                                type="time"
                                                                name="start_time"
                                                                {...field}
                                                                value={field.value || ""}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                    setNameData(e.target.value)
                                                                    handleChangeHospital(e)
                                                                }}
                                                                min="00:00"
                                                                max="23:59"
                                                                step="60"
                                                                timeFormat="HH:mm"
                                                            />
                                                        </>
                                                    )}
                                                />


                                            </div>

                                            <span className="datapicker-to">To</span>


                                            <div className="  d-inline-flex time-picker time-picker-hospital py-1 px-2 ">


                                                <Controller
                                                    name="end_time"
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                className=" pl-1"
                                                                type="time"
                                                                name="end_time"
                                                                {...field}
                                                                value={field.value || ""}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                    setNameData(e.target.value)
                                                                    handleChangeHospital(e)
                                                                }}
                                                                min="00:00"
                                                                max="23:59"
                                                                step="60"
                                                                timeFormat="HH:mm"
                                                            />
                                                        </>
                                                    )}
                                                />

                                            </div>

                                            <div className='border-left d-flex align-items-center' style={{ height: "36.6px" }}>
                                                <img className="px-2 " src={ClockIcon} alt="" />
                                            </div>
                                        </div>
                                        {errors.start_time || errors.end_time ? (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        ) : null}

                                    </div>
                                </div>

                                <div className="row mt-4">
                                    {/* <div className="col-lg-6 pr-lg-1 doc-setting-input">
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
                                </div> */}

                                    <div className="col-lg-6 mt-lg-0 mt-4 pr-lg-1 doc-setting-input ">
                                        <p className="mb-2"> Facebook </p>
                                        <div className="d-flex  ">
                                            <img className="" src={FacebookInput} alt="" />
                                            <input
                                                className="add-doc-social-input"
                                                type="text"
                                                placeholder="Username"
                                                name='facebook' value={addHospitalData.facebook || ""} onChange={handleChangeHospital}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 pl-lg-1 doc-setting-input">
                                        <p className="mb-2"> Instagram </p>
                                        <div className="d-flex  ">
                                            <img className="" src={InstaInput} alt="" />
                                            <input
                                                className="add-doc-social-input"
                                                type="text"
                                                placeholder="Username"
                                                name='instagram' value={addHospitalData.instagram || ""} onChange={handleChangeHospital}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row mt-4">

                                    <div className="col-lg-6 mt-lg-0 mt-4 pr-lg-1 doc-setting-input ">
                                        <p className="mb-2"> Linkedin </p>
                                        <div className="d-flex  ">
                                            <img className="" src={LinkedInInput} alt="" />
                                            <input
                                                className="add-doc-social-input"
                                                type="text"
                                                placeholder="Username"
                                                name='linkedin' value={addHospitalData.linkedin || ""} onChange={handleChangeHospital}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                                        <p className="mb-2"> Zip Code<span className='error-message'>*</span> </p>
                                        <div className="d-flex  ">

                                            <Controller
                                                name="zipcode"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <>

                                                        <input
                                                            type="text"
                                                            name="zipcode"
                                                            {...field}
                                                            value={field.value || ""}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                handleChangeHospital(e)
                                                            }}
                                                        />

                                                    </>
                                                )}
                                            />

                                        </div>
                                        {errors.zipcode && (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-12 mt-lg-0 mt-0  doc-setting-input">
                                        <p className="mb-2"> Location </p>
                                        <Location handleLocation={handleLocationIconClick} locationProp={locationProp} />
                                        {showMap && (
                                            <GoogleMap locationProp={locationProp} setLocationProp={setLocationProp} />
                                        )}
                                        {
                                            errorMessage === 9 ? <p className=' mb-0 error-message'>Please select location</p> : null
                                        }
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-12 mt-lg-0 mt-0  doc-setting-input">
                                        <p className="mb-2"> About Hospital </p>
                                       <textarea id="" className='pt-2' cols="30" rows="7"
                                       name='about' value={addHospitalData.about || ""} onChange={handleChangeHospital}
                                       ></textarea>
                                    </div>
                                </div>
                                <div className="row my-5 pt-2 pb-3 ">
                                    <div className="col-lg-6">
                                        <button className="apply-filter add-doc-changes" disabled={isLoading} onClick={handleHospitalSubmit}>
                                            {
                                                !isLoading ? addHospitalData.id ? 'Edit Hospital' : 'Add Hospital' : <ButtonLoader />
                                            }
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
            </form>

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
                                                    <input type="text" />
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