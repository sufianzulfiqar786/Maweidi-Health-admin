import React from 'react'
import Searchbar from '../../components/common/Searchbar'
import BreadCrum from '../../atoms/breadcrum/BreadCrum'
import { Link } from 'react-router-dom'
import { CSVLink, CSVDownload } from "react-csv";
import "../../assets/css/blooddonation.scss";
import { useState } from 'react';
import DownIcon from "../../assets/images/dashboard/DownIcon.svg";

const ListHeader = ({ mainHeading, placeholder, btnText, linkBreadCrum, blinkBreadCrumText, linkbtn, csvData, disabled, exportFileName, blinkBreadCrumText1, filterOption, setFilterOption, filterOptionData }) => {

  const role = JSON.parse(localStorage.getItem("userRoles"))
  const isSuperAdmin = Object.keys(role).length === 0

  const [isActive, setIsActive] = useState(false);
  

 

  return (
    <div className="row mb-1">
      <div className="col-12 mb-2 blooddonation-breadcrumb" style={{ fontSize: '14px', color: '#202020' }}>
        {mainHeading}
      </div>
      <div className="col-lg-5">
        <BreadCrum
          firstLink={linkBreadCrum}
          firstText={blinkBreadCrumText}
          secondText={blinkBreadCrumText1}
        />
      </div>
      <div className="col-lg-7 d-flex justify-content-end align-items-center list-header">
        <div className='search-input-field d-flex align-items-center' >
          <i class="fas fa-search pl-2 pt-1" style={{ color: '#6D7482', fontSize: '14.5px' }}></i>
          <input type="text" placeholder={placeholder} className='pl-2' />
        </div>

        { filterOptionData ?   <div className={`dropdown ${isActive ? 'active' : ''} mx-2 cursor-pointer`} style={{width:'92px'}}>
            <button className="doctor-btn patient-btn-filter mr-3 cursor-pointer"  onClick={() => {
              setIsActive(!isActive)

            }} style={{ height: "36px", minWidth: "100px", backgroundColor:'white' }}>
              {filterOption} <img className="pl-2" src={DownIcon} alt="" />
            </button>

            <div className="dropdown-content border"
              style={{
                display: isActive ? 'block' : 'none',
                width: "97px",

              }}>
              {filterOptionData?.map((item, index) => <div className='old-dropdown-text1 text-center ' key={index} onClick={() => {
                setIsActive(!isActive)
                setFilterOption(item?.text)
              }}>
                <span>{item?.text}</span>
              </div>)}
            </div>
          </div> : null}

        <CSVLink filename={exportFileName} data={csvData}>
          <button disabled={disabled} className='list-header-btn1 ml-2'>
            <i class="fa-solid fa-arrow-down pr-2 pt-1" style={{ color: '#6D7482', fontSize: '14.5px' }}></i>
            Export</button>
        </CSVLink>

        {btnText ? isSuperAdmin ? <Link to={linkbtn}>  <button className='list-header-btn2 ml-2'>
          <i class="fa-solid fa-circle-plus pr-2 pt-1"></i>
          {btnText}
        </button>
        </Link> : null : null}
      </div>
    </div>
  )
}

export default ListHeader