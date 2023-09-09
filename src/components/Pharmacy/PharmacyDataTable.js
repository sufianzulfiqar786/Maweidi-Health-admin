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
import "../../assets/css/common/datatable.scss";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CustomPagination from "../common/CustomPagination";

// img svg
import DeleteIcon from "../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../assets/images/pharmacy/EditIcon.svg";

import { Link } from "react-router-dom";
import useDeleteData from "../../customHook/useDelete";
import ButtonLoader from "../../atoms/buttonLoader";
import ImagePreview from "../../atoms/ImagePreview";
import DeletConfirmation from "../../atoms/deletConfirmation";
import { CustomToast } from "../../atoms/toastMessage";
import useFetch from "../../customHook/useFetch";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";

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

  const getPharmacy = useFetch(
    `${process.env.REACT_APP_GET_PHARMACY_DATA}?per_page=${rowsPerPage}&page=${page}&status=${1}`
  );

  const rows = getPharmacy.data;
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
      `${process.env.REACT_APP_DELETE_PHARMACY_DATA}/${deleteState}`,
      () => {
        setDeleteModal(false);
        getPharmacy.fetchPaginatedData(
          `${process.env.REACT_APP_GET_PHARMACY_DATA}`
        );
        console.log("API Response:", getPharmacy.data);
        CustomToast({
          type: "success",
          message: "Pharmacy Delete Successfuly!",
        });
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
              {!getPharmacy?.isLoading ? (
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
                                alt={`Pharmacy Pic`}
                                src={`${process.env.REACT_APP_IMAGE_URL}/${profile_picture}`}
                                onClick={() =>
                                  handleImageClick(
                                    process.env.REACT_APP_IMAGE_URL +
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
                      <TableCell align="center">{state}</TableCell>
                      <TableCell align="center">{city}</TableCell>
                      <TableCell align="center">{zip}</TableCell>

                      <TableCell>
                        <Link to={`/pharmacy/update/${id}`}>
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
