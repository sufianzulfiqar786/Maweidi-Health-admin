import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Rate, Select, Slider, DatePicker } from "antd";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";

import CustomDropDown from '../../atoms/CustomDropDown/Index';
import Time from '../../atoms/Time/Time';
import UploadFile from '../../molecules/UploadFile/UploadFile';
import { useState } from 'react';

const AddBannerPromo = () => {
    const [formDataState, setFormDataState] = useState('')
    return (
        <div className="row  px-2 pt-4 mb-5 pb-5">
            <div className="col-12  ">
                <p className="mb-0 dashboard-com-top-text">Banner and Promo</p>
Banner tab and promo tab are different in sidebar, crud also different, 
extra add promo location in promo tab, not in banner.
            </div>
            <div className="col-12 mt-lg-0 mt-2 pt-4">
                <p className="mb-0 doctor-header-top-text pt-1">
                    <Link className="doc-link " to="/">
                        DASHBOARD
                    </Link>

                    <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                    <span style={{ color: "#4FA6D1" }}>Banner and Promo</span>{" "}
                </p>
            </div>
            <div className="col-12 ">

                <div className="row px-3 mt-4">
                    <div className="col-lg-6 doc-setting-input">
                        <p className=" doc-add-filter-text">Title</p>

                        <input type="text" />
                    </div>
                    <div className="col-lg-6 doc-setting-input">
                        <p className=" doc-add-filter-text">Dsicount %</p>

                        <input type="text" />
                    </div>


                </div>

                <div className="row px-3 mt-4">
                    <div className="col-lg-4 pr-lg-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Category Type</p>
                        <CustomDropDown option={
                            [
                                { label: "Banner" },
                                { label: "Sales Promotion​" },

                            ]

                        } />
                        {/* <Select
                                        // defaultValue="lucy"
                                        style={{
                                            width: "100%",
                                        }}
                                        onChange={() => { }}
                                        options={[
                                            {
                                                label: "Banner ",
                                            },
                                            {
                                                label: "Sales Promotion​",
                                            },
                                        ]}
                                    /> */}
                    </div>

                    <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input">
                        <p className=" doc-add-filter-text ">Status</p>

                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: "100%",
                            }}
                            onChange={() => { }}
                            options={[
                                {
                                    label: "Enable",
                                },
                                {
                                    label: "Disable",
                                }
                            ]}
                        />
                    </div>

                    <div className="col-lg-4 pt-lg-0 pt-4 pl-lg-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Banner Placement</p>
                        <CustomDropDown
                            option={
                                [
                                    {
                                        label: "Main Home",
                                        value: 1
                                    },
                                    {
                                        label: "Doctor List​​",
                                        value: 2
                                    },
                                    {
                                        label: "Hospital List​",
                                        value: 3
                                    },
                                    {
                                        label: "Pharmacy List​",
                                        value: 4
                                    },
                                    {
                                        label: "Medical Equipment List​",
                                        value: 5
                                    },
                                    {
                                        label: "Laboratory List​",
                                        value: 6
                                    },
                                    {
                                        label: "X-ray List​",
                                        value: 7
                                    },
                                ]}
                        />
                        {/* <Select
                                        // defaultValue="lucy"
                                        style={{
                                            width: "100%",
                                        }}
                                        onChange={() => { }}
                                        options={[
                                            {
                                                label: "Laboratory Home",
                                            },
                                            {
                                                label: "Pharmacy Listing",
                                            },
                                            {
                                                label: "Main Home",
                                            }
                                        ]}
                                    /> */}
                    </div>


                </div>

                <div className="row px-3 mt-4">
                    <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input pr-0">
                        <p className=" doc-add-filter-text">Promo Type</p>
                        <CustomDropDown />
                    </div>
                    <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input " >
                        <p className=" doc-add-filter-text ">Start Date</p>
                        <div className="d-flex justify-content-between align-items-center datapicker-border" style={{ backgroundColor: 'white' }}>

                            <DatePicker
                                className=" rounded-0"
                                // placeholder={"start"}
                                format={"DD/MM/YYYY"}
                                style={{ border: "0", outline: "none", width: '100%' }}
                            />

                            <img className="pr-1" src={CalenderIcon} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input pl-0">
                        <p className=" doc-add-filter-text">Start Time</p>

                        <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                            <Time />
                            <img className='pr-1' src={ClockIcon} alt="" />
                        </div>
                    </div>


                </div>

                {/* pl-lg-0 */}
                <div className="row px-3 mt-4">
                    <div className="col-lg-4 pt-lg-0 pt-4 doc-setting-input pr-0">
                        <p className=" doc-add-filter-text ">End Date</p>
                        <div className="d-flex justify-content-between align-items-center datapicker-border" style={{ backgroundColor: 'white' }}>

                            <DatePicker
                                className=" rounded-0"
                                // placeholder={"start"}
                                format={"DD/MM/YYYY"}
                                style={{ border: "0", outline: "none", width: '100%' }}
                            />

                            <img className="pr-1" src={CalenderIcon} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input">
                        <p className=" doc-add-filter-text">End Time</p>

                        <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                            <Time />
                            <img className='pr-1' src={ClockIcon} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 pt-lg-0 pt-4  doc-setting-input pl-0">
                        <p className=" doc-add-filter-text">Upload Image</p>

                        <UploadFile setFormDataState={setFormDataState} formDataState={formDataState} />
                        {/* {formDataState} */}
                    </div>

                </div>


                <div className="row px-3 mt-4">
                    <div className="col-lg-12 doc-setting-input">
                        <p className=" doc-add-filter-text">Link</p>

                        <input type="text" />
                    </div>


                </div>
                <div className="row px-3 mt-4">
                    <div className="col-lg-12 pr-lg-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Description </p>

                        <textarea id="w3review" name="w3review" rows="4" style={{ width: "98%" }} />
                    </div>

                    <div className="col-12 pt-3 pb-2 d-flex justify-content-center mt-3">
                        <button className="apply-filter submit-save-banner">Add Banner and Promo</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AddBannerPromo