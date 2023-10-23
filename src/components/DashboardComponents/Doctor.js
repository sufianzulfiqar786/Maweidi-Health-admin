import { Avatar, Divider, List, Skeleton, Rate, Select } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// css
import "../../assets/css/dashboard.scss";

// img
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";
import LinearChart from "../../atoms/LinearChart";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { gender, optionHostpital } from "../../Data/DoctorData";
import useFetch from "../../customHook/useFetch";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("old");
  const [dropdownValueChange, setDropdownValueChange] = useState("Adan Hospital");

  const exportData = useFetch(
    `${process.env.REACT_APP_GET_HOSPITAL_DATA}`
  );

  console.log("dataexportData", exportData?.data?.data)

  const hospitalsData = exportData?.data?.data?.map(item => ({
    value: item.id,
    label: item.name
  }));

  console.log("hospitalsData", hospitalsData)

  const handleChangeSelect = (e) => {
    setDropdownValueChange(e)
  }

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  console.log("dropdownValueChange", dropdownValueChange)

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  function toggleDropdown() {
    setIsActive(!isActive);
  }



  return (
    <>
      <div className="row px-4 py-3 ">
        <div className="col-8 d-flex justify-content-start align-items-center ">
          <p className="mb-0  appoinment-text">All Appointment </p>
        </div>

        <div className="col-4 d-flex justify-content-end align-items-center">

          <div className=" w-100">
            {/* <CustomDropDown selectLabel='Adan Hospital' option={optionHostpital} handleChangeSelect={handleChangeSelect} /> */}
            <CustomDropDown option={hospitalsData} handleChangeSelect={handleChangeSelect} />
         <>
         {/* <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>, */}
         </>
          </div>

        </div>
      </div>
      <div className="px-3">
        <LinearChart selectedHospital={dropdownValueChange} />
      </div>


    </>
  );
};
export default App;
