import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import DashIcon from "../../assets/images/common/dash.svg";
import CustomPagination from "./CustomPagination";
import "../../assets/css/common/datatable.scss";

const OrderedListTable = ({ rows, searchQuery, xrayorderlist }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
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

  const headers = Object.keys(rows[0]).map((header) =>
    header === "number"
      ? "#"
      : header
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
  );

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
              {headers.map((header, index) => (
                <TableCell align="left" key={index}>
                  {header}
                </TableCell>
              ))}
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
                    <CardHeader
                      sx={{ padding: "0px" }}
                      avatar={
                        <Box
                          sx={{
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                          }}
                        >
                          <Avatar alt="sohaib" src={row.pic} />
                        </Box>
                      }
                      title={row.name}
                    />
                  </Link>
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.mobileNo}</TableCell>

                {xrayorderlist ? (
                  <TableCell align="left">{row.product}</TableCell>
                ) : (
                  <TableCell align="left"> {row.test} </TableCell>
                )}
                <TableCell align="left">{row.total}</TableCell>
                <TableCell align="left">
                  <button
                    variant="contained"
                    color="primary"
                    style={{
                      width: "82px",
                      height: "27px",
                      color: "#FFFFFF",
                      border: "none",
                      outline: "none",
                      fontSize: "10px",
                      backgroundImage:
                        "linear-gradient(323.79deg, #125A77 35.68%, #397D99 92.17%)",
                      borderRadius: "5px",
                      "&:hover": {
                        background: "#125a77",
                      },
                    }}
                    onClick={() => {
                      if (xrayorderlist) {
                        navigate("/xray/orderlist/xraycartdetail");
                        return;
                      }
                      navigate("/bloodtest/orderlist/bloodtestcartdetail");
                    }}
                  >
                    View Details
                  </button>
                </TableCell>
                <TableCell align="center">
                  {row.status == true ? (
                    <button
                      variant="contained"
                      color="primary"
                      style={{
                        width: "97px",
                        height: "23px",
                        color: "#50CD89",
                        border: "none",
                        outline: "none",
                        background: "rgba(80, 205, 137, 0.1)",
                        borderRadius: "5px",
                        "&:hover": {
                          background: "#125a77",
                        },
                      }}
                      onClick={() => {
                        // Add your routing logic here
                        // For example, you can use React Router: history.push('/your-route')
                      }}
                    >
                      Accepted
                    </button>
                  ) : (
                    <img src={DashIcon} />
                  )}
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

export default OrderedListTable;
