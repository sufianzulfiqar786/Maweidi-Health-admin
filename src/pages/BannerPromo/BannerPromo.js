import { useState } from "react";
import DoctorDataTable from "../../components/doctors/DoctorDataTable";
import BannerDataTable from "../../components/Banner/BannerDataTable"
import "../../assets/css/doctor.scss";
import '../../assets/css/pharmacy.scss'
import { Button, Modal, Rate, Select, Slider, DatePicker } from "antd";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import FilterIcon from "../../assets/images/doctor/FilterIcon.svg";
import DownTriIcon from "../../assets/images/doctor/DownTriIcon.svg";
import { Link } from "react-router-dom";
import CustomSelect from "../../components/common/CustomSelect";
import Searchbar from "../../components/common/Searchbar";
import Time from "../../atoms/Time/Time";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import CustomDropDown from "../../atoms/CustomDropDown/Index";

const Pharmacy = () => {

    const [rows, setRows] = useState([
        {
            number: 1,
            name: "Sohaib Butt",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-25",
            time: "11:00AM",
            civilID: "40122-67366475-3",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 2,
            name: "Abdullah",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-25",
            time: "11:00AM",
            civilID: "40122-67366475-4",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 3,
            name: "Ahad",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-25",
            time: "11:00AM",
            civilID: "40122-67366475-5",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 4,
            name: "Azlan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-25",
            time: "11:00AM",
            civilID: "40122-67366475-6",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 5,
            name: "Ayan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-25",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 6,
            name: "Sohaib",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 7,
            name: "Caliph",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 8,
            name: "Johnson",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 9,
            name: "William",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 10,
            name: "Sufiyan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 11,
            name: "Malok",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 12,
            name: "Asad",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "pending",
            prescription: "Aspirin 500mg",
        },
        {
            number: 13,
            name: "Umair",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 14,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 15,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-26",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 16,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-24",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 17,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-24",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 18,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-24",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 19,
            name: "Dan",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-24",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
        {
            number: 20,
            name: "Sameer",
            email: "johndoe@example.com",
            age: 35,
            gender: "male",
            specialization: "Cardiology",
            date: "2023-03-24",
            time: "11:00AM",
            civilID: "40122-67366475-7",
            doctor: "Dr. Jane Smith",
            fees: "$50/Patient",
            appointmentStatus: "Approved",
            prescription: "Aspirin 500mg",
        },
    ]);
    const [filterOption, setFilterOption] = useState("today"); // default to "today"
    const [searchQuery, setSearchQuery] = useState("");

    //  Filter handler
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);

    };

    // Search Functionality
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const [modal2Open, setModal2Open] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);

    const marks = {
        // 0: '0°C',
        15: "0 Km",
        65: "500 km",
        100: {
            style: {
                color: "#f50",
            },
            // label: <strong>100°C</strong>,
        },
    };

    const marks1 = {
        // 0: '0°C',
        15: "$ 50",
        65: "$ 300",
        100: {
            style: {
                color: "#f50",
            },
            // label: <strong>100°C</strong>,
        },
    };

    return (
        <>
            <div className="row  px-2 pt-4">
                <div className="col-12  ">
                    <p className="mb-0 dashboard-com-top-text">Banner and Promo</p>
                </div>

                <div className="col-12  ">
                    <div className="row d-flex align-items-end">
                        <div className="col-lg-6 col-12 mt-lg-0 mt-2">
                            <p className="mb-0 doctor-header-top-text">
                                <Link className="doc-link " to="/">
                                    DASHBOARD
                                </Link>

                                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                                <span style={{ color: "#4FA6D1" }}>Banner and Promo</span>{" "}
                            </p>
                        </div>

                        <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
                            <button onClick={() => setModal1Open(true)} className="btn-add-new-doc mr-2"> Add </button>{" "}


                        </div>

                        <Modal
                            className="doctor-filter-modal"
                            centered
                            open={modal1Open}
                            // onOk={() => setModal2Open(false)}
                            onCancel={() => setModal1Open(false)}
                            width={837}
                            footer={
                                <div className="row px-3 mt-lg-4 mb-lg-4">
                                    <div className="col-12 pt-3 pb-2 d-flex justify-content-center mt-3">
                                        <button className="apply-filter submit-save-banner">Add Banner and Promo</button>
                                    </div>
                                </div>
                            }
                        >
                            <div className="row px-3 border-bottom">
                                <div className="col-12 ">
                                    <p className="doc-add-filter">Add Banner and Promo</p>
                                </div>
                            </div>



                            <div className="row px-3 mt-4">
                                <div className="col-lg-12 doc-setting-input">
                                    <p className=" doc-add-filter-text">Title</p>

                                    <input type="text" />
                                </div>


                            </div>

                            <div className="row px-3 mt-4">
                                <div className="col-lg-4 pr-lg-0 doc-setting-input">
                                    <p className=" doc-add-filter-text">Category Type</p>
                                    <CustomDropDown option={
                                        [
                                            { label: "Banner" },
                                            { label: "Sales Promotion​" },

                                        ]

                                    } />
                                    {/* <Select
                                        // defaultValue="lucy"
                                        style={{
                                            width: "100%",
                                        }}
                                        onChange={() => { }}
                                        options={[
                                            {
                                                label: "Banner ",
                                            },
                                            {
                                                label: "Sales Promotion​",
                                            },
                                        ]}
                                    /> */}
                                </div>

                                <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input">
                                    <p className=" doc-add-filter-text ">Status</p>

                                    <Select
                                        // defaultValue="lucy"
                                        style={{
                                            width: "100%",
                                        }}
                                        onChange={() => { }}
                                        options={[
                                            {
                                                label: "Enable",
                                            },
                                            {
                                                label: "Disable",
                                            }
                                        ]}
                                    />
                                </div>

                                <div className="col-lg-4 pt-lg-0 pt-4 pl-lg-0 doc-setting-input">
                                    <p className=" doc-add-filter-text">Banner Placement</p>
                                    <CustomDropDown
                                        option={
                                            [
                                                { label: "Laboratory Home" },
                                                { label: "Pharmacy Listing​​" },
                                                { label: "Main Home​" },
                                            ]}
                                    />
                                    {/* <Select
                                        // defaultValue="lucy"
                                        style={{
                                            width: "100%",
                                        }}
                                        onChange={() => { }}
                                        options={[
                                            {
                                                label: "Laboratory Home",
                                            },
                                            {
                                                label: "Pharmacy Listing",
                                            },
                                            {
                                                label: "Main Home",
                                            }
                                        ]}
                                    /> */}
                                </div>


                            </div>

                            <div className="row px-3 mt-4">
                                <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input pr-0">
                                    <p className=" doc-add-filter-text">Promo Type</p>
                                    <CustomDropDown />
                                </div>
                                <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input " >
                                    <p className=" doc-add-filter-text ">Start Date</p>
                                    <div className="d-flex justify-content-between align-items-center datapicker-border">

                                        <DatePicker
                                            className=" rounded-0"
                                            // placeholder={"start"}
                                            format={"DD/MM/YYYY"}
                                            style={{ border: "0", outline: "none" }}
                                        />

                                        <img className="pr-1" src={CalenderIcon} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input pl-0">
                                    <p className=" doc-add-filter-text">Start Time</p>

                                    <div className='banner-time-border d-flex justify-content-between'>
                                        <Time />
                                        <img className='pr-1' src={ClockIcon} alt="" />
                                    </div>
                                </div>


                            </div>

                            {/* pl-lg-0 */}
                            <div className="row px-3 mt-4">
                                <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input pr-0">
                                    <p className=" doc-add-filter-text ">End Date</p>
                                    <div className="d-flex justify-content-between align-items-center datapicker-border">

                                        <DatePicker
                                            className=" rounded-0"
                                            // placeholder={"start"}
                                            format={"DD/MM/YYYY"}
                                            style={{ border: "0", outline: "none" }}
                                        />

                                        <img className="pr-1" src={CalenderIcon} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input">
                                    <p className=" doc-add-filter-text">End Time</p>

                                    <div className='banner-time-border d-flex justify-content-between'>
                                        <Time />
                                        <img className='pr-1' src={ClockIcon} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input pl-0">
                                    <p className=" doc-add-filter-text">Upload</p>

                                    <UploadFile />
                                </div>

                            </div>


                            <div className="row px-3 mt-4">
                                <div className="col-lg-12 doc-setting-input">
                                    <p className=" doc-add-filter-text">Link</p>

                                    <input type="text" />
                                </div>


                            </div>
                            <div className="row px-3 mt-4">
                                <div className="col-lg-12 pr-lg-0 doc-setting-input">
                                    <p className=" doc-add-filter-text">Description </p>

                                    <textarea id="w3review" name="w3review" rows="4" style={{ width: "98%" }} />
                                </div>

                            </div>
                        </Modal>






                    </div>
                </div>

                <div className="col-12  ">

                    <div className="row mb-5 pb-5">


                        <div className="col-12 px-2 pt-4 mt-3">
                            < BannerDataTable
                                rows={rows}

                                searchQuery={searchQuery}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Pharmacy