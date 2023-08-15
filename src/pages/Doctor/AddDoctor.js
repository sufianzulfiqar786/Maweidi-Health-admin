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
            <div className="col-lg-8   ">
              <div className="row mx-0 px-2 add-doc-left-col">
                <DoctorForm />
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

          <div className="row mb-5 py-lg-3">
            {items.map((item, index) => {
              return (
                <>
                  <div className={`col-lg-8 mt-lg-0 mt-4 pb-lg-3 `}>
                    <div className="row mx-0  add-doc-left-col">
                      <div className="col-12 px-4 py-3 my-1 ">
                        <div className=" d-flex justify-content-between align-items-center ">
                          <p className="mb-0  add-doc-role-text">Add a Role </p>
                          <img
                            onClick={() => {
                              handleRemoveItem(index);
                            }}
                            src={DocRoleCrossIcon}
                            alt=""
                          />
                        </div>
                      </div>

                      <div
                        className="border-top pt-3"
                        id="scrollableDiv"
                        style={{
                          width: "100%",
                          overflow: "auto",
                          padding: "0 16px",
                        }}
                      >
                        <div className="col-12 px-2">
                          <div className="row">
                            <div className="col-3 add-doc-role-type">
                              Role Type:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              Doctor
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Email:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              janecoper789@gmail.com
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Phone:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              03451234567
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-3 add-doc-role-type">
                              Role Linked to:
                            </div>
                            <div className="col-9 add-doc-role-type-detail">
                              Civil Hospital
                            </div>
                          </div>

                          <div className="row mt-4 pt-2">
                            <div className="col-lg-12   doc-setting-input doc-setting-input-black">
                              <p className="mb-2 add-doc-role-type-detail">
                                Country{" "}
                              </p>
                              <CustomDropDown
                                selectLabel="Kuwait"
                                option={optionSpecialization}
                              />
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-6 pr-lg-1 doc-setting-input role-input-placeholder">
                              <p className="mb-2 add-doc-role-type-detail">
                                {" "}
                                Contact{" "}
                              </p>
                              <input
                                type="text"
                                placeholder="+91-955-555-4751"
                              />
                            </div>

                            <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input doc-setting-input-black">
                              <p className="mb-2 add-doc-role-type-detail">
                                {" "}
                                State{" "}
                              </p>
                              <CustomDropDown
                                selectLabel="Al Jahra"
                                option={optionSpecialization}
                              />
                            </div>
                          </div>

                          <div className="row my-5 pt-2 pb-3 ">
                            <div className="col-lg-6">
                              <button className="apply-filter add-doc-changes">
                                Save Changes
                              </button>
                            </div>

                            <div className="col-lg-6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`col-4  `}></div>
                </>
              );
            })}

            <div className="col-12 mb-5 py-4 d-flex align-items-center ">
              <div onClick={handleAddItem}>
                <img className="cursor-pointer" src={AddRoleIcon} alt="" />{" "}
                <span className="cursor-pointer add-doc-role pl-3 ">
                  Add a Role
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
