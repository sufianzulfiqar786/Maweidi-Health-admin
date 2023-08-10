import React, { useMemo } from "react";
import { Country } from "country-state-city";
import CustomDropDown from "../CustomDropDown/Index";

const Countries = Country.getAllCountries();

const SelectCountry = ({ value, name, handleChange, isDisabled }) => {
  const Cont = () => {
    const res = Countries.map((val) => ({
      label: val.name,
      value: val.name,
    }));
    return res;
  };

  const option = useMemo(() => Cont(), []);

  return (
    <>
      <div class="">
        <p className=" doc-add-filter-text">
          Country<span className="error-message">*</span>{" "}
        </p>
        <CustomDropDown
          option={option}
          disabled={isDisabled}
          handleChangeSelect={(val) => handleChange(val, name)}
          value={value}
        />
      </div>
    </>
  );
};

export default SelectCountry;
