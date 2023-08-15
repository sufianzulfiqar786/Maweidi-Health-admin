import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import { useState } from "react";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import NewPharmacyForm from "../../components/Pharmacy/NewPharmacyForm";

import RoleFormLab from "../../components/laboratory/laboratorylist/RoleFormLab";

const AddLab = () => {
  const [click, setClick] = useState(true);
  return (
    <>
      <div className="row px-3  pt-4 addpatient-tab">
        <div className="col-12">
          <p className="mb-0 addpatient-heading">Add New Labortory</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-lg-12 ">
              <BreadCrum
                firstLink="/laboratory"
                firstText="LABORATORY"
                secondText="ADD LABORATORY"
              />
            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="row  m-0 first-row">
            <div class="col-lg-12 ">
              <div class="add-doc-left-col">
                <NewPharmacyForm
                  lastTextBoxTitle="About Laboratory"
                  submitButtonText="Add Laboratory"
                  submitUpdateText="Update Laboratory"
                  apiEndpoint={process.env.REACT_APP_ADD_LABORATORY_DATA}
                  updateApiEndPoint={
                    process.env.REACT_APP_UPDATE_LABORATORY_DATA
                  }
                  timeGetApi={process.env.REACT_APP_GET_LABORATORY_SLOT}
                  getByIdAPI={process.env.REACT_APP_GET_LABORATORY_DATA_ID}
                  timeSetApi={process.env.REACT_APP_SET_LABORATORY_SLOT}
                  entityType="laboratory"
                  customToastMessage="Laboratory Added Successfully"
                  updateToastMessage="Laboratory Details Updated Successfully!"
                />
              </div>
            </div>
          </div>

          <div className="row pb-5 mb-lg-5 m-0 second-row">
            {click ? (
              <div
                className="col-12 mb-5 py-4 d-flex align-items-center"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <img
                  className="cursor-pointer"
                  // onClick={handleAddItem}

                  src={AddRoleIcon}
                  alt=""
                />{" "}
                <span
                  // onClick={handleAddItem}
                  className="cursor-pointer add-doc-role pl-3 "
                >
                  Add a Role
                </span>
              </div>
            ) : (
              <div className="col-lg-8 mt-3">
                <RoleFormLab
                  click={click}
                  setClick={(data) => {
                    setClick(data);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLab;
