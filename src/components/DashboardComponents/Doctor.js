import { Avatar, Divider, List, Skeleton, Rate } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// css
import "../../assets/css/dashboard.scss";

// img
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";
import LinearChart from "../../atoms/LinearChart";
import CustomDropDown from "../../atoms/CustomDropDown/Index";
import { gender, optionHostpital } from "../../Data/DoctorData";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("old");
  const [dropdownValueChange, setDropdownValueChange] = useState("Adan Hospital");

  const handleChangeSelect = (value)=>{
    setDropdownValueChange(value)
      }

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
          {/* <div className={`dropdown ${isActive ? 'active' : ''}`}>
            <button className="doctor-btn" onClick={toggleDropdown}>
              Old <img className="pl-2" src={DownIcon} alt="" />
            </button>
            <div className="dropdown-content border"
              style={{
                display: isActive ? 'block' : 'none',
                width: '100%',

              }}>
              <div className='old-dropdown-text1 text-center' onClick={toggleDropdown}>
                <span>New</span>
              </div>
              <div className='old-dropdown-text2 text-center' onClick={toggleDropdown}>
                <span>Old</span>
              </div>
            </div>
          </div> */}
          <div className=" w-100">
            <CustomDropDown selectLabel='Adan Hospital' option={optionHostpital} handleChangeSelect={handleChangeSelect} />
          </div>

        </div>
      </div>
      <div className="px-3">
        <LinearChart selectedHospital={dropdownValueChange}/>
      </div>

      {/* <div
        className="border-top mx-2 pt-3 remove-x-overflow-doc-list"
        id="scrollableDiv"
        style={{
          height: 427,
          overflow: "auto",
          padding: "0 8px",
          // border: '1px solid rgba(0, 0, 0, 0)',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <>
                <div className="row  py-1">
                  <div className="col-8">
                    <div className="d-flex doctor-detail">
                      <img
                        className="doctor-detail-img cursor-pointer"
                        src={item.picture.large}
                        alt=""
                      />

                      <div className="doctor-detail-text pl-4 d-flex justify-content-center flex-column">
                        <p className="mb-0 doctor-detail-text-1">
                          {item.name.last}
                        </p>
                        <p className="mb-0 doctor-detail-text-2">
                          Booking on 27th Nov, 2020
                        </p>
                        <p className="mb-0 doctor-detail-text-2">
                          (45){" "}
                          <span>
                            <Rate
                              allowHalf
                              defaultValue={2.5}
                              style={{
                                marginLeft: "0px",
                                fontSize: "18px",
                                color: "#FFAE3E",
                              }}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 d-flex justify-content-end align-items-center pr-3 ">
                    <p className="mb-0 pt-0 doctor-detail-text-2">150 Patients</p>
                  </div>
                </div>
              </>
            )}
          />
        </InfiniteScroll>
      </div> */}
    </>
  );
};
export default App;
