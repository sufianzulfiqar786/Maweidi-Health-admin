import React from "react";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { optionSpecialization } from "../../Data/DoctorData";
import closeIcon from "../../assets/images/common/close.svg";
import AddRole from "../../pages/Role/AddRole";
import { useState } from "react";
const NewPharnacyRole = ({ click, setClick }) => {
  const [addRole, setAddRole] = useState({ country: "Kuwait" })
  const [roleParentValidation, setRoleParentValidation] = useState(false);
  const [roleCategoryId, setRoleCategoryId] = useState("");
  return (
    <>
      <div className="add-appointment-card-wrapper">
        <div className="title-header">
          <div className="title">Add a Role</div>
          <img
            src={closeIcon}
            onClick={() => {
              setClick(!click);
            }}
          />
        </div>
        <hr />

        <AddRole upperData={false} roleParent={[
          { value: 3, label: "Pharmacy Admin" }
        ]}
          setAddRole={setAddRole} addRole={addRole}
          roleParentValidation={roleParentValidation}
          roleCategoryId={roleCategoryId}
          navigateLink='pharmacy'
        />

        {/* <div className="row px-3 mt-4">
          <div className="col-lg-6 doc-setting-input">
            <p className=" doc-add-filter-text">Role Type</p>

            <input type="text" placeholder="Pharmacist" />
          </div>

          <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">
            <p className=" doc-add-filter-text">
              Hospital <span style={{ color: "#8C8C8C" }}>(Optional)</span>
            </p>

            <CustomDropDown
              selectLabel="Select"
              option={optionSpecialization}
            />
          </div>
        </div>

        <div className="row px-3 mt-4">
          <div className="col-lg-12 doc-setting-input">
            <p className=" doc-add-filter-text">Name</p>

            <input type="text" />
          </div>
        </div>

        <div className="row px-3 mt-4">
          <div className="col-lg-12 doc-setting-input">
            <p className=" doc-add-filter-text">Email</p>

            <input type="text" />
          </div>
        </div>

        <div className="row px-3 mt-4">
          <div className="col-lg-12 mt-lg-1 mt-0 doc-setting-input">
            <p className=" doc-add-filter-text">City</p>

            <CustomDropDown
              selectLabel="Select"
              option={optionSpecialization}
            />
          </div>
        </div>

        <div className="row px-3 mt-4">
          <div className="col-lg-6 doc-setting-input">
            <p className=" doc-add-filter-text">Contact</p>

            <input type="text" />
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4 doc-setting-input">
            <p className=" doc-add-filter-text">State</p>

            <CustomDropDown
              selectLabel="Select"
              option={optionSpecialization}
            />
          </div>
        </div>
        <div className="row px-3 mt-4 mb-2">
          <div className="col-12 d-flex justify-content-center mt-3">
            <button className="apply-filter submit-pharmacy-role">
              Submit
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NewPharnacyRole;
