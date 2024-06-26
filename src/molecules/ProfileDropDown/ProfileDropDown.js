import React from "react";

// png
import SampleImg from "../../assets/images/dashboard/SampleImg.png";

// svg
import ClockIcon from "../../assets/images/dashboard/ClockIcon.svg";
import LogoutIcon from "../../assets/images/dashboard/LogoutIcon.svg";
import { ValidateRoute, ValidUI } from "../../pages/privateRoutes";
import { useSelector } from "react-redux";

const ProfileDropDown = () => {
  const user = useSelector(state => state.auth.user);
  const profile_pic = useSelector(state => state.auth.profile_pic);

  console.log("Userppppp", profile_pic);

  // ValidUI() === "superAdmin"
  return (
    <div class="dropdown ">
      <div
        class="profile-menu-button-right-img "
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src={ !profile_pic ? SampleImg : `https://api.maweidi.com.kw/${profile_pic}`}
          className="menu-button-right-img"
          alt=""
        />
      </div>

      <div
        class=" profile-drop-down-body  dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={{ }}
      >
        <div className="row py-2 px-3">
          <div className="col-4">
            <img className="profile-drop-down-img" src={ !profile_pic ? SampleImg : `https://api.maweidi.com.kw/${profile_pic}`} alt="" />
          </div>

          <div className="col-8 px-2 d-flex  justify-content-center align-items-start  flex-column">
            <p className="mb-0  profile-drop-down-text1">{user}</p>

            {/* <p className="mb-0 profile-drop-down-text2">Super Admin</p> */}
          </div>
        </div>
        {
          ValidUI() === "superAdmin" || ValidUI() === "HospitalAdmin" ?
            <div className="row px-3  pt-1  pb-3">
              <div className="col-12 pb-3 border-bottom">
                <img
                  className="profile-drop-down-clock-img"
                  src={ClockIcon}
                  alt=""
                />{" "}
                <span className="profile-drop-down-clock-text pl-3 cursor-pointer">
                  Dashboard
                </span>
              </div>
            </div>
            : null
        }


        <div className="row px-3   pb-3 ">
          <div className="col-12 ml-1">
            <img
              className="profile-drop-down-logout-img"
              src={LogoutIcon}
              alt=""
            />
            <span
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("doctors");
                window.location.href = "/";
              }}
              className="profile-drop-down-logout-text pl-4 cursor-pointer"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropDown;
