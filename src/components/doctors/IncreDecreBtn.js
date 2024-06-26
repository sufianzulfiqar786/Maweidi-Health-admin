import React, { useState } from "react";

import IncreIcon from "../../assets/images/doctor/IncreIcon.svg";
import DcreIcon from "../../assets/images/doctor/DcreIcon.svg";

const IncreDecreBtn = ({ setFormDataState, formDataState }) => {
  const [number, setNumber] = useState(0);

  const handleIncrease = () => {
    setFormDataState({
      ...formDataState,
      experience_years: Number(formDataState?.experience_years ?? 0) + 1,
    });
    setNumber(number + 1);
  };

  const handleDecrease = () => {
    if (number > 0) {
      setNumber(number - 1);
      setFormDataState({
        ...formDataState,
        experience_years: Number(formDataState?.experience_years ?? 0) - 1,
      });
    }
  };
  console.log("number", formDataState);

  return (
    <>
      <div className="d-flex doc-setting-input-counter">
        <button
          onClick={handleDecrease}
          type="button"
          className="doc-setting-incre-decre-btn border-right d-flex align-items-center px-2"
        >
          {" "}
          <img src={DcreIcon} alt="DcreIcon" />{" "}
        </button>
        <input
          className="doc-setting-input-count text-center"
          type="text"
          value={formDataState?.experience_years ?? 0}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          onClick={handleIncrease}
          type="button"
          className="doc-setting-incre-decre-btn border-left d-flex align-items-center px-2"
        >
          {" "}
          <img src={IncreIcon} alt="IncreIcon" />{" "}
        </button>
      </div>
    </>
  );
};

export default IncreDecreBtn;
