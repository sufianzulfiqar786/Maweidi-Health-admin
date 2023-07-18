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
  const updatedOptions = mode === "multiple" ? [selectAllOption, ...option] : option;

  const handleSelectAll = () => {
    const allOptions = option.map((item) => item.value);
    handleChangeSelect(allOptions, name);
  };

  const handleSelectChange = (val) => {
    if (Array.isArray(val) && val.includes("all")) {
      handleSelectAll();
    } else {
      handleChangeSelect(val, name);
    }
  };

  const renderOptions = updatedOptions.map((opt) => {
    if (opt && opt.label) {
      return (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      );
    }
    return null;
  });

  return (
    <div>
      <Select
        defaultValue={mode === "multiple" ? value : selectLabel}
        className="custom-dropDown"
        name={name}
        mode={mode}
        value={value}
        showSearch
        disabled={disabled}
        field={field}
        allowClear
        placeholder={mode && selectLabel}
        style={{
          width: "100%",
        }}
        onChange={handleSelectChange}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA?.label?.toLowerCase()?.localeCompare(optionB?.label?.toLowerCase())
        }
        rules={{
          required: {
            value: true,
            message: "Please select at least one",
          },
        }}
      >
        {renderOptions}
      </Select>
    </div>
  );
};

export default CustomDropDown;
