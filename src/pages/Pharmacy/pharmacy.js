import { useState } from "react";

import PharmacyDataTable from "../../components/Pharmacy/PharmacyDataTable";
import "../../assets/css/doctor.scss";
import "../../assets/css/pharmacy.scss";
import Searchbar from "../../components/common/Searchbar";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import { pharmacies } from "../../Data/PharmactData";

const Pharmacy = () => {
  const [filterOption, setFilterOption] = useState("today"); // default to "today"
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
};

  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Pharmacy List</p>
        </div>

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <BreadCrum
                firstLink="/pharmacy"
                firstText="PHARMACY"
                secondText="PHARMACY LIST"
              />
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
              <PharmacyDataTable rows={pharmacies} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pharmacy;
