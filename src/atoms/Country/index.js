import React, { useMemo } from "react";
import { Country } from "country-state-city";
import CustomDropDown from "../CustomDropDown/Index";

const Countries = Country.getAllCountries();

const SelectCountry = ({ value, name, handleChange }) => {
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
      <div class="form-group">
        <p className=" doc-add-filter-text">Country </p>
        <CustomDropDown
          option={option}
          handleChangeSelect={(val) => handleChange( val, name)}
          value={value}
        />
      </div>
    </>
  );
};

export default SelectCountry;
