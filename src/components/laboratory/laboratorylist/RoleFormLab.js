import React from "react";
import CustomSelect from "../../common/CustomSelect";
import closeIcon from "../../../assets/images/common/close.svg";
const RoleFormLab = ({ click, setClick }) => {
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

        <div class="form-wrapper">
          <form>
            <div className="row ">
              <div className="col-lg-6 doc-setting-input">
                <div class="form-group">
                  <label>Role Type</label>
                  <CustomSelect size="large" style={{ width: "100%" }} />
                </div>
              </div>
              <div className="col-lg-6 doc-setting-input">
                <div class="form-group">
                  <label>Lab / Hospital</label>
                  <CustomSelect size="large" style={{ width: "100%" }} />
                </div>{" "}
              </div>
            </div>
            <div className="row ">
              <div className="col-lg-6 doc-setting-input">
                <label>Name</label>
                <input type="text" />
              </div>

              <div className="col-lg-6 doc-setting-input">
                <label>Email</label>
                <input type="email" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 doc-setting-input">
                <label>City</label>
                <input type="text" />
              </div>

              <div className="col-md-4 doc-setting-input">
                <div class="form-group">
                  <label>Contact</label>
                  <input type="text" />
                </div>{" "}
              </div>
              <div className="col-md-4 doc-setting-input">
                <div class="form-group">
                  <label>State</label>
                  <CustomSelect size="large" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
            <div className="row px-3 mt-4 mb-2">
          <div className="col-12 d-flex justify-content-center mt-3">
            <button className="apply-filter submit-pharmacy-role">
              Submit
            </button>
          </div>
        </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoleFormLab;
