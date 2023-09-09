import React, { useState } from "react";
import Chevron from "../../../assets/images/common/chevron-right.svg";
import "../../../assets/css/laboratory/bloodtest/bloodtest.scss";
import AddTestModal from "../../../components/laboratory/bloodtest/AddTestModal";
import LaboratoryWrapper from "../../../components/common/LaboratoryWrapper";
import labTestIcon from "../../../assets/images/common/lab.svg";
import BreadCrum from "../../../atoms/breadcrum/BreadCrum";


const BloodTest = () => {
  const rows = [
    {
      id: 0,
      testname: "ABSOLUTE EOSINO",
      rate: "KWD 255.00",
    },
    {
      id: 1,
      testname: "COMPLETE BLOOD",
      rate: "KWD 150.00",
    },
    {
      id: 2,
      testname: "CHEST X-RAY",
      rate: "KWD 50.00",
    },
    {
      id: 3,
      testname: "URINE ANALYSIS",
      rate: "KWD 30.00",
    },
    {
      id: 4,
      testname: "LIPID PROFILE",
      rate: "KWD 180.00",
    },
    {
      id: 5,
      testname: "THYROID PROFILE",
      rate: "KWD 200.00",
    },
    {
      id: 6,
      testname: "ELECTROCARDIOGRAM",
      rate: "KWD 80.00",
    },
    {
      id: 7,
      testname: "BONE DENSITOMETRY",
      rate: "KWD 120.00",
    },
    {
      id: 8,
      testname: "ULTRASOUND",
      rate: "KWD 150.00",
    },
    {
      id: 9,
      testname: "MRI - BRAIN",
      rate: "KWD 350.00",
    },
    {
      id: 10,
      testname: "STOOL ANALYSIS",
      rate: "KWD 40.00",
    },
    {
      id: 11,
      testname: "HEMOGLOBIN A1C",
      rate: "KWD 80.00",
    },
    {
      id: 12,
      testname: "VITAMIN D",
      rate: "KWD 100.00",
    },
    {
      id: 13,
      testname: "URIC ACID",
      rate: "KWD 45.00",
    },
    {
      id: 14,
      testname: "GLUCOSE FASTING",
      rate: "KWD 30.00",
    },
    {
      id: 15,
      testname: "LIVER FUNCTION ",
      rate: "KWD 120.00",
    },
    {
      id: 16,
      testname: "KIDNEY FUNCTION ",
      rate: "KWD 100.00",
    },
    {
      id: 17,
      testname: "THYROID STIMULATING ",
      rate: "KWD 90.00",
    },
    {
      id: 18,
      testname: "PAP SMEAR",
      rate: "KWD 70.00",
    },
    {
      id: 19,
      testname: "ECG STRESS ",
      rate: "KWD 200.00",
    },
    {
      id: 20,
      testname: "HIV SCREENING",
      rate: "KWD 60.00",
    },
    {
      id: 21,
      testname: "HEPATITIS B",
      rate: "KWD 80.00",
    },
    {
      id: 22,
      testname: "CHOLESTEROL PROFILE",
     rate: "KWD 120.00",
    },
    {
      id: 23,
      testname: "URINE CULTURE",
      rate: "KWD 70.00",
    },
    {
      id: 24,
      testname: "BLOOD GROUP",
      rate: "KWD 40.00",
    },
    {
      id: 25,
      testname: "DIGITAL X-RAY",
      rate: "KWD 50.00",
    },
    {
      id: 26,
      testname: "PULMONARY FUNCTION",
      rate: "KWD 180.00",
    },
    {
      id: 27,
      testname: "MAMMOGRAM",
      rate: "KWD 200.00",
    },
    {
      id: 28,
      testname: "TSH",
      rate: "KWD 90.00",
    },
    {
      id: 29,
      testname: "GASTROSCOPY",
      rate: "KWD 300.00",
    },
    // Add more objects as needed
  ];

  const [showAddTestModal, setshowAddTestModal] = useState(false);
  const [modalNav, setModalNav] = useState(false);
  const handleAddTestModal = () => {
    setshowAddTestModal(true);
  };

  return (
    <>
      <AddTestModal
        open={showAddTestModal}
        onClose={() => setshowAddTestModal(false)}
        setModalNav={setModalNav}
      />

      <div className="row mb-lg-5 mb-4 pb-5 px-3  pt-4 bloodtest-tab">
        <div className="col-12">
          <p className="mb-0 bloodtest-heading">Blood Test</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-md-6 ">
            <BreadCrum
                firstLink="/laboratory"
                firstText="LABORATORY"
                secondText="BLOOD TEST"
              />
              {/* <p className="bloodtest-breadcrumb">
                <span>DASHBOARD</span>
                <img src={Chevron} />
                <span> LABORATORY </span>
                <img src={Chevron} />
                <span className="current-tab"> BLOOD TEST</span>
              </p> */}
            </div>
            <div class="col-md-6 text-md-right ">
              <button
                type="button"
                class="add-test"
                onClick={handleAddTestModal}
              >
                Add Test
              </button>
            </div>
          </div>
        </div>

        <LaboratoryWrapper
          title="Test Details"
          requestSectionTitle="Test Appointments"
          rows={rows}
          icon={labTestIcon}
          setModalNav={setModalNav}
          modalNav={modalNav}
        />
      </div>
    </>
  );
};

export default BloodTest;
