import DashboardCom from "../components/DashboardComponents/DashboardCom";
import LaboratoryList from "./Laboratory/LaboratoryList";
import Pharmacy from "./Pharmacy/pharmacy";
import Appointments from "../pages/Appointments";


const ValidateRoute = (currentPath) => {
    let HospitalAdmin = [
        "/laboratory",
        "/bloodtest",
        "/bloodtest/orderlist",
        "/xray",
        "/xray/orderlist",
        "/bloodtest/orderlist/bloodtestcartdetail",
        "/xray/orderlist/xraycartdetail",
        "/laboratory/add",
        // "/pharmacy",
        // "/pharmacy/shop",
        // "/pharmacyshopdetail",
        // "/pharmacy/shop/detail",
        // "/pharmacy/add",
        // "/pharmacy/detail",
        "/appointment",
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
        "/bannerpromo",
        "/manageroles",
        "/rolepermission",
        "/allroles",
        // "/pharmacy/update/"
    ];
    let LaboratoryAdmin = [
        "/laboratory",
        "/bloodtest",
        "/bloodtest/orderlist",
        "/xray",
        "/xray/orderlist",
        "/bloodtest/orderlist/bloodtestcartdetail",
        "/xray/orderlist/xraycartdetail",
        "/laboratory/add"
    ];
    let PharmacyAdmin = [
        "/pharmacy",
        "/pharmacy/shop",
        "/pharmacyshopdetail",
        "/pharmacy/shop/detail",
        "/pharmacy/add",
        "/pharmacy/detail",
    ];
    let Doctor = [
        "/appointment",
        "/doctors",
        "/doctors/add",
        "/doctors/detail"
    ]

    const userRole = JSON.parse(localStorage.getItem("userRole")) ?? "";


    let allowedRoutes = [];

    if (userRole === "HospitalAdmin") {
        allowedRoutes = HospitalAdmin;
    } else if (userRole === "LaboratoryAdmin") {
        allowedRoutes = LaboratoryAdmin;
    } else if (userRole === "PharmacyAdmin") {
        allowedRoutes = PharmacyAdmin;
    } else if (userRole === "Doctor") {
        allowedRoutes = Doctor;
    } else {
        allowedRoutes = [];
    }

    const validate = userRole === "superAdmin" ? true : allowedRoutes.includes(currentPath);

    return validate ? currentPath : "";
};

const ValidUI = (validation) => {
    return JSON.parse(localStorage.getItem("userRole")) ?? "";
}

const DefultRoute = () => {
    let route = ValidUI()
    switch (route) {
        case "HospitalAdmin":
            return <DashboardCom />
            break;
        case "superAdmin":
            return <DashboardCom />
            break;
        case "LaboratoryAdmin":
            return <LaboratoryList />
            break;
        case "PharmacyAdmin":
            return <Pharmacy />
            break;
        case "Doctor":
            return <Appointments />
            break;

        default:
            return <>Error 404.</>
            break;
    }
}
export { ValidateRoute, ValidUI, DefultRoute };