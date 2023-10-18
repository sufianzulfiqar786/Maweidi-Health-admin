import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import Searchbar from "./../../components/common/Searchbar";
import EditLaboratoryModal from "../../components/laboratory/laboratorylist/EditLaboratoryModal";
import DeleteModal from "../../components/common/DeleteModal";
import NeedyPatientDataTable from "../../components/treatmentsponsor/needpatientslist/NeedyPatientDataTable";
import NeedPatientEditModal from "../../components/treatmentsponsor/needpatientslist/NeedPatientEditModal";
import "../../assets/css/laboratory/laboratorylist/laboratorylist.scss";
import CancelModal from "../../components/common/CancelModal";
import AcceptModal from "../../components/common/AcceptModal";
import { Link } from "react-router-dom";
import useFetch from "../../customHook/useFetch";
import ListHeader from "../../molecules/ListHeader/ListHeader";
const NeedyPatientList = () => {
  const [rows, setRows] = useState([
    {
      number: 1,
      name: "Sohaib",
      patientId: "MCR000345721",
      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 2,
      name: "Sohaib",
      patientId: "MCR000345721",

      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 3,
      name: "Sohaib",
      patientId: "MCR000345721",

      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 4,
      name: "Sohaib",
      patientId: "MCR000345721",

      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 5,
      name: "Sohaib",
      patientId: "MCR000345721",
      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 6,
      name: "Sohaib",
      patientId: "MCR000345721",
      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
    {
      number: 7,
      name: "Sohaib",
      patientId: "MCR000345721",
      mobileNo: "+91-955-555-4751",
      civilId: "2415346465",
      gender: "male",
      treatmentCost: "54000",
      disease: "Campylobacter Infection.",
      description: "Lorum Ipsum is that the text",
      edit: "pending",
      hospital:"Abdullah Medical Complex	"
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddLaboratoryModal, setshowAddLaboratoryModal] = useState(false);
  const [showRoleModal, setshowRoleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tickCompleted, settickCompleted] = useState(false)
  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddLaboratory = () => {
    setshowAddLaboratoryModal(true);
  };

  const handleAddRole = () => {
    setshowRoleModal(true);
  };

  //   handleEditClickModal handler
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  //  handleDeleteClickModal handlar
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleTick = () => {
    settickCompleted(true);
  }

  const exportData = useFetch(
    `${process.env.REACT_APP_LIST_NEEDY_PATIENT}`
  );

  const rowss = exportData?.data
  console.log("row123", rowss?.data)

  const dataaa = rowss?.data?.map(m=>([m?.id, m?.first_name, m?.patient_id , m?.hospital?.name , m?.contact , m?.civil_id, m?.gender ==1? 'Male': m.gender ==3? "Female": 'Other', m.approx_treatment_cost? m.approx_treatment_cost :'-', m?.disease, m.status ===1 ? 'Approved' : 'Pending' ])) ||[]

  const csvData = [
    ["ID", "Name", "Patient ID no", "Hospital", "Mobile No.", "Civil ID no", "Gender", "Treatment Cost", "Disease", "Status"],
   ...dataaa
  ];

  return (
    <>
      <NeedPatientEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditClick}
      />
      <CancelModal
        heading="Delete Record"
        description="Are you sure you want to delete the  Patient’s  record?"
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteClick}
      />
      <AcceptModal
        open={tickCompleted}
        heading="Accept Application"
        description="Do you want to Accepted the Application?"
        onClose={() => settickCompleted(false)}
        onAccept={handleTick}
      />
      <div className="row pl-3 pr-2 pt-4 laboratorylist-tab">
        {/* <div className="col-12">
          <p className="mb-0 laboratorylist-heading">Needy Patients List</p>
        </div> */}

        {/* header  */}
        {/* <div className="col-12 my-4"> */}
          <div className="row ">
            {/* <div className="col-md-6">
              <p className="laboratorylist-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span> TREATMENT SPONSOR</span>
                <img src={Chevron} />
                <span className="current-tab">NEEDY PATIENTS LIST</span>
              </p>
            </div> */}

            <div class="col-md-6 text-md-right ">
              {/* <button
                onClick={handleAddRole}
                style={{ marginRight: "15px" }}
                type="button"
                class="add-role"
              >
                Sponsors List
              </button> */}
            </div>
          </div>
          {/* <div className="row m-0 p-0 w-100">
          <div className="col-6 px-0 w-100 d-flex justify-content-start align-items-end">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
            </div>
            <div className="col-6 px-0 w-100 d-flex justify-content-end align-items-end">
            <button className="btn-add-new-doc">
                {" "}
                <Link className="add-doc-link-color" to="/treatment-sponsor">
                  {" "}
                  Add Needy Patient{" "}
                </Link>{" "}
              </button>
            </div>
          </div> */}
        {/* </div> */}

        {/* Table */}

        <div className="col-12 ">
              <ListHeader mainHeading='TREATMENT-SPONSOR' placeholder='Search Title' btnText='Add Needy Patient' btnShow={true} linkbtn='/treatment-sponsor' linkBreadCrum='/needy-patients' blinkBreadCrumText='NEEDY-PATIENT LIST' csvData={csvData} disabled={exportData?.isLoading} exportFileName='Needy_Patient_list' />
            </div>

        <div className="col-12 mb-5 pb-5">
          <NeedyPatientDataTable
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onTickComplete={handleTick}

            rows={rows}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default NeedyPatientList;
