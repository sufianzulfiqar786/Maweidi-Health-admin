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
import "../../assets/css/common/datatable.scss";
import { Box, Typography } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Edit from "../common/Edit.js";
import Delete from "../common/Delete.js";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";
import pic2 from "../../assets/images/doctor/doc2.png";
import pic3 from "../../assets/images/doctor/doc3.png";
import pic4 from "../../assets/images/doctor/doc4.png";
import { Link } from "react-router-dom";

const rows = [
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic3,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 1,
    pic: pic4,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 1,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic2,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 2,
    pic: pic3,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 3,
    pic: pic3,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
  {
    id: 4,
    pic: pic1,
    name: "Dr. Liam",
    field: "Dentist",
    rating: "4.5",
    review: "Patient Reviews",
    reviewNmber: "167",
  },
];

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows.slice(startIndex, endIndex);

  return (
    <>
      <div className="row  ml-0 mx-2 " style={{ overflowX: "hidden" }}>
        {visibleRows.map(
          ({ pic, name, field, rating, review, reviewNmber }) => {
            return (
              <>
                <div className="col-md-3  col-12 px-2 mt-lg-5 pt-lg-3 mt-3">
                  <div className="doc-card pb-1 d-flex flex-column  align-items-center">
                    <img className="doc-card-img" src={pic} alt="" />

                    <p className="mb-0 doc-card-text1 text-center pt-2 mt-1">
                      {name}
                    </p>
                    <p className="mb-0 doc-card-text2 text-center pt-1">
                      {field}
                    </p>
                    <p className="mb-0 doc-card-text3 text-center pt-1 ">
                      {rating}{" "}
                      <i
                        class="fa-solid fa-star "
                        style={{ color: "#FFCA28", paddingLeft: "1.3px" }}
                      ></i>{" "}
                    </p>
                    <p className="mb-0 doc-card-text4 text-center pt-1">
                      {review} <span className="pl-1">{reviewNmber}</span>{" "}
                    </p>

                    <Link
                      to={"/doctors/detail"}
                      state={{
                        data: { pic, name, field, rating, review, reviewNmber },
                      }}
                      className="d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <button className="doc-card-btn mt-2 mb-2 ">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          }
        )}
      </div>

      <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
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

export default DataTable;
