import React from "react";
import CustomSelect from "../../common/CustomSelect";
import "../../../assets/css/laboratory/modal.scss";
const AddLabForm = () => {
  return (
    <>
      <div class="form-wrapper">
        <form>
          <div className="row px-3 mt-4">
            <div className="col-lg-6 doc-setting-input">
              <label>Name</label>
              <input type="text" />
            </div>

            <div className="col-lg-6 doc-setting-input">
              <label>Phone No</label>
              <input type="text" />
            </div>

            <div className="col-lg-6 doc-setting-input mt-4">
              <label>Email (Optional)</label>
              <input type="email" />
            </div>

            <div className="col-lg-6 doc-setting-input mt-4">
              <label>Address</label>
              <input type="text" />
            </div>

            <div className="col-md-4 doc-setting-input mt-4">
              <div class="form-group">
                <label>Country</label>
                <CustomSelect />
              </div>
            </div>
            <div className="col-md-4 doc-setting-input mt-4">
              <div class="form-group">
                <label>State </label>
                <CustomSelect />
              </div>
            </div>
            <div className="col-md-4 doc-setting-input mt-4">
              <div class="form-group">
                <label>Zip</label>
                <input type="number" />
              </div>
            </div>
          </div>

          <div className="row px-3 my-4">
            <div className="col-3 pt-3 pb-2 d-flex justify-content-center ">
              <button className="apply-filter add-doc-changes w-100">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLabForm;
