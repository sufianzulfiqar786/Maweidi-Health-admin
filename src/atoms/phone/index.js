import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone.scss";
const Phone = ({ value, handleChange, name }) => {
  return (
    <>
      <p className="mb-2">Phone no</p>
      <PhoneInput
        country={"us"}
        value={value}
        inputStyle={{ width: "36.6px" }}
        inputClass="w-100"
        onChange={(phone) => handleChange(phone, name)}
      />
    </>
  );
};

export default Phone;
