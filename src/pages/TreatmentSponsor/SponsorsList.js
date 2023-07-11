import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import Searchbar from "./../../components/common/Searchbar";
import DeleteModal from "../../components/common/DeleteModal";
import NeedyPatientDataTable from "../../components/treatmentsponsor/needpatientslist/NeedyPatientDataTable";
import "../../assets/css/treatmentsponsor/sponsorslist/sponsorslist.scss";
import SponsorsListDataTable from "../../components/treatmentsponsor/sponsorslist/SponsorsListDataTable";
import CancelModal from "../../components/common/CancelModal";

const SponsorsList = () => {
  const [rows, setRows] = useState([
    {
      number: 1,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 2,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 3,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 4,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 5,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 6,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
    {
      number: 7,
      name: "Sohaib",
      mobileNo: "+91-955-555-4751",
      civilId: "sohaibbutt57@gmail.com",
      date: "20th Dec 2022",
      edit: "pending",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddLaboratoryModal, setshowAddLaboratoryModal] = useState(false);
  const [showRoleModal, setshowRoleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddRole = () => {
    setshowRoleModal(true);
  };

  //  handleDeleteClickModal handlar
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <CancelModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteClick}
        heading="Delete  Record"
        description="Are you sure you want to delete the  Patient’s  record?"
      />
      <div className="row pl-3 pr-2 pt-4 sponsorlist-tab">
        <div className="col-12">
          <p className="mb-0 laboratorylist-heading">SPONSORS LIST</p>
        </div>

        {/* header  */}
        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-12">
              <p className="laboratorylist-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span>TREATMENT SPONSOR</span>
                <img src={Chevron} />
                <span className="current-tab">SPONSORS LIST</span>
              </p>
            </div>
          </div>
          <div className="row m-0 p-0 ">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
          </div>
        </div>

        {/* Table */}
        <div className="col-12 mb-5 pb-5">
          <SponsorsListDataTable
            onDeleteClick={handleDeleteClick}
            rows={rows}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default SponsorsList;
