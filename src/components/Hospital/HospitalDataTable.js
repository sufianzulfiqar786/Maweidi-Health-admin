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
import { Button, Modal, Rate, Select, Slider } from "antd";
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import "../../assets/css/common/datatable.scss";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Edit from "../common/Edit.js";
import Delete from "../common/Delete.js";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";

// img svg
import DeleteIcon from "../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../assets/images/pharmacy/EditIcon.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";

import { Link } from "react-router-dom";
import useDeleteData from "../../customHook/useDelete";
import { useMemo } from "react";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonLoader from "../../atoms/buttonLoader";
import ImagePreview from "../../atoms/ImagePreview";
import DeletConfirmation from "../../atoms/deletConfirmation";
import { CustomToast } from "../../atoms/toastMessage";

const DataTable = ({ searchQuery, title = 'Edit a Pharmacy', rows, setRows, loading }) => {
    console.log("roesss", rows)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { isLoading, error, deleteData } = useDeleteData();



    const [modal1Open, setModal1Open] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const [errorData, setErrorData] = useState(0);
    const [deleteState, setDeleteState] = useState(0);

    const [image, setImage] = useState(null);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleDelete = () => {

        deleteData(`${process.env.REACT_APP_DELETE_HOSPITAL_DATA}/${deleteState}`, () => {
            setDeleteModal(false)
            const filter = rows.filter(val => val.id !== deleteState)
            CustomToast({
                type: "success",
                message: "Hospital Delete Successfuly!",
              });
            setRows(filter)
        });
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

    const totalRows = rows?.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
    const visibleRows = rows?.filter((item) => {
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

    const isLargeScreen = useMediaQuery('(min-width: 1024px)');
    const isMediumScreen = useMediaQuery('(min-width: 484px)');

    const handleImageClick = (imageUrl) => {
        setImagePreviewUrl(imageUrl);
        setIsPreviewOpen(true);
    };
    // Function to close the preview
    const closeImagePreview = () => {
        setIsPreviewOpen(false);
    };

    return (
        <>

            <div className="row  ml-0 mx-2 " style={{ overflowX: "hidden" }}>

                <ImagePreview imagePreviewUrl={imagePreviewUrl} closeImagePreview={closeImagePreview} isPreviewOpen={isPreviewOpen} />
                <DeletConfirmation
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                />
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
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Mobile No.</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">State</TableCell>
                                <TableCell align="center">Zip Code</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className="w-100"
                            sx={{
                                "& td": {
                                    color: "#767676",
                                    whiteSpace: "nowrap",
                                    wordWrap: "break-word",
                                },
                            }}
                        >

                            {/* {
                                !loading  && <div className="w-100 d-flex justify-content-center align-items-center" style={{height:"15rem"}}>
                                    <ButtonLoader/>
                                </div>
                            } */}

                            {!loading ? visibleRows?.map(({ id, profile_picture, name, email, address, phone_no, country, state, zipcode }, index) => (
                                <TableRow
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left" className="number">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        <CardHeader
                                            sx={{ padding: "0px" }}
                                            avatar={
                                                <Box
                                                    sx={{
                                                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                                                    }}
                                                >
                                                    <Avatar alt="Hospital Pic" src={`${process.env.REACT_APP_IMAGE_URL + profile_picture}`} onClick={() => handleImageClick(process.env.REACT_APP_IMAGE_URL + profile_picture)} />
                                                </Box>
                                            }
                                            title={name}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{email}</TableCell>
                                    <TableCell align="center">{address}</TableCell>
                                    <TableCell align="center">{phone_no}</TableCell>
                                    <TableCell align="center">{country}</TableCell>
                                    <TableCell align="center">{state}</TableCell>
                                    <TableCell align="center">{zipcode}</TableCell>

                                    <TableCell >
                                        <Link to={`/hospitals/edit/${id}`}>
                                            <img className='' src={EditIcon} />
                                        </Link>
                                        <img className='cursor-pointer' onClick={() => {
                                            setDeleteModal(true)
                                            setDeleteState(id)
                                        }} src={DeleteIcon} />
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan={isLargeScreen ? 9 : isMediumScreen ? 8 : 5} className="number" align="center" style={{ height: "15rem" }}>
                                        <ButtonLoader />
                                    </TableCell>
                                </TableRow>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>


                {/* <Modal
                    className="doctor-filter-modal"
                    centered
                    open={modal1Open}
                    // onOk={() => setModal2Open(false)}
                    onCancel={() => setModal1Open(false)}
                    width={1046}
                    footer={
                        <div className="row px-3 mt-lg-4 mb-lg-4">
                            <div className="col-12 pt-3 pb-2 d-flex justify-content-center mt-3">
                                <button className="apply-filter submit-pharmacy-edit">Save Changes</button>
                            </div>
                        </div>
                    }
                >
                    <div className="row px-3 border-bottom">
                        <div className="col-12 ">
                            <p className="doc-add-filter">{title}</p>
                        </div>
                    </div>

                    <div className="col-12 pt-2 pb-md-3 pb-4 d-flex align-items-center doc-cam">
                        <div
                            className="mt-4 mb-md-2 mb-0 d-flex align-items-center justify-content-center add-doc-camera-upload cursor-pointer"
                            onClick={handleDoctorImageClick}
                        >
                            {image ? (
                                <img
                                    className="add-doc-camera-upload-1st"
                                    src={image}
                                    alt="Uploaded image"
                                />
                            ) : (
                                <img src={CameraIcon} alt="" />
                            )}
                        </div>

                        <span className="pl-4 pt-3 ml-2 doc-cam-text">
                            Profile Picture
                        </span>
                    </div>
                    <div className="col-12" style={{ marginTop: "-20px" }}>
                        {errorData === 1 ? (
                            <span className="error-message">
                                Please select a valid image file (JPEG or PNG)
                            </span>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="row px-3 mt-4">
                        <div className="col-lg-12 doc-setting-input">
                            <p className=" doc-add-filter-text">Name</p>

                            <input type="text" />
                        </div>


                    </div>

                    <div className="row px-3 mt-4">
                        <div className="col-lg-12 doc-setting-input">
                            <p className=" doc-add-filter-text">Phone No</p>

                            <input type="text" />
                        </div>
                    </div>
                    <div className="row px-3 mt-4">
                        <div className="col-lg-12 doc-setting-input">
                            <p className=" doc-add-filter-text">Email <span style={{ color: "#8C8C8C" }}>(Optional)</span></p>

                            <input type="text" />
                        </div>
                    </div>

                    <div className="row px-3 mt-4">
                        <div className="col-lg-12 doc-setting-input">
                            <p className=" doc-add-filter-text">Address</p>

                            <input type="text" />
                        </div>
                    </div>



                    <div className="row px-3 mt-4">
                        <div className="col-lg-4 pr-lg-0 doc-setting-input">
                            <p className=" doc-add-filter-text">Country </p>

                            <input type="text" placeholder="Choose" />
                        </div>

                        <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input">
                            <p className=" doc-add-filter-text ">State</p>

                            <input type="text" placeholder="Choose" />
                        </div>

                        <div className="col-lg-4 pt-lg-0 pt-4 pl-lg-0 doc-setting-input">
                            <p className=" doc-add-filter-text">Zip</p>

                            <input type="text" />
                        </div>


                    </div>
                </Modal> */}




            </div>

            <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
                <div className="pagination-detail">
                    Showing {page * rowsPerPage + 1} -{" "}
                    {Math.min((page + 1) * rowsPerPage, rows?.length)} of {rows?.length}
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






