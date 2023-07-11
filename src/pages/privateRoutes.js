import DashboardCom from "../components/DashboardComponents/DashboardCom";
import LaboratoryList from "./Laboratory/LaboratoryList";
import Pharmacy from "./Pharmacy/pharmacy";
import Appointments from "../pages/Appointments";


const ValidateRoute = (currentPath) => {
    let HospitalAdmin = [
        "/appointment",
        "/alldoctors",
        "/adddoctors",
        "/allpatients",
        "/addpatient",
        "/pharmacy",
        "/pharmacyshop",
        "/pharmacyshopdetail",
        "/laboratory",
        "/bloodtest",
        "/bloodtest/orderlist",
        "/xray",
        "/xray/orderlist",
        "/blood-donation",
        "/homeservice",
        "/treatmentsponsor",
        "/needypatientslist",
        "/bannerpromo",
        "/manageroles",
        "/rolepermission",
        "/allroles",
        "/dashboardcom",
        "/pharmacyviewdetail",
        "/bloodtest/orderlist/bloodtestcartdetail",
        "/xray/orderlist/xraycartdetail",
        "/viewdoctor",
        "/pharmacy/shop/detail",
        "/pharmacy/detail"
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