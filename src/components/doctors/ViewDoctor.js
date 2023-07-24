import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Modal } from "antd";
import { Space, Switch } from "antd";
import Slider from "react-slick";

// files

import TimeChanger from "../doctors/TimeChanger";

import "../../assets/css/Carousel.scss";
import "../../assets/css/doctor.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import RightArrowSpec from "../../assets/images/doctor/RightArrowSpec.svg";
import TimeTablePencil from "../../assets/images/doctor/TimeTablePencil.svg";
import ClockTimeTable from "../../assets/images/doctor/ClockTimeTable.svg";
import TimeTableMessageIcon from "../../assets/images/doctor/TimeTableMessageIcon.svg";
import TimeTablePhoneIcon from "../../assets/images/doctor/TimeTablePhoneIcon.svg";
import TimeTableAddBtn from "../../assets/images/doctor/TimeTableAddBtn.svg";
import TimeTableRemoveBtn from "../../assets/images/doctor/dash-circle-fill-red.svg";
import PDF_icon from "../../assets/images/doctor/PDF_icon.png";

import Group1175 from "../../assets/images/doctor/doc1.png";
import Group1176 from "../../assets/images/doctor/doc2.png";
import Group1177 from "../../assets/images/doctor/doc3.png";
import Group1178 from "../../assets/images/doctor/doc4.png";
import CrouselCard from "../DashboardComponents/CrouselCard";
import DoctorSetting from "./DoctorSetting";
import ReviewPagination from "../../organisms/ReviewPagination";
import useFetch from "../../customHook/useFetch";
import useDeleteData from "../../customHook/useDelete";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import usePost from "../../customHook/usePost";
const ViewDoctor = ({ Id }) => {
  const location = useLocation();
  const receivedData = location.state?.data;
  const [docBtn, setDocBtn] = useState(0);
  const [doctorTimeTable, setdoctorTimeTable] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [specialistOptions, setspecialistOptions] = useState([]);
  const [presentDays, setpresentDays] = useState([]);

  const [addTimePostReq, setaddTimePostReq] = useState({
    doctor_id: 131,
    hospital_id: 456,
    schedules: [],
  });

  const setUpAvailableTime = () => {};
  const { postData } = usePost();
  const { deleteData, isLoadingTimeTable, errorTimeTable } = useDeleteData();
  const [selectDay, setSelectDay] = useState({
    sunday: {
      toggle: false,
      count: 1,
    },
    monday: {
      toggle: false,
      count: 1,
    },
    tuesday: {
      toggle: false,
      count: 1,
    },
    wednesday: {
      toggle: false,
      count: 1,
    },
    thursday: {
      toggle: false,
      count: 1,
    },
    friday: {
      toggle: false,
      count: 1,
    },
    saturday: {
      toggle: false,
      count: 1,
    },
  });

  const { data, isLoading, error } = useFetch(
    `${process.env.REACT_APP_DOCTOR_DETAIL}/${Id}`
  );

  const getTimeTableData = () => {
    deleteData(
      `${process.env.REACT_APP_GET_DOCTOR_TIMETABLE}/${123}`,
      (Data) => {
        setdoctorTimeTable(Data?.data?.timetable);
        setspecialistOptions(
          data?.data?.hospitals.map((i) => {
            return { value: i.name, label: i.name, id: i.id };
          })
        );
      }
    );
  };

  // REACT_APP_SET_DOCTOR_AVaAILABILITY
  const increaseDayCount = (day) => {
    setSelectDay((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        count: prevState[day].count + 1,
      },
    }));
  };

  const decreaseDayCount = (day) => {
    setSelectDay((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        count: prevState[day].count - 1,
      },
    }));
  };
  const handleChangeSelect = (val, name) => {};
  const checkingNew = () => {};

  function renderLoop(countDays = [], dayName) {
    const items = [];
    for (let i = 0; i < countDays.length; i++) {
      // const isLastElement = i === 0;

      items.push(
        <>
          <div
            className={`${countDays === 1 ? "" : "pb-3"} `}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ width: "141px" }}>
                <CustomDropDown
                  option={specialistOptions}
                  handleChangeSelect={handleChangeSelect}
                />
              </div>
              {/* .slice(0, -3) */}
              <TimeChanger Time={countDays[i].start_time} />

              <TimeChanger Time={countDays[i].end_time} />
            </div>
            {
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

  let settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const datavalues = [
    {
      id: 1,
      name: "Dustin Wilson",
      pic: Group1175,
      fun: "Fonctions",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, sed consequuntur! Ducimus, numquam!",
    },

    {
      id: 1,
      name: "Dustin Wilson",
      pic: Group1176,
      fun: "Fonctions",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, sed consequuntur! Ducimus, numquam!",
    },

    {
      id: 1,
      name: "Dustin Wilson",
      pic: Group1177,
      fun: "Fonctions",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, sed consequuntur! Ducimus, numquam!",
    },

    {
      id: 1,
      name: "Dustin Wilson",
      pic: Group1178,
      fun: "Fonctions",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, sed consequuntur! Ducimus, numquam!",
    },
  ];

  let filterTimeAvalibility = (dayID) => {
    let a = addTimePostReq.schedules.filter(
      (tableFilter) => tableFilter.day === dayID
    );

    return a[0]?.time_slots;
  };

  // copy all hospital values to update record
  useEffect(() => {
    const mappedArray = doctorTimeTable.reduce((result, item) => {
      const existingDayEntry = result.find((entry) => entry.day === item.day);

      if (existingDayEntry) {
        // If the day exists, push a new time_slots object to the existing entry
        existingDayEntry.time_slots.push({
          start_time: item.start_time.slice(0, -3),
          end_time: item.end_time.slice(0, -3),
          hospital_id: item.hospital_id,
        });
      } else {
        // If the day doesn't exist, create a new entry and add it to the result array
        result.push({
          day: item.day,
          time_slots: [
            {
              start_time: item.start_time.slice(0, -3),
              end_time: item.end_time.slice(0, -3),
              hospital_id: item.hospital_id,
            },
          ],
        });
      }

      return result;
    }, []);

    setaddTimePostReq({ ...addTimePostReq, schedules: mappedArray });
    setpresentDays(addTimePostReq?.schedules.map((schedule) => schedule?.day));
  }, [doctorTimeTable]);

  // value from drop down
  const hospitalDopDown = (hosName, id) => {
    const index = addTimePostReq.schedules.findIndex(
      (schedule) => schedule.day === id
    );

    if (index !== -1) {
      const timeSlot = addTimePostReq.schedules[index].time_slots[0];
      if (timeSlot.start_time === "" && timeSlot.end_time === "") {
        timeSlot.hospital_id = hosName;
      } else {
        addTimePostReq.schedules[index].time_slots.push({
          start_time: "",
          end_time: "",
          hospital_id: hosName,
        });
      }
    } else {
      addTimePostReq.schedules.push({
        day: id,
        time_slots: [
          {
            start_time: "",
            end_time: "",
            hospital_id: hosName,
          },
        ],
      });
    }
  };

  const staringTimeDrop = (time, dayId) => {
    const index = addTimePostReq.schedules.findIndex(
      (schedule) => schedule.day === dayId
    );
    if (index !== -1) {
      let lastOne = addTimePostReq.schedules[index].time_slots.length - 1;
      // If the entry with the day value exists, update its start_time field
      addTimePostReq.schedules[index].time_slots[lastOne].start_time = time;
    }
  };

  const endTimeDrop = (time, dayId) => {
    const index = addTimePostReq.schedules.findIndex(
      (schedule) => schedule.day === dayId
    );
    if (index !== -1) {
      let lastOne = addTimePostReq.schedules[index].time_slots.length - 1;
      // If the entry with the day value exists, update its start_time field
      addTimePostReq.schedules[index].time_slots[lastOne].end_time = time;
    }
  };

  const postDoctorAvalibility = () => {
    postData(
      `${process.env.REACT_APP_SET_DOCTOR_AVaAILABILITY}`,
      addTimePostReq
    );
  };

  return (
    // <div>ViewDoctor{receivedData?.name}</div>

    <>
      <div className="row mb-5 pb-lg-5 px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Profile</p>
        </div>

        <div className=" col-12 mt-4 pt-1">
          <p className="mb-0 doctor-header-top-text">
            <Link className="doc-link " to="/">
              DASHBOARD
            </Link>
            <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
            <span>
              <Link className="doc-link " to="doctors">
                <span>DOCTORS</span>{" "}
              </Link>
            </span>{" "}
            <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
            <span style={{ color: "#4FA6D1" }}>ALL DOCTORS</span>{" "}
          </p>
        </div>

        <div className="col-12 my-5 ">
          <div className="view-doctor-profile-border" style={{ width: "100%" }}>
            <div className="row mx-0 view-doctor-profile position-relative">
              <div className="col-12 view-doctor-profile-div1 "></div>
              <div className="col-12  view-doctor-profile-div2 ">
                <p className="mb-0 view-doctor-profile-div2-text1 pt-2">
                  {data?.data?.user?.name}
                </p>
                <p className="mb-0 view-doctor-profile-div2-text2">
                  {data?.data?.specialization?.name}
                </p>
              </div>
              <img
                className="position-absolute view-doctor-profile-img ml-4 "
                src={`${process.env.REACT_APP_IMAGE_URL}/${data?.data?.user?.profile_pic}`}
                alt=""
              />
            </div>

            <div className="row mx-2 my-lg-5 pt-4">
              <div className="col-12  d-flex justify-content-between">
                <button
                  onClick={() => {
                    setDocBtn(0);
                  }}
                  className={`${
                    docBtn === 0
                      ? "view-doctor-btn"
                      : "view-doctor-btn-noactive"
                  }`}
                  style={{ borderRadius: "6px 0px 0px 6px" }}
                >
                  Overview
                </button>
                <button
                  onClick={() => {
                    setDocBtn(1);
                  }}
                  className={`${
                    docBtn === 1
                      ? "view-doctor-btn"
                      : "view-doctor-btn-noactive"
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => {
                    setDocBtn(2);
                  }}
                  className={`${
                    docBtn === 2
                      ? "view-doctor-btn"
                      : "view-doctor-btn-noactive"
                  }`}
                >
                  Time Table
                </button>
                <button
                  onClick={() => {
                    setDocBtn(3);
                  }}
                  className={`${
                    docBtn === 3
                      ? "view-doctor-btn"
                      : "view-doctor-btn-noactive"
                  }`}
                  style={{ borderRadius: "0px 6px 6px 0px" }}
                >
                  Settings
                </button>
              </div>

              {docBtn === 0 && (
                <>
                  <div className="col-12 px-3 my-4 pt-lg-3">
                    <p className="mb-0 doc-overview-detail">
                      {data?.data?.about}
                    </p>
                  </div>
                  <div className="col-12 pt-2 mt-4">
                    <p className="mb-0 view-doc-special"> Qualification: </p>
                    <div className="row">
                      <div className="col-xl-6">
                        <p className="mb-0 pt-2">
                          {" "}
                          <img
                            className="pr-3 view-doc-sub-special "
                            src={RightArrowSpec}
                            alt=""
                          />{" "}
                          <span className="view-doc-sub-special">
                            {data?.data?.qualification}
                          </span>{" "}
                        </p>
                      </div>
                      <div className="col-xl-6">
                        <div
                          className=" ml-xl-5 mt-3 mt-xl-0 border d-flex justify-content-between align-items-center"
                          style={{ borderRadius: "10px" }}
                        >
                         
                          <div className="d-flex align-items-center">
                            <div className=" ">
                              <div style={{ width: "40px" }}>
                                <img
                                  className="w-100 h-100 border"
                                  src={
                                    data?.data.certificate
                                      .split("/")
                                      .pop()
                                      .split(".")[1] === "pdf"
                                      ? PDF_icon
                                      : `${process.env.REACT_APP_IMAGE_URL}/${data?.data.certificate}`
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className=" doc-overview-detail">
                              <div
                                className="pl-2 w-sm-50 w-100"
                                style={{ wordWrap: "break-word" }}
                              >
                                {data?.data.certificate.split("/").pop()}
                              </div>
                            </div>
                          </div>
                          <div className="  d-flex justify-content-end pr-3">
                            <a
                              href={`${process.env.REACT_APP_IMAGE_URL}/${data?.data.certificate}`}
                              download
                              target="_blank"
                            >
                              <div
                                className="doc-overview-detail cursor-pointer text-right"
                                style={{ color: "red", fontSize: "14px" }}
                              >
                                View Detail
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pt-2 mt-4">
                    <p className="mb-0 view-doc-special"> Specialties: </p>
                    <p className="mb-0 pt-2">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special "
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special">
                        {data?.data?.specialization?.name}
                      </span>{" "}
                    </p>
                    {/* <p className="mb-0">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special"
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special">
                        {" "}
                        Pregnancy care{" "}
                      </span>
                    </p>
                    <p className="mb-0">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special"
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special">
                        Surgical procedures{" "}
                      </span>
                    </p>
                    <p className="mb-0">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special"
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special">
                        {" "}
                        Specialty care{" "}
                      </span>
                    </p>
                    <p className="mb-0">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special"
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special"> Conclusion </span>
                    </p> */}
                  </div>

                  <div className="col-12 pt-2 mt-4">
                    <p className="mb-0 view-doc-special">
                      {" "}
                      <span className="view-doc-special">
                        {" "}
                        Consultancy Charges:{" "}
                      </span>
                    </p>
                    <p className="mb-0 pt-2">
                      {" "}
                      <img
                        className="pr-3 view-doc-sub-special"
                        src={RightArrowSpec}
                        alt=""
                      />{" "}
                      <span className="view-doc-sub-special">
                        {" "}
                        $50/Patient{" "}
                      </span>
                    </p>
                  </div>
                </>
              )}

              {docBtn === 1 && (
                <>
                  <ReviewPagination />
                  {/* <div className="col-12  my-4 pt-lg-3 px-md-5 ">
                    <p className="mb-0 doc-review-detail mx-5 px-lg-5 text-center">
                      " There is now an abundance of readable dummy texts. These
                      are usually used when a text is required purely to fill a
                      space. These alternatives to the classic Lorem Ipsum texts
                      are often amusing and tell short, funny or nonsensical “
                    </p>
                  </div>

                  <div className="col-12 pb-5">
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <Slider {...settings}>
                          {data &&
                            data.map((el) => {
                              return (
                                <div className="px-2 ">
                                  <CrouselCard el={el} />
                                </div>
                              );
                            })}
                        </Slider>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                  </div> */}
                </>
              )}

              {docBtn === 2 && (
                <>
                  <div className="col-12  my-4 pt-lg-3 ">
                    <div className="row mx-0 ">
                      <div className="col-lg-5 pr-0 pb-2 d-flex justify-content-between ">
                        <span className="time-table-text pl-3">Time Table</span>{" "}
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            setModal2Open(true);
                            getTimeTableData();
                          }}
                          src={TimeTablePencil}
                          alt=""
                        />
                      </div>

                      <Modal
                        className="doctor-filter-modal"
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                        width={"60%"}
                        footer={
                          <div className="row px-3 mt-4 mb-2">
                            <div className="col-6"></div>

                            <div className="col-6 d-flex justify-content-end mt-3">
                              <button
                                className="apply-filter"
                                onClick={postDoctorAvalibility}
                              >
                                Save Schedule
                              </button>
                            </div>
                          </div>
                        }
                      >
                        <div className="row px-2 border-bottom">
                          <div className="col-12 ">
                            <p className="doc-add-filter">Time Table</p>
                          </div>
                        </div>

                        <div className="row px-3 mt-4">
                          <p className=" mb-0 time-edit-text1">
                            Set Standard Hours
                          </p>
                        </div>

                        <div className="row px-3  mt-lg-4 mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(1)}
                                  onClick={(e) => {
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center align-items-start">
                            {
                              // selectDay.sunday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(1) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={1}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      dayId={1}
                                      selector={true}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      dayId={1}
                                      selector={false}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("sunday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                      style={{
                                        pointerEvents: `${
                                          addTimePostReq.schedules[1]
                                            ?.time_slots[0].start_time === "" ||
                                          addTimePostReq.schedules[1]
                                            ?.time_slots[0].end_time === ""
                                            ? "none"
                                            : ""
                                        }`,
                                      }}
                                    />
                                  </span>
                                </div>
                              ) : null
                            }

                            {
                              // selectDay.sunday.toggle &&
                              renderLoop(filterTimeAvalibility(1), "sunday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(2)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {
                              // selectDay.monday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(2) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={2}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      dayId={2}
                                      selector={true}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      dayId={2}
                                      selector={false}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("monday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : null
                            }
                            {
                              // selectDay.monday.toggle &&
                              renderLoop(filterTimeAvalibility(2), "monday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(3)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {
                              // selectDay.tuesday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(3) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={3}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      dayId={3}
                                      selector={true}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      dayId={3}
                                      selector={false}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("tuesday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : null
                            }
                            {
                              // selectDay.tuesday.toggle &&
                              renderLoop(filterTimeAvalibility(3), "tuesday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(4)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {
                              // selectDay.wednesday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(4) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={4}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      selector={true}
                                      dayId={4}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      selector={false}
                                      dayId={4}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("wednesday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : null
                            }
                            {
                              // selectDay.wednesday.toggle &&
                              renderLoop(filterTimeAvalibility(4), "wednesday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(5)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {
                              // selectDay.thursday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(5) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={5}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      selector={true}
                                      dayId={5}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      selector={false}
                                      dayId={5}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("thursday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : null
                            }

                            {
                              // selectDay.thursday.toggle &&
                              renderLoop(filterTimeAvalibility(5), "thursday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(6)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {
                              // selectDay.friday.toggle
                              addTimePostReq?.schedules
                                .map((schedule) => schedule?.day)
                                .includes(6) ? (
                                <div
                                  className="mb-3"
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <div style={{ width: "141px" }}>
                                      <CustomDropDown
                                        option={specialistOptions}
                                        hospitalDopDown={hospitalDopDown}
                                        dayId={6}
                                        handleChangeSelect={handleChangeSelect}
                                      />
                                    </div>

                                    <TimeChanger
                                      staringTimeDrop={staringTimeDrop}
                                      selector={true}
                                      dayId={6}
                                    />

                                    <TimeChanger
                                      endTimeDrop={endTimeDrop}
                                      selector={false}
                                      dayId={6}
                                    />
                                  </div>
                                  <span className="pl-lg-3 pl-1">
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        increaseDayCount("friday");
                                        setaddTimePostReq(addTimePostReq);
                                      }}
                                      src={TimeTableAddBtn}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              ) : null
                            }
                            {
                              // selectDay.friday.toggle &&
                              renderLoop(filterTimeAvalibility(6), "friday")
                            }
                          </div>
                        </div>

                        <div className="row px-3  mb-1">
                          <div className="col-lg-4 px-1 d-flex justify-content-end align-items-start pt-1 ">
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
                                  checked={addTimePostReq?.schedules
                                    .map((schedule) => schedule?.day)
                                    .includes(7)}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.saturday.toggle |
                            addTimePostReq?.schedules
                              .map((schedule) => schedule?.day)
                              .includes(7) ? (
                              <div
                                className="mb-3"
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                  }}
                                >
                                  <div style={{ width: "141px" }}>
                                    <CustomDropDown
                                      option={specialistOptions}
                                      hospitalDopDown={hospitalDopDown}
                                      dayId={7}
                                      handleChangeSelect={handleChangeSelect}
                                    />
                                  </div>

                                  <TimeChanger
                                    staringTimeDrop={staringTimeDrop}
                                    selector={true}
                                    dayId={7}
                                  />

                                  <TimeChanger
                                    endTimeDrop={endTimeDrop}
                                    selector={false}
                                    dayId={7}
                                  />
                                </div>
                                <span className="pl-lg-3 pl-1">
                                  <img
                                    className="cursor-pointer"
                                    onClick={() => {
                                      increaseDayCount("saturday");
                                      setaddTimePostReq(addTimePostReq);
                                    }}
                                    src={TimeTableAddBtn}
                                    alt=""
                                  />
                                </span>
                              </div>
                            ) : null}
                            {
                              // selectDay.saturday.toggle &&
                              renderLoop(filterTimeAvalibility(7), "saturday")
                            }
                          </div>
                        </div>
                      </Modal>

                      <div className="col"></div>

                      <div className="col"></div>
                    </div>

                    <div className="row mx-0 ">
                      <div className="col-lg-5 py-4 time-table-border  px-4">
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

                      <div className="col mt-lg-0 mt-4 d-flex flex-column justify-content-center align-items-center">
                        <img className="" src={TimeTablePhoneIcon} alt="" />
                        <p className="mt-4 pt-2 mb-0 time-table-phone-text">
                          Phone
                        </p>
                        <p className=" px-4 pt-2 mb-0 text-center time-table-phone-text1">
                          Great doctor if you need your family member to get
                          effective immediate assistance
                        </p>
                        <p className="mb-0 pt-4 mt-1 time-table-phone-text2 cursor-pointer">
                          <a
                            className="time-table-phone-text2-link"
                            href="tel:+152 534-468-854"
                          >
                            +152 534-468-854
                          </a>
                        </p>
                      </div>

                      <div className="col mt-lg-0 mt-4 d-flex flex-column justify-content-center align-items-center">
                        <img src={TimeTableMessageIcon} alt="" />
                        <p className="mt-4 pt-2 mb-0 time-table-phone-text">
                          Email
                        </p>
                        <p className=" px-4 pt-2 mb-0 text-center time-table-phone-text1">
                          Great doctor if you need your family member to get
                          effective immediate assistance
                        </p>

                        <p className="mb-0 pt-4 mt-1 time-table-phone-text2 cursor-pointer">
                          <a
                            className="time-table-phone-text2-link"
                            href="mailto:app.spordy@gmail.com"
                          >
                            {" "}
                            contact@example.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {docBtn === 3 && (
                <>
                  <DoctorSetting id={Id} rawData={data?.data} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDoctor;
