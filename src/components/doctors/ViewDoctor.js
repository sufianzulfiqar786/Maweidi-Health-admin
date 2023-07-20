import React, { useState } from "react";
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
import Group1175 from "../../assets/images/doctor/doc1.png";
import Group1176 from "../../assets/images/doctor/doc2.png";
import Group1177 from "../../assets/images/doctor/doc3.png";
import Group1178 from "../../assets/images/doctor/doc4.png";
import CrouselCard from "../DashboardComponents/CrouselCard";
import DoctorSetting from "./DoctorSetting";
import ReviewPagination from "../../organisms/ReviewPagination";
import useFetch from "../../customHook/useFetch";

const ViewDoctor = ({ Id }) => {
  const location = useLocation();
  const receivedData = location.state?.data;
  const [docBtn, setDocBtn] = useState(0);
  const [modal2Open, setModal2Open] = useState(false);
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

  const { data, isLoading, error } = useFetch(
    `${process.env.REACT_APP_DOCTOR_DETAIL}/${Id}`
  );
  function renderLoop(countDays, dayName) {
    const items = [];
    for (let i = 0; i < countDays; i++) {
      items.push(
        <>
          <div className={`${countDays === 1 ? "" : "pb-3"} `}>
            <TimeChanger />

            <span className="px-lg-3 px-1 time-selector-to">To</span>

            <TimeChanger />

            <span className="pl-lg-3 pl-1">
              <img
                className="cursor-pointer"
                onClick={() => increaseDayCount(dayName)}
                src={TimeTableAddBtn}
                alt=""
              />
            </span>
          </div>
        </>
      );
    }
    return items;
  }

  const increaseDayCount = (day) => {
    setSelectDay((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        count: prevState[day].count + 1,
      },
    }));
  };

  let settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const dataa = [
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
                      A gynecologist is a surgeon who specializes in the female
                      reproductive system, which includes the cervix, fallopian
                      tubes, ovaries, uterus, vagina and vulva. Menstrual
                      problems, contraception, sexuality, menopause and
                      infertility issues are diagnosed and treated by a
                      gynecologist; most gynecologists also provide prenatal
                      care, and some provide primary care.
                    </p>
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
                        Women's health services
                      </span>{" "}
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
                    </p>
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
                          onClick={() => setModal2Open(true)}
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
                        width={735}
                        footer={
                          <div className="row px-3 mt-4 mb-2">
                            <div className="col-6"></div>

                            <div className="col-6 d-flex justify-content-end mt-3">
                              <button className="apply-filter">
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center align-items-start">
                            {selectDay.sunday.toggle &&
                              renderLoop(selectDay.sunday.count, "sunday")}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.monday.toggle &&
                              renderLoop(selectDay.monday.count, "monday")}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.tuesday.toggle &&
                              renderLoop(selectDay.tuesday.count, "tuesday")}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.wednesday.toggle &&
                              renderLoop(
                                selectDay.wednesday.count,
                                "wednesday"
                              )}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.thursday.toggle &&
                              renderLoop(selectDay.thursday.count, "thursday")}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.friday.toggle &&
                              renderLoop(selectDay.friday.count, "friday")}
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

                          <div className="col-lg-8 d-flex  flex-column  align-items-lg-end align-items-md-center">
                            {selectDay.saturday.toggle &&
                              renderLoop(selectDay.saturday.count, "saturday")}
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
