import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


import TimeTableAddBtn from "../../assets/images/doctor/TimeTableAddBtn.svg";
import TimeTableRemoveBtn from "../../assets/images/doctor/dash-circle-fill-red.svg";
import CustomDropDown from '../../atoms/CustomDropDown/Index';
import TimeChanger from "../../components/doctors/TimeChanger";

// scss
import '../../assets/css/doctor.scss'
// ANTD
import { Space, Switch } from "antd";

const TimeTable = ({ id = null }) => {


    const [docBtn1, setDocBtn1] = useState(0);









    const increaseDayCount = (day) => {
        setSelectDay((prevState) => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                count: prevState[day].count + 1,
            },
        }));
        setDocBtn1(docBtn1 + 1)
    };

    const decreaseDayCount = (day) => {
        setSelectDay((prevState) => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                count: prevState[day].count - 1,
            },
        }));
        setDocBtn1(docBtn1 - 1)

    };
    const [selectDay, setSelectDay] = useState({
        sunday: {
            toggle: true,
            count: 1,
        },
        monday: {
            toggle: true,
            count: 1,
        },
        tuesday: {
            toggle: true,
            count: 1,
        },
        wednesday: {
            toggle: true,
            count: 1,
        },
        thursday: {
            toggle: true,
            count: 1,
        },
        friday: {
            toggle: true,
            count: 1,
        },
        saturday: {
            toggle: true,
            count: 1,
        },
    });
    const specialistOptions = [
        {
            value: "Cardiology",
            label: "Cardiology",
        },
        {
            value: "Neurology",
            label: "Neurology",
        },
        {
            value: "Gynaecology",
            label: "Gynaecology",
        },
        {
            value: "Ophthalmology",
            label: "Ophthalmology",
        },
        {
            value: "Urology",
            label: "Urology",
        },
    ];
    const handleChangeSelect = (val, name) => {
        console.log(val, name);
    }
    function renderLoop(countDays, dayName) {
        console.log(countDays, "i am here");
        const items = [];
        for (let i = 0; i < countDays; i++) {
            const isLastElement = i === countDays - 1; // Check if it's the last iteration

            items.push(
                <>

                    <div className={`${countDays === 1 ? "" : "pb-3"} `} style={{ width: "100%", display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div style={{ width: "141px" }}>
                                <CustomDropDown option={specialistOptions} handleChangeSelect={handleChangeSelect} />
                            </div>

                            <TimeChanger />


                            <TimeChanger />

                        </div>
                        {
                            isLastElement ?
                                <span className="pl-lg-3 pl-1">
                                    <img
                                        className="cursor-pointer"
                                        onClick={() => increaseDayCount(dayName)}
                                        src={TimeTableAddBtn}
                                        alt=""
                                    />
                                </span> :
                                <span className="pl-lg-3 pl-1">
                                    <img
                                        className="cursor-pointer"
                                        onClick={() => decreaseDayCount(dayName)}
                                        src={TimeTableRemoveBtn}
                                        alt=""
                                        style={{ width: "20px" }}
                                    />
                                </span>

                        }


                    </div>
                </>
            );
        }

        return items;
    }
    return (
        <>

            <div className="row px-3 mt-4">
                <p className=" mb-0 time-edit-text1">
                    Set Standard Hours
                </p>
            </div>

            <div className="row px-3  mt-lg-4 mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Sunday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {

                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        sunday: {
                                            ...prevState.sunday,
                                            toggle: !prevState.sunday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center align-items-start">
                    {selectDay.sunday.toggle &&
                        renderLoop(selectDay.sunday.count, "sunday")}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Monday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        monday: {
                                            ...prevState.monday,
                                            toggle: !prevState.monday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.monday.toggle &&
                        renderLoop(selectDay.monday.count, "monday")}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Tuesday
                        </span>

                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        tuesday: {
                                            ...prevState.tuesday,
                                            toggle: !prevState.tuesday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.tuesday.toggle &&
                        renderLoop(selectDay.tuesday.count, "tuesday")}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Wednesday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        wednesday: {
                                            ...prevState.wednesday,
                                            toggle: !prevState.wednesday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.wednesday.toggle &&
                        renderLoop(
                            selectDay.wednesday.count,
                            "wednesday"
                        )}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Thursday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        thursday: {
                                            ...prevState.thursday,
                                            toggle: !prevState.thursday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.thursday.toggle &&
                        renderLoop(selectDay.thursday.count, "thursday")}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Friday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        friday: {
                                            ...prevState.friday,
                                            toggle: !prevState.friday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.friday.toggle &&
                        renderLoop(selectDay.friday.count, "friday")}
                </div>
            </div>

            <div className="row px-3  mb-1">
                <div className="col-lg-3 px-1 d-flex justify-content-end align-items-start pt-1 ">
                    <div
                        className="  mb-lg-3 d-flex justify-content-between"
                        style={{ width: "100%" }}
                    >
                        <span className="time-edit-days-name">
                            Saturday
                        </span>
                        <Space direction="vertical">
                            <Switch
                                size={300}
                                defaultChecked
                                onClick={() => {
                                    console.log("sdf");
                                    setSelectDay((prevState) => ({
                                        ...prevState,
                                        saturday: {
                                            ...prevState.saturday,
                                            toggle: !prevState.saturday.toggle,
                                        },
                                    }));
                                }}
                            />
                        </Space>
                    </div>
                </div>

                <div className="col-lg-9 d-flex  flex-column  align-items-lg-end align-items-md-center">
                    {selectDay.saturday.toggle &&
                        renderLoop(selectDay.saturday.count, "saturday")}
                </div>
            </div>
        </>
    )
}

export default TimeTable;