import React, { useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomPagination from "../../common/CustomPagination";
import "../../../assets/css/common/datatable.scss";
import Edit from "../../common/Edit";
import Delete from "../../common/Delete";
import Tick from "../../common/Tick";
import useFetch from "../../../customHook/useFetch";
import ListSkeleton from "../../../molecules/ListSkeleton/ListSkeleton";
import { Link } from "react-router-dom";

import DeleteIcon from "../../../assets/images/pharmacy/DeleteIcon.svg";
import EditIcon from "../../../assets/images/pharmacy/EditIcon.svg";

import { Modal } from "antd";
import { CustomToast } from "../../../atoms/toastMessage";
import useDeleteData from "../../../customHook/useDelete";
import usePost from "../../../customHook/usePost";
const NeedyPatientDataTable = ({
  // rows,
  searchQuery,
  onEditClick,
  onDeleteClick,
  onTickComplete
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteState, setDeleteState] = useState(0);
  const [statusChange, setStatusChange] = useState({});
  const customData = useDeleteData();

  const getPatient = useFetch(
    `${process.env.REACT_APP_LIST_NEEDY_PATIENT}?per_page=${rowsPerPage}&page=${page}`
  )

  const rows = getPatient.data
  console.log("roesss", rows?.data)

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //  Select filter  functionality
  // const filteredRows = rows.filter((row) => {
  //   const searchQueryLower = searchQuery.toLowerCase();
  //   const nameLower = row.name.toLowerCase();
  //   if (!nameLower.includes(searchQueryLower)) {
  //     return false;
  //   }

  //   return true;
  // });

  // const totalRows = filteredRows.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = filteredRows.slice(startIndex, endIndex);

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  const patientDelete = useDeleteData();

  const handleDelete = () => {

    patientDelete?.deleteData(`${process.env.REACT_APP_DELETE_NEEDY_PATIENT}/${deleteState}`, () => {
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

  const { data, isLoading, error, postData } = usePost();

  const BloodStatus = (BloodId, statusId) => {

    if (statusId === 0) {
      console.log("BloodStatusId", BloodId)

      customData.deleteData(
        `${process.env.REACT_APP_NEEDY_PATIENT_UPDATE_STATUS}/${BloodId}`,
        (val) => {
          console.log("value", val?.data);

          getPatient.fetchPaginatedData(`${process.env.REACT_APP_GET_PATIENT}?per_page=${rowsPerPage}&page=${page}`)
              // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
              if (val.success === true) {
                setDeleteModal(false)
                CustomToast({
                  type: "success",
                  message: "Status updated successfuly!",
                });
                setEditModal(false)
              }

        }
      )

      // const Payload = {
      //   status: 0
      // };

      // postData(`${process.env.REACT_APP_NEEDY_PATIENT_UPDATE_STATUS}/${BloodId}`,
      //   Payload,
      //   (res) => {
      //     getPatient.fetchPaginatedData(`${process.env.REACT_APP_GET_PATIENT}?per_page=${rowsPerPage}&page=${page}`)
      //     // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
      //     if (res.success === true) {
      //       setDeleteModal(false)
      //       CustomToast({
      //         type: "success",
      //         message: "Status updated successfuly!",
      //       });
      //     }

      //     // setRows(filter)
      //   }
      // )

    }

  }

  return (
    <>
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Patient ID no</TableCell>
              <TableCell align="center">Hospital</TableCell>
              <TableCell align="center">Mobile No. </TableCell>
              <TableCell align="center">Civil ID no</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Treatment Cost</TableCell>
              <TableCell align="center">Disease</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Edit</TableCell>
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
                {((page -1) * rowsPerPage + index) + 1}
                </TableCell>

                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.patient_id}</TableCell>
                <TableCell align="center">{row?.hospital?.name}</TableCell>
                <TableCell align="left">{row.contact}</TableCell>
                <TableCell align="left">{row.civil_id}</TableCell>
                <TableCell align="center">{row.gender ==1? 'Male': row.gender ==3? "Female": 'Other'}</TableCell>
                <TableCell align="center">{row.approx_treatment_cost? row.approx_treatment_cost :'-'}</TableCell>
                <TableCell align="left">{row.disease}</TableCell>
                <TableCell
                  align="center"
                  // onClick={() => {
                  //   BloodStatus(row.id, row.status)
                  // }}
                >
                  <div className="mb-0 d-flex justify-content-center" onClick={() => {
                    setStatusChange(pre => ({...pre, 'id': row.id, 'status':row.status}))
                    setEditModal(true)
                  }}
                    style={{

                    }}
                  >
                    <button className=" py-1"
                    disabled={row.status == 1}
                      style={{
                        borderRadius: '5px',
                        backgroundColor: row.status == 1 ? "#ccfce3" : "#f7eed0",
                        border: row.status == 1 ? '1px solid #50CD89' : '1px solid #FFC107',
                        color: row.status == 1 ? "#50CD89" : "#ffa807",
                        cursor: !row.status == 1  ? "pointer" : 'no-drop',
                        width: '100px'
                      }}>
                      {row.status ===1 ? 'Approved' : 'Pending'}
                    </button>
                  </div>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.2rem",
                    }}
                  >
                    {/* <Edit onEdit={onEditClick} /> */}
                    <Link to={`/treatment-sponsor/edit/${row?.id}`}> <img className='' src={EditIcon} /> </Link>
                    <img className='' onClick={() => {
                    setDeleteModal(true)
                    setDeleteState(row?.id)
                  }} src={DeleteIcon} />
                    {/* <Tick onTick={onTickComplete} /> */}
                  </Box>
                </TableCell>
              </TableRow>
            )): <TableRow>
            <TableCell colSpan={11}>
              <ListSkeleton totalRow={4} totalCol={11} image={false} />
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
      <Modal
          className="doctor-filter-modal"
          centered
          open={editModal}
          // onOk={() => setModal2Open(false)}
          onCancel={() => setEditModal(false)}
          width={514}
          footer={null}
          closable={false}
        >
          <div className="row pb-1">
            <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
              <p className="mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3">
                Are you sure you want to change the status?
              </p>
              <button className="mt-lg-4 mt-1 mb-lg-5 mb-2"
              style={{
                borderRadius: '5px',
                backgroundColor:   "#ccfce3" ,
                border:   '1px solid #50CD89' ,
                color:   "#50CD89",
                cursor:   "pointer" ,
                width: '150px'
              }}
              onClick={()=>BloodStatus(statusChange?.id, statusChange?.status)}
              >Approved</button>
            </div>
          </div>
        </Modal>
    </>
  );
};

export default NeedyPatientDataTable;
