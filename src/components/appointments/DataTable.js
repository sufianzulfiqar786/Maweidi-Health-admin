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
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import { Box } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";
import "../../assets/css/common/datatable.scss";
import PageLoader from "../../atoms/pageLoader";

const DataTable = ({
  onTickClick,
  onCrossClick,
  rows,
  filterOption,
  searchQuery,
  page,
  setPage,
  rowsPerPage,
  isLoading
}) => {

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //  Select filter & search filter functionality
  const filteredRows = rows.filter((row) => {
    const date = new Date(row.date);
    const today = new Date();
    if (filterOption === "Today") {
      if (date.toDateString() !== today.toDateString()) {
        return false;
      }
    } else if (filterOption === "Yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (date.toDateString() !== yesterday.toDateString()) {
        return false;
      }
    } else if (filterOption === "Tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      if (date.toDateString() !== tomorrow.toDateString()) {
        return false;
      }
    }

    const searchQueryLower = searchQuery.toLowerCase();
    const nameLower = row.patient_name?.toLowerCase();
    const civilIDLower = row.docCivilID.toLowerCase();
    if (
      !nameLower?.includes(searchQueryLower) &&
      !civilIDLower?.includes(searchQueryLower)
    ) {
      return false;
    }

    return true;
  });


  const totalRows = filteredRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = filteredRows.slice(startIndex, endIndex);

  return (
    isLoading? <PageLoader/> :
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
              <TableCell align="left">Doctor Civil ID</TableCell>
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
            {visibleRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">{row.number}</TableCell>
                <TableCell align="left" >23324</TableCell>
                <TableCell align="left">
                  {row.patient_id}
                </TableCell>
                <TableCell align="left">
                  {row.patient_name}
                </TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.time}</TableCell>
                <TableCell align="left">{row.hospital_name}</TableCell>
                <TableCell align="left">{row.docCivilID}</TableCell>
                <TableCell align="left">{row.doctor_name}</TableCell>
                <TableCell align="left">{row.specialization}</TableCell>
                <TableCell align="left">{row.fees}</TableCell>
                <TableCell>
                  {row.appointmentStatus === "Approved" ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box className="approved-btn">Approved</Box>
                    </Box>
                  ) : row.appointmentStatus === "Rejected" ? (
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
                  // (
                  //   <Box
                  //     sx={{
                  //       display: "flex",
                  //       alignItems: "center",
                  //       justifyContent: "center",
                  //       gap: "0.2rem",
                  //     }}
                  //   >
                  //     <Tick onTick={onTickClick} />
                  //     <Cross onCross={onCrossClick} />
                  //   </Box>
                  // )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-container">
        <div className="pagination-detail">
          Showing {page * rowsPerPage + 1} -{" "}
          {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of {rows.length}
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