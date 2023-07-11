import { useState } from "react";
import "../../../assets/css/patients/patientprofile/profile.scss";
import report from "../../../assets/images/common/medical-report.svg";
import cardiogram from "../../../assets/images/common/cardiogram.svg";
import invoice from "../../../assets/images/common/invoice.svg";
import PatientInvoice from "./PatientInvoice";
import ProfileImg from "../../../molecules/Profile/ProfileImg";

const Profile = () => {
  const [showPateintInvoice, setPatientInvoice] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const appointmentList = [
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
    {
      speciality: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "10Dec,2022",
      invoice: "Full bill paid invoice",
    },
  ];

  const invoiceModalHandler = () => {
    setPatientInvoice(true);
  };

  function handleUploadButtonClick() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    };
    fileInput.click();
  }

  function handleRemoveImageClick() {
    setSelectedFile(null);
  }


  return (
    <>
      <PatientInvoice
        open={showPateintInvoice}
        onClose={() => setPatientInvoice(false)}
      />
      <div className="profile-details">
        <div className='d-flex justify-content-between align-items-end'>
          <div className="heading">Introduction</div>
       <ProfileImg selectedFile={selectedFile} handleRemoveImageClick={handleRemoveImageClick} handleUploadButtonClick={handleUploadButtonClick}/>
        </div>
        <div className="description">
          The most well-known dummy text is the 'Lorem Ipsum', which is said to
          have originated in the 16th century. Lorem Ipsum is composed in a
          pseudo-Latin language which more or less corresponds to 'proper'
          Latin. It contains a series of real Latin words. This ancient dummy
          text is also incomprehensible, but it imitates the rhythm of most
          European languages in Latin script. The advantage of its Latin origin
          and the relative meaninglessness of Lorum Ipsum is that the text does
          not attract attention to itself or distract the viewer's attention
          from the layout.
        </div>

        {/* Medical history */}
        <div class="medical-history">
          <div class="heading">Medical History</div>
          <div class="medical-details">
            <div class="first-row">
              <div class="current-disease">
                <div class="disease-type">Current Disease</div>
                <div class="disease-name">Blood Pressure, Heart Problem</div>
              </div>
              <div class="family-disease">
                <div class="disease-type">Family Disease</div>
                <div class="disease-name">High Blood Pressure</div>
              </div>
            </div>
            <div class="second-row">
              <div class="current-disease">
                <div class="disease-type">History of Surgeries</div>
                <div class="disease-name">No history yet</div>
              </div>
              <div class="family-disease">
                <div class="disease-type">Family Membermes</div>
                <div class="disease-name">High Blood Pressure</div>
              </div>
            </div>
            <div class="third-row">
              <div class="medical-report">
                <div class="report">Medical Reports</div>
                <div class="report-detail">
                  <img src={report} />
                  Heart Report checkup 2 months ago
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment History */}

        <div className="appointment-history">
          <div className="heading">Appointment History</div>
          <div className="sub-heading">Appointment List</div>

          <div className="appointment-stacks">
            {appointmentList.map((appointment) => (
              <div className="single-stack d-flex align-items-end">
                <img src={cardiogram} />
                <div className="appointment-detail">
                  <div className="speciality">{appointment.speciality}</div>
                  <div className="doctor1">{appointment.doctor}</div>
                </div>
                <div className="appointment-date">{appointment.date}</div>
                <div className="invoice-info">{appointment.invoice}</div>
                <img src={invoice} onClick={() => invoiceModalHandler()} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
