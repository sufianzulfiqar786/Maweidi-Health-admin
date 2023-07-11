import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Button, Modal, Rate, Select, Slider, DatePicker, Space, TimePicker } from "antd";
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import "../../assets/css/common/datatable.scss";
import { Box, Typography } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Edit from "../common/Edit.js";
import Delete from "../common/Delete.js";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";

import '../../assets/css/Banner/banner.scss'
import TimeChanger from "../doctors/TimeChanger";

// img svg
import DeleteIcon from "../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../assets/images/pharmacy/EditIcon.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";
import GalleryIcon from "../../assets/images/Banner/GalleryIcon.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";
import pic2 from "../../assets/images/doctor/doc2.png";
import pic3 from "../../assets/images/doctor/doc3.png";
import pic4 from "../../assets/images/doctor/doc4.png";
import pic5 from "../../assets/images/doctor/doc5.png";
import pic6 from "../../assets/images/doctor/doc6.png";
import pic7 from "../../assets/images/doctor/doc7.png";
import pic8 from "../../assets/images/doctor/doc8.png";
import { Link } from "react-router-dom";
import CustomSelect from "../common/CustomSelect";
import Time from "../../atoms/Time/Time";
import UploadFile from "../../molecules/UploadFile/UploadFile";
import CustomDropDown from "../../atoms/CustomDropDown/Index";

const rows = [
    {
        id: 1,
        Promo: "Promo Banner",
        Category: 'Sales  Promotion',
        Status: "Enable",
        Banner: "Laboratory Home",
        Promo1: "Pharmacy Home",
        start: "Jun 7, 2021 9:00:00 AM",
        end: "Jun 7, 2021 9:00:00 AM",
        Description: "Makeup & Selfcare Products - 70 % Discount ",
    },
    {
        id: 2,
        Promo: "Summer Sale",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Summer Clothing",
        Promo1: "Swimwear",
        start: "Jul 1, 2021 9:00:00 AM",
        end: "Jul 31, 2021 9:00:00 AM",
        Description: "Get ready for summer with our latest collection of swimwear and summer clothing at 50% off!",
    },
    {
        id: 3,
        Promo: "Back to School",
        Category: 'Back to School Sale',
        Status: "Enable",
        Banner: "Back to School Essentials",
        Promo1: "School Supplies",
        start: "Aug 1, 2021 9:00:00 AM",
        end: "Aug 31, 2021 9:00:00 AM",
        Description: "Prepare for a new school year with our range of back to school essentials and school supplies. Get up to 60% off!",
    },
    {
        id: 4,
        Promo: "Winter Wonderland",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Winter Clothing",
        Promo1: "Winter Accessories",
        start: "Nov 1, 2021 9:00:00 AM",
        end: "Dec 31, 2021 9:00:00 AM",
        Description: "Stay warm this winter with our latest collection of winter clothing and accessories. Enjoy 30% off!",
    },
    {
        id: 5,
        Promo: "Halloween Spooktacular",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Halloween Costumes",
        Promo1: "Halloween Decorations",
        start: "Oct 1, 2021 9:00:00 AM",
        end: "Oct 31, 2021 9:00:00 AM",
        Description: "Get into the spooky spirit with our Halloween costumes and decorations. Save up to 40%!",
    },
    {
        id: 6,
        Promo: "Summer Travel",
        Category: 'Travel Sale',
        Status: "Enable",
        Banner: "Travel Accessories",
        Promo1: "Luggage",
        start: "Jun 1, 2022 9:00:00 AM",
        end: "Jun 30, 2022 9:00:00 AM",
        Description: "Plan your summer travel with our range of travel accessories and luggage. Get up to 50% off!",
    },
    {
        id: 7,
        Promo: "Black Friday",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Electronics",
        Promo1: "Home Appliances",
        start: "Nov 26, 2021 9:00:00 AM",
        end: "Nov 28, 2021 9:00:00 AM",
        Description: "Shop our Black Friday deals for discounts on electronics and home appliances. Save up to 70%!",
    },
    {
        id: 8,
        Promo: "Cyber Monday",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Tech Gadgets",
        Promo1: "Home Entertainment",
        start: "Nov 29, 2021 9:00:00 AM",
        end: "Nov 30, 2021 9:00:00 AM",
        Description: "Get the latest tech gadgets and home entertainment systems on Cyber Monday. Enjoy up to 50% off",
    }, {
        id: 9,
        Promo: "Valentine's Day",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Gifts for Your Loved One",
        Promo1: "Jewelry",
        start: "Feb 1, 2022 9:00:00 AM",
        end: "Feb 14, 2022 9:00:00 AM",
        Description: "Celebrate Valentine's Day with our selection of gifts for your loved one. Get up to 30% off on jewelry!",
    },
    {
        id: 10,
        Promo: "Easter Sale",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Easter Decorations",
        Promo1: "Easter Treats",
        start: "Apr 1, 2022 9:00:00 AM",
        end: "Apr 30, 2022 9:00:00 AM",
        Description: "Get ready for Easter with our selection of Easter decorations and treats. Save up to 40%!",
    },
    {
        id: 11,
        Promo: "Mother's Day",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Gifts for Mom",
        Promo1: "Flowers",
        start: "May 1, 2022 9:00:00 AM",
        end: "May 14, 2022 9:00:00 AM",
        Description: "Show your appreciation for Mom with our selection of gifts and flowers. Enjoy up to 50% off!",
    },
    {
        id: 12,
        Promo: "Father's Day",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Gifts for Dad",
        Promo1: "Tools",
        start: "Jun 1, 2022 9:00:00 AM",
        end: "Jun 20, 2022 9:00:00 AM",
        Description: "Make Dad's day with our selection of gifts and tools. Save up to 40%!",
    },
    {
        id: 13,
        Promo: "Summer Clearance",
        Category: 'Clearance Sale',
        Status: "Enable",
        Banner: "Summer Clothing",
        Promo1: "Swimwear",
        start: "Aug 1, 2022 9:00:00 AM",
        end: "Aug 31, 2022 9:00:00 AM",
        Description: "Stock up on summer essentials with our summer clearance sale. Enjoy up to 70% off!",
    },
    {
        id: 14,
        Promo: "Fall Collection",
        Category: 'New Arrival',
        Status: "Enable",
        Banner: "Fall Clothing",
        Promo1: "Boots",
        start: "Sep 1, 2022 9:00:00 AM",
        end: "Sep 30, 2022 9:00:00 AM",
        Description: "Get ready for fall with our latest collection of fall clothing and boots. Save up to 30%!",
    },
    {
        id: 15,
        Promo: "Winter Sale",
        Category: 'Seasonal Sale',
        Status: "Enable",
        Banner: "Winter Sports Gear",
        Promo1: "Skiing",
        start: "Dec 1, 2022 9:00:00 AM",
        end: "Dec 31, 2022 9:00:00 AM",
        Description: "Hit the slopes this winter with our selection of winter sports gear for skiing. Enjoy",
    }
]


