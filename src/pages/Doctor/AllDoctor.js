import { useState } from "react";
import DoctorDataTable from "../../components/doctors/DoctorDataTable";
import "../../assets/css/doctor.scss";
import { Button, Modal, Rate, Select, Slider, Checkbox } from "antd";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import FilterIcon from "../../assets/images/doctor/FilterIcon.svg";
import DownTriIcon from "../../assets/images/doctor/DownTriIcon.svg";
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";
import { Link } from "react-router-dom";
import CustomCheckbox from "../../components/common/CustomCheckbox";

import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import useFetch from "../../customHook/useFetch";
import PageLoader from "../../atoms/pageLoader";
import { useEffect } from "react";
import ListHeader from "../../molecules/ListHeader/ListHeader";

const AllDoctor = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["john"]);
  const [dirty, setDirty] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error, fetchPaginatedData } = useFetch(
    `${process.env.REACT_APP_GET_DOCTORS}?per_page=${rowsPerPage}&page=${page}`,
  );
  console.log("dataqqq", data?.data?.total);
  const handleChangePage = (newPage) => {
    setPage(newPage);
    // fetchPaginatedData(`${process.env.REACT_APP_GET_DOCTORS}?per_page=${rowsPerPage}&page=${newPage}`)
  };
  const handleChange = (value) => {
    setSelectedOptions(value);
    setDirty(true);
  };

  console.log('data doctor', data)

  const marks = {
    // 0: '0°C',
    15: "0 Km",
    65: "500 km",
    100: {
      style: {
        color: "#f50",
      },
    },
  };

  const marks1 = {
    15: "$ 50",
    65: "$ 300",
    100: {
      style: {
        color: "#f50",
      },
    },
  };
  // if (isLoading) return <PageLoader />;

  const role = JSON.parse(localStorage.getItem("userRoles"))
  const isSuperAdmin = Object.keys(role).length === 0

  const exportData = useFetch(
    `${process.env.REACT_APP_GET_DOCTORS}`
  );

  const rowss = exportData?.data
  console.log("row123", rowss?.data)

  const dataaa = rowss?.data?.map(m => ([m?.user?.id, m?.user?.name, process.env.REACT_APP_IMAGE_URL + m?.user?.profile_pic, m?.user?.email, m?.qualification, m?.experience_years, m?.user?.contact ])) || []

  const csvData = [
    ["ID", "Name", "Pic", "Email", "Qualification", "Experience (Years)", "Contact"],
    ...dataaa
  ];

  return (
    <>
      <div className="row  px-2 pt-4">
        {/* <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Doctors</p>
        </div> */}

<div className="col-12 ">
          <ListHeader mainHeading='DOCTOR' placeholder='Search Title' btnText='Add Doctor' linkbtn='/doctors/add' linkBreadCrum='/doctors' blinkBreadCrumText='DOCTORS LIST' csvData={csvData} disabled={exportData?.isLoading} exportFileName='Doctor_list' />
        </div>

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            {/* <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <BreadCrum
                firstLink="/doctors"
                firstText="DOCTORS"
                secondText="ALL DOCTORS"
              />
            </div> */}

            {/* <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              <button
                className="btn-add-doc-filter mr-2"
                onClick={() => setModal2Open(true)}
              >
                {" "}
                <img src={FilterIcon} alt="" />{" "}
                <span className=" pl-2 pr-3 btn-add-doc-filter-text">
                  Add Filter
                </span>{" "}
                <img src={DownTriIcon} alt="" />{" "}
              </button>{" "}
              { isSuperAdmin ?   <button className="btn-add-new-doc">
                {" "}
              <Link className="add-doc-link-color" to="/doctors/add">
                  Add New Doctor{" "}
                </Link> 
              </button> : null}
            </div>  */}

            <Modal
              className="doctor-filter-modal"
              centered
              open={modal2Open}
              onCancel={() => setModal2Open(false)}
              width={735}
              footer={
                <div className="row px-3 mt-4 mb-2">
                  <div className="col-6"></div>

                  <div className="col-6 d-flex justify-content-end mt-3">
                    <button className="apply-filter">Apply Filter</button>
                  </div>
                </div>
              }
            >
              <div className="row px-3 border-bottom">
                <div className="col-12 ">
                  <p className="doc-add-filter">Add Filters</p>
                </div>
              </div>

              <div className="row px-3 mt-4">
                <div className="col-lg-6">
                  <p className=" doc-add-filter-text">Departments</p>

                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={() => { }}
                    options={[
                      {
                        label: "Cardiology​​",
                        value: "Cardiology​​",
                      },
                      {
                        label: "Neurology",
                        value: "Neurology",
                      },
                      {
                        label: "Gynaecology",
                        value: "Gynaecology",
                      },
                      {
                        label: "Ophthalmology",
                        value: "Ophthalmology",
                      },
                      {
                        label: "Urology",
                        value: "Urology",
                      },
                    ]}
                  />
                </div>

                <div className="col-lg-6 mt-lg-0 mt-3">
                  <p className="mb-2 pb-1 doc-add-filter-text">
                    Doctor’s Rating
                  </p>

                  <Rate allowHalf defaultValue={4} />
                </div>
              </div>

              <div className="row px-3 mt-4">
                <div className="col-lg-6 ">
                  <p className=" doc-add-filter-text">Gender</p>

                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={() => { }}
                    options={[
                      {
                        label: "Male​​",
                        value: "Male",
                      },
                      {
                        label: "Female​​",
                        value: "Female",
                      },
                    ]}
                  />
                </div>

                <div className="col-lg-6 mt-lg-0 mt-3">
                  <p className=" doc-add-filter-text">Specialization</p>
                  <div className="all-doc-filter-multi-select d-flex justify-content-between ">
                    <Select
                      onChange={handleChange}
                      onMouseDown={(e) => {
                        setDirty(false);
                        console.log("Select Clicked");
                        e.stopPropagation();
                      }}
                      style={{ width: "100%", minHeight: "36.6px" }}
                      mode="multiple"
                      options={[
                        {
                          value: "Allergists/Immunologists",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Allergists/Immunologists"
                              )}
                            >
                              Allergists/Immunologists
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Anesthesiologists",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Anesthesiologists"
                              )}
                            >
                              Anesthesiologists
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Cardiologists​",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Cardiologists​"
                              )}
                            >
                              Cardiologists
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Colon and Rectal Surgeons​",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Colon and Rectal Surgeons​"
                              )}
                            >
                              Colon and Rectal Surgeons
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Dermatologists​",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Dermatologists​"
                              )}
                            >
                              Dermatologists
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Endocrinology​",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Endocrinology​"
                              )}
                            >
                              Endocrinology
                            </Checkbox>
                          ),
                        },
                        {
                          value: "Gastroenterologists​",
                          label: (
                            <Checkbox
                              style={{ height: "20px", paddingBottom: "3px" }}
                              checked={selectedOptions.includes(
                                "Gastroenterologists​"
                              )}
                            >
                              Gastroenterologists
                            </Checkbox>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="row px-3 mt-4">
                <div className="col-lg-6">
                  <p className=" doc-add-filter-text">Experience</p>

                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={() => { }}
                    options={[
                      {
                        label: "Cardiology​​",
                      },
                      {
                        label: "Neurology",
                      },
                      {
                        label: "Cardiology​​",
                      },
                      {
                        label: "Neurology",
                      },
                    ]}
                  />
                </div>

                <div className="col-lg-6 mt-lg-0 mt-3">
                  <p className=" doc-add-filter-text">Language</p>

                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={() => { }}
                    options={[
                      {
                        label: "Allergists/Immunologists​​",
                      },
                      {
                        label: "Anesthesiologists",
                      },
                      {
                        label: "Cardiologists​​",
                      },
                      {
                        label: "Colon and Rectal Surgeons",
                      },
                      {
                        label: "Dermatologists​​",
                      },
                      {
                        label: "Endocrinology",
                      },
                      {
                        label: "Gastroenterologists",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="row px-3 mt-4">
                <div className="col-lg-6">
                  <p className=" doc-add-filter-text">Time</p>

                  <div className="d-flex row">
                    <div className=" col-4 mt-lg-0  ">
                      <button className="doc-timing">Morning </button>
                      <p className="mb-0 pl-2 mt-1  text-center doc-text">
                        Before 12pm
                      </p>
                    </div>

                    <div className=" col-lg-4  mt-lg-0 mt-2 d-flex justify-content-lg-center">
                      <div>
                        <button className="doc-timing">Afternoon</button>
                        <p className="mb-0 mt-1 text-center doc-text">
                          12pm - 4pm
                        </p>
                      </div>
                    </div>

                    <div className=" col-lg-4  mt-lg-0 mt-2 d-flex justify-content-lg-end">
                      <div>
                        <button className="doc-timing">Evening</button>
                        <p className="mb-0 mt-1 text-center doc-text">
                          After 4pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-lg-0 mt-3">
                  <p className=" doc-add-filter-text">Sub Specialization</p>

                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={() => { }}
                    options={[
                      {
                        label: "Allergists/Immunologists​​",
                      },
                      {
                        label: "Anesthesiologists",
                      },
                      {
                        label: "Cardiologists​​",
                      },
                      {
                        label: "Colon and Rectal Surgeons",
                      },
                      {
                        label: "Dermatologists​​",
                      },
                      {
                        label: "Endocrinology",
                      },
                      {
                        label: "Gastroenterologists",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="row px-3 mt-4">
                <div className="col-lg-6">
                  <p className=" doc-add-filter-text">Fee Range</p>

                  <Slider
                    range
                    step={10}
                    defaultValue={[15, 65]}
                    onChange={() => { }}
                    onAfterChange={() => { }}
                    trackStyle={{ backgroundColor: "#4FA6D1" }}
                    handleStyle={{ backgroundColor: "#4FA6D1" }}
                    railStyle={{ backgroundColor: "#E9ECEF" }}
                    marks={marks1}
                  />
                </div>

                <div className="col-lg-6">
                  <p className=" doc-add-filter-text">Distance </p>

                  <Slider
                    range
                    step={10}
                    defaultValue={[15, 65]}
                    onChange={() => { }}
                    onAfterChange={() => { }}
                    trackStyle={{ backgroundColor: "#4FA6D1" }}
                    handleStyle={{ backgroundColor: "#4FA6D1" }}
                    railStyle={{ backgroundColor: "#E9ECEF" }}
                    marks={marks}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <div className="col-12 mb-5 pb-5 px-0">
          <DoctorDataTable
            rows={data?.data}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            totalDoctors={data?.data?.total}
            toDoctors={data?.data?.to}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AllDoctor;
