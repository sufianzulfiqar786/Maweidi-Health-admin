import React, { useRef, useState } from 'react'

// img svg
import AddDocUploadImgeIcon from "../../assets/images/doctor/AddDocUploadImgeIcon.svg";

const UploadFile = ({setFormDataState, formDataState}) => {

    const [infoData, setInfoData] = useState("");
    const inputCertiRef = useRef();

    const handleCertificatesClick = () => {
        inputCertiRef.current.click();
    };

    const handleCertificatesUpload = (event) => {
        const file = event.target.files[0].name;
        setInfoData(file);
        setFormDataState({...formDataState, 'certificates': event.target.files[0]})
    };

    return (
        <>
            <div className="doc-setting-input-certificates d-flex justify-content-end align-items-center">
                <div className=" pr-2 d-flex justify-content-end align-items-center">
                    <img
                        className="cursor-pointer"
                        src={AddDocUploadImgeIcon}
                        onClick={handleCertificatesClick}
                        alt=""
                    />

                    <input
                        type="file"
                        ref={inputCertiRef}
                        onChange={handleCertificatesUpload}
                        style={{ display: "none" }}
                    />
                </div>
            </div>
            {infoData && (
                <span className="info-message">{infoData}</span>
            )}
        </>
    )
}

export default UploadFile