const DataTable = ({ searchQuery }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const [modal1Open, setModal1Open] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [errorData, setErrorData] = useState(0);

    const [image, setImage] = useState(null);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleDoctorImageClick = () => {
        // Create a file input element and trigger a click event
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        // input.accept = 'image/png,image/jpeg';  // its just show png and jpeg file rather then other
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) {
                setErrorData(0);
                return;
            }
            const fileType = file.type;
            if (fileType !== "image/png" && fileType !== "image/jpeg") {
                // alert('Please select a PNG or JPEG file');
                setErrorData(1);
                return;
            } else {
                setErrorData(0);
            }
            // Set the selected image as the state of the component
            setImage(URL.createObjectURL(file));
        };
        input.click();
    };

    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const visibleRows = rows.filter((item) => {
        var lcInfo = searchQuery.toLocaleLowerCase();
        return lcInfo === ""
            ? item
            : item.name.toLocaleLowerCase().includes(lcInfo) ||
            item.address.toLocaleLowerCase().includes(lcInfo) ||
            item.mobile.toLocaleLowerCase().includes(lcInfo) ||
            item.country.toLocaleLowerCase().includes(lcInfo) ||
            item.zipcode.toLocaleLowerCase().includes(lcInfo) ||
            item.state.toLocaleLowerCase().includes(lcInfo)
    })?.slice(startIndex, endIndex);

    return (
        <>

            <div className="row  ml-0 mx-2 " style={{ overflowX: "hidden" }}>

                <TableContainer
                    component={Paper}
                    sx={{ backgroundColor: "#FFFFFF" }}
                    className="custom-scroll"
                >
                    <Table aria-label="simple table">
                        <TableHead
                            sx={{
                                "& th": {
                                    color: "#193F52",
                                    whiteSpace: "nowrap",
                                    wordWrap: "break-word",
                                },
                            }}
                        >
                            <TableRow>
                                <TableCell className="number" align="left">
                                    #
                                </TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">
                                    <span className='banner-selection'>
                                        <Select
                                            defaultValue="Category Type"
                                            style={{
                                                width: "100%",
                                            }}
                                            bordered={true}
                                            onChange={() => { }}
                                            options={[
                                                {
                                                    label: "Banner",
                                                },
                                                {
                                                    label: "Sales Promotion​",
                                                },
                                            ]}
                                        />
                                    </span>
                                </TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">
                                    <span className='banner-selection'>
                                        <Select
                                            defaultValue="Banner Placement"
                                            style={{
                                                width: "100%",
                                            }}
                                            bordered={true}
                                            onChange={() => { }}
                                            options={[
                                                {
                                                    label: "Laboratory Home",
                                                },
                                                {
                                                    label: "Pharmacy Listing​",
                                                },
                                                {
                                                    label: "Main Home​",
                                                },
                                            ]}
                                        />
                                    </span>
                                </TableCell>
                                <TableCell align="left">Promo Type</TableCell>
                                <TableCell align="left">Start Time</TableCell>
                                <TableCell align="left">End Time</TableCell>
                                <TableCell align="left">Link</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody
                            sx={{
                                "& td": {
                                    color: "#767676",
                                    whiteSpace: "nowrap",
                                    wordWrap: "break-word",
                                },
                            }}
                        >



                            {visibleRows.map(({ id, Promo, Category, Status, Banner, Promo1, start, end, Description }) => (
                                <TableRow
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left" className="number">
                                        {id}
                                    </TableCell>

                                    <TableCell align="left">{Promo} {id}</TableCell>
                                    <TableCell align="left">{Category}</TableCell>
                                    <TableCell align="left">{Status}</TableCell>
                                    <TableCell align="left">{Banner}</TableCell>
                                    <TableCell align="left">{Promo1}</TableCell>
                                    <TableCell align="left">
                                        <div>{start?.slice(0, 12)} </div>
                                        <div>{start?.slice(12, 22)} </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div>{end?.slice(0, 12)} </div>
                                        <div>{end?.slice(12, 22)} </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>
                                            {
                                                "http://localhost:3000/bannerpromo".slice(0, 30)
                                            }
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">Makeup & Selfcare Products - 70 % Discount </TableCell>


                                    <TableCell >
                                        <img className='' src={GalleryIcon} />
                                    </TableCell>
                                    <TableCell >
                                        <img className='' src={EditIcon} onClick={() => setModal1Open(true)} /> <img className='' onClick={() => setDeleteModal(true)} src={DeleteIcon} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


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
                                <button className="apply-filter submit-save-banner">Edit Banner and Promo</button>
                            </div>
                        </div>
                    }
                >
                    <div className="row px-3 border-bottom">
                        <div className="col-12 ">
                            <p className="doc-add-filter">Edit Banner and Promo</p>
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
                            <CustomDropDown
                                option={
                                    [
                                        { label: "Laboratory Home" },
                                        { label: "Pharmacy Listing​​" },
                                        { label: "Main Home​" },
                                    ]}
                            />
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
                        <div className="col-lg-12 pr-lg-0 doc-setting-input">
                            <p className=" doc-add-filter-text">Description </p>

                            <textarea id="w3review" name="w3review" rows="4" style={{ width: "98%" }} />
                        </div>




                    </div>
                </Modal>

                <Modal
                    className="doctor-filter-modal"
                    centered
                    open={deleteModal}
                    // onOk={() => setModal2Open(false)}
                    onCancel={() => setDeleteModal(false)}
                    width={514}
                    footer={null}
                    closable={false}

                >

                    <div className="row pb-1">
                        <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
                            <p className='mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3'>Are you sure you want to delete?</p>
                            <button className='mt-lg-4 mt-1 mb-lg-5 mb-2'>Delete</button>
                        </div>
                    </div>
                </Modal>

            </div>

            <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
                <div className="pagination-detail">
                    Showing {page * rowsPerPage + 1} -{" "}
                    {Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}
                </div>
                <CustomPagination
                    page={page}
                    totalPages={totalPages}
                    onChangePage={handleChangePage}
                />
            </div>
        </>
    );
};

export default DataTable;






