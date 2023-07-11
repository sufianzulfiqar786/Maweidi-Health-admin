import React from "react";
import { Modal } from "antd";
import "../../assets/css/common/common.scss";


const CheckPateintModal = ({ open, onClose }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="check-patient-modal"
      open={open}
      onCancel={handleCancel}
      centered
      closable={false}
      destroyOnClose={true}
      footer={null}
      zIndex={999}
    >
      <div className="modal-content-wrapper">
        <div className="patient-details">
          <div className="info">Please Check if the patient is added or not</div>
          <div className="key">KWD ID</div>
          <input />
        </div>
        <button onClick={handleCancel} >
          Add Patient
        </button>
      </div>
    </Modal>
  );
};

export default CheckPateintModal;
