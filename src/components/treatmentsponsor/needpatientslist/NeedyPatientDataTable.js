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
const NeedyPatientDataTable = ({
  rows,
  searchQuery,
  onEditClick,
  onDeleteClick,
  onTickComplete
}) => {
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
              <TableCell align="left">Patient ID no</TableCell>
              <TableCell align="left">Hospital</TableCell>
              <TableCell align="left">Mobile No. </TableCell>
              <TableCell align="left">Civil ID no</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Treatment Cost</TableCell>
              <TableCell align="left">Disease</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Edit</TableCell>
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

                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.patientId}</TableCell>
                <TableCell align="left">{row.hospital}</TableCell>

                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">{row.civilId}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.treatmentCost}</TableCell>
                <TableCell align="left">{row.disease}</TableCell>
                <TableCell align="left">{row.edit}</TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Edit onEdit={onEditClick} />
                    <Delete onDelete={onDeleteClick} />
                    <Tick onTick={onTickComplete} />
                  </Box>
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

export default NeedyPatientDataTable;
