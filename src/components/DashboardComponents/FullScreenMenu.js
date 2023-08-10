import React from "react";
import { Link } from "react-router-dom";

// css
import "../../assets/css/dashboard.scss";

// svg
import ClockIcon from "../../assets/images/dashboard/ClockIcon.svg";
import ClockIconBlack from "../../assets/images/dashboard/ClockIconBlack.svg";
import PulseIcon from "../../assets/images/dashboard/PulseIcon.svg";
import PulseIconBlue from "../../assets/images/dashboard/PulseIconBlue.svg";
import DoctorIcon from "../../assets/images/dashboard/DoctorIcon.svg";
import DoctorIconBlue from "../../assets/images/dashboard/DoctorIconBlue.svg";
import HospitalIcon from "../../assets/images/dashboard/HospitalIcon.svg";
import HospitalIconBlue from "../../assets/images/dashboard/HospitalIconBlue.svg";
import PharmacyIcon from "../../assets/images/dashboard/PharmacyIcon.svg";
import PharmacyIconBlack from "../../assets/images/dashboard/PharmacyIconBlack.svg";
import LaboratoryIcon from "../../assets/images/dashboard/LaboratoryIcon.svg";
import LaboratoryIconBlue from "../../assets/images/dashboard/LaboratoryIconBlue.svg";
import PatientIcon from "../../assets/images/dashboard/PatientIcon.svg";
import PatientIconBlue from "../../assets/images/dashboard/PatientIconBlue.svg";
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";
import DownIconBlue from "../../assets/images/dashboard/DownIconBlue.svg";
import LeftDropIcon from "../../assets/images/dashboard/LeftDropIcon.svg";
import BloodIconBlue from "../../assets/images/dashboard/BloodIconBlue.svg";
import BloodIconBlack from "../../assets/images/dashboard/BloodIconBlack.svg";
import HomeServiceIcon from "../../assets/images/dashboard/HomeServiceIcon.svg";
import HomeServiceIconBlue from "../../assets/images/dashboard/HomeServiceIconBlue.svg";
import TreatmentSponsorIcon from "../../assets/images/dashboard/treatment-sponsor-icon.svg";
import TreatmentSponsorBlueIcon from "../../assets/images/dashboard/treatment-sponsor-blue.svg";
import bluePromo from "../../assets/images/dashboard/Promo.svg";
import promoIcon from "../../assets/images/dashboard/ps_promo.svg";
import { ValidateRoute, ValidUI } from "../../pages/privateRoutes";

