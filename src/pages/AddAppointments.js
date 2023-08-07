import React from 'react'

// svg
import Chevron from "../assets/images/common/chevron-right.svg";
import ClockTimeTable from "../assets/images/doctor/ClockTimeTable.svg";
import closeIcon from "../assets/images/common/close.svg";
import ClockIcon from "../assets/images/doctor/ClockIcon.svg";

import { useState } from 'react';
import useFetch from '../customHook/useFetch';

import "../assets/css/appointments/modal.scss";

import moment from 'moment';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { Modal, Select, DatePicker, TimePicker } from "antd";


import CustomDropDown from '../atoms/CustomDropDown/Index';
import Phone from '../atoms/phone';
import { CustomToast } from '../atoms/toastMessage';
import usePost from '../customHook/usePost';
import Availability from './Doctor/Availability';
import useDeleteData from '../customHook/useDelete';

const AddAppointments = () => {

    const { data: hospitalData } = useFetch(
        process.env.REACT_APP_GET_HOSPITAL_DATA
    );
    console.log("hospitalData", hospitalData)
    const [formData, setFormData] = useState({
        kwdId: "",
        patient_name: "",
        patientId: "",
        hospital: "",
        specialization: "",
        doctor_name: "",
        date: "",
        time: "",
        fees: "",
        age: "",
        email: "",
        phone: '',
    });
    const [modal2Open, setModal2Open] = useState(false);
    const [hospitalDoctor, setHospitalDoctor] = useState([]);
    const [modal1Open, setModal1Open] = useState(false);
    const [errorHanding, setErrorHanding] = useState(true);
    const [KWD_ID, setKWD_ID] = useState({});
    const [matchedSpecializations, setMatchedSpecializations] = useState([]);
    const [matchedDoctors, setMatchedDoctors] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState([]);
    const [selectedHospitalId, setSelectedHospitalId] = useState();
    const [selectedSpecializationId, setSelectedSpecializationId] = useState();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const appointmentDatePost = usePost()

    // useEffect(()=>{
    //     const mappedData = specializationData?.data?.doctors.map((item) => {
    //         console.log("specializationData?.data?.doctorssss", item)
    //         return {
    //             id: item.id,
    //             value: item.user?.name,
    //             label: item.user?.name,
    //         }; 
    //     })
    //     setHospitalDoctor(mappedData)
    // },[])

    const handleDatesChange = (dates) => {
        // console.log("date", dates)
        // if (dates && dates?.length === 2) {
        //     setStartDate(dates[0]?.format('DD/MM/YYYY'));
        //     setEndDate(dates[1]?.format('DD/MM/YYYY'));
        //     setAppointmentDate({ ...appointmentDate, 'start_date': dates[0], 'end_date': dates[1] })
        // } else {
        //     setStartDate(null);
        //     setEndDate(null);
        // }
    };

    // const disabledDate = (current) => {
    //     if (!startDate || !endDate) {
    //         return false;
    //     }
    //     const startMoment = moment(startDate, 'DD/MM/YYYY');
    //     const endMoment = moment(endDate, 'DD/MM/YYYY');
    //     return current < startMoment || current > endMoment;
    // };
    console.log("firstasdasd", startDate)
    const {
        data: specializationData,
    } = useFetch(
        process.env.REACT_APP_GET_SPECIALIZATIONS + `/${selectedHospitalId}`
    );
    console.log("datttttta", specializationData?.data?.doctors)
    const {
        data: doctorsData,
        isLoading,
        error,
    } = useFetch(
        `${process.env.REACT_APP_GET_DOCTORS_BY_SPEC_HOSPITAL}?hospital_id=${selectedHospitalId}&specialization_id=${selectedSpecializationId}`
    );

    useEffect(() => {

    }, [hospitals, hospitalData])

    useEffect(() => {
        if (hospitalData?.success) {
            setHospitals(
                hospitalData?.data?.data?.map(({ id, name, specialities }) => ({
                    id,
                    value: name,
                    label: name,
                    specialities,
                }))
            );
        }
    }, [hospitalData]);

    const {
        reset,
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    let available = [
        {
            date: "11/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "18/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "26/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "24/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "23/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "30/07/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
        {
            date: "30/06/2023", avail: "AV", arr: [
                { time: `9:00 - 10:00`, Availability: "AV" },
                { time: `11:00 - 12:00`, Availability: "AV" },
                { time: `12:00 - 1:00`, Availability: "AV" },
                { time: `2:00 - 3:00`, Availability: "NV" },
                { time: `4:00 - 5:00`, Availability: "AV" },
                { time: `5:00 - 6:00`, Availability: "NV" },
            ]
        },
    ]

    const isCustomDate = (date) => {
        // let mapedvalue = available.map((value) => {
        let mapedvalue = appointmentDatePost?.data?.map((value) => {
            return value.date
        })

        return mapedvalue?.includes(date)
    }

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate1 = `${year}-${month}-${day}`;
        setAppointmentDate({ ...appointmentDate, 'selected_date': formattedDate1 })
        setFormattedDate(formattedDate1);
    }, []);

    console.log("formattedDate", appointmentDate.selected_date)

    const getSelectedHospitalId = (hospitalValue) => {

        const selectedHospital = hospitals.find(
            (hospital) => hospital?.value === hospitalValue
        );
        if (selectedHospital) {
            setSelectedHospitalId(selectedHospital?.id);
        }
    };

    const getSelectedSpecializationId = (specializationValue) => {
        const selectedSpecialization = matchedSpecializations.find(specialization => specialization?.value === specializationValue);
        if (selectedSpecialization) {
            setSelectedSpecializationId(selectedSpecialization?.id);
            setHospitalDoctor(
                specializationData?.data?.doctors?.filter(f => f.specialization_id === selectedSpecialization?.id).map(({ id, user }) => ({
                    id,
                    value: id,
                    label: user?.name,
                }))
            );
        };
    };

    console.log("specializationData", specializationData)

    const findSpecializations = () => {
        if (specializationData?.success === true) {
            console.log("------specializationData-------", matchedSpecializations);

            setMatchedSpecializations(
                specializationData?.data?.specializations?.map(({ id, name }) => ({
                    id,
                    value: id,
                    label: name,
                }))
            );

            setHospitalDoctor(
                specializationData?.data?.doctors?.map(({ id, user }) => ({
                    id,
                    value: id,
                    label: user?.name,
                }))
            );
        }
        else {

        }
    };
    useMemo(() => { findSpecializations() }, [specializationData]);

    const findDoctors = () => {
        if (doctorsData) {
            console.log("doctorsData", doctorsData)
            setMatchedDoctors(
                doctorsData?.data?.map(({ id, user }) => ({
                    id,
                    value: user?.name,
                    label: user?.name,
                }))
            );
        }
    };
    console.log("specializationData?.data?.doctors?.user", specializationData?.data?.doctors
    )



    console.log("dddd", hospitalDoctor)
    useMemo(() => findDoctors(), [doctorsData?.data]);

    const KWDID_Api = useDeleteData();

    // Function to be called when the button is clicked
    const handleButtonClick = () => {



        // Fetch data with the updated URL
        KWDID_Api.deleteData(`${process.env.REACT_APP_GET_PATIENT_DETAIL_BY_KWD_ID}/${formData.kwdId}`, (response) => {
            console.log("responseqqq", response)
            setKWD_ID(response)
            setValue("phone", response?.data?.user?.contact)
            setValue("age", response.data?.user?.age)
            setValue("email", response.data?.user?.email)
            setValue("patient_name", response.data?.user?.name)
            setValue("patientId", response.data?.id)
            setAppointmentDate({
                ...appointmentDate, 'patient_id': response?.data?.id
    
            })
            // Show an error message
            CustomToast({
                type: "success",
                message: `Patient record found `,
            });

        });

    };

    console.log("KWDID_Api", KWDID_Api)

    const handleInputChange = (name, value) => {
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        // console.log("formData", formData.kwdId)
    };

    const handleHospitalChange = (value, name) => {
        console.log("first", value, name)
        const selectHospital = hospitals?.find((item) => (item.value === value))
        //  setAppointmentDate({...appointmentDate, 'hospital_id': selectHospital.id})
        setAppointmentDate({ ...appointmentDate, 'hospital_id': 1 })
        console.log("selectHospital", selectHospital?.id)
        getSelectedHospitalId(value);
        handleInputChange("hospital", value);
    };

    const handleSpecializationChange = (value) => {
        getSelectedSpecializationId(value);
        // findDoctors(value);
        handleInputChange("specialization", value);
    };

    const handleDoctorsChange = (value) => {
        // findAvailableDates(value);
        setHospitalDoctor(
            specializationData?.data?.doctors?.map(({ id, user }) => ({
                id,
                value: id,
                label: user?.name,
            }))
        );

        const selectDoctor = specializationData?.data?.doctors?.find((item) => item?.id === value)
        // setAppointmentDate({...appointmentDate, 'doctor_id': selectDoctor.id})
        console.log("selectDoctor", selectDoctor)
        setValue("specialization", selectDoctor?.specialization_id)
        setValue("fees", selectDoctor?.fees)
        
        // alert(selectDoctor?.specialization_id)
        console.log("selectDoctor///", selectDoctor)
        setAppointmentDate({ ...appointmentDate, 'doctor_id': selectDoctor.id, 'specialization_id': selectDoctor?.specialization_id })

        handleInputChange("doctor_name", value);

    };

    console.log("appointmentDate.length", appointmentDate.length)

    useEffect(() => {
        if (appointmentDate.doctor_id && appointmentDate.hospital_id && appointmentDate.start_date && appointmentDate.end_date) {
            appointmentDatePost?.postData((`${process.env.REACT_APP_GET_DOCTOR_AVAILABILITIES}`), appointmentDate, () => {

            })
        }
    }, [appointmentDate.doctor_id, appointmentDate.hospital_id, appointmentDate.start_date, appointmentDate.end_date])
    console.log("appointmentDatttte", appointmentDate)
    console.log("appointmentDatePost.data", appointmentDatePost.data)

    // console.log("data")

    console.log("appointmentDate", appointmentDate)
    const handleTimeChange = (value) => {
        console.log("time", value)
        handleInputChange("time", value);
    };

    const handleDateChange = (value) => {
        console.log("firstttt", value.format("YYYY-MM-DD"))
        const selectDate = appointmentDatePost?.data?.find((item) => (item.date === value.format("YYYY-MM-DD")))
        console.log("selectDate", selectDate)
        setAppointmentDate({ ...appointmentDate, 'slots': selectDate?.slots })
        handleInputChange("date", value);

    };
    console.log("appointmentDatedate", appointmentDate)

    const addAppointmentBooking = usePost()

    const onSubmit = () => {

      

        setFormData({
            kwdId: "",
            patient_name: "",
            patientId: "",
            hospital: "",
            specialization: "",
            doctor_name: "",
            date: "",
            time: "",
            fees: "",
            age: "",
            email: "",
            phone: "",
        });

        if (!appointmentDate?.start_slot) {
            setErrorHanding(false)
            handleModal()
        } else {
            setErrorHanding(true)
            console.log("hellooooo")

            const updatedPostData = {
                ...appointmentDate,
                fees: 2.30,
                date: appointmentDate.selected_date,
                note:'werwer'
            }

            addAppointmentBooking?.postData((`${process.env.REACT_APP_ADD_APPOINTMENT}`), updatedPostData, () => {
                
                // setAppointmentDate('')
                setKWD_ID('')
                setValue('')
                reset()
                appointmentDatePost?.postData((`${process.env.REACT_APP_GET_DOCTOR_AVAILABILITIES}`), appointmentDate, () => {
                    CustomToast({
                        type: "success",
                        message: ` Booked Appointment ` ,
                    });
                })
            })

           

        }

    };

    const handleCancel = () => {
        setFormData({
            kwdId: "",
            patient_name: "",
            patientId: "",
            hospital: "",
            specialization: "",
            doctor_name: "",
            date: "",
            time: "",
            fees: "",
            age: "",
            email: "",
            phone: "",
        });
    };

    const timeSlots = appointmentDate?.slots && appointmentDate?.slots.map(slot => ({
        label: slot?.start_time + "-" + slot?.end_time,
        value: slot?.doctor_availability_slot_id,
    }))

    console.log("appointmentDatewww", appointmentDate)

    const handleModal = () => {
        if (appointmentDate?.hospital_id && appointmentDate?.doctor_id) {
            setModal1Open(true)
        }
        else {
            CustomToast({
                type: 'info',
                message: 'Please select Hospital, Specialization, Doctor',
            });
        }
    }

    const timeSlotDataformate = {
        start_slot: '08:00',
        end_slot: '10:00'
    };

    const [timeSlotData, setTimeSlotData] = useState({
        start_slot: timeSlotDataformate?.start_slot,
        end_slot: timeSlotDataformate?.end_slot
    });

    console.log("timeSlotDataformate?.start_slot", timeSlotData?.start_slot)

    const convertTo12HourFormat = (time) => {
        if (!time) {
            return ''; // Return an empty string or some default value when time is not set
        }

        const [hours, minutes] = time.split(':');
        let amPm = 'AM';
        let formattedHours = parseInt(hours, 10);

        if (formattedHours >= 12) {
            amPm = 'PM';
            if (formattedHours > 12) {
                formattedHours -= 12;
            }
        }
        return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${amPm}`;
    };

    useEffect(() => {
        const formattedTime = convertTo12HourFormat(appointmentDate?.start_slot);
        const formattedTime1 = convertTo12HourFormat(appointmentDate?.end_slot);
        setTimeSlotData((prevTimeSlotData) => ({
            ...prevTimeSlotData,
            start_slot_format: formattedTime,
            end_slot_format: formattedTime1
        }));
        setValue('start_slot', formattedTime)
        console.log("formattedTime", formattedTime);
    }, [appointmentDate?.start_slot, appointmentDate?.end_slot]);

    console.log("timeSlotDataddd", timeSlotData.start_slot_format)

    return (
        <div className="row pl-3 pr-2 pt-4 appointment-tab">
            <div className="col-12">
                <p className="mb-0 appointment-heading">Appointment</p>
            </div>
            <div className="col-12  my-4">
                <p className="appointment-breadcrumb">
                    <span> DASHBOARD </span>
                    <img src={Chevron} />
                    <span className="current-tab"> APPOINTMENT</span>
                </p>
            </div>

            <div className="modal-content-wrapper w-100">
                {/* <div className="title-header">
            <div className="title">Book an Appointment</div>
            <img src={closeIcon} onClick={() => handleCancel()} />
          </div>
          <hr style={{ margin: "0px " }} /> */}

                <div class="form-wrapper px-3 mb-5 pb-5">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-9">
                                        <div class="form-group full-width">
                                            <p class="required">Enter KWD ID<span className='error-message'>*</span></p>
                                            <Controller
                                                name="kwdId"
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name="kwdId"
                                                            {...field}
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);
                                                                handleInputChange(e.target.name, e.target.value);
                                                            }}
                                                        />

                                                        {errors.kwdId && (
                                                            <span className="error-message">
                                                                This field is required
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <div onClick={handleButtonClick} className='common-btn mt-4 d-flex justify-content-center align-items-center cursor-pointer'
                                            style={{ height: '36.6px' }}>
                                            Submit
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">

                                <div class="form-group">
                                    <p>Patient Name</p>
                                    <Controller
                                        name="patient_name"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    style={{ backgroundColor: 'white' }}
                                                    disabled
                                                    type="text"
                                                    name="patient_name"
                                                    {...field}
                                                    value={field.value || KWD_ID?.data?.user?.name || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        handleInputChange(e.target.name, e.target.value);
                                                    }}
                                                />

                                                {/* {errors.patient_name && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )} */}
                                            </>
                                        )}
                                    />
                                </div>


                            </div>
                            <div className="col-lg-6">
                                <div class="form-group">
                                    <p>Patient ID</p>
                                    <Controller
                                        name="patientId"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    style={{ backgroundColor: 'white' }}
                                                    disabled
                                                    type="text"
                                                    name="patientId"
                                                    {...field}
                                                    // value={field.value}
                                                    value={field.value || KWD_ID?.data?.id || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        handleInputChange(e.target.name, e.target.value);
                                                    }}
                                                />

                                                {/* {errors.patientId && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )} */}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group" style={{ marginTop: "11px" }}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <Phone
                                                    disabled={true}
                                                    name="phone"
                                                    field={field}
                                                    value={field.value || KWD_ID.data?.user?.contact || ''}
                                                    handleChange={(e) => {
                                                        field.onChange(e);
                                                        handleInputChange(e.target.name, e.target.value);
                                                    }}
                                                />
                                                {/* {errors.phone && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )} */}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <p>Age</p>
                                    <Controller
                                        name="age"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    style={{ backgroundColor: 'white' }}
                                                    disabled
                                                    type="text"
                                                    name="age"
                                                    {...field}
                                                    value={field.value || KWD_ID.data?.user?.age || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        handleInputChange(e.target.name, e.target.value);
                                                    }}
                                                    onClick={() => { console.log("----formData------", formData) }}
                                                />

                                                {/* {errors.age && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )} */}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <p for="date-input">Email</p>
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
                                                style={{ backgroundColor: 'white' }}
                                                disabled
                                                className=""
                                                type="text"
                                                name="email"
                                                {...field}
                                                value={field.value || KWD_ID.data?.user?.email || ''}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    handleInputChange(e.target.name, e.target.value);
                                                }}
                                            />
                                        )}
                                    />
                                    {/* {errors.email && errors.email.type === "required" && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                    {errors.email && errors.email.type === "pattern" && (
                                        <span className="error-message">Invalid email address</span>
                                    )} */}
                                </div>
                            </div>




                            <div className="col-lg-6">
                                <div class="form-group full-width">
                                    <p className='pb-0'>Hospital<span className='error-message'>*</span></p>
                                    <Controller
                                        name="hospital"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <CustomDropDown
                                                    handleChangeSelect={(value, name) => {
                                                        field.onChange(value);
                                                        handleHospitalChange(value);
                                                    }}
                                                    option={hospitals}
                                                    field={field}
                                                    value={field.value}
                                                    onBlur={field.onBlur}
                                                />

                                                {errors.hospital && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">

                                <div class="form-group">
                                    <p>Specialization<span className='error-message'>*</span></p>
                                    <Controller
                                        name="specialization"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <CustomDropDown
                                                    handleChangeSelect={(value, name) => {
                                                        field.onChange(value);
                                                        handleSpecializationChange(value);
                                                    }}
                                                    option={matchedSpecializations}
                                                    field={field}
                                                    value={field.value}
                                                    onBlur={field.onBlur}
                                                />

                                                {errors.specialization && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div class="form-group">
                                    <p>Doctor<span className='error-message'>*</span></p>
                                    <Controller
                                        name="doctor_name"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <CustomDropDown
                                                    handleChangeSelect={(value, name) => {
                                                        field.onChange(value);
                                                        handleDoctorsChange(value);
                                                    }}
                                                    // option={matchedDoctors || hospitalDoctor}
                                                    option={hospitalDoctor}
                                                    field={field}
                                                    value={field.value}
                                                    onBlur={field.onBlur}
                                                />

                                                {errors.doctor_name && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                    <label style={{ fontSize: "12px", marginBottom: "-15px" }}>
                                        Please select the{" "}
                                        <span style={{ textDecoration: 'underline' }}
                                            className="font-weight-bold text-dark cursor-pointer "

                                            onClick={() => {
                                                handleModal()
                                            }}
                                        >
                                            {" "}
                                            doctor's availability
                                        </span>{" "}
                                        before booking an appointment. {" "}
                                        {
                                            !errorHanding ? <span className="error-message">
                                                Mandatory to select doctor's availability.
                                            </span> : null
                                        }
                                    </label>
                                </div>

                            </div>

                            {/* <Modal
                                className="doctor-filter-modal"
                                centered
                                open={modal2Open}
                                onOk={() => setModal2Open(false)}
                                onCancel={() => setModal2Open(false)}
                                width={735}
                                footer={<div className="row px-3 mt-4 mb-2"></div>}
                            >
                                <div className="row mx-3 mt-4 pt-3 ">
                                    <div className="col-lg-12 py-4 time-table-border  px-4">
                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Monday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Tuesday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Wednesday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Thursday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Friday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-2 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Saturday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-0 d-flex justify-content-between">
                                            <div>
                                                <img
                                                    className="pl-1 pr-2"
                                                    src={ClockTimeTable}
                                                    alt=""
                                                />{" "}
                                                <span className="time-table-day">Sunday</span>
                                            </div>

                                            <div>
                                                <span className=" pr-1 time-table-time-text">
                                                    Time:{" "}
                                                    <span className="time-table-time-dynamic">
                                                        8.00 - 20.00
                                                    </span>{" "}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal> */}

                            <Modal
                                className="doctor-filter-modal"
                                centered
                                open={modal1Open}
                                onOk={() => setModal1Open(false)}
                                onCancel={() => setModal1Open(false)}
                                width={735}
                                footer={<div className="row px-3 mt-4 mb-2"></div>}
                            >
                                <div className="row mx-3 mt-0 pt-3 mb-5 pb-5">
                                    <Availability setStartDateParent={setStartDate} setEndDateParent={setEndDate} setAppointmentDate={setAppointmentDate} appointmentDate={appointmentDate} slotData={appointmentDatePost.data} setModal1Open={setModal1Open} setValue={setValue} setErrorHanding={setErrorHanding} />
                                </div>
                            </Modal>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <p>Fees</p>
                                    <Controller
                                        name="fees"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                style={{backgroundColor:'white'}}
                                                disabled
                                                    type="text"
                                                    name="fees"
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        handleInputChange(e.target.name, e.target.value);
                                                    }}
                                                />

                                                {errors.fees && (
                                                    <span className="error-message">
                                                        This field is required
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div class="form-group">
                                    <p> Pick slot</p>
                                    <div className="border date-picker-appointment" style={{ borderRadius: "5px" }}>

                                        <DatePicker.RangePicker placeholder={[`${timeSlotData.start_slot_format || "Start Slot"}`, `${timeSlotData.end_slot_format || "End Slot"}`]} disabled onChange={handleDatesChange} format="DD/MM/YYYY" style={{ border: "none", width: "100%", height: '36.5px' }} />

                                    </div>
                                    {/* {errors.start_slot && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )} */}
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div class="form-group">
                                    <p>Date</p>
                                    <div className="border date-picker-appointment" style={{ borderRadius: "5px" }}>

                                        <DatePicker
                                            disabled
                                            placeholder={appointmentDate.selected_date || 'Select Date'}

                                            // disabledDate={disabledDate}
                                            dateRender={current => {
                                                // if (!disabledDate(current)) {
                                                //     if (isCustomDate(current.format("DD/MM/YYYY")) === true) {
                                                //         return (
                                                //             <div style={{ backgroundColor: '#E4F3E5', color: '#3D8E44', borderRadius: '8px' }}>
                                                //                 {current.date()}
                                                //             </div>
                                                //         )
                                                //     }
                                                //     else {
                                                //         return (
                                                //             <div style={{ backgroundColor: '#FEF1F4', color: 'red', borderRadius: '8px' }}>
                                                //                 {current.date()}
                                                //             </div>
                                                //         );
                                                //     }
                                                // }

                                            }}
                                            format="YYYY-MM-DD"
                                            style={{ border: "none", width: "100%", height: '36.5px' }}
                                        // onChange={(value, name) => {
                                        //     field.onChange(value.format("YYYY-MM-DD"));
                                        //     // handleDateChange(value);
                                        //     console.log("first===>", value? value.format("YYYY-MM-DD") : null)
                                        // }}

                                        />

                                    </div>
                                    {errors.date && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* <div class="col-lg-6">
                                <div class="form-group">
                                    <p>Time</p>
                                    <Controller
                                        name="time"
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    defaultValue="Select Time"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    bordered={true}
                                                    onChange={(value, name) => {
                                                        field.onChange(value);
                                                        handleTimeChange(value);
                                                    }}
                                                    field={field}
                                                    value={field.value}
                                                    options={timeSlots}
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.time && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div> */}





                            <div class="col-12 mt-4">
                                <div className='w-25'>
                                    <button type="submit" class=" common-btn ">
                                        Book An Appointment
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddAppointments