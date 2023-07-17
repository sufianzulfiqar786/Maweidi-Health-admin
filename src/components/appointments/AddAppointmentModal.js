import { useState } from "react";
import { Modal, Select, DatePicker, TimePicker } from "antd";
import closeIcon from "../../assets/images/common/close.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import "../../assets/css/appointments/modal.scss";
import CustomDropDown from "../../atoms/CustomDropDown/Index.js";
import ClockTimeTable from "../../assets/images/doctor/ClockTimeTable.svg";
import Phone from "../../atoms/phone";

const AddAppointmentModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    kwdId: "",
    patient_name: "",
    patientId: "",
    hospital: "",
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
  const [matchedSpecializations, setMatchedSpecializations] = useState([]);
  const [matchedDoctors, setMatchedDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  const backendDates = ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25'];
  const doctors = [
    {
      id: 1,
      value: "Dr. Drake Boeson",
      label: "Dr. Drake Boeson",
      availableDates: ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25']
    },
    {
      id: 2,
      value: "Dr. Keegan Dach",
      label: "Dr. Keegan Dach",
      availableDates: ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25']
    },
    {
      id: 3,
      value: "Dr. Delaney Mangino",
      label: "Dr. Delaney Mangino",
      availableDates: ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25']
    },
    {
      id: 4,
      value: "Dr. Dustin Jurries",
      label: "Dr. Dustin Jurries",
      availableDates: ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25']
    },
    {
      id: 5,
      value: "Dr. Kyleigh Drentlaw",
      label: "Dr. Kyleigh Drentlaw",
      availableDates: ['2023-07-15', '2023-07-17', '2023-07-20', '2023-07-23', '2023-07-25']
    },
  ];
  // Hospitals array
const hospitals = [
  {
    id: 1,
    value: "Badr AL Samaa Hospitals",
    label: "Badr AL Samaa Hospitals",
    specializations: [1, 2, 3] // IDs of specializations offered in this hospital
  },
  {
    id: 2,
    value: "Royale Hayat Hospital",
    label: "Royale Hayat Hospital",
    specializations: [2, 4] // IDs of specializations offered in this hospital
  },
  {
    id: 3,
    value: "New Mowasat Hospital",
    label: "New Mowasat Hospital",
    specializations: [1, 2, 5] // IDs of specializations offered in this hospital
  },
  {
    id: 4,
    value: "Taiba Hospital",
    label: "Taiba Hospital",
    specializations: [1, 5] // IDs of specializations offered in this hospital
  },
  // Add more hospitals as needed
];
const specialistOptions = [
  {
    id: 1,
    value: "Cardiology",
    label: "Cardiology",
    doctors: [1, 2]
  },
  {
    id: 2,
    value: "Neurology",
    label: "Neurology",
    doctors: [2, 3]
  },
  {
    id: 3,
    value: "Gynaecology",
    label: "Gynaecology",
    doctors: [2, 3, 4]
  },
  {
    id: 4,
    value: "Ophthalmology",
    label: "Ophthalmology",
    doctors: [1, 2, 5]
  },
  {
    id: 5,
    value: "Urology",
    label: "Urology",
    doctors: [1, 3, 5]
  },
];


const findSpecializations = (hospitalValue) => {
  const selectedHospital = hospitals.find(hospital => hospital.value === hospitalValue);
    if (selectedHospital) {
      const specializationsForHospital = selectedHospital.specializations.map((specializationId) => {
        return specialistOptions.find((specialization) => specialization.id === specializationId);
      });
      console.log("--matchedSpecialization---", specializationsForHospital);
      setMatchedSpecializations(specializationsForHospital);
    };
};

const findDoctors = (specializationValue) => {
  const selectedSpecialization = matchedSpecializations.find(specialization => specialization.value === specializationValue);
    if (selectedSpecialization) {
      const doctorsForSpecialization = selectedSpecialization.doctors.map((doctorId) => {
        return doctors.find((doctor) => doctor.id === doctorId);
      });
      console.log("--matchedDoctors---", doctorsForSpecialization);
      setMatchedDoctors(doctorsForSpecialization);
    };
};

const findAvailableDates = (doctorValue) => {
  const selectedDoctor = matchedDoctors.find(doctor => doctor.value === doctorValue);
  if(selectedDoctor) {
    setAvailableDates(selectedDoctor.availableDates);
  }
}

const isDisabledDate = (current) => {
  const formattedDate = current.format('YYYY-MM-DD');
  return !availableDates.includes(formattedDate);
};

  const handleInputChange = (name, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isFormEmpty = Object.values(formData).some(
    (value) => value === "" || value === undefined
  );

  const handleHospitalChange = (value) => {
    findSpecializations(value);
    handleInputChange("hospital", value);
  };

  const handleSpecializationChange = (value) => {
    findDoctors(value);
    handleInputChange("specialization", value);
  };

  const handleDoctorsChange = (value) => {
    findAvailableDates(value);
    handleInputChange("doctor_name", value);
  };

  const handleTimeChange = (value) => {
    handleInputChange("time", value);
    console.log("--avilableDates---", availableDates);
  };

  const handleDateChange = (value) => {
    handleInputChange("date", value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      kwdId: "",
      patient_name: "",
      patientId: "",
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
                  value={formData?.kwdId}
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
                    value={formData?.patient_name}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div class="form-group">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData?.patientId}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>

              <div class="form-group full-width">
                <label>Hospital</label>
                <CustomDropDown
                    selectLabel="Select"
                    option={hospitals}
                    handleChangeSelect={handleHospitalChange}
                    value={formData?.hospital}
                  />
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Specialization</label>
                  <CustomDropDown
                    selectLabel="Select"
                    option={matchedSpecializations}
                    handleChangeSelect={handleSpecializationChange}
                    value={formData?.specialization}
                  />
                </div>
                <div class="form-group">
                  <label>Doctor</label>
                  <CustomDropDown
                    selectLabel="Select"
                    option={matchedDoctors}
                    handleChangeSelect={handleDoctorsChange}
                    value={formData?.doctor_name}
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
                    before booking an appointment
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
                      disabledDate={isDisabledDate}
                      size="large"
                      style={{ border: "none", width: "100%" }}
                      onChange={handleDateChange}
                      value={formData?.date}
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
                      value={formData?.time}
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
                    value={formData?.age}
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
                    value={formData?.email}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div class="form-group" style={{marginTop: '11px'}}>
                <Phone handleChange={(value) => handleInputChange("phone", value)} value={formData?.phone}/>
                </div>
              </div>

              <button
                type="submit"
                class={`submit-button full-width ${
                  isFormEmpty ? "disabled" : ""
                }`}
                disabled={isFormEmpty}
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
