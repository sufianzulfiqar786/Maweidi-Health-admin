import closeIcon from "../../../assets/images/common/close.svg";
import "../../../assets/css/laboratory/modal.scss";
import { Modal } from "antd";
import CustomSelect from "../../common/CustomSelect";

const AddLaboratoryModal = ({ open, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="add-lab-modal"
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
          <div className="title">Add a Laboratory</div>
          <img src={closeIcon} onClick={() => handleCancel()} />
        </div>
        <hr style={{ margin: "0px " }} />
        <div class="form-wrapper">
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
              Register
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddLaboratoryModal;
