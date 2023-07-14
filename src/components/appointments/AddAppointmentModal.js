import { useState } from "react";
import { Modal, Select, DatePicker, TimePicker } from "antd";
import CustomSelect from "../../components/common/CustomSelect.js";
import closeIcon from "../../assets/images/common/close.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import "../../assets/css/appointments/modal.scss";
import Location from "../../atoms/Location/Location.js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import GoogleMap from "../common/GoogleMap.js";
import CustomDropDown from "../../atoms/CustomDropDown/Index.js";
import ClockTimeTable from "../../assets/images/doctor/ClockTimeTable.svg";
import TimeTableMessageIcon from "../../assets/images/doctor/TimeTableMessageIcon.svg";
import TimeTablePhoneIcon from "../../assets/images/doctor/TimeTablePhoneIcon.svg";

const AddAppointmentModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    kwdId: "",
    patient_name: "",
    patientId: "",
    visitDate: "",
    visitTime: "",
    location: "",
    specialization: "",
    doctor_name: "",
    date: "",
    time: "",
    age: "",
    email: "",
    phone: "",
  });
  const [showMap, setShowMap] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const specialistOptions = [
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
  const handleInputChange = (name, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isFormEmpty = Object.values(formData).some(
    (value) => value === "" || value === undefined
  );

  const handleLocationIconClick = () => {
    !showMap ? setShowMap(true) : setShowMap(false);
  };

  const handleLocationChange = (value) => {
    handleInputChange("location", value);
    setShowMap(false);
  };

  const handleSpecializationChange = (value) => {
    handleInputChange("specialization", value);
  };

  const handleDoctorsChange = (value) => {
    handleInputChange("doctor_name", value);
  };

  const handleTimeChange = (value) => {
    handleInputChange("time", value);
  };

  const handleVisitTimeChange = (value) => {
    handleInputChange("visitTime", value);
  };

  const handleDateChange = (value) => {
    handleInputChange("date", value);
  };

  const handleVisitDateChange = (value) => {
    handleInputChange("visitDate", value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      kwdId: "",
      patient_name: "",
      patientId: "",
      visitDate: "",
      visitTime: "",
      location: "",
      specialization: "",
      doctor_name: "",
      date: "",
      time: "",
      age: "",
      email: "",
      phone: "",
    });
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      kwdId: "",
      patient_name: "",
      patientId: "",
      visitDate: "",
      visitTime: "",
      location: "",
      specialization: "",
      doctor_name: "",
      date: "",
      time: "",
      age: "",
      email: "",
      phone: "",
    });
  };

  return (
    <>
      <Modal
        className="add-modal"
        open={open}
        centered
        closable={false}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
        width={837}
      >
        <div className="modal-content-wrapper">
          <div className="title-header">
            <div className="title">Book an Appointment</div>
            <img src={closeIcon} onClick={() => handleCancel()} />
          </div>
          <hr style={{ margin: "0px " }} />

          <div class="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div class="form-group full-width">
                <label class="required">Enter KWD ID</label>
                <input
                  type="text"
                  name="kwdId"
                  value={formData.kwdId}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div class="form-group">
                  <label>Patient ID no</label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Visit Date</label>
                  <div className="border" style={{ borderRadius: "5px" }}>
                    <DatePicker
                      size="large"
                      style={{ border: "none", width: "100%" }}
                      onChange={handleVisitDateChange}
                      value={formData.visitDate}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Visit Time</label>
                  <div className="border" style={{ borderRadius: "5px" }}>
                    <TimePicker
                      size="large"
                      style={{ border: "none", width: "100%" }}
                      onChange={handleVisitTimeChange}
                      value={formData.visitTime}
                    />
                  </div>
                </div>
              </div>

              <div class="form-group full-width">
                <label class="required">Location</label>
                <Location
                  handleLocation={handleLocationIconClick}
                  locationProp={formData.location}
                />
                {showMap && (
                  <GoogleMap
                    locationProp={formData.location}
                    setLocationProp={handleLocationChange}
                  />
                )}
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Specialization</label>
                  <CustomDropDown
                    selectLabel="Select"
                    option={specialistOptions}
                    handleChangeSelect={handleSpecializationChange}
                    value={formData.specialization}
                  />
                </div>
                <div class="form-group">
                  <label>Doctor</label>
                  <CustomDropDown
                    selectLabel="Select"
                    option={doctors}
                    handleChangeSelect={handleDoctorsChange}
                    value={formData.doctor_name}
                  />
                  <label style={{ fontSize: "12px", marginBottom: "-15px" }}>
                    Please confirm the doctor's availability and{" "}
                    <span
                      className="font-weight-bold text-dark cursor-pointer"
                      onClick={() => setModal2Open(true)}
                    >
                      {" "}
                      time table
                    </span>{" "}
                    before booking an appointmen
                  </label>
                </div>
              </div>

              <Modal
                className="doctor-filter-modal"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                width={735}
                footer={<div className="row px-3 mt-4 mb-2"></div>}
              >
                <div className="row mx-3 mt-4 pt-3 ">
                  <div className="col-lg-12 py-4 time-table-border  px-4">
                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Monday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Tuesday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Wednesday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Thursday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Friday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Saturday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="mb-0 d-flex justify-content-between">
                      <div>
                        <img
                          className="pl-1 pr-2"
                          src={ClockTimeTable}
                          alt=""
                        />{" "}
                        <span className="time-table-day">Sunday</span>
                      </div>

                      <div>
                        <span className=" pr-1 time-table-time-text">
                          Time:{" "}
                          <span className="time-table-time-dynamic">
                            8.00 - 20.00
                          </span>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <div class="two-group">
                <div class="form-group">
                  <label>Date</label>
                  <div className="border" style={{ borderRadius: "5px" }}>
                    <DatePicker
                      size="large"
                      style={{ border: "none", width: "100%" }}
                      onChange={handleDateChange}
                      value={formData.date}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Time</label>
                  <div className="appointment-time2 d-flex justify-content-between">
                    <Select
                      // defaultValue="Category Type"
                      style={{
                        width: "80%",
                      }}
                      bordered={true}
                      onChange={handleTimeChange}
                      value={formData.time}
                      options={[
                        {
                          label: "9:00 AM",
                          value: "9:00 AM",
                        },
                        {
                          label: "10:00 AM",
                          value: "111:00 AM",
                        },
                        {
                          label: "11:00 AM",
                          value: "11:00 AM",
                        },
                        {
                          label: "12:00 AM",
                          value: "12:00 AM",
                        },
                        {
                          label: "1:00 PM",
                          value: "1:00 PM",
                        },
                        {
                          label: "2:00 PM",
                          value: "2:00 PM",
                        },
                        {
                          label: "3:00 PM",
                          value: "3:00 PM",
                        },
                      ]}
                    />
                    <img className="pr-1" src={ClockIcon} alt="" />
                  </div>
                  {/* <TimePicker size="large" style={{ width: "100%" }} /> */}
                </div>
              </div>

              <div class="three-group">
                <div class="form-group">
                  <label>Age</label>
                  <input
                    type="text"
                    name="age"
                    id="phone-input"
                    value={formData.age}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div class="form-group">
                  <label for="date-input">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="phone-input"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div class="form-group">
                  <label>Phone no</label>
                  <div
                    className="border d-flex align-items-center justify-content-center"
                    style={{ borderRadius: "5px", height: "36.6px" }}
                  >
                    <PhoneInput
                      className=""
                      style={{ border: "none" }}
                      country="US"
                      value={formData.phone}
                      defaultCountry="KW"
                      onChange={(value) => handleInputChange("phone", value)}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class={`submit-button full-width ${
                  isFormEmpty ? "disabled" : ""
                }`}
                disabled={isFormEmpty}
                onClick={console.log("------formData-----", formData)}
              >
                Book An Appointment
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddAppointmentModal;
