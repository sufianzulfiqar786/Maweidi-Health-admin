import React, { useState } from "react";

import IncreIcon from "../../assets/images/doctor/IncreIcon.svg";
import DcreIcon from "../../assets/images/doctor/DcreIcon.svg";

const IncreDecreBtn = () => {
  const [number, setNumber] = useState(0);

  const handleIncrease = () => {
    setNumber(number + 1);
  };

  const handleDecrease = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  return (
    <>
      <div className="d-flex doc-setting-input-counter">
        <button
          onClick={handleDecrease}
          className="doc-setting-incre-decre-btn border-right d-flex align-items-center px-2"
        >
          {" "}
          <img src={DcreIcon} alt="" />{" "}
        </button>
        <input
          className="doc-setting-input-count text-center"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          onClick={handleIncrease}
          className="doc-setting-incre-decre-btn border-left d-flex align-items-center px-2"
        >
          {" "}
          <img src={IncreIcon} alt="" />{" "}
        </button>
      </div>
    </>
  );
};

export default IncreDecreBtn;