const FullScreenMenu = ({
  menuDropDownFullScreen,
  setMenuDropDownFullScreen,
  menuLeftText,
  menuIconCenter,
  menuIconLeftPadding,
  menuLeftRightDropDown1,
  menuLeftRightDropDown2,
  setMobileMenu1,
  MobileMenu1,
}) => {
  console.log("menuDropDownFullScreen", menuDropDownFullScreen);
  return (
    <div className="hover-effect">
      {ValidUI() === "superAdmin" || ValidUI() === "HospitalAdmin" ? (
        <Link className="maweidi-link ml-md-auto ml-0 " to="/dashboard">
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "dashboard",
                toggle: !menuDropDownFullScreen.toggle,
              });
              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row"
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1}    d-flex align-items-center ${menuIconCenter}`}
              >
                <div className=" px-2  dashboard-left-icon">
                  <img
                    src={`${
                      menuDropDownFullScreen.name === "dashboard"
                        ? ClockIcon
                        : ClockIconBlack
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="/dashboard">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 pl-1 dashboard-left-icon-text  ${
                        menuDropDownFullScreen.name === "dashboard"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Dashboard
                    </p>
                  </span>
                </Link>
              </div>

              <div
                className={` ${menuLeftRightDropDown2}  px-0 d-flex align-items-center justify-content-end`}
              ></div>
            </div>
          </div>
        </Link>
      ) : null}

      {/* Appointments */}
      {ValidUI() === "Doctor" ||
      ValidUI() === "HospitalAdmin" ||
      ValidUI() === "superAdmin" ? (
        <Link className="maweidi-link ml-md-auto ml-0" to="/appointment">
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "appointment",
                toggle: !menuDropDownFullScreen.toggle,
              });

              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row"
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
              >
                <div className="px-2  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "appointment"
                        ? PulseIconBlue
                        : PulseIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="/appointment">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 pl-1 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "appointment"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Appointments
                    </p>
                  </span>
                </Link>
              </div>

              <div
                className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
              ></div>
            </div>
          </div>
        </Link>
      ) : null}

      {/* hospital  */}
      {ValidUI() === "superAdmin" ||
       ValidUI() === "HospitalAdmin" 
       ? (
        <Link className="maweidi-link ml-md-auto ml-0" to="/hospitals">
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "hospital",
                toggle: !menuDropDownFullScreen.toggle,
              });
              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row"
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
              >
                <div className=" px-2 dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "hospital"
                        ? HospitalIconBlue
                        : HospitalIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="/hospitals">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 pl-2 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "hospital"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Hospitals
                    </p>
                  </span>
                </Link>
              </div>

              <div
                className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
              ></div>
            </div>
          </div>
        </Link>
      ) : null}

      {/* doctor */}

      {ValidUI() === "Doctor" ||
      ValidUI() === "HospitalAdmin" ||
      ValidUI() === "superAdmin" ? (
        <div
          className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
        >
          <div
            className=" row "
            style={{ display: `${menuLeftText}`, width: "100%" }}
          >
            <Link
              className="maweidi-link ml-0 "
              style={{ width: "83%" }}
              to="/doctors"
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "doc",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                  setMobileMenu1(!MobileMenu1);
                }}
              >
                <div className=" px-2 dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "doc"
                        ? DoctorIconBlue
                        : DoctorIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="/doctors">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3  dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "doc"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Doctors
                    </p>
                  </span>
                </Link>
              </div>
            </Link>
            <div
              className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
            >
              <img
                className="size-small-screen"
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "doc",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                }}
                src={`${
                  menuDropDownFullScreen.name === "doc"
                    ? DownIconBlue
                    : DownIcon
                }`}
                alt=""
                style={{ display: `${menuLeftText}` }}
              />
            </div>

            {menuDropDownFullScreen.toggle &&
              menuDropDownFullScreen.name === "doc" && (
                <>
                  <div className="sub-menu1-top-padding sub-menu1-1st  col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>

                    <Link className="maweidi-link " to="/doctors">
                      <span
                        className={`pl-lg-2 ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "alldoc"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "alldoc",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        All Doctors
                      </span>
                    </Link>
                  </div>

                  <div className="sub-menu1-top-padding col-12 mt-2 pt-1 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/doctors/add">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "adddoc"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "adddoc",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Add Doctor
                      </span>
                    </Link>
                  </div>
                  <div className="sub-menu1-top-padding col-12 mt-2 pt-1 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/doctors/availability">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "adddoc"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "adddoc",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Doctor Availability
                      </span>
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      ) : null}

      {/* Patient */}

      {ValidUI() === "HospitalAdmin" || ValidUI() === "superAdmin" ? (
        <div
          className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
        >
          <div
            className=" row"
            style={{ display: `${menuLeftText}`, width: "100%" }}
          >
            <Link
              className="maweidi-link ml-0 "
              style={{ width: "83%" }}
              to="/patients"
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "patient",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                  setMobileMenu1(!MobileMenu1);
                }}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "patient"
                        ? PatientIconBlue
                        : PatientIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="/patients">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "patient"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Patients
                    </p>
                  </span>
                </Link>
              </div>
            </Link>
            <div
              className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
            >
              <img
                className="size-small-screen"
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "patient",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                }}
                src={`${
                  menuDropDownFullScreen.name === "patient"
                    ? DownIconBlue
                    : DownIcon
                }`}
                alt=""
                style={{ display: `${menuLeftText}` }}
              />
            </div>

            {menuDropDownFullScreen.toggle &&
              menuDropDownFullScreen.name === "patient" && (
                <>
                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/patients">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "allpatient"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "allpatient",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        All Patients
                      </span>
                    </Link>
                  </div>

                  <div className="sub-menu1-top-padding col-12 mt-2 pt-1 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/patients/add">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "addpatient"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "addpatient",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Add Patient
                      </span>
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      ) : null}

      {/* pharmacy */}
      {/* || ValidUI() === "HospitalAdmin" */}
      {ValidUI() === "PharmacyAdmin" || ValidUI() === "superAdmin" ? (
        <div
          className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
        >
          <div
            className=" row"
            style={{ display: `${menuLeftText}`, width: "100%" }}
          >
            <Link
              className="maweidi-link ml-0 "
              style={{ width: "83%" }}
              to="pharmacy"
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "pharmacy",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                  setMobileMenu1(!MobileMenu1);
                }}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-0"
                    style={{ width: "20px" }}
                    src={`${
                      menuDropDownFullScreen.name === "pharmacy"
                        ? PharmacyIcon
                        : PharmacyIconBlack
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="pharmacy">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "pharmacy"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Pharmacy
                    </p>
                  </span>
                </Link>
              </div>
            </Link>
            <div
              className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
            >
              <img
                className="size-small-screen"
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "pharmacy",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                }}
                src={`${
                  menuDropDownFullScreen.name === "pharmacy"
                    ? DownIconBlue
                    : DownIcon
                }`}
                alt=""
                style={{ display: `${menuLeftText}` }}
              />
            </div>

            {menuDropDownFullScreen.toggle &&
              menuDropDownFullScreen.name === "pharmacy" && (
                <>
                  {/* 1st Pharmacy (1) sub option  */}

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/pharmacy">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "pharmacy"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "pharmacy",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Pharmacy List
                      </span>
                    </Link>
                  </div>
                  {/* 2nd Pharmacy (1) sub option  */}

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/pharmacy/add">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "addpharmacy"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "addpharmacy",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Add Pharmacy
                      </span>
                    </Link>
                  </div>
                  {/* 3rd Pharmacy (1) sub option  */}

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/pharmacy/shop">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "pharmacyshop"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "pharmacyshop",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Shop
                      </span>
                    </Link>
                  </div>

                  {/* 3rd Pharmacy (1) sub option  */}

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/pharmacy/shop/detail">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "pharmacyshopdetail"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "pharmacyshopdetail",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        All Orders
                      </span>
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      ) : null}

      {/* Laboratory */}

      {ValidUI() === "LaboratoryAdmin" ||
      ValidUI() === "superAdmin" ||
      ValidUI() === "HospitalAdmin" ? (
        <div
          className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
        >
          <div
            className=" row"
            style={{ display: `${menuLeftText}`, width: "100%" }}
          >
            <Link
              className="maweidi-link ml-0 "
              style={{ width: "83%" }}
              to="laboratory"
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "laboratory",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                  setMobileMenu1(!MobileMenu1);
                }}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "laboratory"
                        ? LaboratoryIconBlue
                        : LaboratoryIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link " to="laboratory">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "laboratory"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Laboratory
                    </p>
                  </span>
                </Link>
              </div>
            </Link>
            <div
              className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
            >
              <img
                className="size-small-screen"
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "laboratory",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                }}
                src={`${
                  menuDropDownFullScreen.name === "laboratory"
                    ? DownIconBlue
                    : DownIcon
                }`}
                alt=""
                style={{ display: `${menuLeftText}` }}
              />
            </div>

            {menuDropDownFullScreen.toggle &&
              menuDropDownFullScreen.name === "laboratory" && (
                <>
                  {/* 1st Laboratory (1) sub option  */}
                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/laboratory">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "laboratorylist"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "laboratorylist",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Laboratory List
                      </span>
                    </Link>
                  </div>
                  {/* 1st Laboratory (1) sub option  */}
                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>

                    <Link className="maweidi-link " to="/laboratory/add">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "addlab"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "addlab",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Add Laboratory
                      </span>
                    </Link>
                  </div>
                  {/* 2nd Laboratory (1) sub option  */}
                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/bloodtest">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "bloodtest"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "bloodtest",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Tests
                      </span>
                    </Link>
                  </div>

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/xray/orderlist">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname == "xray"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "xray",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Test Requests
                      </span>
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      ) : null}

      {/* Blood donation */}
      {ValidUI() === "HospitalAdmin" || ValidUI() === "superAdmin" ? (
        <Link
          className="maweidi-link ml-md-auto ml-0 w-100"
          to="blood-donation"
        >
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center w-100 ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "blooddonation",
                toggle: !menuDropDownFullScreen.toggle,
              });
              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row"
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1}  d-flex align-items-center ${menuIconCenter}`}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "blooddonation"
                        ? BloodIconBlue
                        : BloodIconBlack
                    }`}
                    alt=""
                  />
                </div>

                <Link
                  className="maweidi-link text-left ml-2 pl-1 ml-sm-0 pl-sm-0"
                  to="blood-donation"
                >
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text ${
                        menuDropDownFullScreen.name === "blooddonation"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Blood Donation
                    </p>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      {/* Home Service Provider */}
      {ValidUI() === "HospitalAdmin" || ValidUI() === "superAdmin" ? (
        <Link
          className="maweidi-link ml-md-auto ml-0 w-100 "
          to="/home-service-provider"
        >
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center  w-100 ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "homeservice",
                toggle: !menuDropDownFullScreen.toggle,
              });
              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row "
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center w-100  ${menuIconCenter}`}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "homeservice"
                        ? HomeServiceIconBlue
                        : HomeServiceIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link
                  className="maweidi-link text-left"
                  to="/home-service-provider"
                >
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text  ${
                        menuDropDownFullScreen.name === "homeservice"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Home Service Provider
                    </p>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      {/* Treatment Sponsor */}

      {ValidUI() === "HospitalAdmin" || ValidUI() === "superAdmin" || ValidUI() === "Doctor" ? (
        <div
          className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center ${menuIconCenter} ${menuIconLeftPadding}`}
        >
          <div
            className=" row"
            style={{ display: `${menuLeftText}`, width: "100%" }}
          >
            <div
              className={`${menuLeftRightDropDown1} d-flex align-items-center ${menuIconCenter}`}
            >
              <div className="  dashboard-left-icon">
                <img
                  className="py-0"
                  style={{ width: "20px" }}
                  src={`${
                    menuDropDownFullScreen.name === "treatmentsponsor"
                      ? TreatmentSponsorBlueIcon
                      : TreatmentSponsorIcon
                  }`}
                  alt=""
                />
              </div>

              <Link className="maweidi-link " to="/treatment-sponsor">
                <span style={{ display: `${menuLeftText}` }}>
                  <p
                    className={`mb-0 pl-lg-3 text-left dashboard-left-icon-text ${
                      menuDropDownFullScreen.name === "treatmentsponsor"
                        ? "seleted-menu"
                        : ""
                    } `}
                    style={{ color: "#535353" }}
                    onClick={() => {
                      setMenuDropDownFullScreen({
                        ...menuDropDownFullScreen,
                        name: "treatmentsponsor",
                        toggle: !menuDropDownFullScreen.toggle,
                      });
                      setMobileMenu1(!MobileMenu1);
                    }}
                  >
                    Treatment Sponsor
                  </p>
                </span>
              </Link>
            </div>

            <div
              className={` ${menuLeftRightDropDown2} px-0 d-flex align-items-center justify-content-end`}
            >
              <img
                className="size-small-screen"
                onClick={() => {
                  setMenuDropDownFullScreen({
                    ...menuDropDownFullScreen,
                    name: "treatmentsponsor",
                    toggle: !menuDropDownFullScreen.toggle,
                  });
                }}
                src={`${
                  menuDropDownFullScreen.name === "treatmentsponsor"
                    ? DownIconBlue
                    : DownIcon
                }`}
                alt=""
                style={{ display: `${menuLeftText}` }}
              />
            </div>

            {menuDropDownFullScreen.toggle &&
              menuDropDownFullScreen.name === "treatmentsponsor" && (
                <>
                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/treatment-sponsor">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "treatmentsponsor"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          // let sbtoggle = {"subtoggle":false}

                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              // subtoggle: true, // or any other value you want to update it to

                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "treatmentsponsor",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Add Needy Patient
                      </span>
                    </Link>
                  </div>

                  <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                    <span class="dot"></span>
                    <Link className="maweidi-link " to="/needy-patients">
                      <span
                        className={`pl-lg-2  ${
                          menuDropDownFullScreen.subMenuMobile.subname ==
                          "needypatientslist"
                            ? "seleted-menu"
                            : ""
                        } `}
                        onClick={() => {
                          // let sbtoggle = {"subtoggle":false}

                          setMenuDropDownFullScreen((prevState) => ({
                            ...prevState,
                            subMenuMobile: {
                              ...prevState.subMenuMobile,
                              // subtoggle: true, // or any other value you want to update it to

                              subtoggle: !prevState.subMenuMobile.subtoggle,
                              subname: "needypatientslist",
                            },
                          }));
                          setMobileMenu1(!MobileMenu1);
                        }}
                      >
                        Needy Patients List
                      </span>
                    </Link>
                  </div>

                  {/* <div className="sub-menu1-top-padding col-12 mt-lg-2 ml-5 left-drop-down d-flex align-items-center">
                  <img
                    className=""
                    src={LeftDropIcon}
                    alt=""
                    onClick={() => {
                      // let sbtoggle = {"subtoggle":false}

                      setMenuDropDownFullScreen((prevState) => ({
                        ...prevState,
                        subMenuMobile: {
                          ...prevState.subMenuMobile,
                          // subtoggle: true, // or any other value you want to update it to

                          subtoggle: !prevState.subMenuMobile.subtoggle,
                          subname: "sponsorslist",
                        },
                      }));
                    }}
                  />
                  <Link className="maweidi-link " to="/sponsors-list">
                    <span
                      className={`pl-lg-2  ${
                        menuDropDownFullScreen.subMenuMobile.subname ==
                        "sponsorslist"
                          ? "seleted-menu"
                          : ""
                      } `}
                      onClick={() => {
                        // let sbtoggle = {"subtoggle":false}

                        setMenuDropDownFullScreen((prevState) => ({
                          ...prevState,
                          subMenuMobile: {
                            ...prevState.subMenuMobile,
                            // subtoggle: true, // or any other value you want to update it to

                            subtoggle: !prevState.subMenuMobile.subtoggle,
                            subname: "sponsorslist",
                          },
                        }));
                        setMobileMenu1(!MobileMenu1);
                      }}
                    >
                      Sponsors List
                    </span>
                  </Link>
                </div> */}
                </>
              )}
          </div>
        </div>
      ) : null}

      { ValidUI() === "superAdmin" ? (
        <Link className="maweidi-link ml-md-auto ml-0 w-100 " to="banner-promo">
          <div
            className={`mt-lg-4 mt-0 pt-1 d-flex align-items-center  w-100 ${menuIconCenter} ${menuIconLeftPadding}`}
            onClick={() => {
              setMenuDropDownFullScreen({
                ...menuDropDownFullScreen,
                name: "bannerpromo",
                toggle: !menuDropDownFullScreen.toggle,
              });
              setMobileMenu1(!MobileMenu1);
            }}
          >
            <div
              className=" row "
              style={{ display: `${menuLeftText}`, width: "100%" }}
            >
              <div
                className={`${menuLeftRightDropDown1} d-flex align-items-center w-100  ${menuIconCenter}`}
              >
                <div className="  dashboard-left-icon">
                  <img
                    className="py-1"
                    src={`${
                      menuDropDownFullScreen.name === "bannerpromo"
                        ? bluePromo
                        : promoIcon
                    }`}
                    alt=""
                  />
                </div>

                <Link className="maweidi-link text-left" to="banner-promo">
                  <span style={{ display: `${menuLeftText}` }}>
                    <p
                      className={`mb-0 pl-lg-3 dashboard-left-icon-text  ${
                        menuDropDownFullScreen.name === "bannerpromo"
                          ? "seleted-menu"
                          : ""
                      } `}
                      style={{ color: "#535353" }}
                    >
                      Banner and Promo
                    </p>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default FullScreenMenu;
