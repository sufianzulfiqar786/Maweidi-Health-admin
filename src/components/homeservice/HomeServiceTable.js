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

const HomeServiceTable = ({ rows, searchQuery, onTickClick, onCrossClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  //  Select filter  functionality
  const filteredRows = rows.filter((row) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const nameLower = row.name.toLowerCase();

    if (!nameLower.includes(searchQueryLower)) {
      return false;
    }

    return true;
  });

  const totalRows = filteredRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = filteredRows.slice(startIndex, endIndex);

  const openDocument = (link) => {
    window.open(link, "_blank");
  };

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
            {visibleRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {row.number}
                </TableCell>
                <TableCell align="left">
                  <Link
                    to={"/patientprofile"}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardHeader sx={{ padding: "0px" }} title={row.name} />
                  </Link>
                </TableCell>

                <TableCell align="left">{row.contact}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.time}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.experience}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.serviceDetails}</TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <img
                      src={DocumentIcon}
                      style={{ width: "20px", cursor: "pointer" }}
                      onClick={() => openDocument(row.documentLink)}
                    />
                  </Box>
                </TableCell>

                <TableCell>
                  {row?.approvalStatus === "Approved" ? (
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
                  )}{" "}
                </TableCell>
              </TableRow>
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
    </>
  );
};

export default HomeServiceTable;
