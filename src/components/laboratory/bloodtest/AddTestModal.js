import React, { useState } from "react";
import { InputNumber, Modal, Switch } from "antd";
import CustomSelect from "./../../common/CustomSelect";
import closeIcon from "../../../assets/images/common/close.svg";
import Dollar from "../../../assets/images/laboratory/bloodtest/dollar.svg";
import "../../../assets/css/laboratory/modal.scss";
import useFetch from "../../../customHook/useFetch";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";
import usePost from "../../../customHook/usePost";
import { CustomToast } from "../../../atoms/toastMessage";
import { useEffect } from "react";
import useDeleteData from "../../../customHook/useDelete";

const AddTestModal = ({ open, onClose, xrays, title = 'Add', Id, setModalNav }) => {
  const handleCancel = () => {
    onClose();
  };
  console.log("Idasd", Id)
  const [addTest, setAddTest] = useState({})

  console.log('addtestLab', addTest)

  const addTestCategory = useFetch(
    `${process.env.REACT_APP_GET_BLOOD_TEST_CATEGORIES}?is_blood_test=${1}`
  );

  const addTestCategoryLab = useFetch(
    `${process.env.REACT_APP_GET_LABORATORY_DATA}?is_laboratory=${1}`
  );

  console.log('addTestCategoryLab', addTestCategoryLab)
  console.log('addTestCategory', addTestCategory?.data?.data)

  const addTestCategoryFilter = addTestCategory?.data?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const addTestLabFilter = addTestCategoryLab?.data?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  console.log("addTestLabFilter", addTestLabFilter)

  const deleteProductData = useDeleteData();
  const deleteData = deleteProductData.deleteData

  const getDataById = (Id) => {

    deleteData(`${process.env.REACT_APP_GET_BY_ID_BLOOD_TEST}/${Id}`, (response) => {
      console.log("firresponsest", response?.data)
      setAddTest(response?.data)
    });

  }

  useEffect(() => {

    if (Id) {
      getDataById(Id)
    }

  }, [Id])

  useEffect(() => {
    if (!open) {
setAddTest({})
    }
  }, [open])


  const { data, isLoading, error, postData } = usePost();

  const handleSubmit = () => {
    console.log('hello')



    if (
      addTest.title === '' ||
      addTest.price === '' ||
      addTest.discount_price === '' ||
      addTest.laboratory_id === '' ||
      addTest.blood_test_category_id === ''
    ) {
      CustomToast({
        type: "error",
        message: `Please fill in all fields before submitting.`,
      })
    } else {
      postData(
        Id
          ? `${process.env.REACT_APP_UPDATE_BLOOD_TEST}/${Id}`
          : `${process.env.REACT_APP_ADD_BLOOD_TEST}`,
        addTest,
        (res) => {
          console.log("ressss", res?.data?.id)
          // setAddRole({...addRole, 'join_id':res?.data?.id})
          if (res?.success === true) {


            CustomToast({
                type: "success",
                message: `Data Added`,
            });
            handleCancel()
            setModalNav(res?.data)
        }

        }
      );
    }

  }

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

          <div class="switch-wrapper">
            {/* <Switch
                className="switch"
                checkedChildren="Active"
                unCheckedChildren="InActive"
                defaultChecked
              /> */}
          </div>

          <div className="row ">



            <div className="col-lg-6 pl-3 pr-2">
              <div class="form-group full-width">
                <label>Test Name<span className="text-danger">*</span></label>
                <input type="text"
                  name="title" value={addTest?.title}
                  onChange={(e) => {
                    setAddTest({ ...addTest, 'title': e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 pr-3 pl-2">
              <div class="form-group">
                <label>Select Laboratory<span className="text-danger">*</span> </label>

                <CustomDropDown
                  defaultValue="Select"
                  style={{
                    width: "100%",
                  }}
                  name="laboratory_id"
                  value={addTest?.laboratory_id || ""}
                  handleChangeSelect={(value, name) => {
                    setAddTest({ ...addTest, 'laboratory_id': value })
                  }}
                  option={addTestLabFilter}
                />

              </div>
            </div>

          </div>


          <div class="three-group">
            <div class="form-group">
              <label>Test Panel Section<span className="text-danger">*</span></label>

              <CustomDropDown
                defaultValue="Select"
                style={{
                  width: "100%",
                }}
                name="blood_test_category_id"
                value={addTest?.blood_test_category_id || ""}
                handleChangeSelect={(value, name) => {
                  setAddTest({ ...addTest, 'blood_test_category_id': value })
                }}
                option={addTestCategoryFilter}
              />

            </div>

            <div class="form-group">
              <label>Price<span className="text-danger">*</span></label>
              <input type="number"
                name="price" value={addTest?.price}
                onChange={(e) => {
                  setAddTest({ ...addTest, 'price': e.target.value })
                }}
              />
            </div>

            <div class="form-group">
              <label>Discount Price<span className="text-danger">*</span></label>
              <input type="number"
                name="discount_price" value={addTest?.discount_price}
                onChange={(e) => {
                  setAddTest({ ...addTest, 'discount_price': e.target.value })
                }}
              />
            </div>
          </div>


          <div class="form-group full-width">
            <label>Description</label>
            <textarea
              name="description" value={addTest?.description}
              onChange={(e) => {
                setAddTest({ ...addTest, 'description': e.target.value })
              }}
            />
          </div>

          <div className="add-test-button">
            <button type="submit" className="submit-button" onClick={handleSubmit}
              disabled={addTest.title === '' ||
                addTest.price === '' ||
                addTest.discount_price === '' ||
                addTest.laboratory_id === '' ||
                addTest.blood_test_category_id === ''}
              style={{
                opacity: addTest.title === '' ||
                  addTest.price === '' ||
                  addTest.discount_price === '' ||
                  addTest.laboratory_id === '' ||
                  addTest.blood_test_category_id === '' ? 0.7 : ''
              }}
            >
              Add Test
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default AddTestModal;
