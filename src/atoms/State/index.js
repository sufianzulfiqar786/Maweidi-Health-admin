import React, { useMemo } from "react";
import { Country, State } from "country-state-city";
import CustomDropDown from "../CustomDropDown/Index";

const SelectState = ({ value, handleChange, country }) => {
  const Countries = Country.getAllCountries();

  const selectedCountry = () => {
    const res = Countries.find((val) => val.name === country);
    return res;
  };
  const stat = useMemo(() => selectedCountry(), [country]);
  const States = useMemo(() => State.getStatesOfCountry(stat?.isoCode), [stat]);
  const Cont = () => {
    const res = States.map((val) => ({
      label: val.name,
      value: val.name,
    }));
    return res;
  };

  const option = useMemo(() => Cont(), [stat]);

  return (
    <>
      <div class="form-group">
        <p className=" doc-add-filter-text">State </p>
        <CustomDropDown
          option={option}
          handleChangeSelect={handleChange}
          value={value}
        />
      </div>
    </>
  );
};

export default SelectState;