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

const DataTable = ({ rows, searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //  Select filter  functionality
  const filteredRows = rows.filter((row) => {
    const searchQueryLower = searchQuery?.toLowerCase();
    const nameLower = row.name?.toLowerCase();

    if (
      !nameLower?.includes(searchQueryLower)
    ) {
      return false;
    }

    return true;
  });

  const totalRows = filteredRows?.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = filteredRows.slice(startIndex, endIndex);

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
                Id
              </TableCell>
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="left">KWD ID</TableCell>
              <TableCell align="left">Appointments</TableCell>
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
            {visibleRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {index + 1}
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
                          <Avatar alt="sohaib" src={row.avatar} />
                        </Box>
                      }
                      title={row.name}
                    />
                  </Link>
                </TableCell>

                <TableCell align="left">3245</TableCell>
                <TableCell align="left">{row.appointments}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.age}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                {/* <TableCell align="left">{row.visitDate}</TableCell>
                <TableCell align="left">{row.visitTime}</TableCell> */}

                <TableCell >
                  <Link to='/patients/edit'>
                    <img className='' src={EditIcon} />
                  </Link>
                  <img className='' onClick={() => setDeleteModal(true)} src={DeleteIcon} />
                </TableCell>              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-container">
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
    </>
  );
};

export default DataTable;
