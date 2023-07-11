import React from 'react'
import CopyRightIcon from '../../assets/images/dashboard/CopyRightIcon.svg'
import HeartIcon from '../../assets/images/dashboard/HeartIcon.svg'

const Footer = () => {
    return (
        <>

            <div className='site-footer d-flex justify-content-center align-items-center' style={{ width: "100%" }}>

                <span>
                    2022   <img style={{fill: "#FF0000"}} className='pb-1' src={CopyRightIcon} alt="" />    Maweidi. Design with   <img className='pb-1' src={HeartIcon} alt="" />
                </span>

            </div>

        </>
    )
}

export default Footer