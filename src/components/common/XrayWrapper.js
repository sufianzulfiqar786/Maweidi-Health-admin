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
import useFetch from "../../customHook/useFetch";
import { CustomToast } from "../../atoms/toastMessage";
import useDeleteData from "../../customHook/useDelete";
import { useEffect } from "react";

const XrayWrapper = ({ title, requestSectionTitle, icon,modalNav,setModalNav }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [showTickModal, setShowTickModal] = useState(false);
  const [showCrossModal, setShowCrossModal] = useState(false);
  const [showAddTestModal, setshowAddTestModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);


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


  const getBloodTest = useFetch(
    `${process.env.REACT_APP_GET_BLOOD_TEST}?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`
  );

  const rows = getBloodTest.data
  console.log("roesss", rows?.data)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log('visibleRows', visibleRows)

  // const totalRows = rows.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = rows.slice(startIndex, endIndex);



  //  AcceptAppointModal handler
  const handleTickClick = () => {
    console.log("hey");
    setShowTickModal(true);
  };

  //  CancelAppointentModal handlar
  const handleCrossClick = () => {
    setShowCrossModal(true);
  };

  const deleteProductData = useDeleteData();
  const deleteData = deleteProductData.deleteData

  const handleDelete = (Id) => {

    deleteData(`${process.env.REACT_APP_DELETE_BLOOD_TEST}/${Id}`, () => {
      // setDeleteModal(false)
      getBloodTest?.fetchPaginatedData(`${process.env.REACT_APP_GET_BLOOD_TEST}?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`)
      // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
      CustomToast({
        type: "success",
        message: "Test Delete Successfuly!",
      });
      setDeleteModal(false)
      // setRows(filter)
    });
  };

  useEffect(()=>{
    getBloodTest?.fetchPaginatedData(`${process.env.REACT_APP_GET_BLOOD_TEST}?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`)
  },[modalNav])


  return (
    <>
      <AddTestModal
        xrays="xrays"
        bloodTest="bloodTest"
        open={showAddTestModal}
        onClose={() => setshowAddTestModal(false)}
        title='Edit '
        Id={uniqueId}
        setModalNav={()=>setModalNav(!modalNav)}
        modalNav={modalNav}
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
         {visibleRows?.length> 0? <div class="col-lg-8  ">

              <div className="details-wrapper ">
                <div className="heading">{title}</div>

                <div className="details-card-wrapper">
                  {visibleRows?.map((test) => {
                    console.log("testsdfsdf", test?.blood_test_category?.name)
                    return (
                      <div className="detail-card">
                        <div className="card-header-detail">
                          <img src={icon} />
                          <div className="detail">
                            <div className="name">{test.title}</div>
                          
                              <div className="department">
                                {test?.blood_test_category?.name? test?.blood_test_category?.name : 'Not Category Found'}
                              </div>
                          
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="rate">KWD {test.price}</div>
                          <div className="edit-delete">
                            <img onClick={()=>{
                              handleAddTestModal()
                              setUniqueId(test?.id)
                            }} src={editIcon} />
                            <img onClick={() => {setDeleteModal(true)
                           setUniqueId(test?.id)
                            }} src={deleteIcon} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
                <div className="pagination-detail">
                  Showing {(page - 1) * rowsPerPage + 1} -{" "}
                  {rows?.data?.to} of {rows?.data?.total}
                </div>
                <CustomPagination
                  page={page}
                  totalPages={totalPages}
                  onChangePage={handleChangePage}
                />
              </div>
       
          </div> : 
          <div className="d-flex justify-content-center w-100">
            Data Not Found
          </div>
          }

          <div class="col-lg-0 ">
            {/* <div class="right-div">
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
                  {testAppointments.map(({ name, department, date }) => {
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
              </div>
            </div> */}
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
            <button className='mt-lg-4 mt-1 mb-lg-5 mb-2'
            onClick={()=>{
              handleDelete(uniqueId)
            }}
            >Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default XrayWrapper;
