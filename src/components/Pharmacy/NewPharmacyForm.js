import React from "react";
import SelectCountry from "../../atoms/Country";
import SelectState from "../../atoms/State";

const NewPharmacyForm = ({
  formDataState,
  handleChange,
  handleChangeCountry,
  handleChangeState,
  Id
}) => {
  // {
  //   id: 1,
  //   pic: "https://www.daleeeel.com/f/res/h08/articles-photos/000/825/0082533-343-rinnoo-58cb49045d33491a8899120fcf3bed5f.jpg",
  //   name: "Medicare Pharmacy",
  //   email: "medicarepharmacy@example.com",
  //   address: "123 Pharmacy Street",
  //   mobile: "+965-955-555-1111",
  //   country: "Kuwait",
  //   state: "Hawalli",
  //   zipcode: "54000",
  // },
  return (
    <>
      <div className="row px-3 mt-4">
        <div className="col-lg-6 doc-setting-input">
          <p className=" doc-add-filter-text">Name</p>

          <input
            type="text"
            name="name"
            value={formDataState?.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 doc-setting-input">
          <p className=" doc-add-filter-text">Phone No</p>

          <input
            type="text"
            name="mobile"
            value={formDataState?.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 doc-setting-input mt-3">
          <p className=" doc-add-filter-text">
            Email <span style={{ color: "#8C8C8C" }}>(Optional)</span>
          </p>

          <input
            type="text"
            name="email"
            value={formDataState?.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 doc-setting-input mt-3">
          <p className=" doc-add-filter-text">Address</p>

          <input
            type="text"
            name="address"
            value={formDataState?.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row px-3 mt-4">
        <div className="col-md-4 pr-lg-0 doc-setting-input">
          <SelectCountry
            handleChange={handleChangeCountry}
            value={formDataState?.country}
          />
          {/* <input type="text" placeholder="Choose" /> */}
        </div>

        <div className="col-md-4 pt-lg-0 pt-4 doc-setting-input">
          <SelectState
            handleChange={handleChangeState}
            country={formDataState?.country}
            value={formDataState?.state}
          />
          {/* <input type="text" placeholder="Choose" /> */}
        </div>

        <div className="col-md-4 pt-lg-0 pt-4 pl-lg-0 doc-setting-input">
          <p className=" doc-add-filter-text">Zip</p>

          <input
            type="text"
            name="zipcode"
            value={formDataState?.zipcode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row px-3 my-4">
        <div className="col-3 pt-3 pb-2 d-flex justify-content-center mt-3">
          <button className="apply-filter add-doc-changes w-100">
            {Id ? "Update" : " Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPharmacyForm;
