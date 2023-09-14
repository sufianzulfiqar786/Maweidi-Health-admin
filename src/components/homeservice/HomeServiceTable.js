import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import CustomPagination from "../../components/common/CustomPagination";
import Tick from "../common/Tick";
import Cross from "../common/Cross";
import DocumentIcon from "../../assets/images/homeservice/document-icon.png";
import "../../assets/css/common/datatable.scss";
import useFetch from "../../customHook/useFetch";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";
import usePost from "../../customHook/usePost";
import { CustomToast } from "../../atoms/toastMessage";
import { Modal } from "antd";

import tickVector from '../../assets/images/common/tick.svg'
import crossVector from "../../assets/images/common/cross.svg";
import '../../assets/css/common/common.scss'

const HomeServiceTable = ({ searchQuery, onTickClick, onCrossClick }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [approvedModal, setApprovedModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [statusChange, setStatusChange] = useState({});

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

  const getServiceProvider = useFetch(
    `${process.env.REACT_APP_LIST_SERVICE_PROVIDERS}?per_page=${rowsPerPage}&page=${page}`
  )

  const rows = getServiceProvider.data
  console.log("roesss", rows)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  const openDocument = (link) => {
    window.open(link, "_blank");
  };

  const { data, isLoading, error, postData } = usePost();

  const BloodStatus = (BloodId, statusId) => {
    console.log("statusId", statusId)

    console.log("BloodStatusId", BloodId)

    const Payload = {
      status: statusId === 1? 1 : '0'
    };

    postData(`${process.env.REACT_APP_UPDATE_SERVICE_PROVIDER_STATUS}/${BloodId}`,
      Payload,
      (res) => {
        getServiceProvider.fetchPaginatedData(`${process.env.REACT_APP_LIST_SERVICE_PROVIDERS}?per_page=${rowsPerPage}&page=${page}`)
        if (res.success === true) {
          setApprovedModal(false)
          setDeclineModal(false)
          CustomToast({
            type: "success",
            message: "Status updated successfuly!",
          });
        }else{
          CustomToast({
            type: "success",
            message: `${res?.response}`,
          });
        }

        // setRows(filter)
      }
    );



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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Experience</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Service Details</TableCell>
              <TableCell align="left">Document</TableCell>

              <TableCell align="left">Approval Status</TableCell>
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
            {!getServiceProvider?.isLoading ? visibleRows?.map((row, index) => (
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
                  >
                    <CardHeader sx={{ padding: "0px" }} title={row?.user?.first_name} />
                  </Link>
                </TableCell>

                <TableCell align="left">{row?.user.contact}</TableCell>
                <TableCell align="left">{row.amount_per_hour} KWD</TableCell>
                <TableCell align="left">{row.time_slot}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="center">{row.experience}</TableCell>
                <TableCell align="center">{row?.user?.address ? row?.user?.address : '-'}</TableCell>
                <TableCell align="left">{row.service_detail}</TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <a href={`${process.env.REACT_APP_IMAGE_URL}/${row?.document}`} >
                      <img
                        src={DocumentIcon}
                        style={{ width: "20px", cursor: "pointer" }}
                      />
                    </a>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {/* {row?.approvalStatus === "Approved" ? (
                    <button className="approved-btn"> Approved</button>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <Tick onTick={() => onTickClick(row.number)} />
                      <Cross onCross={() => onCrossClick(row.number)} />
                    </Box>
                  )} */}
                  {row?.status === 1 ? <button style={{
                    width: '100px',
                    background: "rgba(80, 205, 137, 0.2)",
                    border: '0.3px solid #50cd89',
                    cursor: 'no-drop',
                    color: "#50cd89",
                    borderRadius: '3px',
                  }}
                    disabled>Approved</button> : row?.status === 0 ? <button style={{
                      width: '100px',
                      background: "rgba(236, 130, 110, 0.3)",
                      border: '0.3px solid #ec826e',
                      cursor: 'no-drop',
                      color: "#ec826e",
                      borderRadius: '3px',
                    }}
                      disabled>Declined</button> : <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.2rem",
                        }}
                      >
                    <div className='tick-icon' onClick={() => {
                      setStatusChange(pre => ({ ...pre, 'id': row.id, 'status': 1 }))
                      setApprovedModal(true)
                    }}  >
                      <img src={tickVector} width='10px' />
                    </div>
                    <div className="cross-icon" onClick={() => {
                      setStatusChange(pre => ({ ...pre, 'id': row.id, 'status': 0 }))
                      setDeclineModal(true)
                    }}>
                      <img src={crossVector} width="10px" />
                    </div>
                  </Box>}
                </TableCell>
              </TableRow>
            )) : <TableRow>
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
        open={approvedModal}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setApprovedModal(false)}
        width={514}
        footer={null}
        closable={false}
      >
        <div className="row pb-1">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
            <p className="mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3">
              Are you sure you want to change the status?
            </p>
            <button className="mt-lg-4 mt-1 mb-lg-5 mb-2 tick-icon"
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

      <Modal
        className="doctor-filter-modal"
        centered
        open={declineModal}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setDeclineModal(false)}
        width={514}
        footer={null}
        closable={false}
      >
        <div className="row pb-1">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
            <p className="mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3">
              Are you sure you want to change the status?
            </p>
            <button className="mt-lg-4 mt-1 mb-lg-5 mb-2 cross-icon"
              style={{
                borderRadius: '5px',
                // backgroundColor: "#ccfce3",
                // border: '1px solid #50CD89',
                // color: "#50CD89",
                cursor: "pointer",
                width: '150px'
              }}
              onClick={() => BloodStatus(statusChange?.id, statusChange?.status)}
            >Declined</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HomeServiceTable;
