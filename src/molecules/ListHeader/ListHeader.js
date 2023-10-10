import React from 'react'
import Searchbar from '../../components/common/Searchbar'
import BreadCrum from '../../atoms/breadcrum/BreadCrum'
import { Link } from 'react-router-dom'
import { CSVLink, CSVDownload } from "react-csv";
import "../../assets/css/blooddonation.scss";

const ListHeader = ({mainHeading , placeholder, btnText, linkBreadCrum, blinkBreadCrumText, linkbtn, csvData, disabled, exportFileName, blinkBreadCrumText1 }) => {
  
  const role =JSON.parse(localStorage.getItem("userRoles"))
  const isSuperAdmin = Object.keys(role).length === 0 
  
  return (
    <div className="row mb-1">
      <div className="col-12 mb-2 blooddonation-breadcrumb" style={{fontSize:'14px', color:'#202020'}}>
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

         <CSVLink filename={exportFileName} data={csvData}>
          <button disabled={disabled} className='list-header-btn1 ml-2'>
          <i class="fa-solid fa-arrow-down pr-2 pt-1" style={{ color: '#6D7482', fontSize: '14.5px' }}></i>
          Export</button>
          </CSVLink> 

          { btnText ?  isSuperAdmin ?  <Link to={linkbtn}>  <button className='list-header-btn2 ml-2'>
          <i class="fa-solid fa-circle-plus pr-2 pt-1"></i>
          {btnText}
        </button>
        </Link> : null : null }
      </div>
    </div>
  )
}

export default ListHeader