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
import Avatar from "@mui/material/Avatar";
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import CustomPagination from "../../components/common/CustomPagination";
import Delete from "../../components/common/Delete";
import "../../assets/css/common/datatable.scss";
import useFetch from "../../customHook/useFetch";
import usePost from "../../customHook/usePost";
import { CustomToast } from "../../atoms/toastMessage";
import useDeleteData from "../../customHook/useDelete";
import ButtonLoader from "../../atoms/buttonLoader";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";
import { Modal } from "antd";

const BloodDonationTable = ({ searchQuery, setRows }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusChange, setStatusChange] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, isLoading, error, postData } = usePost();
  const customData = useDeleteData();

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

  const getHospital = useFetch(
    `${process.env.REACT_APP_LIST_BLOOD_DONATION}?per_page=${rowsPerPage}&page=${page}`
  );

  const rows = getHospital.data
  console.log("roesss", rows?.data)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  // const totalRows = filteredRows.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = filteredRows.slice(startIndex, endIndex);
  // const toggleStatus = (index) => {
  //   setRows((prevRows) => {
  //     const updatedRows = [...prevRows];
  //     updatedRows[index] = {
  //       ...updatedRows[index],
  //       status: updatedRows[index].status === "Unavailable" ? "Available" : "Unavailable",
  //     };
  //     return updatedRows;
  //   });
  // }

  const BloodStatus = (BloodId, statusId) => {

    if (statusId === 1) {
      console.log("BloodStatusId", BloodId)

      const Payload = {
        status: 0
      };

      postData(`${process.env.REACT_APP_UPDATE_BLOOD_DONATION_STATUS}/${BloodId}`,
        Payload,
        (res) => {
          getHospital.fetchPaginatedData(`${process.env.REACT_APP_LIST_BLOOD_DONATION}?per_page=${rowsPerPage}&page=${page}`)
          // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
          if (res.success === true) {
            setDeleteModal(false)
            CustomToast({
              type: "success",
              message: "Status updated successfuly!",
            });
          }

          // setRows(filter)
        }
      );

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
              <TableCell className="number" align="left" style={{ width: '15px' }}>
                #
              </TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Name</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Age</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Gender</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Blood Group</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Mobile No</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >City</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Address</TableCell>
              <TableCell align={!getHospital?.isLoading ? 'center' : 'left'} >Status</TableCell>
              {/* <TableCell align="left">Action</TableCell> */}
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
            {!getHospital?.isLoading ? visibleRows?.map((row, index) => (
              <TableRow
                key={((page - 1) * rowsPerPage + index) + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {((page - 1) * rowsPerPage + index) + 1}
                </TableCell>


                <TableCell align="center">{row.name ? row.name : "-"}</TableCell>
                <TableCell align="center">{row.age ? row.age : "-"}</TableCell>
                <TableCell align="center">{row.gender ? row.gender : '-'}</TableCell>
                <TableCell align="center">{row.blood_group}</TableCell>
                <TableCell align="center">{row.contact}</TableCell>
                <TableCell align="center">{row.city ? row.city : '-'}</TableCell>
                <TableCell align="center">{row.address ? row.address : '-'}</TableCell>
                <TableCell
                  align="center"
                  // onClick={() => {
                  //   BloodStatus(row.id, row.status)
                  // }}
                >
                  <div className="mb-0 d-flex justify-content-center" onClick={() => {
                    setStatusChange(pre => ({...pre, 'id': row.id, 'status':row.status}))
                    setDeleteModal(true)
                  }}
                    style={{

                    }}
                  >
                    <button className=" py-1"
                      disabled={isLoading}
                      style={{
                        borderRadius: '5px',
                        backgroundColor: row.status == 1 ? "#ccfce3" : "#f7eed0",
                        border: row.status == 1 ? '1px solid #50CD89' : '1px solid #FFC107',
                        color: row.status == 1 ? "#50CD89" : "#ffa807",
                        cursor: row.status == 1 || isLoading ? "pointer" : 'no-drop',
                        width: '100px'
                      }}>
                      {row.status === 1 ? 'Available' : 'Unavailable'}
                    </button>
                  </div>
                </TableCell>
                {/* <TableCell align="center">
                  <Delete />
                </TableCell> */}
              </TableRow>
            )) : <TableRow>
              <TableCell colSpan={9}>
                <ListSkeleton totalRow={4} totalCol={9} image={false} />
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
              >Available</button>
            </div>
          </div>
        </Modal>
    </>
  );
};

export default BloodDonationTable;
