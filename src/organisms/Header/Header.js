import React, { useState } from "react";

// Image
// svg
import dashboard_logo from "../../assets/images/dashboard/dashboard_logo.svg";
import SettingIcon from "../../assets/images/dashboard/SettingIcon.svg";

// components
import ProfileDropDown from "../../molecules/ProfileDropDown/ProfileDropDown";
import NotificationDropDown from "../../molecules/NotificationDropDown/NotificationDropDown";
import SiteSearch from "../../atoms/SiteSearch/SiteSearch";
import MenuBtn from "../../atoms/MenuBtn/MenuBtn";
import MenuBtnMobile from "../../atoms/MenuBtnMobile/MenuBtnMobile";
import { Link } from "react-router-dom";
import { ValidateRoute, ValidUI } from "../../pages/privateRoutes";
const Header = ({
  handleMenu,
  isLargeScreen,
  menuDropDownFullScreen,
  setMenuDropDownFullScreen,
  menu,
  setMobileMenu1,
  MobileMenu1,
  menuLeftText
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const role =JSON.parse(localStorage.getItem("userRoles"))
  const allowedhost = Object.keys(role).includes("hospitaladmin")
  const allowedlab = Object.keys(role).includes("technologist")
  const allowedphar = Object.keys(role).includes("pharmacist")
  const isSuperAdmin = Object.keys(role).length === 0 

  return (
    <div className="col-12 ">




      {isLargeScreen ? (
        <div className="row border-bottom " style={{ height: "86px" }}>
          {/* fullscreen header  */}

          <div className={`${menuLeftText ? "col-0     " : 'col-3'}  pl-4  border-right dashboard-logo py-3`} style={{ display: `${menuLeftText}` }}>
            <img style={{ display: `${menuLeftText}` }} src={dashboard_logo} alt="" />
          </div>

          <div className={`${menuLeftText ? "col-12 d-flex align-items-center" : 'col-9'} d-flex align-items-center`}>
            <div className="row " style={{ width: "100.8%" }}>
              <div className="col-6 pl-2 d-flex align-items-center">
                <div className="d-flex align-items-center pl-3">
                  <MenuBtn
                    handleMenu={handleMenu}
                    menu={menu}
                    menuDropDownFullScreen={menuDropDownFullScreen}
                    setMenuDropDownFullScreen={(data) => {
                      setMenuDropDownFullScreen(data);
                    }}
                  />
                  <SiteSearch />
                </div>
              </div>

              <div className="col-6  px-0 d-flex justify-content-end ">
                {
                  allowedhost || isSuperAdmin ?
                    <Link to='/manageroles'>
                      <div className=" cursor-pointer menu-button p-4 mr-2 d-flex align-items-center justify-content-center">
                        <img src={SettingIcon} alt="" />
                      </div>
                    </Link>
                    : null
                }

                <NotificationDropDown />
                <ProfileDropDown />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // mobile menu

        <div className="row border-bottom ">
          <div className="col-3 pl-4   dashboard-logo py-3">
            <img src={dashboard_logo} alt="" />
          </div>

          <div className="col-9 d-flex align-items-center ">
            <div className="row " style={{ width: "100%" }}>
              <div className="col-12  px-0 d-flex justify-content-end ">
                {
                  ValidUI() === "HospitalAdmin" || ValidUI() === "superAdmin" ?
                    <Link to='/manageroles'>
                      <div className=" cursor-pointer menu-button p-4 mr-2 d-flex align-items-center justify-content-center">
                        <img src={SettingIcon} alt="" />
                      </div>
                    </Link>
                    : null
                }
                <NotificationDropDown />
                <ProfileDropDown />
              </div>
            </div>
          </div>

          <div className="col-12 mb-3  d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              <MenuBtnMobile
                setMobileMenu1={(data) => {
                  setMobileMenu1(data);
                }}
                MobileMenu1={MobileMenu1}
              />

              <SiteSearch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
