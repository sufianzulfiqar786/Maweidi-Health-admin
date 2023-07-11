import { useState, useRef } from "react";
import camera from "../../../assets/images/common/camera.svg";
import closeIcon from "../../../assets/images/common/close.svg";
import "../../../assets/css/treatmentsponsor/editsponsordatamodal.scss";
import { Modal } from "antd";
import CustomSelect from "../../common/CustomSelect";


const gender = [
    {
      value: "Male",
      value: "Male",
    },
    {
      value: "Female",
      value: "Female",
    },
    {
      value: "Other",
      value: "Other",
    },
  ];

  
const NeedPatientEditModal = ({ open, onClose, onSave }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const closeModal = () => {
    onClose();
  };

  const handleSave = () => {
    onSave();
    onClose();
  };
  return (
    <Modal
      className="edit-sponsor-modal"
      open={open}
      centered
      onCancel={closeModal}
      closable={false}
      destroyOnClose={true}
      footer={null}
      width={1046}
    >
      <div className="modal-content-wrapper">
        {/* <div className="title-header">
          <img src={closeIcon} onClick={() => handleSave()} />
        </div> */}

        <div class="form-wrapper">
          <div className="add-profile">
            <div className="image-uploader">
              <div className="left">
                <div className="image-preview">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    <img src={camera} onClick={handleUploadClick} />
                  )}
                </div>
                <div>Profile Picture</div>
              </div>
              <div className="right">
                <div className="upload-text" onClick={handleUploadClick}>
                  Upload Image
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <form className="edit-sponsor-data-modal">
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="first-name-input">First Name</label>
                <input type="text" id="first-name-input" name="first-name" />
              </div>
              <div class="form-group col-lg-6">
                <label for="last-name-input">Last Name</label>
                <input type="text" id="last-name-input" name="last-name" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="cost-input">Approx. Treatment Cost</label>
                <input type="text" id="cost-input" name="cost" />
              </div>
              <div class="form-group col-lg-6">
                {/* <label>Gender</label>
            <CustomSelect options={gender} /> */}

                <label for="contact-input">Contact No</label>
                <input type="text" id="contact-input" name="contact" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="phone-number-input">Civil ID no</label>
                <input
                  type="text"
                  id="phone-number-input"
                  name="phone-number-input"
                />
              </div>
              <div class="form-group col-lg-6">
                <label>Gender</label>
                <CustomSelect options={gender} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="patient-id-input">Patient ID no </label>
                <input type="text" id="patient-id-input" name="patient-id" />
              </div>
              <div class="form-group col-lg-6">
                <label for="disease-input">Disease </label>
                <input type="text" id="disease-input" name="disease" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-12">
                <label for="Location">Desciption</label>
                <textarea></textarea>
              </div>
            </div>

            <button type="button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NeedPatientEditModal;
