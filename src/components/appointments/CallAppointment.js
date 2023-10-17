import React from 'react'
import './CallAppointment.scss'
import { Link, useLocation } from 'react-router-dom';

// svg
import Chevron from "../../assets/images/common/chevron-right.svg";
import mute_mic from '../../assets/images/call/mute_mic.svg'
import phone from '../../assets/images/call/phone.svg'
import camera from '../../assets/images/call/camera.svg'
import { useState } from 'react';
import { useEffect } from 'react';

const CallAppointment = () => {

    const [videoState, setVideoState] = useState(0)
    const location = useLocation();
    console.log("location", location)

    useEffect(() => {
        setTimeout(() => {
            setVideoState(1)
        }, 5000);
    }, [])

    return (
        <>
            <div className="row pl-3 pr-2 pt-4 appointment-tab ">
                <div className="col-12">
                    <p className="mb-0 appointment-heading">Appointment</p>
                </div>
                <div className="col-12  my-4">
                    <p className="appointment-breadcrumb">
                        <span> DASHBOARD </span>
                        <img src={Chevron} />
                        <span className="current-tab"> APPOINTMENT CALL</span>
                    </p>
                </div>
                {videoState === 0 ? <div className="col-12 video-bottom-margin" style={{ height: "700px" }}>
                    <div className='call-img'>
                        <div className='call-img-body'>
                            <img className='call-img-body-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                            <div className='call-img-body1'>
                                <div className=''>
                                    <p className='mb-0 pb-0 text-light text-center call-img-body-img-text1'>{location?.state?.patientName}</p>
                                    <p className='mb-2 pb-5 text-light text-center call-img-body-img-text2'>Connecting...</p>
                                    <div className='call-img-body-call'>
                                        <img className='call-img-body-call-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                                    </div>
                                    <div class="circle"></div>
                                    <div class="circle1"></div>
                                    <div class="circle2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='call-img-footer'>
                        <div className="row">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4 mx-2 d-flex align-items-center justify-content-between">
                                <div className='mic-call px-2 cursor-pointer'>
                                    <img className='' src={mute_mic} alt="" />
                                </div>

                                <div className='call-icon cursor-pointer' onClick={() => {
                                    setVideoState(2)
                                }}>
                                    <i class="fa fa-phone text-light " aria-hidden="true"></i>
                                </div>

                                <div className='video-call px-2 cursor-pointer'>
                                    <img className='' src={camera} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-4"></div>
                        </div>
                    </div>
                </div>

                    : videoState === 1 ?
                        <div className="col-12 video-bottom-margin" style={{ height: "700px" }}>
                            <div className='call-img'>
                                <div className='call-img-body-attend'>
                                    <img className='call-img-body-attend-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                                    <div className='call-img-body-attend2' style={{ zIndex: '1' }}>
                                    </div>
                                    <div className='call-img-body-attend1' style={{ zIndex: '10' }}>
                                        <div className=''>
                                            <p className='mb-0 pb-0 text-light text-start call-img-body-attend-img-text1'>{location?.state?.patientName}</p>
                                            <p className='mb-0 pb-0 text-light text-start call-img-body-attend-img-text2'>Patient</p>
                                            <p className='mb-2 pb-5 text-light text-start call-img-body-attend-img-text2'>25:00</p>
                                            {/* <div className='call-img-body-call'>
                                        <img className='call-img-body-call-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                                    </div>
                                    <div class="circle"></div>
                                    <div class="circle1"></div>
                                    <div class="circle2"></div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='call-img-footer'>
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4 mx-2 d-flex align-items-center justify-content-between">
                                        <div className='mic-call px-2 cursor-pointer'>
                                            <img className='' src={mute_mic} alt="" />
                                        </div>

                                        <div className='call-icon cursor-pointer' onClick={() => {
                                            setVideoState(2)
                                        }}>
                                            <i class="fa fa-phone text-light " aria-hidden="true"></i>
                                        </div>

                                        <div className='video-call px-2 cursor-pointer'>
                                            <img className='' src={camera} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                        </div>

                        : videoState === 2 ?
                            <div className="col-12 video-bottom-margin" style={{ height: "700px" }}>
                                <div className='call-img'>
                                    <div className='call-img-body'>
                                        <img className='call-img-body-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                                        <div className='call-img-body1'>
                                            <div className=''>
                                                <p className='mb-0 pb-0 text-light text-center call-img-body-img-text1'>Call End</p>
                                                <p className='mb-2 pb-5 text-light text-center call-img-body-img-text2'>15:23</p>
                                                <div className='call-img-body-call'>
                                                    <img className='call-img-body-call-img' src={process.env.REACT_APP_IMAGE_URL + location?.state?.patientPic} alt="" />
                                                </div>
                                                <div class="circle"></div>
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='call-img-footer'>
                                    <div className="row">
                                        <div className="col-lg-4"></div>
                                        {!videoState === 2 ? <div className="col-lg-4 mx-2 d-flex align-items-center justify-content-between">
                                            <div className='mic-call px-2 cursor-pointer'>
                                                <img className='' src={mute_mic} alt="" />
                                            </div>

                                            <div className='call-icon cursor-pointer' >
                                                <i class="fa fa-phone text-light " aria-hidden="true"></i>
                                            </div>


                                            <div className='video-call px-2 cursor-pointer'>
                                                <img className='' src={camera} alt="" />
                                            </div>
                                        </div>
                                            : <div className='col-4 d-flex align-items-center justify-content-center mt-2'>
                                               <Link to='/appointment'>
                                               <div className='call-icon-end'>
                                                    <span>Return to home screen</span>
                                                </div>
                                               </Link>
                                            </div> }
                                        <div className="col-lg-4"></div>
                                    </div>
                                </div>
                            </div>
                            : null
                }
            </div>
        </>
    )
}

export default CallAppointment