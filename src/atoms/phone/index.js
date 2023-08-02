import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone.scss";

const Phone = ({ value, handleChange, name, field, disabled }) => {
  const handleInputChange = (phone) => {
    field.onChange(phone); // Trigger the onChange function provided by the 'react-hook-form' library
    handleChange(phone, name); // Call your own handleChange function
  };

  return (
    <>
      <p className="mb-2">Phone no</p>
      <PhoneInput
      disabled={disabled}
        inputProps={{
          name: name,
          ref: field.ref,
          onChange: handleInputChange, // Use the modified onChange handler
          onBlur: field.onBlur,
        }}
        country={"us"}
        value={value}
        inputStyle={{ width: "36.6px" }}
        inputClass="w-100"
        onBlur={field.onBlur}
      />
    </>
  );
};

export default Phone;
