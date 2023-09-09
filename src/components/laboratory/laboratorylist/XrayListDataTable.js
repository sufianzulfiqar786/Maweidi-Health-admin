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
import sohaibavatar from "../../../assets/images/dashboard/sohaibavatar.png";
import "../../../assets/css/common/datatable.scss";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CustomPagination from "../../common/CustomPagination";
// import prescriptionSVG from "../../../assets/images/common/prescription.svg";
// import Edit from "../../common/Edit";
// import Delete from "../common/Delete.js";
// import Cross from "../common/Cross";
// import Tick from "../common/Tick.js";

// img svg
import DeleteIcon from "../../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../../assets/images/pharmacy/EditIcon.svg";
// import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";

import { Link } from "react-router-dom";
import useDeleteData from "../../../customHook/useDelete";
import { useMemo } from "react";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ButtonLoader from "../../../atoms/buttonLoader";
import ImagePreview from "../../../atoms/ImagePreview";
import DeletConfirmation from "../../../atoms/deletConfirmation";
import { CustomToast } from "../../../atoms/toastMessage";
import useFetch from "../../../customHook/useFetch";
import ListSkeleton from "../../../molecules/ListSkeleton/ListSkeleton";

const DataTable = ({
  searchQuery,
  title = "Edit a Pharmacy",
  setRows,
  loading,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log("page", page);
  const { isLoading, error, deleteData } = useDeleteData();

  const getLaboratory = useFetch(
    `${process.env.REACT_APP_GET_LABORATORY_DATA}?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`
  );

  const rows = getLaboratory.data;
  console.log("roesss", rows?.data);

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
    deleteData(
      `${process.env.REACT_APP_DELETE_LABORATORY_DATA}/${deleteState}`,
      () => {
        setDeleteModal(false);
        getLaboratory.fetchPaginatedData(
          `${process.env.REACT_APP_GET_LABORATORY_DATA}?is_laboratory=${0}`
        );
        console.log("API Response:", getLaboratory.data);
        // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
        CustomToast({
          type: "success",
          message: "Laboratory Delete Successfuly!",
        });

        // setRows(filter)
      }
    );
  };

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data;

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isMediumScreen = useMediaQuery("(min-width: 484px)");

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
        <ImagePreview
          imagePreviewUrl={imagePreviewUrl}
          closeImagePreview={closeImagePreview}
          isPreviewOpen={isPreviewOpen}
        />
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
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Zip Code</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              className="w-100"
              sx={{
                "& td": {
                  color: "#767676",
                  whiteSpace: "nowrap",
                  wordWrap: "break-word",
                },
              }}
            >
              {!getLaboratory?.isLoading ? (
                visibleRows?.map(
                  (
                    {
                      id,
                      profile_picture,
                      name,
                      email,
                      address,
                      phone,
                      country,
                      state,
                      city,
                      zip,
                    },
                    index
                  ) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left" className="number">
                        {(page - 1) * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell align="left">
                        <CardHeader
                          sx={{ padding: "0px" }}
                          avatar={
                            <Box
                              sx={{
                                filter:
                                  "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                              }}
                            >
                              <Avatar
                                alt={`Laboratory Pic`}
                                src={`${process.env.REACT_APP_IMAGE_URL}/${profile_picture}`}
                                onClick={() =>
                                  handleImageClick(
                                    process.env.REACT_APP_IMAGE_URL + "/"+
                                      profile_picture
                                  )
                                }
                              />
                            </Box>
                          }
                          title={name}
                        />
                      </TableCell>
                      <TableCell align="center">{email}</TableCell>
                      <TableCell align="center">{address}</TableCell>
                      <TableCell align="center">{phone}</TableCell>
                      <TableCell align="center">{country}</TableCell>
                      <TableCell align="center">{state == 'undefined' ? '-': state}</TableCell>
                      <TableCell align="center">{city}</TableCell>
                      <TableCell align="center">{zip}</TableCell>

                      <TableCell>
                        <Link to={`/xray/update/${id}`}>
                          <img className="" src={EditIcon} />
                        </Link>
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            setDeleteModal(true);
                            setDeleteState(id);
                          }}
                          src={DeleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
              <TableCell colSpan={10}>
                <ListSkeleton totalRow={4} totalCol={10} image={true} />
              </TableCell>
            </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
        <div className="pagination-detail">
          Showing {(page - 1) * rowsPerPage + 1} - {rows?.data?.to} of{" "}
          {rows?.data?.total}
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
