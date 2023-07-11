import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// css
import "../assets/css/dashboard.scss";

// png
import DashboardCom from "../components/DashboardComponents/DashboardCom";

import FullScreenMenu from "../components/DashboardComponents/FullScreenMenu";
import Appointments from "../pages/Appointments";
import Hospital from "./Hospital/Hospital";
import AddHospital from "../../src/components/Hospital/AddHospital";
import AllDoctor from "./Doctor/AllDoctor";
import AllPatients from "./Patients/AllPatients";
import AddPatient from "./Patients/AddPatient";
import AddDoctor from "./Doctor/AddDoctor";
import ViewDoctor from "../components/doctors/ViewDoctor";
import PatientProfile from "./Patients/patientprofile/PatientProfile";
import Pharmacy from "./Pharmacy/pharmacy";
import PharmacyShop from "./Pharmacy/PharmacyShop";
import PharmacyShopDetail from "./Pharmacy/PharmacyShopDetail";
import BloodTest from "./Laboratory/bloodtest/BloodTest";
import XRay from "./Laboratory/xray/XRay";
import LaboratoryList from "./Laboratory/LaboratoryList";
import TestCartDetails from "./Laboratory/bloodtest/TestCartDetails";
import BloodTestOrderedList from "./Laboratory/bloodtest/BloodTestOrderedList";
import XRayOrderedList from "./Laboratory/xray/XRayOrderedList";
import XRayCartDetails from "./Laboratory/xray/XRayCartDetails";
import BloodDonation from "./Blood Donation/BloodDonation";
import BannerPromo from "./BannerPromo/BannerPromo";
import SiteFooter from "../organisms/Footer/Footer";
import Header from "../organisms/Header/Header";
import ManageRoles from "../components/DashboardComponents/ManageRoles";
import RolePermission from "../components/ManageRoles/RolePermission";
import AllRoles from "../components/ManageRoles/AllRoles";
import Privacy from "./Privacy/Privacy";
import HomeService from "./HomeService/HomeService";
import AddNeedyPatient from "./TreatmentSponsor/AddNeedyPatient";
import NeedyPatientsList from "./TreatmentSponsor/NeedyPatientsList";
import SponsorsList from "./TreatmentSponsor/SponsorsList";
import EditHospital from "../components/Hospital/EditHospital";
import PharmacyViewOrderlistDetail from "./Pharmacy/PharmacyViewOrderlistDetail";
import AddPharmacy from "./Pharmacy/AddPharmacy";
import AddLab from "./Laboratory/AddLab";
import EditPatient from "./Patients/EditPatient";

