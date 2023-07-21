import React, { useState } from "react";
import "../../assets/css/common/datatable.scss";
import CustomPagination from "../common/CustomPagination";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";

import { Link } from "react-router-dom";

const DataTable = ({ rows, handleChangePage, rowsPerPage, page }) => {
  const totalRows = rows?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = rows?.slice(startIndex, endIndex);
  const visibleRows = rows?.data;

  return (
    <>
      <div className="row  ml-0 mx-2 " style={{ overflowX: "hidden" }}>
        {visibleRows ? (
          visibleRows?.map(
            ({
              id,

              reviews,
              departments,
              rating,
              reviewNmber,
              user: { name, profile_pic },
            }) => {
              return (
                <>
                  <div className="col-md-3  col-12 px-2 mt-lg-5 pt-lg-3 mt-3">
                    <div className="doc-card pb-1 d-flex flex-column  align-items-center">
                      <div className="doc-card-img">
                        <img
                          className=""
                          src={
                            `${process.env.REACT_APP_IMAGE_URL}/${profile_pic}` ||
                            pic1
                          }
                          alt=""
                        />
                      </div>

                      <p className="mb-0 doc-card-text1 text-center pt-2 mt-1">
                        {name}
                      </p>
                      <p className="mb-0 doc-card-text2 text-center pt-1">
                        {departments}
                      </p>
                      <p className="mb-0 doc-card-text3 text-center pt-1 ">
                        {4}{" "}
                        <i
                          class="fa-solid fa-star "
                          style={{ color: "#FFCA28", paddingLeft: "1.3px" }}
                        ></i>{" "}
                      </p>
                      <p className="mb-0 doc-card-text4 text-center pt-1">
                        Patient Reviews
                        <span className="pl-1">{reviews?.length}</span>{" "}
                      </p>

                      <Link
                        to={`/doctors/detail/${id}`}
                        state={{
                          data: { profile_pic, name, departments, rating },
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
          )
        ) : (
          <div className="col-12 text-center my-4">
            <h4>No Data Found</h4>
          </div>
        )}
      </div>
      {visibleRows ? (
        <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
          <div className="pagination-detail">
            Showing {(page - 1) * rowsPerPage + 1} -{" "}
            {rows?.to} of{" "}
            {rows?.total}
          </div>
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </div>
      ) : null}
    </>
  );
};

export default DataTable;
