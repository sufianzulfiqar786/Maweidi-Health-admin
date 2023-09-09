import { Link } from "react-router-dom";
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
import sohaibavatar from "../../../assets/images/dashboard/sohaibavatar.png";
import { Box } from "@mui/material";
import CustomPagination from "../../common/CustomPagination";
import "../../../assets/css/common/datatable.scss";

// img svg
import DeleteIcon from "../../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../../assets/images/pharmacy/EditIcon.svg";
import { Modal } from "antd";
import useFetch from "../../../customHook/useFetch";
import ListSkeleton from "../../../molecules/ListSkeleton/ListSkeleton";
import DeletConfirmation from "../../../atoms/deletConfirmation";
import useDeleteData from "../../../customHook/useDelete";
import { CustomToast } from "../../../atoms/toastMessage";

const DataTable = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteState, setDeleteState] = useState(0);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //  Select filter  functionality
  // const filteredRows = rows.filter((row) => {
  //   const searchQueryLower = searchQuery?.toLowerCase();
  //   const nameLower = row.name?.toLowerCase();

  //   if (
  //     !nameLower?.includes(searchQueryLower)
  //   ) {
  //     return false;
  //   }

  //   return true;
  // });

  // const totalRows = filteredRows?.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = filteredRows.slice(startIndex, endIndex);

  const getPatient = useFetch(
    `${process.env.REACT_APP_GET_PATIENT}?per_page=${rowsPerPage}&page=${page}`
  );

  const rows = getPatient.data
  console.log("roesss", rows?.data)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  const patientDelete = useDeleteData();

  const handleDelete = () => {

    patientDelete?.deleteData(`${process.env.REACT_APP_DELETE_PATIENT}/${deleteState}`, () => {
      setDeleteModal(false)
      getPatient.fetchPaginatedData(`${process.env.REACT_APP_GET_PATIENT}?per_page=${rowsPerPage}&page=${page}`)
      // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
      CustomToast({
        type: "success",
        message: "Patient Delete Successfuly!",
      });

      // setRows(filter)
    });
  };

  return (
    <>

      {/* <DeletConfirmation
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        handleDelete={handleDelete}
        isLoading={patientDelete?.isLoading}
      /> */}
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
                Id
              </TableCell>
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="left">KWD ID</TableCell>
              {/* <TableCell align="left">Appointments</TableCell> */}
              <TableCell align="left">Mobile Number</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Action</TableCell>

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
            {!getPatient?.isLoading ? visibleRows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {((page - 1) * rowsPerPage + index) + 1}
                </TableCell>
                <TableCell align="left">
                  <Link
                    to={"/patientprofile"}
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="patient-name-hover"
                  >
                    <CardHeader
                      sx={{ padding: "0px" }}
                      avatar={
                        <Box
                          sx={{
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                          }}
                        >
                          <Avatar alt={row?.user?.name?.charAt(0).toUpperCase() + row?.user?.name?.slice(1)} src={`${process.env.REACT_APP_IMAGE_URL}/${row?.user?.profile_pic}`} />
                        </Box>
                      }
                      title={row?.user?.first_name}
                    />
                  </Link>
                </TableCell>

                <TableCell align="left">{row.kwd_id}</TableCell>
                {/* <TableCell align="center">{!row.appointments? '-': row.appointments}</TableCell> */}
                <TableCell align="left">{row?.user?.contact}</TableCell>
                <TableCell align="left">{row?.user?.email}</TableCell>
                <TableCell align="left">{row?.user.age}</TableCell>
                <TableCell align="left">{row?.user?.gender === 1 ? 'Male' : row?.user?.gender === 0 ? "Female" : 'Other'}</TableCell>
                {/* <TableCell align="left">{row.visitDate}</TableCell>
                <TableCell align="left">{row.visitTime}</TableCell> */}

                <TableCell >
                  <Link to={`/patients/edit/${row?.id}`}>
                    <img className='' src={EditIcon} />
                  </Link>
                  <img className='' onClick={() => {
                    setDeleteModal(true)
                    setDeleteState(row?.id)
                  }} src={DeleteIcon} />
                </TableCell>              </TableRow>
            )) :
              <TableRow>
                <TableCell colSpan={8}>
                  <ListSkeleton totalRow={4} totalCol={8} image={true} />
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
        <div className="pagination-detail">
          Showing {(page - 1) * rowsPerPage + 1} -{" "}
          {rows?.data?.to} of {rows?.data?.total}
        </div>
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      </div>
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
            <button className='mt-lg-4 mt-1 mb-lg-5 mb-2'
            onClick={handleDelete}
            >Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DataTable;
