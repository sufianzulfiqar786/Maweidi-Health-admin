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

const BloodDonationTable = ({ rows, searchQuery,setRows}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const toggleStatus = (index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        status: updatedRows[index].status === "Unavailable" ? "Available" : "Unavailable",
      };
      return updatedRows;
    });
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
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Blood Group</TableCell>
              <TableCell align="left">Mobile No</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Status</TableCell>
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
            {visibleRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" className="number">
                  {row.number}
                </TableCell>
                <TableCell align="left">
                  
                    <CardHeader
                      sx={{ padding: "0px" }}
                      // avatar={
                      //   <Box
                      //     sx={{
                      //       filter:
                      //         "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                      //     }}
                      //   >
                      //     <Avatar alt="sohaib" src={sohaibavatar} />
                      //   </Box>
                      // }
                      title={row.name}
                    />
                  {/* </Link> */}
                </TableCell>

                <TableCell align="left">{row.age}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.bloodgroup}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: row.status == "Unavailable" ? "#FFC107" : "#50CD89",
                    cursor:"pointer"
                  }}
                  onClick={() => toggleStatus(index)}
                >
                  {row.status}
                </TableCell>
                {/* <TableCell align="center">
                  <Delete />
                </TableCell> */}
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

export default BloodDonationTable;
