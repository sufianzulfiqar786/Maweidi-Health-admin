import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import { Box } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";
import "../../assets/css/common/datatable.scss";
import PageLoader from "../../atoms/pageLoader";
import useFetch from "../../customHook/useFetch";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";
import { Modal } from "antd";
import { CustomToast } from "../../atoms/toastMessage";
import useDeleteData from "../../customHook/useDelete";

const DataTable = ({
  onTickClick,
  onCrossClick,
  // rows,
  filterOption,
  searchQuery,
  // page,
  // setPage,
  // rowsPerPage,
  isLoading
}) => {

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  console.log("filterOptionasd", filterOption)

  //  Select filter & search filter functionality
  // const filteredRows = rows.filter((row) => {
  //   const date = new Date(row.date);
  //   const today = new Date();
  //   if (filterOption === "Today") {
  //     if (date.toDateString() !== today.toDateString()) {
  //       return false;
  //     }
  //   } else if (filterOption === "Yesterday") {
  //     const yesterday = new Date(today);
  //     yesterday.setDate(today.getDate() - 1);
  //     if (date.toDateString() !== yesterday.toDateString()) {
  //       return false;
  //     }
  //   } else if (filterOption === "Tomorrow") {
  //     const tomorrow = new Date(today);
  //     tomorrow.setDate(today.getDate() + 1);
  //     if (date.toDateString() !== tomorrow.toDateString()) {
  //       return false;
  //     }
  //   }

  //   const searchQueryLower = searchQuery.toLowerCase();
  //   const nameLower = row.patient_name?.toLowerCase();
  //   const civilIDLower = row.docCivilID.toLowerCase();
  //   if (
  //     !nameLower?.includes(searchQueryLower) &&
  //     !civilIDLower?.includes(searchQueryLower)
  //   ) {
  //     return false;
  //   }

  //   return true;
  // });


  // const totalRows = filteredRows.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = filteredRows.slice(startIndex, endIndex);
  const [statusChange, setStatusChange] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log("page", page)

  const [dataList, setDataList] = useState('');

  useEffect(() => {
    const today = new Date(); 
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1)

    const tomorrow = new Date(today); 
    tomorrow.setDate(today.getDate() + 1);

    if (filterOption === 'Today') {
      setDataList(
        `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today
          .getDate()
          .toString()
          .padStart(2, '0')}`
      );
    } else if (filterOption === 'Tomorrow') {
      setDataList(
        `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow
          .getDate()
          .toString()
          .padStart(2, '0')}`
      );
    } else if (filterOption === 'Yesterday') {
      setDataList(
        `${yesterday.getFullYear()}-${(yesterday.getMonth() + 1).toString().padStart(2, '0')}-${yesterday
          .getDate()
          .toString()
          .padStart(2, '0')}`
      );
    } else {
      setDataList('All');
    }
  }, [filterOption]);

  // console.log("datalist", typeof(dataList))
  console.log("datalist", dataList)

  const getAppointment = useFetch(
    `${process.env.REACT_APP_GET_APPOINTMENTS}?per_page=${rowsPerPage}&page=${page}&date=${dataList}`
  )

  const rows = getAppointment.data
  console.log("roesss", rows?.data)

  // const getSpec = useFetch(
  //   `${process.env.REACT_APP_GET_SPECIALIZATION}`
  // )

  // const rowsgetSpec = getSpec.data
  // console.log("roesssgetSpec22", rowsgetSpec?.data)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  // const { data, isLoading, error, postData } = usePost();

  const customData = useDeleteData();

  const BloodStatus = (BloodId, statusId) => {

    if (statusId === 0) {
      console.log("BloodStatusId", BloodId)

      customData.deleteData(
        `${process.env.REACT_APP_NEEDY_PATIENT_UPDATE_STATUS}/${BloodId}`,
        (val) => {
          console.log("value", val?.data);

          getAppointment.fetchPaginatedData(`${process.env.REACT_APP_GET_PATIENT}?per_page=${rowsPerPage}&page=${page}`)
          // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
          if (val.success === true) {
            // setDeleteModal(false)
            CustomToast({
              type: "success",
              message: "Status updated successfuly!",
            });
            setEditModal(false)
          }

        }
      )

    }

  }

  return (
    // isLoading ? <PageLoader /> :
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
              <TableCell align="left">KWD ID</TableCell>
              <TableCell align="left">Patient Id</TableCell>
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Hospital Name</TableCell>
              {/* <TableCell align="left">Doctor Civil ID</TableCell> */}
              <TableCell align="left">Doctor Name</TableCell>
              <TableCell align="left">Specialization</TableCell>
              <TableCell align="left">Fees</TableCell>
              <TableCell align="center">Appointment Status</TableCell>
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
            {!isLoading ? visibleRows?.map((row, index) => {


              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" className="number">  {((page - 1) * rowsPerPage + index) + 1}</TableCell>
                  <TableCell align="center" >{row?.kwd_id || '-'}</TableCell>
                  <TableCell align="left">
                    {row?.patient_id}
                  </TableCell>
                  <TableCell align="left">
                    {row?.user?.name}
                  </TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.created_at?.slice(11, 16)}</TableCell>
                  <TableCell align="center">{row?.hospital?.name? row?.hospital?.name : '-'}</TableCell>
                  {/* <TableCell align="left">{row.docCivilID}</TableCell> */}
                  <TableCell align="left">{row.doctor?.user?.name}</TableCell>
                  <TableCell align="left">{row?.specialization?.name}</TableCell>
                  <TableCell align="left">{row.fees}</TableCell>
                  <TableCell
                    align="center"
                  // onClick={() => {
                  //   BloodStatus(row.id, row.status)
                  // }}
                  >
                    <div className="mb-0 d-flex justify-content-center" onClick={() => {
                      setStatusChange(pre => ({ ...pre, 'id': row.id, 'status': row.status }))
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
                          cursor: !row.status == 1 ? "pointer" : 'no-drop',
                          width: '100px'
                        }}>
                        {row.status === 1 ? 'Approved' : 'Pending'}
                      </button>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    {row.status === 1 ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box className="approved-btn">Approved</Box>
                      </Box>
                    ) : row.status === 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box className="reject-btn">Rejected</Box>
                      </Box>
                    ) : ''
                      
                    }
                  </TableCell> */}
                </TableRow>
              )
            }
            ) :
              <TableRow>
                <TableCell colSpan={12}>
                  <ListSkeleton totalRow={4} totalCol={12} image={false} />
                </TableCell>
              </TableRow>
            }
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
                backgroundColor: "#ccfce3",
                border: '1px solid #50CD89',
                color: "#50CD89",
                cursor: "pointer",
                width: '150px'
              }}
              onClick={() => BloodStatus(statusChange?.id, statusChange?.status)}
            >Approved</button>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default DataTable;