import { ValidateRoute, DefultRoute } from "./privateRoutes";
const Dashboard = () => {
  let location = useLocation();
  const [menu, setMenu] = useState(0);
  const [menuLeft, setMenuLeft] = useState("col-3");
  const [menuRight, setMenuRight] = useState("col-9");
  const [menuLeftText, setMenuLeftText] = useState("");
  const [menuLeftRightDropDown1, setMenuLeftRightDropDown1] =
    useState("col-10");
  const [menuLeftRightDropDown2, setMenuLeftRightDropDown2] = useState("col-2");
  const [menuIconCenter, setMenuIconCenter] = useState("");
  const [menuIconLeftPadding, setMenuIconLeftPadding] = useState("pl-3");
  const [MobileMenu1, setMobileMenu1] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  const [menuDropDownFullScreen, setMenuDropDownFullScreen] = useState({
    name: "dashboard",
    toggle: false,
    subMenuMobile: {
      subname: "",
      subtoggle: false,
    },
  });

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 991);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) {
      setMenuLeft("col-0");
      setMenuRight("col-12");
    } else {
      setMenuLeft("col-3");
      setMenuRight("col-9");
    }
  }, [isLargeScreen]);

  const handleMenu = () => {
    if (isLargeScreen) {
      if (menu === 0) {
        setMenu(1);
        setMenuLeft("col-0");
        setMenuRight("col-12");
        setMenuLeftText("none");
        setMenuIconCenter("justify-content-center");
        setMenuIconLeftPadding("");
        setMenuLeftRightDropDown1("col-12");
        setMenuLeftRightDropDown2("");
      } else {
        setMenu(0);
        setMenuLeft("col-3");
        setMenuRight("col-9");
        setMenuLeftText("");
        setMenuIconCenter("");
        setMenuIconLeftPadding("pl-3");
        setMenuLeftRightDropDown1("col-10");
        setMenuLeftRightDropDown2("col-2");
      }
    } else {
    }
  };

  return (
    <>
      {location.pathname === "/privacy" ? (
        <Privacy />
      ) : (
        <div className="fluid-container">
          <div className="row m-0 pr-0 ">
            <div
              className={
                MobileMenu1
                  ? " notheight1 notheight2"
                  : "notheight1 mobile-screen"
              }
            >
              <div
                className={
                  MobileMenu1
                    ? " notheight "
                    : "notheight  InnerClassMobileScreen headerMobileSideBar "
                }
              >
                <i
                  class=" MobileMenu1Icon  ml-2 mt-2 fa fa-times"
                  aria-hidden="true"
                  onClick={() => setMobileMenu1(!MobileMenu1)}
                ></i>

                <FullScreenMenu
                  menuDropDownFullScreen={menuDropDownFullScreen}
                  setMenuDropDownFullScreen={(newChildData) => {
                    setMenuDropDownFullScreen(newChildData);
                  }}
                  menuIconLeftPadding={menuIconLeftPadding}
                  menuIconCenter={menuIconCenter}
                  menuLeftText={menuLeftText}
                  menuLeftRightDropDown1={menuLeftRightDropDown1}
                  menuLeftRightDropDown2={menuLeftRightDropDown2}
                  MobileMenu1={MobileMenu1}
                  setMobileMenu1={(newChildData) => {
                    setMobileMenu1(newChildData);
                  }}
                />
              </div>
            </div>

            <Header
              handleMenu={handleMenu}
              isLargeScreen={isLargeScreen}
              menuDropDownFullScreen={menuDropDownFullScreen}
              setMenuDropDownFullScreen={(data) => {
                setMenuDropDownFullScreen(data);
              }}
              menu={menu}
              setMobileMenu1={(data) => {
                setMobileMenu1(data);
              }}
              MobileMenu1={MobileMenu1}
              menuLeftText={menuLeftText}
            />

            <div className="col-12">
              <div className="row">
                {isLargeScreen ? (
                  <div className={`${menuLeft}  animation-dashboard`}>
                    <FullScreenMenu
                      menuDropDownFullScreen={menuDropDownFullScreen}
                      setMenuDropDownFullScreen={(newChildData) => {
                        setMenuDropDownFullScreen(newChildData);
                      }}
                      menuIconLeftPadding={menuIconLeftPadding}
                      menuIconCenter={menuIconCenter}
                      menuLeftText={menuLeftText}
                      menuLeftRightDropDown1={menuLeftRightDropDown1}
                      menuLeftRightDropDown2={menuLeftRightDropDown2}
                      setMobileMenu1={(newChildData) => {
                        "";
                      }}
                      MobileMenu1={""}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={`${menuRight} animation-dashboard `}
                  style={{ background: "#F8F9FA" }}
                >
                  {location.pathname === "/dashboard" ? (
                    <DashboardCom />
                  ) : location.pathname === "/appointment" ? (
                    <Appointments />
                  ) : location.pathname === "/doctors" ? (
                    <AllDoctor />
                  ) : location.pathname === "/doctors/add" ? (
                    <AddDoctor />
                  ) : location.pathname === "/doctors/detail" ? (
                    <ViewDoctor />
                  ) : location.pathname === "/hospitals" ? (
                    <Hospital />
                  ) : location.pathname === "/hospitals/add" ? (
                    <AddHospital />
                  ) : location.pathname === "/hospitals/edit" ? (
                    <EditHospital />
                  ) : location.pathname === "/patients" ? (
                    <AllPatients />
                  ) : location.pathname === "/patients/add" ? (
                    <AddPatient />
                  ) : location.pathname === "/patients/edit" ? (
                    <EditPatient />
                  ) : location.pathname === "/patientprofile" ? (
                    <PatientProfile />
                  ) : location.pathname === "/pharmacy" ? (
                    <Pharmacy />
                  ) : location.pathname === "/pharmacy/add" ? (
                    <AddPharmacy />
                  ) : location.pathname.startsWith("/pharmacy/update/") ? (
                    <AddPharmacy Id={location.pathname.split("/")[3]} />
                  ) :location.pathname === "/pharmacy/shop" ? (
                    <PharmacyShop />
                  ) : location.pathname === "/pharmacy/shop/detail" ? (
                    <PharmacyShopDetail />
                  ) : location.pathname === "/pharmacy/detail" ? (
                    <PharmacyViewOrderlistDetail />
                  ): location.pathname === "/laboratory" ? (
                    <LaboratoryList />
                  )  : location.pathname === "/laboratory/add" ? (
                    <AddLab />
                  ) : location.pathname === "/bloodtest" ? (
                    <BloodTest />
                  ) : location.pathname === "/bloodtest/orderlist" ? (
                    <BloodTestOrderedList />
                  ) : location.pathname ===
                    "/bloodtest/orderlist/bloodtestcartdetail" ? (
                    <TestCartDetails />
                  ) : location.pathname === "/xray" ? (
                    <XRay />
                  ) : location.pathname === "/xray/orderlist" ? (
                    <XRayOrderedList />
                  ) : location.pathname === "/xray/orderlist/xraycartdetail" ? (
                    <XRayCartDetails />
                  ) : location.pathname === "/blood-donation" ? (
                    <BloodDonation />
                  ) : location.pathname === "/bannerpromo" ? (
                    <BannerPromo />
                  ) : location.pathname === "/manageroles" ? (
                    <ManageRoles />
                  ) : location.pathname === "/rolepermission" ? (
                    <RolePermission />
                  ) : location.pathname === "/allroles" ? (
                    <AllRoles />
                  ) : location.pathname === "/home-service-provider" ? (
                    <HomeService />
                  ) : location.pathname === "/treatment-sponsor" ? (
                    <AddNeedyPatient />
                  ) : location.pathname === "/needy-patients" ? (
                    <NeedyPatientsList />
                  ) : location.pathname === "/sponsors-list" ? (
                    <SponsorsList />
                  ) :
                  ValidateRoute(location.pathname) === "/pharmacy/detail" ? (
                    <PharmacyViewOrderlistDetail />
                  ) :
                    <DefultRoute />
                  }
                  <div className="row">
                    <SiteFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
