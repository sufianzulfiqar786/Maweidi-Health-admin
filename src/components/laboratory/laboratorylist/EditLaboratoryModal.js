import { useState, useRef } from "react";
import camera from "../../../assets/images/common/camera.svg";
import closeIcon from "../../../assets/images/common/close.svg";
import "../../../assets/css/laboratory/modal.scss";
import { Modal } from "antd";
import CustomSelect from "../../common/CustomSelect";

const EditLaboratoryModal = ({ open, onClose, onSave }) => {
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
      className="edit-role-modal"
      open={open}
      centered
      onCancel={closeModal}
      closable={false}
      destroyOnClose={true}
      footer={null}
      width={1046}
    >
      <div className="modal-content-wrapper">
        <div className="title-header">
          <div className="title">Edit a Laboratory</div>
          <img src={closeIcon} onClick={() => handleSave()} />
        </div>
        <hr style={{ margin: "0px " }} />
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
          <form>
            <div class="form-group full-width">
              <label>Name</label>
              <input type="text" />
            </div>

            <div class="form-group full-width">
              <label>Phone No</label>
              <input type="text" />
            </div>

            <div class="form-group full-width">
              <label>Email (Optional)</label>
              <input type="email" />
            </div>

            <div class="form-group full-width">
              <label>Address</label>
              <input type="text" />
            </div>

            <div class="three-group">
              <div class="form-group">
                <label>Country</label>
                <CustomSelect />
              </div>
              <div class="form-group">
                <label>State </label>
                <CustomSelect />
              </div>
              <div class="form-group">
                <label>Zip</label>
                <input type="number" />
              </div>
            </div>

            <button type="submit" className="submit-button full-width">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditLaboratoryModal;
