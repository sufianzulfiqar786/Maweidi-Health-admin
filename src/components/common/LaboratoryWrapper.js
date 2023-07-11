import { useState } from "react";
import editIcon from "../../assets/images/common/lab-edit.svg";
import deleteIcon from "../../assets/images/common/lab-delete.svg";
import Tick from "./Tick";
import Cross from "./Cross";
import AcceptModal from "./AcceptModal";
import CancelModal from "./CancelModal";
import CustomPagination from "./CustomPagination";
import "../../assets/css/common/common.scss";
import AddTestModal from "../laboratory/bloodtest/AddTestModal";
import { Modal } from "antd";

const LaboratoryWrapper = ({ title, requestSectionTitle, rows, icon }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [showTickModal, setShowTickModal] = useState(false);
  const [showCrossModal, setShowCrossModal] = useState(false);
  const [showAddTestModal, setshowAddTestModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleAddTestModal = () => {
    console.log("showAddTestModal", showAddTestModal)
    setshowAddTestModal(true);
  };



  const testAppointments = [
    {
      name: "Calvin Carlo",
      department: "Haematology",
      date: "12 Dec 2022",
    },
    {
      name: "Alice Adams",
      department: "X-Ray",
      date: "13 Dec 2022",
    },
    {
      name: "Bob Barker",
      department: "Blood Test",
      date: "14 Dec 2022",
    },
    {
      name: "Charlie Chapman",
      department: "Haematology",
      date: "15 Dec 2022",
    },
    {
      name: "David Dunn",
      department: "X-Ray",
      date: "16 Dec 2022",
    },
    {
      name: "Emma Evans",
      department: "Blood Test",
      date: "17 Dec 2022",
    },
    {
      name: "Franklin Fisher",
      department: "Haematology",
      date: "18 Dec 2022",
    },
    {
      name: "Grace Gibson",
      department: "X-Ray",
      date: "19 Dec 2022",
    },
    {
      name: "Harry Hughes",
      department: "Ultrasound",
      date: "20 Dec 2022",
    },
    {
      name: "Isabella Ingram",
      department: "MRI",
      date: "21 Dec 2022",
    },
    {
      name: "Jake Johnson",
      department: "Echocardiogram",
      date: "22 Dec 2022",
    },
    {
      name: "Katherine King",
      department: "Dermatology",
      date: "23 Dec 2022",
    },
  ];
  

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows.slice(startIndex, endIndex);

  //  AcceptAppointModal handler
  const handleTickClick = () => {
    console.log("hey");
    setShowTickModal(true);
  };

  //  CancelAppointentModal handlar
  const handleCrossClick = () => {
    setShowCrossModal(true);
  };



  return (
    <>
      <AddTestModal
        xrays="xrays"
        bloodTest="bloodTest"
        open={showAddTestModal}
        onClose={() => setshowAddTestModal(false)}
        title='Edit '
      />
      <AcceptModal
        heading="Accept Request"
        description="Are you sure you want accept the test panel request?"
        open={showTickModal}
        onClose={() => setShowTickModal(false)}
      />
      <CancelModal
        heading="Cancel Request"
        description="Are you sure you want to cancel the test panel request?"
        open={showCrossModal}
        onClose={() => setShowCrossModal(false)}
      />

      <div class="wrapper">
        <div class="row  m-0 first-row">
          <div class="col-lg-8 ">
            <div class="left-div">
              <div className="details-wrapper">
                <div className="heading">{title}</div>

                <div className="details-card-wrapper">
                  {visibleRows?.map((test) => {
                    return (
                      <div className="detail-card">
                        <div className="card-header-detail">
                          <img src={icon} />
                          <div className="detail">
                            <div className="name">{test.testname}</div>
                            {test?.testdepartment ? (
                              <div className="department">
                                {test?.testdepartment}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="rate">{test.rate}</div>
                          <div className="edit-delete">
                            <img onClick={handleAddTestModal} src={editIcon} />
                            <img onClick={() => setDeleteModal(true)} src={deleteIcon} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pagination-container">
                <div className="pagination-detail">
                  Showing {page * rowsPerPage + 1} -{" "}
                  {Math.min((page + 1) * rowsPerPage, rows.length)} of{" "}
                  {rows.length}
                </div>
                <CustomPagination
                  page={page}
                  totalPages={totalPages}
                  onChangePage={handleChangePage}
                />
              </div>
            </div>
          </div>

          <div class="col-lg-4 ">
            <div class="right-div">
              <div className="container-wrapper">
                <div className="header">
                  <div className="title">{requestSectionTitle}</div>
                  <hr
                    style={{
                      borderColor: "border: 1px solid #E4E3E4 !important",
                      margin: "0px",
                    }}
                  />
                </div>
                <div className="list-wrapper">
                  {testAppointments.map(({name, department ,date}) => {
                    return (
                      <>
                        <div className="list">
                          <div className="detail">
                            <div className="name">{name}</div>
                            <div className="department">{department}</div>
                            <div className="date">{date}</div>
                          </div>
                          <div className="permissions">
                            <Tick onTick={handleTickClick} />
                            <Cross onCross={handleCrossClick} />
                          </div>
                        </div>
                        <hr style={{ margin: "0px" }} />
                      </>
                    );
                  })}
                </div>
                {/* <button className="">All Doctors</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
                    className="doctor-filter-modal"
                    centered
                    open={deleteModal}
                    // onOk={() => setModal2Open(false)}
                    onCancel={() => setDeleteModal(false)}
                    width={514}
                    footer={null}
                    closable={false}

                >

                    <div className="row pb-1">
                        <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
                            <p className='mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3'>Are you sure you want to delete?</p>
                            <button className='mt-lg-4 mt-1 mb-lg-5 mb-2'>Delete</button>
                        </div>
                    </div>
                </Modal>
    </>
  );
};

export default LaboratoryWrapper;
