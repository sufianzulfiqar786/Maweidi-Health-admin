import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/manageroles.scss";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import AddRoleModal from "../../molecules/AddRoleModal/AddRoleModal";

const ManageRoles = () => {
  const [modal1Open, setModal1Open] = useState(false);

  const data = [
    {
      text1: "Hospital  Admin",
      text2: "They can see everything",
      text3: "Hospital Permissions",
    },
    {
      text1: "Pharmacist",
      text2: "They can see everything",
      text3: "DOCTORS PERMISSIONS",
    },
    {
      text1: "Doctors",
      text2: "They can see everything",
      text3: "PHARMACIST PERMISSIONS",
    },
    {
      text1: "Laboratory Technilogist",
      text2: "They can see everything",
      text3: "LABORATORY TECHNOLOGIST  PERMISSIONS",
    },
  ];

  return (
    <div className="fluid-container">
      <div className="row px-2 pt-4">
        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Manage Roles</p>
        </div>

        <div className="col-12  ">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <p className="mb-0 doctor-header-top-text">
                <Link className="doc-link " to="/">
                  DASHBOARD
                </Link>
                <img
                  className="mx-lg-3 ml-2 pr-1 pb-1"
                  src={RightArrow}
                  alt=""
                />
                <span style={{ color: "#4FA6D1" }}>MANAGE ROLES</span>
              </p>
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
              <button className="btn-add-doc-filter mr-2">
                <Link className="add-doc-link-color" to="/allroles">
                  <span className="  btn-add-doc-filter-text">All Roles</span>
                </Link>
              </button>
              <button
                className="btn-add-new-doc"
                onClick={() => setModal1Open(true)}
              >
                Add Roles
              </button>
            </div>
          </div>
        </div>

        <div
          className="col-12 mt-lg-5 pt-lg-0 mt-3 pt-md-4 pb-5 px-0"
          style={{ overflowX: "hidden" }}
        >
          <div className="row px-3 mb-md-0 pb-5 ">
            {data.map(({ text1, text2, text3 }) => {
              return (
                <div className="col-md-6 pr-2 mb-3">
                  <div className=" role-card">
                    <div className="border-bottom">
                      <p className="mb-0 pt-3 pb-2 pl-3 role-card-text-1">
                        {text1}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 role-card-text-2 pl-3 pt-3 ">
                        {text2}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn-add-new-doc mr-3 my-3"
                        style={{
                          fontSize: "14px",
                          width: "47%",
                          height: "53px",
                        }}
                      >
                        <Link
                          className="add-doc-link-color"
                          to={`/rolepermission?name=${text3}`}
                        >
                          View Permissions
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <AddRoleModal
          modal1Open={modal1Open}
          setModal1Open={(data) => {
            setModal1Open(data);
          }}
          typeName="Add"
        />
      </div>
    </div>
  );
};

export default ManageRoles;
