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
import Availability from "./Doctor/Availability";

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
import { fetchSpecialization } from "../redux/feature/specializationSlice";
import { ValidateRoute, DefultRoute, ValidUI } from "./privateRoutes";
import { useDispatch } from "react-redux";
import AddAppointments from "./AddAppointments";
import AddBannerPromo from "./BannerPromo/AddBannerPromo";
import AddRole from "./Role/AddRole";
import AddMedicalEquipment from "./MedicalEquipment/AddMedicalEquipment";
import MedicalEquipment from "./MedicalEquipment/MedicalEquipment";
import MedicalEquipmentShop from "./MedicalEquipment/MedicalEquipmentShop";
import MedicalEquipmentViewOrderlistDetail from "./MedicalEquipment/MedicalEquipmentViewOrderlistDetail";
import MedicalEquipmentShopDetail from "./MedicalEquipment/MedicalEquipmentShopDetail";
import XrayList from "./Laboratory/XrayList";
import AddXray from "./Laboratory/AddXray";
import XrayLab from "./Laboratory/bloodtest/XrayLab";
import LabShopDetail from "./Pharmacy/LabShopDetail";
import LabViewOrderlistDetail from "./Pharmacy/LabViewOrderlistDetail";
import XRayShopDetail from "./Pharmacy/XRayShopDetail";
import XrayViewOrderlistDetail from "./Pharmacy/XrayViewOrderlistDetail";
import Promo from "./BannerPromo/Promo";
import AddPromo from "./BannerPromo/AddPromo";
import CallAppointment from "../components/appointments/CallAppointment";
const Dashboard = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(0);
  const [menuLeft, setMenuLeft] = useState("col-3");
  const [menuRight, setMenuRight] = useState("col-9");
  const [menuLeftText, setMenuLeftText] = useState("");
  const [addRole, setAddRole] = useState({ country: "Kuwait" })
  const [menuLeftRightDropDown1, setMenuLeftRightDropDown1] =
    useState("col-10");
  const [menuLeftRightDropDown2, setMenuLeftRightDropDown2] = useState("col-2");
  const [menuIconCenter, setMenuIconCenter] = useState("");
  const [menuIconLeftPadding, setMenuIconLeftPadding] = useState("pl-3");
  const [MobileMenu1, setMobileMenu1] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuDropDownFullScreen, setMenuDropDownFullScreen] = useState({
    name: "dashboard",
    toggle: false,
    subMenuMobile: {
      subname: "",
      subtoggle: false,
    },
    patient: {
      toggle: false,
    },
    doc: {
      toggle: false,
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
    // Dispatch fetchSpecialization thunk when component mounts
    dispatch(fetchSpecialization());
  }, [dispatch]);
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
{
  console.log("ValidUI()dah", ValidUI())
}
                <div
                  className={`${menuRight} animation-dashboard `}
                  style={{ background: "#F8F9FA" }}
                >
                  {ValidateRoute(location.pathname) === "/dashboard" ? (
                    <DashboardCom />
                    ) 
                    : ValidateRoute(location.pathname) === "/appointment" ? (
                      <Appointments />
                    ) 
                    : ValidateRoute(location.pathname) === "/appointment/call" ? (
                      <CallAppointment />
                    ) 
                    : ValidateRoute(location.pathname) === "/appointment/add" ? (
                      <AddAppointments />
                    ) 
                    : ValidateRoute(location.pathname) === "/doctors" ? (
                      <AllDoctor />
                    ) 
                    : ValidateRoute(location.pathname) === "/doctors/add" ? (
                      <AddDoctor />
                    ) 
                    : ValidateRoute(location.pathname) === "/doctors/availability" ? (
                      <Availability/>
                    ) 
                    : location.pathname.startsWith("/doctors/detail") ? (
                      <ViewDoctor
                        Id={(location.pathname).split("/")[3]}
                      />
                    ) 
                    : ValidateRoute(location.pathname) === "/hospitals" ? (
                      <Hospital />
                    ) : ValidateRoute(location.pathname) === "/hospitals/add" ? (
                      <AddHospital />
                    ) : location.pathname.startsWith("/hospitals/edit/") ? (
                      <AddHospital
                        Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : ValidateRoute(location.pathname) === "/patients" ? (
                      <AllPatients />
                    ) : ValidateRoute(location.pathname) === "/patients/add" ? (
                      <AddPatient />
                    ) : location.pathname.startsWith("/patients/edit") ? (
                      <AddPatient 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : ValidateRoute(location.pathname) === "/patientprofile" ? (
                      <PatientProfile />
                    ) : ValidateRoute(location.pathname) === "/pharmacy" ? (
                      <Pharmacy />
                    ) : ValidateRoute(location.pathname) === "/medical/equipment" ? (
                      <MedicalEquipment />
                    ): ValidateRoute(location.pathname) === "/pharmacy/add" ? (
                      <AddPharmacy />
                    ) : ValidateRoute(location.pathname) === "/medical/equipment/add" ? (
                      <AddMedicalEquipment />
                    ) : location.pathname.startsWith("/pharmacy/update/") ? (
                      <AddPharmacy
                        Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : location.pathname.startsWith("/laboratory/update/") ? (
                      <AddLab
                        Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : location.pathname.startsWith("/xray/update/") ? (
                      <AddXray
                        Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ): location.pathname.startsWith("/medical/equipment/update/")  ? 
                    (
                    <AddMedicalEquipment
                      Id={ValidateRoute(location.pathname).split("/")[4]}
                    />
                  ) 
                  : ValidateRoute(location.pathname) === "/pharmacy/shop" ? (
                      <PharmacyShop />
                    ) : ValidateRoute(location.pathname) === "/medical/equipment/shop" ? (
                      <MedicalEquipmentShop />
                    ) : ValidateRoute(location.pathname) ===
                      "/pharmacy/shop/detail" ? (
                      <PharmacyShopDetail />  
                    ) : ValidateRoute(location.pathname) ===
                    "/medical/equipment/shop/detail" ? (
                    <MedicalEquipmentShopDetail />
                  ) : location.pathname.startsWith("/pharmacy/detail/") ? (
                      <PharmacyViewOrderlistDetail 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : location.pathname.startsWith("/xray/detail/") ? (
                      <XrayViewOrderlistDetail 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    )  : location.pathname.startsWith("/bloodtest/detail/") ? (
                      <LabViewOrderlistDetail 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) : location.pathname.startsWith("/medical/equipment/detail/") ? (
                    <MedicalEquipmentViewOrderlistDetail 
                    Id={ValidateRoute(location.pathname).split("/")[4]}
                    />
                  ) : ValidateRoute(location.pathname) === "/laboratory" ? (
                      <LaboratoryList />
                    ): ValidateRoute(location.pathname) === "/xray/list" ? (
                      <XrayList />
                    ) : ValidateRoute(location.pathname) === "/laboratory/add" ? (
                      <AddLab />
                    ) : ValidateRoute(location.pathname) === "/xray/add" ? (
                      <AddXray />
                    ): ValidateRoute(location.pathname) === "/bloodtest" ? (
                      <BloodTest />
                    ) : ValidateRoute(location.pathname) ===
                      "/bloodtest/orderlist" ? (
                      <LabShopDetail />
                    ) : ValidateRoute(location.pathname) ===
                      "/bloodtest/orderlist/bloodtestcartdetail" ? (
                      <TestCartDetails />
                    ) : ValidateRoute(location.pathname) === "/xray" ? (
                      <XrayLab />
                    ) : ValidateRoute(location.pathname) === "/xray/orderlist" ? (
                      <XRayShopDetail />
                    ) : ValidateRoute(location.pathname) ===
                      "/xray/orderlist/xraycartdetail" ? (
                      <XRayCartDetails />
                    ) : ValidateRoute(location.pathname) === "/blood-donation" ? (
                      <BloodDonation />
                    ) 
                    : ValidateRoute(location.pathname) === "/banner-promo" ? (
                      <BannerPromo />
                    ) 
                    : ValidateRoute(location.pathname) === "/banner-promo/add" ? (
                      <AddBannerPromo />
                    ) 
                    : location.pathname.startsWith("/banner-promo/edit/") ? (
                      <AddBannerPromo 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) 
                    : ValidateRoute(location.pathname) === "/promo" ? (
                      <Promo/>
                    ) 
                    : ValidateRoute(location.pathname) === "/promo/add" ? (
                      <AddPromo />
                    ) 
                    : location.pathname.startsWith("/promo/edit/") ? (
                      <AddPromo 
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ) 
                    : ValidateRoute(location.pathname) === "/manageroles" ? (
                      <ManageRoles />
                    ) : ValidateRoute(location.pathname) === "/rolepermission" ? (
                      <RolePermission />
                    ) : ValidateRoute(location.pathname) === "/allroles" ? (
                      <AllRoles />
                    ) : location.pathname.startsWith("/role/edit") ? (
                      <AddRole
                      role_Id={ValidateRoute(location.pathname.split("/")[3])}
                      setAddRole={setAddRole} addRole={addRole}
                      />
                    )
                    : location.pathname.startsWith("/role/add") ? (
                      <AddRole
                      setAddRole={setAddRole} addRole={addRole}
                      />
                    ): ValidateRoute(location.pathname) ===
                      "/home-service-provider" ? (
                      <HomeService />
                    ) : ValidateRoute(location.pathname) ===
                      "/treatment-sponsor" ? (
                      <AddNeedyPatient />
                    ) : location.pathname.startsWith("/treatment-sponsor/edit") ? (
                      <AddNeedyPatient
                      Id={ValidateRoute(location.pathname).split("/")[3]}
                      />
                    ): ValidateRoute(location.pathname) === "/needy-patients" ? (
                      <NeedyPatientsList />
                    ) : ValidateRoute(location.pathname) === "/sponsors-list" ? (
                      <SponsorsList />
                    ) : ValidateRoute(location.pathname) ===
                      "/pharmacy/detail" ? (
                      <PharmacyViewOrderlistDetail />
                    ) : (
                      <DefultRoute />
                    )}
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
