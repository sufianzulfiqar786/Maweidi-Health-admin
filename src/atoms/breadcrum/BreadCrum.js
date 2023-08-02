import React from "react";
import Chevron from "../../assets/images/common/chevron-right.svg";
import { Link } from "react-router-dom";
import "../../assets/css/blooddonation.scss";
const BreadCrum = ({ firstText, firstLink, secondText, }) => {
  return (
    <p className="blooddonation-breadcrumb">
      <Link to="/dashboard">
        <span>DASHBOARD</span>
      </Link>
      {firstLink && (
        <>
          <img src={Chevron} alt="" />
          <Link to={firstLink}>
            <span className={!secondText && 'current-tab'}> {firstText}</span>
          </Link>
        </>
      )}
      {secondText && (
        <>
          <img src={Chevron} />
          <span className="current-tab" style={{height:'100px'}}> {secondText}</span>
        </>
      )}
    </p>
  );
};

export default BreadCrum;
