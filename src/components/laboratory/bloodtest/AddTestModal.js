import React from "react";
import { InputNumber, Modal, Switch } from "antd";
import CustomSelect from "./../../common/CustomSelect";
import closeIcon from "../../../assets/images/common/close.svg";
import Dollar from "../../../assets/images/laboratory/bloodtest/dollar.svg";
import "../../../assets/css/laboratory/modal.scss";

const AddTestModal = ({ open, onClose, xrays, title='Add' }) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      className="add-test-modal"
      open={open}
      centered
      closable={false}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={null}
      width={837}
    >
      <div className="modal-content-wrapper">
        <div className="title-header">
          <div className="title">{title} Test</div>
          <img src={closeIcon} onClick={() => handleCancel()} />
        </div>
        <hr style={{ margin: "0px " }} />

        <div class="form-wrapper">
          <form>
            <div class="switch-wrapper">
              <Switch
                className="switch"
                checkedChildren="Active"
                unCheckedChildren="InActive"
                defaultChecked
              />
            </div>
            <div class="form-group full-width">
              <label>Test Name</label>
              <input type="text" />
            </div>

            {xrays ? (
              <div class="two-group">
              
                <div class="form-group">
                  <label>Price</label>
                  <InputNumber
                    className="input-number"
                    addonBefore="$"
                    style={{ width: "100%" }}
                  />
                </div>
                <div class="form-group">
                  <label>Discount Price</label>
                  <InputNumber
                    className="input-number"
                    addonBefore="$"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            ) : (
              <div class="three-group">
                <div class="form-group">
                  <label>Test Panel Section</label>
                  <CustomSelect />
                </div>

                <div class="form-group">
                  <label>Price</label>
                  <InputNumber
                    className="input-number"
                    addonBefore="$"
                    style={{ width: "100%" }}
                  />
                </div>
                <div class="form-group">
                  <label>Discount Price</label>
                  <InputNumber
                    className="input-number"
                    addonBefore="$"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )}

            <div class="form-group full-width">
              <label>Description</label>
              <textarea />
            </div>

            <div className="add-test-button">
              <button type="submit" className="submit-button">
                Add Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTestModal;
