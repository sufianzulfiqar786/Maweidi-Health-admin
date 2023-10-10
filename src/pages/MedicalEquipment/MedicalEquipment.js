import { useState } from "react";

import PharmacyDataTable from "../../components/Pharmacy/PharmacyDataTable";
import "../../assets/css/doctor.scss";
import "../../assets/css/pharmacy.scss";
import Searchbar from "../../components/common/Searchbar";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { pharmacies } from "../../Data/PharmactData";
import { Link } from "react-router-dom";
import MedicalEquipmentDataTable from "../../components/MedicalEquipment/MedicalEquipmentDataTable";
import ListHeader from "../../molecules/ListHeader/ListHeader";
import useFetch from "../../customHook/useFetch";

const MedicalEquipment = () => {
  const [filterOption, setFilterOption] = useState("today"); // default to "today"
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const role = JSON.parse(localStorage.getItem("userRoles"))
  const isSuperAdmin = Object.keys(role).length === 0

  const exportData = useFetch(
    `${process.env.REACT_APP_GET_PHARMACY_DATA}?status=${0}`
  );

  const rowss = exportData?.data
  console.log("row123", rowss?.data)

  const dataaa = rowss?.data?.map(m => ([m?.id, m?.name, process.env.REACT_APP_IMAGE_URL + '/' + m?.profile_picture , m?.email, m?.address, m?.phone, m?.country, m?.state? m?.state : 'Not Selected', m?.city, m?.zip ? m?.zip : 'null'])) || []

  const csvData = [
    ["ID", "Name", "Pic", "Email", "Address", "Mobile No.", "Country", "State", "City", "Zip Code"],
    ...dataaa
  ];

  return (
    <>
      <div className="row  px-2 pt-4">
        {/* <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Medical Equipment</p>
        </div>

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-9 col-12 mt-lg-0 mt-2">
            <BreadCrum
                firstLink="/medical/equipment"
                firstText="Medical Equipment"
                secondText="Medical Equipment LIST"
              />
            </div>
            <div className="col-lg-3 ">
            { isSuperAdmin ?   <Link className="w-100 d-flex justify-content-end" to='/medical/equipment/add'>
            <button className="common-btn ">Add Equipment</button>
            </Link>  : null}   
            </div>
          </div>
        </div> */}

        <div className="col-12 ">
          <ListHeader mainHeading='MEDICAL EQUIPMENT' placeholder='Search Title' btnText='Add MEDICAL EQUIPMENT' linkbtn='/medical/equipment/add' linkBreadCrum='/medical/equipment' blinkBreadCrumText='MEDICAL EQUIPMENT LIST' csvData={csvData} disabled={exportData?.isLoading} exportFileName='Medical_Equipment_list' />
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            {/* <div className="col-12  pb-2 d-flex justify-content-start">
              <Searchbar
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Search"
              />
            </div> */}

            <div className="col-12 px-2">
              <MedicalEquipmentDataTable rows={pharmacies} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalEquipment;
