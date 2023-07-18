import React from "react";

import { Select } from "antd";

const CustomDropDown = ({
  mode,
  value,
  selectLabel = "Select",
  option,
  handleChangeSelect,
  disabled,
  name,
  field,
}) => {
  const selectAllOption = { value: "all", label: "Select All" };
  const updatedOptions =
    mode === "multiple" ? [selectAllOption, ...option] : option;

  const handleSelectAll = () => {
    const allOptions = option.map((item) => item.value);
    handleChangeSelect(allOptions, name);
  };

  return (
    <div>
      <Select
        defaultValue={mode === "multiple" ? value : selectLabel}
        className="custom-dropDown "
        name={name}
        mode={mode}
        value={value}
        showSearch
        disabled={disabled}
        field
        allowClear
        placeholder={mode && selectLabel}
        style={{
          width: "100%",
        }}
        onChange={(val) => {
          if (val?.includes("all")) {
            handleSelectAll();
          } else {
            handleChangeSelect(val, name);
          }
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.label.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA?.label
            .toLowerCase()
            ?.localeCompare(optionB?.label?.toLowerCase())
        }
        options={updatedOptions}
        rules={{
          required: {
            value: true,
            message: "Please select atleast one",
          },
        }}
      />
    </div>
  );
};

export default CustomDropDown;
