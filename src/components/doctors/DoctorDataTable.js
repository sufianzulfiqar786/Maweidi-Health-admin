import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import CustomPagination from "../common/CustomPagination";
import CardHeader from "@mui/material/CardHeader";
import { Box } from "@mui/material";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";

const DataTable = ({
  doctors,
  handleChangePage,
  rowsPerPage,
  page,
  totalDoctors,
  rows,
  toDoctors,
  isLoading,
}) => {

  console.log("totalDoctors", totalDoctors)

  const totalPages = Math.ceil(totalDoctors / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalDoctors);
  const visibleRows = rows?.data;
  console.log("visibleRows", visibleRows);

  return (
    <div className="row ml-0 mx-2 mt-2" style={{ overflowX: "hidden" }}>
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Qualification</TableCell>
              <TableCell align="center">Experience (Years)</TableCell>
              <TableCell align="center">Contact</TableCell>

              <TableCell align="center">View Profile</TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            className="w-100"
            sx={{
              "& td": {
                color: "#767676",
                whiteSpace: "nowrap",
                wordWrap: "break-word",
              },
            }}
          >
            { !isLoading ? visibleRows?.map(
              (
                {
                  id,
                  user: { name, email, contact, profile_pic },
                  qualification,
                  experience_years,
                },
                index
              ) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" className="number">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell align="left">
                    <CardHeader
                      sx={{ padding: "0px" }}
                      avatar={
                        <Box
                          sx={{
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                          }}
                        >
                          <Avatar
                            alt={`Doctor Pic`}
                            src={`${process.env.REACT_APP_IMAGE_URL}/${profile_pic}`}
                          />
                        </Box>
                      }
                      title={name.split(' ').slice(0, 2).join(' ')}
                    />
                  </TableCell>
                  <TableCell align="left">{email}</TableCell>
                  <TableCell align="center">{qualification}</TableCell>
                  <TableCell align="center">{experience_years}</TableCell>
                  <TableCell align="center">{contact}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/doctors/detail/${id}`}
                      state={{
                        data: {
                          profile_pic,
                          name,
                          qualification,
                          email,
                          experience_years,
                        },
                      }}
                      className="d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      View Profile
                    </Link>
                  </TableCell>
                </TableRow>
              )
            ) :
            <TableRow>
              <TableCell colSpan={11}>
                <ListSkeleton totalRow={4} totalCol={11} image={true} />
              </TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>

      {/* <div className="pagination-container px-md-3 ml-md-1 mt-md-2">
        <div className="pagination-detail">
          Showing {startIndex + 1} of {visibleRows?.length}
        </div>
        <div className="doc-pagination">
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </div>
      </div> */}
      <div className="pagination-container px-md-3 ml-md-1 mt-md-2 d-flex justify-content-between w-100">
        <div className="pagination-detail">
          Showing {(page - 1) * rowsPerPage + 1} -{" "}
          {toDoctors} of {totalDoctors}
        </div>
        <CustomPagination
          page={page}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default DataTable;
