import React from "react";
import { useState } from "react";
import Tick from "../../common/Tick";
import Cross from "../../common/Cross";
import AcceptModal from "../../common/AcceptModal";
import CancelModal from "../../common/CancelModal";

const testAppointments = [
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
  {
    name: "Calvin Carlo",
    department: "Haematology",
    date: "12 Dec 2022",
  },
];

const SponsorsList = () => {
  const [showTickModal, setShowTickModal] = useState(false);
  const [showCrossModal, setShowCrossModal] = useState(false);

  //  AcceptAppointModal handler
  const handleTickClick = () => {
    console.log("hey");
    setShowTickModal(true);
  };

  //  CancelAppointentModal handlar
  const handleCrossClick = () => {
    setShowCrossModal(true);
  };

  return (
    <>
      <AcceptModal
        heading="Accept Request"
        description="Are you sure you want accept sponsors request?"
        open={showTickModal}
        onClose={() => setShowTickModal(false)}
      />
      <CancelModal
        heading="Cancel Request"
        description="Are you sure you want to cancel the sponsors request?"
        open={showCrossModal}
        onClose={() => setShowCrossModal(false)}
      />

      <div className="container-wrapper">
        <div className="header">
          <div className="title"> Sponsors Request</div>
          <hr
            style={{
              borderColor: "border: 1px solid #E4E3E4 !important",
              margin: "0px",
            }}
          />
        </div>
        <div className="list-wrapper">
          {testAppointments.map((appointment) => {
            return (
              <>
                <div className="list">
                  <div className="detail">
                    <div className="name">Calvin Carlo</div>
                    <div className="department">Haematology</div>
                    <div className="date">12 Dec 2022</div>
                  </div>
                  <div className="permissions">
                    <Tick onTick={handleTickClick} />
                    <Cross onCross={handleCrossClick} />
                  </div>
                </div>
                <hr style={{ margin: "0px" }} />
              </>
            );
          })}
        </div>
        {/* <button className="">All Doctors</button> */}
      </div>
    </>
  );
};

export default SponsorsList;
