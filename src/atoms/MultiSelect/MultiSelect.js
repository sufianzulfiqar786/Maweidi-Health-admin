import React, { useState } from 'react'
import {  Select,  } from "antd";

// img svg
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";

const MultiSelect = ({options}) => {
    const [selectedOptions, setSelectedOptions] = useState(["john"]);
    const [dirty, setDirty] = useState(false);
    const handleChange = (value) => {
      setSelectedOptions(value);
      setDirty(true);
      console.log("Select Changed");
    };
  return (
    <div className='all-doc-filter-multi-select d-flex justify-content-between '>



                    <Select
                       mode="tags"
                       onChange={handleChange}
                       onMouseDown={(e) => {
                         setDirty(false);
                         console.log("Select Clicked");
                         e.stopPropagation();
                       }}
                       style={{ width: "80%", minHeight: "36.6px" }}
                      //  mode="multiple"
                      options={options}
                    />

                    <img className='pr-2' src={DownIcon} alt="" />

                  </div>
  )
}

export default MultiSelect