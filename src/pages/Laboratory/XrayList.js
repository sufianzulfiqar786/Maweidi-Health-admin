import React, { useState } from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import "../../assets/css/laboratory/laboratorylist/laboratorylist.scss";
import Searchbar from "./../../components/common/Searchbar";
import XrayListDataTable from "../../components/laboratory/laboratorylist/XrayListDataTable";
import AddLaboratoryModal from "../../components/laboratory/laboratorylist/AddLaboratoryModal";
import AddRoleModal from "../../components/laboratory/laboratorylist/AddRoleModal";
import EditLaboratoryModal from "../../components/laboratory/laboratorylist/EditLaboratoryModal";
import DeleteModal from "../../components/common/DeleteModal";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { Link } from "react-router-dom";
import ListHeader from "../../molecules/ListHeader/ListHeader";
import useFetch from "../../customHook/useFetch";

const XrayList = () => {
  const [rows, setRows] = useState([
    {
      number: 1,
      name: "Al-Rashid Pharmacy",
      email: "info@alrashidpharmacy.com",
      address: "123 Main Street",
      mobileNo: "+965 12345678",
      country: "Kuwait",
      state: "Hawalli",
      zipCode: "12345",
      edit: "pending"
    },
    {
      number: 2,
      name: "Pharma Plus",
      email: "pharmaplus@gmail.com",
      address: "456 Elm Street",
      mobileNo: "+965 87654321",
      country: "Kuwait",
      state: "Ahmadi",
      zipCode: "54321",
      edit: "approved"
    },
    {
      number: 3,
      name: "MediCare Pharmacy",
      email: "info@medicarepharmacy.com",
      address: "789 Oak Street",
      mobileNo: "+965 11223344",
      country: "Kuwait",
      state: "Farwaniya",
      zipCode: "67890",
      edit: "pending"
    },
    // Add more pharmacy objects here if needed
    {
      number: 28,
      name: "Life Pharmacy",
      email: "info@lifepharmacy.com",
      address: "789 Maple Avenue",
      mobileNo: "+965 98765432",
      country: "Kuwait",
      state: "Salmiya",
      zipCode: "24680",
      edit: "approved"
    },
    {
      number: 29,
      name: "Green Cross Pharmacy",
      email: "info@greencrosspharmacy.com",
      address: "321 Pine Street",
      mobileNo: "+965 55555555",
      country: "Kuwait",
      state: "Jabriya",
      zipCode: "13579",
      edit: "pending"
    },
    {
      number: 30,
      name: "Vital Care Pharmacy",
      email: "info@vitalcarepharmacy.com",
      address: "654 Cedar Road",
      mobileNo: "+965 12312312",
      country: "Kuwait",
      state: "Mangaf",
      zipCode: "98765",
      edit: "approved"
    }
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

  const role = JSON.parse(localStorage.getItem("userRoles"))
  const isSuperAdmin = Object.keys(role).length === 0

  const exportData = useFetch(
    `${process.env.REACT_APP_GET_LABORATORY_DATA}?is_laboratory=${0}`
  );

  const rowss = exportData?.data
  console.log("row123", rowss?.data)

  const dataaa = rowss?.data?.map(m => ([m?.id, m?.name, process.env.REACT_APP_IMAGE_URL + '/' + m?.profile_picture ,m?.email, m?.address, m?.phone, m?.country, m?.state ? m?.state : 'Not Selected', m?.city, m?.zip ? m?.zip : 'null'])) || []

  const csvData = [
    ["ID", "Name", "Pic", "Email", "Address", "Mobile No.", "Country", "State", "City", "Zip Code"],
    ...dataaa
  ];

  return (
    <>
      {/* <AddLaboratoryModal
        open={showAddLaboratoryModal}
        onClose={() => setshowAddLaboratoryModal(false)}
      /> */}
      {/* <AddRoleModal
        open={showRoleModal}
        onClose={() => setshowRoleModal(false)}
      /> */}

      {/* <EditLaboratoryModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditClick}
      /> */}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteClick}
      />
      <div className="row pl-3 pr-2 pt-4 laboratorylist-tab">

        {/* <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-6">
            <BreadCrum
                firstLink="/xray/list"
                firstText="X RAY"
                secondText="X RAY LIST"
              />
            </div>

            
          </div>
          <div className="row m-0 p-0 ">
          <div className="col-6 px-0 w-100 d-flex justify-content-start align-items-end">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
            </div>
            <div className="col-6 px-0 w-100 d-flex justify-content-end align-items-end">
            { isSuperAdmin ?    <button className="btn-add-new-doc">
                {" "}
                <Link className="add-doc-link-color" to="/xray/add">
                  {" "}
                  Add X-ray{" "}
                </Link>
              </button> : null}
            </div>
          </div>
        </div> */}

        <div className="col-12 px-4">
          <ListHeader mainHeading='X-ray' placeholder='Search Title' btnText='Add X-ray' linkbtn='/xray/add' linkBreadCrum='/xray/list' blinkBreadCrumText='X-ray LIST' csvData={csvData} disabled={exportData?.isLoading} exportFileName='X-ray_list' />
        </div>

        {/* Table */}
        <div className="col-12 mb-5 pb-5">
          <XrayListDataTable
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            rows={rows}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default XrayList;
