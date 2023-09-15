import DashboardCom from "../components/DashboardComponents/DashboardCom";
import LaboratoryList from "./Laboratory/LaboratoryList";
import Pharmacy from "./Pharmacy/pharmacy";
import Appointments from "../pages/Appointments";
import { useLocation } from "react-router-dom";


//  const role =JSON.parse(localStorage.getItem("userRoles"))
const userRolesJson = localStorage.getItem("userRoles");
const role = userRolesJson ? JSON.parse(userRolesJson) : {};
const allowedhost = Object?.keys(role).includes("hospitaladmin")
const allowedlab = Object?.keys(role).includes("technologist")
const allowedphar = Object?.keys(role).includes("pharmacist")
const alloweddoc = Object?.keys(role).includes("doctor")
const allowedstore = Object?.keys(role).includes("storeadmin")
const allowedradio = Object?.keys(role).includes("radiologic")

const ValidateRoute = (currentPath) => {
    console.log("allowedlab", allowedlab)



    let HospitalAdmin = [
        // "/laboratory",
        "/xray/list",
        "/bloodtest",
        "/bloodtest/orderlist",
        "/xray",
        "/xray/orderlist",
        "/bloodtest/orderlist/bloodtestcartdetail",
        "/xray/orderlist/xraycartdetail",
        // "/laboratory/add",
        "/hospitals",
        "/hospitals/add",
        // "/pharmacy",
        // "/pharmacy/shop",
        // "/pharmacyshopdetail",
        // "/pharmacy/shop/detail",
        // "/pharmacy/add",
        // "/pharmacy/detail",
        "/appointment",
        "/appointment/add",
        "/doctors",
        "/doctors/add",
        "/doctors/detail",
        "/patients",
        "/patients/add",
        "/patientprofile",
        "/blood-donation",
        "/home-service-provider",
        "/treatment-sponsor",
        "/needy-patients",
        "/banner-promo",
        "/banner-promo/add",
        "/manageroles",
        "/rolepermission",
        "/allroles",
        "/doctors/availability",
        "/pharmacy/update/"
    ];
    let LaboratoryAdmin = [
        "/dashboard",
        "/laboratory",
        "/xray/list",
        "/bloodtest",
        "/bloodtest/orderlist",
        "/xray",
        "/xray/orderlist",
        "/bloodtest/orderlist/bloodtestcartdetail",
        "/xray/orderlist/xraycartdetail",
        "/laboratory/add",
        "/xray/add"
    ];
    let PharmacyAdmin = [
        "/pharmacy",
        "/medical/equipment",
        "/dashboard",
        "/pharmacy/shop",
        "/pharmacyshopdetail",
        "/pharmacy/shop/detail",
        "/pharmacy/add",
        "/pharmacy/detail",
        "/medical/equipment/shop",
        "/medical/equipmentshopdetail",
        "/medical/equipment/shop/detail",
        "/medical/equipment/add",
        "/medical/equipment/detail",
    ];
    let Doctor = [
        "/dashboard",
        "/appointment",
        "/appointment/add",
        "/doctors",
        "/doctors/add",
        "/doctors/detail/3",
        "/treatment-sponsor",
        "/needy-patients",
        "/patients",
        "/patients/add",
    ]
    let MedicalEquipmentAdmin = [
        "/medical/equipment",
        "/medical/equipment/add",
        "/medical/equipment/shop",
        "/medical/equipment/shop/detail",
    ]

    let XrayAdmin = [
        "/xray/list",
        "/xray/add",
        "/xray",
        "/xray/orderlist",
        "/xray/orderlist/xraycartdetail",
    ]

    const userRole = localStorage.getItem("userRole") ?? "";


    let allowedRoutes = [];

    if (allowedhost) {
        allowedRoutes = [...allowedRoutes, ...HospitalAdmin];
    } else if (allowedlab) {
        allowedRoutes = [...allowedRoutes, ...LaboratoryAdmin];
    } else if (allowedphar) {
        allowedRoutes = [...allowedRoutes, ...PharmacyAdmin];
    } else if (alloweddoc) {
        allowedRoutes = [...allowedRoutes, ...Doctor];
    } else if (allowedstore) {
        allowedRoutes = [...allowedRoutes, ...MedicalEquipmentAdmin];
    } else if (allowedradio) {
        allowedRoutes = [...allowedRoutes, ...XrayAdmin];
    } else {
        allowedRoutes = [];
    }

    const validate = userRole === "superAdmin" ? true : allowedRoutes.includes(currentPath);
    console.log("allowedRoutes", allowedRoutes)
    return validate ? currentPath : "";
};

const ValidUI = (validation) => {
    return role;
}

const DefultRoute = () => {
    console.log("ValidUI()", ValidUI())
    let route = ValidUI()
    switch (route) {
        case "HospitalAdmin":
            return <DashboardCom />
            break;
        case "superAdmin":
            return <DashboardCom />
            break;
        case "LaboratoryAdmin":
            return <DashboardCom />
            break;
        case "PharmacyAdmin":
            return <DashboardCom />
            break;
        case "Doctor":
            return <DashboardCom />
            break;
        case "MedicalEquipmentAdmin":
            return <DashboardCom />
            break;
        case "XrayAdmin":
            return <DashboardCom />
            break;

        default:
            return <DashboardCom />
            break;
    }
}
export { ValidateRoute, ValidUI, DefultRoute };