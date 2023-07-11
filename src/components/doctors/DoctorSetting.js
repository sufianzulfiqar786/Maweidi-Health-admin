import React, { useState } from "react";
import { Button, Modal, Rate, Select, Slider } from "antd";

import IncreDecreBtn from "./IncreDecreBtn";
import { optionConsultancyPeriod, optionSpecialization } from "../../Data/DoctorData";
import CustomDropDown from "../../atoms/CustomDropDown/Index";

const DoctorSetting = () => {
  return (
    <>
      <div className="col-12 px-3 my-4 pt-lg-3">
        <p className="mb-0 doc-setting-text">Settings</p>

        <div className="row mt-4 ">
          <div className="col-lg-6">
            <div className="doc-setting-col-left">
              <div className="col-12 pt-2">
                <p className="mb-0 mt-4 doc-setting-col-left-text">
                  {" "}
                  Personal Information
                </p>
              </div>

              <hr className="my-1" />

              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> First Name </p>
                    <input className="" type="text" />
                  </div>

                  <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                    <p className="mb-2"> Last Name </p>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> Your Email </p>
                    <input className="" type="text" />
                  </div>

                  <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                    <p className="mb-2"> Phone No </p>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> Departments </p>
                    <CustomDropDown selectLabel='Select' option={optionSpecialization} />
                  </div>

                  <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                    <p className="mb-2"> Gender </p>
                    <Select
                      // defaultValue="lucy"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => {}}
                      options={[
                        {
                          label: "Male​​",
                          value: "Male​​",
                        },
                        {
                          label: "Female",
                          value: "Female",
                        }
                      ]}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> Specialization </p>
                    <CustomDropDown selectLabel='Select' option={optionSpecialization} />
                  </div>

                  <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                    <p className="mb-2"> Experience </p>
                    <IncreDecreBtn />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> Registration no </p>
                    <input type="text" />
                    <p className="doc-setting-input-text-bottom pt-1 mb-0">
                      Auto generated council registeration number
                    </p>
                  </div>

                  <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input ">
                    <p className="mb-2"> Working Hours </p>
                    <IncreDecreBtn />
                  </div>
                </div>

                <div className="row mt-3 pt-1">
                  <div className="col-lg-6 pr-lg-1 doc-setting-input">
                    <p className="mb-2"> Consultancy Period </p>
                    <CustomDropDown selectLabel='Select' option={optionConsultancyPeriod} />
                  </div>

                  <div className="col-lg-6 pl-lg-1 doc-setting-input"></div>
                </div>

                <div className="row mt-lg-5 my-3 py-lg-5">
                  <div className="col-lg-6">
                    <button className="apply-filter save-changes">
                      Save Changes
                    </button>
                  </div>

                  <div className="col-lg-6"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4">
            <div className="doc-setting-col-left">
              <div className="col-12 pt-2">
                <p className="mb-0 mt-4 doc-setting-col-left-text">
                  {" "}
                  General Notifications
                </p>
              </div>

              <hr className="my-1" />

              <div className="col-12 pt-2   doc-setting-input-check ">
                <div className="d-flex justify-content-between border-bottom pb-4 mt-3">
                  {/* <label for="myCheckbox doc-setting-check-text">My Checkbox</label> */}
                  <p for="myCheckbox" className="doc-setting-check-text mb-0">
                    1 hour before reminder appointments
                  </p>
                  <input
                    className=" cursor-pointer mt-0"
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="true"
                  />
                </div>
              </div>

              <div className="col-12 pt-2   doc-setting-input-check ">
                <div className="d-flex justify-content-between border-bottom pb-4 mt-3">
                  {/* <label for="myCheckbox doc-setting-check-text">My Checkbox</label> */}
                  <p for="myCheckbox" className="doc-setting-check-text mb-0">
                    If an appointment is cancel
                  </p>
                  <input
                    className=" cursor-pointer mt-0"
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="true"
                  />
                </div>
              </div>

              <div className="col-12 pt-2   doc-setting-input-check ">
                <div className="d-flex justify-content-between border-bottom pb-4 mt-3">
                  {/* <label for="myCheckbox doc-setting-check-text">My Checkbox</label> */}
                  <p for="myCheckbox" className="doc-setting-check-text mb-0">
                    When I am booked for an appointment
                  </p>
                  <input
                    className=" cursor-pointer mt-0"
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="true"
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="row mt-lg-5 my-3 pt-lg-5 pb-lg-4">
                  <div className="col-6">
                    <button className="apply-filter save-changes">
                      Save Changes
                    </button>
                  </div>

                  <div className="col-6"></div>
                </div>
              </div>
            </div>

            <div className="doc-setting-col-left mt-4">
              <div className="col-12 pt-2">
                <p className="mb-0 mt-4 doc-setting-col-left-text">
                  {" "}
                  General Notifications
                </p>
              </div>

              <hr className="my-1" />

              <div className="col-12 pt-2   doc-setting-input-check ">
                <div className="d-flex justify-content-between border-bottom pb-4 mt-3">
                  <p for="myCheckbox" className="doc-setting-check-text mb-0">
                    Delete Account:
                  </p>
                </div>

                <div className="d-flex justify-content-between  pb-lg-4 mt-3">
                  <p for="myCheckbox" className="doc-setting-check-text mb-0">
                    Do you want to delete the account? Please press below
                    "Delete" button
                  </p>
                </div>

                <div className="col-12">
                  <div className="row mt-lg-5 my-lg-2 my-3 pb-lg-2">
                    <button className="apply-filter save-changes dlt-doc-setting-btn">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="doc-setting-col-left">
              <div className="col-12 pt-2">
                <p className="mb-0 mt-4 doc-setting-col-left-text">
                  {" "}
                  Re-set Password
                </p>
              </div>

              <hr className="my-1" />

              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-12 doc-setting-input">
                    <p className="mb-2"> Old Password </p>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12 doc-setting-input">
                    <p className="mb-2"> New Password </p>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12 doc-setting-input">
                    <p className="mb-2"> Re-typed New Password </p>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="row my-4 ">
                  <div className="col-6">
                    <button className="apply-filter save-changes">
                    Save Password
                    </button>
                  </div>

                  <div className="col-6"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6"></div>
        </div>
      </div>
    </>
  );
};

export default DoctorSetting;
