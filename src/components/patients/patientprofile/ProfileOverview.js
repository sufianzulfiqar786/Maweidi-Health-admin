import { Progress } from "antd";
import gender from "../../../assets/images/patient/gender.svg";
import calendar from "../../../assets/images/patient/calendar.svg";
import contact from "../../../assets/images/patient/contact.svg";
import address from "../../../assets/images/patient/address.svg";
import blood from "../../../assets/images/patient/blood.svg";
import id from "../../../assets/images/patient/id.svg";
import sohaibAvatar from "../../../assets/images/dashboard/sohaibavatar.png";
import "../../../assets/css/patients/patientprofile/profileoverview.scss";

const ProfileOverview = () => {
  return (
    <div className="profile-overview">
      <div className="header">
        <div className="patient-personal-detail">
          <img src={sohaibAvatar} width={100} />
          <div className="name">Christopher Burrell</div>
          <div className="age">25 Years Old</div>
        </div>
      </div>
      <hr style={{ margin: "0px " }} />

      <div className="patient-details-wrapper">
        <div className="progress-info-wrapper">
          <div>
            <span className="complete"> Complete your Profile </span>{" "}
            <span className="percent">89%</span>
          </div>
          <Progress percent={89} showInfo={false} strokeColor={"#4FA6D1"} />
        </div>

        <div className="details">
          <div className="single-detail">
            <img src={gender} /> <span className="title">Gender</span>{" "}
            <span className="info">Female</span>
          </div>
          <div className="single-detail">
            <img src={calendar} /> <span className="title">Birthday</span>{" "}
            <span className="info">19th January 1995</span>
          </div>
          <div className="single-detail">
            <img src={contact} /> <span className="title">Phone No.</span>{" "}
            <span className="info">+(125) 458-8547</span>
          </div>
          <div className="single-detail">
            <img src={address} /> <span className="title">Address</span>{" "}
            <span className="info">Sydney, Australia</span>
          </div>
          <div className="single-detail">
            <img src={blood} /> <span className="title">Blood Group</span>{" "}
            <span className="info">B+</span>
          </div>
          <div className="single-detail">
            <img src={id} /> <span className="title">Kuwait ID no </span>{" "}
            <span className="info">MCR000345721</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
