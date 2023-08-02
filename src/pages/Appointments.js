import React, { useState, useEffect } from "react";
import DataTable from "../components/appointments/DataTable";
import "../assets/css/appointments/appointments.scss";
import Chevron from "../assets/images/common/chevron-right.svg";
import AcceptModal from "../components/common/AcceptModal";
import CancelModal from "../components/common/CancelModal";
import AddAppointmentModal from "../components/appointments/AddAppointmentModal";
import CheckPatientModal from "../components/common/CheckPateintModal";
import Searchbar from "./../components/common/Searchbar";
import useFetch from "../customHook/useFetch";

// img
import DownIcon from "../assets/images/dashboard/DownIcon.svg";
import { Link } from "react-router-dom";

const Appointments = () => {

  // const [rows, setRows] = useState([
  //   {
  //     number: 1,
  //     patient_name: "Sohaib Butt",
  //     date: "2023-04-11",
  //     time: "11:00AM",
  //     hospital_name: "Badr AL Samaa Hospitals",
  //     docCivilID: "40122-67366475-3",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 2,
  //     patient_name: "Abdullah",
  //     date: "2023-04-10",
  //     time: "11:00AM",
  //     hospital_name: "Royale Hayat Hospital",
  //     docCivilID: "40122-67366475-4",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 3,
  //     patient_name: "Ahad",
  //     date: "2023-04-12",
  //     time: "11:00AM",
  //     hospital_name: "Al-Seef Hospital",
  //     docCivilID: "40122-67366475-5",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 4,
  //     patient_name: "Azlan",
  //     date: "2023-04-03",
  //     time: "11:00AM",
  //     hospital_name: "New Mowasat Hospital",
  //     docCivilID: "40122-67366475-6",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 5,
  //     patient_name: "Ayan",
  //     date: "2023-04-11",
  //     time: "11:00AM",
  //     hospital_name: "Taiba Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 6,
  //     patient_name: "Sohaib",
  //     date: "2023-04-12",
  //     time: "11:00AM",
  //     hospital_name: "Wara Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 7,
  //     patient_name: "Caliph",
  //     date: "2023-04-30",
  //     time: "11:00AM",
  //     hospital_name: "Al Salam International Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 8,
  //     patient_name: "Johnson",
  //     date: "2023-04-14",
  //     time: "11:00AM",
  //     hospital_name: "Badr AL Samaa Hospitals",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 9,
  //     patient_name: "William",
  //     date: "2023-04-14",
  //     time: "11:00AM",
  //     hospital_name: "Royale Hayat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 10,
  //     patient_name: "Sufiyan",
  //     date: "2023-04-15",
  //     time: "11:00AM",
  //     hospital_name: "Taiba Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 11,
  //     patient_name: "Malok",
  //     date: "2023-04-15",
  //     time: "11:00AM",
  //     hospital_name: "New Mowasat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 12,
  //     patient_name: "Asad",
  //     date: "2023-04-13",
  //     time: "11:00AM",
  //     hospital_name: "Royale Hayat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Rejected",
  //   },
  //   {
  //     number: 13,
  //     patient_name: "Umair",
  //     date: "2023-04-28",
  //     time: "11:00AM",
  //     hospital_name: "Wara Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 14,
  //     patient_name: "Dan",
  //     date: "2023-04-13",
  //     time: "11:00AM",
  //     hospital_name: "Royale Hayat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 15,
  //     patient_name: "Dan",
  //     date: "2023-04-11",
  //     time: "11:00AM",
  //     hospital_name: "Taiba Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 16,
  //     patient_name: "Dan",
  //     date: "2023-04-12",
  //     time: "11:00AM",
  //     hospital_name: "New Mowasat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 17,
  //     patient_name: "Dan",
  //     date: "2023-04-10",
  //     time: "11:00AM",
  //     hospital_name: "Al Salam International Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 18,
  //     patient_name: "Dan",
  //     date: "2023-04-12",
  //     time: "11:00AM",
  //     hospital_name: "Al-Seef Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 19,
  //     patient_name: "Dan",
  //     date: "2023-04-11",
  //     time: "11:00AM",
  //     hospital_name: "New Mowasat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  //   {
  //     number: 20,
  //     patient_name: "Sameer",
  //     date: "2023-04-10",
  //     time: "11:00AM",
  //     hospital_name: "Royale Hayat Hospital",
  //     docCivilID: "40122-67366475-7",
  //     doctor_name: "Dr. Jane Smith",
  //     specialization: "Cardiology",
  //     fees: "$50/Patient",
  //     appointmentStatus: "Approved",
  //   },
  // ]);
  const [rows, setRows] = useState([])
  const [isActive, setIsActive] = useState(false);
  const [filterOption, setFilterOption] = useState("All"); // default to "today"
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckPatientModal, setShowCheckPatientModal] = useState(false);
  const [showTickModal, setShowTickModal] = useState(false);
  const [showCrossModal, setShowCrossModal] = useState(false);
  const [showAddAppointmentModal, setshowAddAppointmentModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = "/appointment";

  const { data: appointmentsData, isLoading } = useFetch(
    `${process.env.REACT_APP_GET_APPOINTMENTS}?per_page=${rowsPerPage}&page=${page}`
  );

  function toggleDropdown(data) {
    setIsActive(!isActive);
    setFilterOption(data)
  }

  //  AcceptAppointModal handler
  const handleTickClick = () => {
    setShowTickModal(true);
  };

  //  CancelAppointentModal handlar
  const handleCrossClick = () => {
    setShowCrossModal(true);
  };

  const handleAddAppointment = () => {
    setshowAddAppointmentModal(true);
  };

  useEffect(() => {
    if (appointmentsData?.success) {
      setRows(
        appointmentsData?.data?.data?.map(({ id, fees, user, doctor, selected_date, selected_time, hospital, status}) => ({
          number: id,
          patient_id: user?.id,
          patient_name: user?.name,
          date: selected_date,
          time: selected_time,
          hospital_name: hospital !==null? hospital?.name : "Badr AL Samaa Hospitals",
          docCivilID: doctor !==null? doctor?.council_registration_no : "40122-67366475-3",
          doctor_name: doctor !==null? doctor?.user?.name : "Dr. Jane Smith",
          specialization: "Cardiology",
          fees: fees !==null? fees : "$50/Patient",
          appointmentStatus: status !==0 ? "Approved" :"Rejected",
        }))
      );
    }
  }, [appointmentsData]);
  useEffect(() => {
    if (navigate === "/appointment") {
      setShowCheckPatientModal(true);
    }
  }, [navigate.location]);

  //  On page render pateint modal
  const handleCloseCheckPatientModal = () => {
    setShowCheckPatientModal(false);
  };

  //  Filter handler
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  //  Accept appointment handler
  const handleAcceptAppointment = () => {
    // Find the index of the appointment row that needs to be updated
    const rowIndex = rows.findIndex(
      (row) => row.appointmentStatus === "Pending"
    );
    if (rowIndex !== -1) {
      // Update the appointment status to "Approved"
      const updatedRows = [...rows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        appointmentStatus: "Approved",
      };
      setRows(updatedRows); // Update the state of rows
    }
  };

  // Search Functionality
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {/* <CheckPatientModal
        open={showCheckPatientModal}
        onClose={handleCloseCheckPatientModal}
      /> */}

      <AcceptModal
        heading="Accept Appointment"
        description="Are you sure you want to Accept an appointment?"
        open={showTickModal}
        onClose={() => setShowTickModal(false)}
        onAccept={handleAcceptAppointment}
      />
      <CancelModal
        heading="Cancel Appointment"
        description="Are you sure you want to cancel an appointment?"
        open={showCrossModal}
        onClose={() => setShowCrossModal(false)}
      />
      <AddAppointmentModal
        open={showAddAppointmentModal}
        onClose={() => setshowAddAppointmentModal(false)}
      />

      <div className="row pl-3 pr-2 pt-4 appointment-tab">
        <div className="col-12">
          <p className="mb-0 appointment-heading">Appointment</p>
        </div>

        <div className="col-12 my-4">
          <div className="row">
            <div className="col-md-6">
              <p className="appointment-breadcrumb">
                <span> DASHBOARD </span>
                <img src={Chevron} />
                <span className="current-tab"> APPOINTMENT</span>
              </p>
            </div>
            <div class="col-md-6 text-md-right">
              {/* <select
                style={{ marginRight: "15px" }}
                value={filterOption}
                onChange={handleFilterChange}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="tomorrow">Tomorrow</option>
              </select> */}

              <div className={`dropdown ${isActive ? 'active' : ''}`}>
                <button className="doctor-btn patient-btn-filter mr-3"  onClick={()=>{
                      setIsActive(!isActive)
                      
                  }} style={{height:"48px", width:"100px"}}>
                {filterOption} <img className="pl-2" src={DownIcon} alt="" />
                </button>

                <div className="dropdown-content border"
                  style={{
                    display: isActive ? 'block' : 'none',
                    width: "97px",

                  }}>
                  <div className='old-dropdown-text1 text-center' onClick={()=>{
                      setIsActive(!isActive)
                      setFilterOption('All')
                  }}>
                    <span>All</span>
                  </div>
                  <div className='old-dropdown-text1 text-center' onClick={()=>{
                      setIsActive(!isActive)
                      setFilterOption('Today')
                  }}>
                    <span>Today</span>
                  </div>
                  <div className='old-dropdown-text2 text-center' onClick={()=>{
                      setIsActive(!isActive)
                      setFilterOption('Tomorrow')
                  }}>
                    <span>Tomorrow</span>
                  </div>
                  <div className='old-dropdown-text2 text-center' onClick={()=>{
                      setIsActive(!isActive)
                      setFilterOption('Yesterday')
                  }}>
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>

            <Link to='/appointment/add'> <button
                type="button"
                class="add-appointment"
                onClick={handleAddAppointment}
              >
                Add Appointment
              </button> 
              </Link> 
            </div>
          </div>

          <div className="row m-0 p-0">
            <Searchbar onChange={handleSearchChange} value={searchQuery} />
          </div>
        </div>

        <div className="col-12  mb-5 pb-5">
          <DataTable
            rows={rows}
            onTickClick={handleTickClick}
            onCrossClick={handleCrossClick}
            filterOption={filterOption}
            searchQuery={searchQuery}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Appointments;
