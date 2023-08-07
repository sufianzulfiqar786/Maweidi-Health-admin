import React from "react";
import { useState } from "react";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import DocRoleCrossIcon from "../../assets/images/doctor/DocRoleCrossIcon.svg";
import DeleteBigIcon from "../../assets/images/doctor/DeleteBigIcon.svg";
import usePost from "../../customHook/usePost";
import { CustomToast } from "../../atoms/toastMessage";
import { useLocation, useParams } from "react-router-dom";

const ConsutancyFee = ({
  setShowDoctorFee,
  setFeeData,
  selectdedHospital,
  feeData,
  id
}) => {

  console.log('Extracted ID:', id);
  const [feeDataState, setFeeDataState] = useState({});
  const handleChange = (value, name) => {
    console.log("valuewww", value)
    setFeeDataState((prev) => ({ ...prev, [name]: value }));
  };
  const { data, isLoading, error, postData } = usePost()
  const handleAdd = () => {
    const data = { ...feeDataState, doctor_id: id }

    if (feeDataState?.hospital_id) {
      postData((`${process.env.REACT_APP_SET_DOCTOR_FEES}`), data, () => {
        setFeeDataState({})
        CustomToast({
          type: "success",
          message: `Saved Successfuly!`,
        });
      })
    }

  };
  const handleRemove = (index) => {
    const updatedaat = feeData?.filter((f, i) => i !== index);
    setFeeData(updatedaat);
  };
  console.log("feeDataState", feeDataState)
  const filteredHospitalOptions = selectdedHospital && selectdedHospital?.filter(
    (hospital) => !feeData.some((fee) => fee.hospitals === hospital.value)
  );

  return (
    <div className="row w-100 mx-0 add-doc-left-col">
      <div className="col-12 px-4 py-3 my-1 ">
        <div className="d-flex justify-content-between align-items-center ">
          <p className="mb-0 add-doc-role-text">Set Consultancy Fee</p>
          <img
            onClick={() => {
              setShowDoctorFee(false);
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
          {feeData?.map((fee, index) => {
            const selected = selectdedHospital?.find(
              (hospital) => hospital.value === fee?.hospitals
            );

            return (
              <div className="d-flex my-3 p-2 border align-items-center" key={index}>
                <div className="w-50"> {/* Set a fixed width, adjust as needed */}
                  <span className="mb-0 add-doc-role-text">Hospital</span>: {selected?.label}
                </div>
                <div className="flex-grow-1">
                  <span className="mb-0 add-doc-role-text">Consultancy Fee</span>: {fee?.fee}
                </div>
                <div>
                  <img
                    src={DeleteBigIcon}
                    alt="delete"
                    style={{ height: "20px" }}
                    onClick={() => handleRemove(index)}
                  />
                </div>
              </div>
            );
          })}
          {
            console.log("feeDataState.id", feeDataState.id)
          }
        </div>
        <div className="col-12 px-2">
          <div className="row mt-4 ">
            <div className="col-lg-12 doc-setting-input doc-setting-input-black">
              <p className="mb-2 add-doc-role-type-detail">Hospital</p>
              <CustomDropDown
                handleChangeSelect={handleChange}
                option={filteredHospitalOptions || []}
                name={`hospital_id`}
                value={feeDataState.hospital_id || ""} // Update this to the actual field in your data
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12 doc-setting-input role-input-placeholder">
              <p className="mb-2 add-doc-role-type-detail">
                Consultancy Charges
              </p>
              <input
                type="number"
                name="fees"
                placeholder="Consultancy Charges"
                value={feeDataState.fees || ""} // Update this to the actual field in your data
                onChange={(e) => handleChange(e.target.value, "fees")}
              />
            </div>
          </div>

          <div className="row my-5 pt-2 pb-3 ">
            <div className="col-lg-6">
              <button
                disabled={
                  filteredHospitalOptions?.length < 1 ||
                  !feeDataState?.hospital_id ||
                  !feeDataState?.fees
                }
                className="apply-filter add-doc-changes"
                type="button"
                onClick={handleAdd}
              >
                Save Changes
              </button>
            </div>

            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsutancyFee;
