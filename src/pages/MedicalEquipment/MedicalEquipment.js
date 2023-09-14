import { useState } from "react";

import PharmacyDataTable from "../../components/Pharmacy/PharmacyDataTable";
import "../../assets/css/doctor.scss";
import "../../assets/css/pharmacy.scss";
import Searchbar from "../../components/common/Searchbar";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { pharmacies } from "../../Data/PharmactData";
import { Link } from "react-router-dom";
import MedicalEquipmentDataTable from "../../components/MedicalEquipment/MedicalEquipmentDataTable";

const MedicalEquipment = () => {
  const [filterOption, setFilterOption] = useState("today"); // default to "today"
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};

  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
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
          <Link className="w-100 d-flex justify-content-end" to='/medical/equipment/add'>
            <button className="common-btn ">Add Equipment</button>
            </Link>    
            </div>
          </div>
        </div>

        <div className="col-12  ">
          <div className="row mb-5 pb-5">
            <div className="col-12  pb-2 d-flex justify-content-start">
              <Searchbar
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Search"
              />
            </div>

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