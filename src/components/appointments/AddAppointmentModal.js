import { useState, useEffect, useMemo } from "react";
import { Modal, Select, DatePicker, TimePicker } from "antd";
import closeIcon from "../../assets/images/common/close.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";
import "../../assets/css/appointments/modal.scss";
import CustomDropDown from "../../atoms/CustomDropDown/Index.js";
import ClockTimeTable from "../../assets/images/doctor/ClockTimeTable.svg";
import Phone from "../../atoms/phone";
import { Controller, useForm } from "react-hook-form";
import useFetch from "../../customHook/useFetch";

const AddAppointmentModal = ({ open, onClose }) => {
  const { data: hospitalData } = useFetch(
    process.env.REACT_APP_GET_HOSPITAL_DATA
  );

  const [formData, setFormData] = useState({
    kwdId: "",
    patient_name: "",
    patientId: "",
    hospital: "",
    specialization: "",
    doctor_name: "",
    date: "",
    time: "",
    age: "",
    email: "",
    phone: "",
  });
  const [modal2Open, setModal2Open] = useState(false);
  const [matchedSpecializations, setMatchedSpecializations] = useState([]);
  const [matchedDoctors, setMatchedDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState();
  const [selectedSpecializationId, setSelectedSpecializationId] = useState();


  const {
    data: specializationData
  } = useFetch(
    process.env.REACT_APP_GET_SPECIALIZATIONS + `/${selectedHospitalId}`
  );

  const url = process.env.REACT_APP_GET_DOCTORS_BY_SPEC_HOSPITAL + `/${selectedHospitalId}/${selectedSpecializationId}`;
  console.log("-----url-----", url);

  const {
    data: doctorsData,
    isLoading,
    error,
  } = useFetch(
    process.env.REACT_APP_GET_DOCTORS_BY_SPEC_HOSPITAL + `/${selectedHospitalId}/${selectedSpecializationId}`
  );
  console.log("------doctorsData-------", doctorsData);

  useEffect(() => {
    console.log("-----hospitalData------", hospitalData);
    if (hospitalData) {
      setHospitals(
        hospitalData?.data.map(({ id, name, specialities }) => ({
          id,
          value: name,
          label: name,
          specialities,
        }))
      );
    }
  }, [hospitalData]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const doctors = [
    {
      id: 1,
      value: "Dr. Drake Boeson",
      label: "Dr. Drake Boeson",
      availableDates: [
        "2023-07-15",
        "2023-07-17",
        "2023-07-20",
        "2023-07-23",
        "2023-07-25",
      ],
    },
    {
      id: 2,
      value: "Dr. Keegan Dach",
      label: "Dr. Keegan Dach",
      availableDates: [
        "2023-07-15",
        "2023-07-17",
        "2023-07-20",
        "2023-07-23",
        "2023-07-25",
      ],
    },
    {
      id: 3,
      value: "Dr. Delaney Mangino",
      label: "Dr. Delaney Mangino",
      availableDates: [
        "2023-07-15",
        "2023-07-17",
        "2023-07-20",
        "2023-07-23",
        "2023-07-25",
      ],
    },
    {
      id: 4,
      value: "Dr. Dustin Jurries",
      label: "Dr. Dustin Jurries",
      availableDates: [
        "2023-07-15",
        "2023-07-17",
        "2023-07-20",
        "2023-07-23",
        "2023-07-25",
      ],
    },
    {
      id: 5,
      value: "Dr. Kyleigh Drentlaw",
      label: "Dr. Kyleigh Drentlaw",
      availableDates: [
        "2023-07-15",
        "2023-07-17",
        "2023-07-20",
        "2023-07-23",
        "2023-07-25",
      ],
    },
  ];
  const specialistOptions = [
    {
      id: 1,
      value: "Cardiology",
      label: "Cardiology",
      doctors: [1, 2],
    },
    {
      id: 2,
      value: "Neurology",
      label: "Neurology",
      doctors: [2, 3],
    },
    {
      id: 3,
      value: "Gynaecology",
      label: "Gynaecology",
      doctors: [2, 3, 4],
    },
    {
      id: 4,
      value: "Ophthalmology",
      label: "Ophthalmology",
      doctors: [1, 2, 5],
    },
    {
      id: 5,
      value: "Urology",
      label: "Urology",
      doctors: [1, 3, 5],
    },
  ];

 
  const getSelectedHospitalId = (hospitalValue) => {
    const selectedHospital = hospitals.find(
      (hospital) => hospital?.value === hospitalValue
    );
    if (selectedHospital) {
      setSelectedHospitalId(selectedHospital?.id);
    }
  };

  const getSelectedSpecializationId = (specializationValue) => {
    const selectedSpecialization = matchedSpecializations.find(specialization => specialization?.value === specializationValue);
      if (selectedSpecialization) {
        setSelectedSpecializationId(selectedSpecialization?.id);
      };
  };
  

  const findSpecializations = () => {
    console.log("------specializationData-------", matchedSpecializations);
    if (specializationData) {
      setMatchedSpecializations(
        specializationData?.data?.map(({ id, name }) => ({
          id,
          value: name,
          label: name,
        }))
      );
    }
  };
  useMemo(() => findSpecializations(), [specializationData?.data]);
  const findDoctors = () => {
    if (doctorsData) {
      setMatchedDoctors(
        doctorsData?.data?.map(({ id, name }) => ({
          id,
          value: name,
          label: name,
        }))
      );
    }
  };
  useMemo(() => findDoctors(), [doctorsData?.data]);

  const findAvailableDates = (doctorValue) => {
    const selectedDoctor = matchedDoctors.find(
      (doctor) => doctor.value === doctorValue
    );
    if (selectedDoctor) {
      setAvailableDates(selectedDoctor.availableDates);
    }
  };

  const isDisabledDate = (current) => {
    const formattedDate = current.format("YYYY-MM-DD");
    return !availableDates.includes(formattedDate);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleHospitalChange = (value) => {
    getSelectedHospitalId(value);
    handleInputChange("hospital", value);
  };

  const handleSpecializationChange = (value) => {
    getSelectedSpecializationId(value);
    // findDoctors(value);
    handleInputChange("specialization", value);
  };

  const handleDoctorsChange = (value) => {
    findAvailableDates(value);
    handleInputChange("doctor_name", value);
  };

  const handleTimeChange = (value) => {
    handleInputChange("time", value);
    console.log("----selectedSpecializationId-----", selectedSpecializationId);
  };

  const handleDateChange = (value) => {
    handleInputChange("date", value);
  };

  const onSubmit = () => {
    setFormData({
      kwdId: "",
      patient_name: "",
      patientId: "",
      hospital: "",
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
      hospital: "",
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group full-width">
                <label class="required">Enter KWD ID</label>
                <Controller
                  name="kwdId"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="kwdId"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleInputChange(e.target.name, e.target.value);
                        }}
                      />

                      {errors.kwdId && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Patient Name</label>
                  <Controller
                    name="patient_name"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="text"
                          name="patient_name"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleInputChange(e.target.name, e.target.value);
                          }}
                        />

                        {errors.patient_name && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div class="form-group">
                  <label>Patient ID</label>
                  <Controller
                    name="patientId"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="text"
                          name="patientId"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleInputChange(e.target.name, e.target.value);
                          }}
                        />

                        {errors.patientId && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div class="form-group full-width">
                <label>Hospital</label>
                <Controller
                  name="hospital"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <CustomDropDown
                        handleChangeSelect={(value, name) => {
                          field.onChange(value);
                          handleHospitalChange(value);
                        }}
                        option={hospitals}
                        field={field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />

                      {errors.hospital && (
                        <span className="error-message">
                          This field is required
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div class="two-group">
                <div class="form-group">
                  <label>Specialization</label>
                  <Controller
                    name="specialization"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <CustomDropDown
                          handleChangeSelect={(value, name) => {
                            field.onChange(value);
                            handleSpecializationChange(value);
                          }}
                          option={matchedSpecializations}
                          field={field}
                          value={field.value}
                          onBlur={field.onBlur}
                        />

                        {errors.specialization && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div class="form-group">
                  <label>Doctor</label>
                  <Controller
                    name="doctor_name"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <CustomDropDown
                          handleChangeSelect={(value, name) => {
                            field.onChange(value);
                            handleDoctorsChange(value);
                          }}
                          option={matchedDoctors}
                          field={field}
                          value={field.value}
                          onBlur={field.onBlur}
                        />

                        {errors.doctor_name && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
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
                    <Controller
                      name="date"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <DatePicker
                          disabledDate={isDisabledDate}
                          style={{ border: "none", width: "100%" }}
                          onChange={(value, name) => {
                            field.onChange(value);
                            handleDateChange(value);
                          }}
                          field={field}
                          value={field.value}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  </div>
                  {errors.date && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </div>
                <div class="form-group">
                  <label>Time</label>
                  <div className="appointment-time2 d-flex justify-content-between">
                    <Controller
                      name="time"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <>
                          <Select
                            placeholder="Select Time"
                            style={{
                              width: "80%",
                            }}
                            bordered={true}
                            onChange={(value, name) => {
                              field.onChange(value);
                              handleTimeChange(value);
                            }}
                            field={field}
                            value={field.value}
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
                        </>
                      )}
                    />
                    <img className="pr-1" src={ClockIcon} alt="" />
                  </div>
                  {errors.time && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                  {/* <TimePicker size="large" style={{ width: "100%" }} /> */}
                </div>
              </div>

              <div class="three-group">
                <div class="form-group">
                  <label>Age</label>
                  <Controller
                    name="age"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="text"
                          name="age"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleInputChange(e.target.name, e.target.value);
                          }}
                        />

                        {errors.age && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div class="form-group">
                  <label for="date-input">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: true,
                      pattern:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    }}
                    render={({ field }) => (
                      <input
                        className=""
                        type="text"
                        name="email"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleInputChange(e.target.name, e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="error-message">Invalid email address</span>
                  )}
                </div>
                <div class="form-group" style={{ marginTop: "11px" }}>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <Phone
                          name="phone"
                          field={field}
                          value={field.value}
                          handleChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e.target.name, e.target.value);
                          }}
                        />
                        {errors.phone && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <button type="submit" class="submit-button full-width">
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
