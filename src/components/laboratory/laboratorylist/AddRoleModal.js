import closeIcon from "../../../assets/images/common/close.svg";
import "../../../assets/css/laboratory/modal.scss";
import { Modal } from "antd";
import CustomSelect from "../../common/CustomSelect";
const AddRoleModal = ({ open, onClose }) => {
  const closeModal = () => {
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="add-role-modal"
      open={open}
      centered
      onCancel={closeModal}
      closable={false}
      destroyOnClose={true}
      footer={null}
      width={681}
    >
      <div className="modal-content-wrapper">
        <div className="title-header">
          <div className="title">Add a Role</div>
          <img src={closeIcon} onClick={() => handleCancel()} />
        </div>
        <hr style={{ margin: "0px " }} />
        <div class="form-wrapper">
          <form>
            <div class="two-group">
              <div class="form-group">
                <label>Role Type</label>
                <CustomSelect size="large" style={{ width: "100%" }} />
              </div>
              <div class="form-group">
                <label>Lab / Hospital</label>
                <CustomSelect size="large" style={{ width: "100%" }} />
              </div>
            </div>

            <div class="form-group full-width">
              <label>Name</label>
              <input type="text" />
            </div>

            <div class="form-group full-width">
              <label>Email</label>
              <input type="email" />
            </div>

            <div class="form-group full-width">
              <label>City</label>
              <input type="text" />
            </div>

            <div class="two-group">
              <div class="form-group">
                <label>Contact</label>
                <input type="text" />
              </div>
              <div class="form-group">
                <label>State</label>
                <CustomSelect size="large" style={{ width: "100%" }} />
              </div>
            </div>

            <button type="submit" className="submit-button full-width">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddRoleModal;
