import React from 'react'

import { Select } from 'antd';

const CustomDropDown = ({ value ,selectLabel='Select', option, handleChangeSelect, disabled ,name}) => {
  return (
    <div>

        <Select
       defaultValue={value || selectLabel}
       name={name}
       value={value || null }
       showSearch
       disabled={disabled}
       placeholder={selectLabel}
       style={{
         width: '100%',
       }}
        onChange={(val)=>handleChangeSelect(val, name)}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.label.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA?.label.toLowerCase()?.localeCompare(optionB?.label?.toLowerCase())
        }
        options={option}
      />
    </div>
  )
}

export default CustomDropDown



