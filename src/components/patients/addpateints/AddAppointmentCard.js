import { DatePicker } from "antd";
import "../../../assets/css/doctor.scss";
import "../../../assets/css/pharmacy.scss";
import "../../../assets/css/patients/addpatients/addappointmentcard.scss";
import closeIcon from "../../../assets/images/common/close.svg";
import AddRoleIcon from "../../../assets/images/doctor/AddRoleIcon.svg";
import Time from "../../../atoms/Time/Time";
import CustomSelect from "../../common/CustomSelect";

import CalenderIcon from "../../../assets/images/doctor/CalenderIcon.svg";
import DatePicker1 from "../../../atoms/Date/DatePicker";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";

const AddAppointmentCard = ({ click, setClick }) => {
  const doctors = [
    {
      value: "Dr. Drake Boeson",
      label: "Dr. Drake Boeson",
    },
    {
      value: "Dr. Keegan Dach",
      label: "Dr. Keegan Dach",
    },
    {
      value: "Dr. Delaney Mangino",
      label: "Dr. Delaney Mangino",
    },
    {
      value: "Dr. Dustin Jurries",
      label: "Dr. Dustin Jurries",
    },
    {
      value: "Dr. Kyleigh Drentlaw",
      label: "Dr. Kyleigh Drentlaw",
    },
  ];

  const specialistOption = [
    {
      value: "Cardiology",
      label: "Cardiology",
    },
    {
      value: "Neurology",
      label: "Neurology",
    },
    {
      value: "Gynaecology",
      label: "Gynaecology",
    },
    {
      value: "Ophthalmology",
      label: "Ophthalmology",
    },
    {
      value: "Urology",
      label: "Urology",
    },
  ];

  return (
    <>
      <div className="add-appointment-card-wrapper">
        <div className="title-header">
          <div className="title">Book an Appointment</div>
          <img
            src={closeIcon}
            onClick={() => {
              setClick(!click);
            }}
          />
        </div>
        <hr />

        <div class="form-wrapper">
          <form>
            <div class="two-group">
              <div class="form-group">
                <label>Specializations</label>
                <CustomDropDown
                  selectLabel="Select"
                  option={specialistOption}
                />
              </div>
              <div class="form-group">
                <label>Doctor</label>
                <CustomDropDown selectLabel="Select" option={doctors} />
              </div>
            </div>

            <div class="two-group">
              <div class="form-group">
                <label>Date</label>
                <div className="d-flex justify-content-between align-items-center add-patient-date datapicker-border">
                  <DatePicker
                    className=" rounded-0"
                    // placeholder={"start"}
                    format={"DD/MM/YYYY"}
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Time</label>
                {/* <CustomSelect options={doctors} /> */}
                <div
                  className="remove-border-time-patient d-flex justify-content-end"
                  style={{ width: "100%" }}
                >
                  <Time />
                </div>
              </div>
            </div>

            <div className="three-group">
              <div class="form-group">
                <label>Age</label>
                <input type="number" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div class="form-group">
                <label>Phone no</label>
                <input type="number" />
              </div>
            </div>
            <button
              type="submit"
              class="add-button "
              style={{ width: "100%", height: "39px" }}
            >
              Book An Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAppointmentCard;
