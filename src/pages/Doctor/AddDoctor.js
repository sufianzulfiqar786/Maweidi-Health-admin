import React, { useState } from "react";

// img svg
import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import DocRoleCrossIcon from "../../assets/images/doctor/DocRoleCrossIcon.svg";

// img png
import DoctorList from "../../components/doctors/DoctorList";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { optionSpecialization } from "../../Data/DoctorData";
import DoctorForm from "../../organisms/addDoctor";

const AddDoctor = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    const newItemObject = {
      id: items.length + 1,
    };
    setItems([...items, newItemObject]);
  };
  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <>
      <div className="row  px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Add New Doctor</p>
        </div>

        <div className=" col-12 mt-4 pt-1">
          <BreadCrum
            firstLink="/doctors"
            firstText="DOCTORS"
            secondText="ADD DOCTOR"
          />

          <div className="row mt-5 pt-3">
            <div className="col-lg-8  mb-5 pb-5 ">
              <div className="row mx-0 px-2  add-doc-left-col">
                <DoctorForm handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} items={items} />
              </div>
            </div>

            <div className="col-lg-4 mt-lg-0 mt-4 ">
              <div className="row   mx-0 add-doc-right-col">
                <DoctorList />

                <div className="row pt-1 pb-3  px-3  ">
                  <div className="col-lg-12">
                    <button className="apply-filter save-changes">
                      All Doctors
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
