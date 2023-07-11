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
import Edit from "./../../common/Edit";
import Delete from "./../../common/Delete";
import { Link } from "react-router-dom";

const LaboratoryListDateTable = ({
  rows,
  searchQuery,
  onEditClick,
  onDeleteClick,
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
              <TableCell align="left">Pharmacy Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Mobile No.</TableCell>
              <TableCell align="left">Country</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Zip Code</TableCell>
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
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">{row.state}</TableCell>
                <TableCell align="left">{row.zipCode}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Link to="/laboratory/add">
                      <Edit onEdit={onEditClick} />
                    </Link>
                    <Delete onDelete={onDeleteClick} />
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

export default LaboratoryListDateTable;
