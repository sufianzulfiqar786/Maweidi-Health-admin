
import { useState } from "react";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import NewPharmacyForm from "../../components/Pharmacy/NewPharmacyForm";
import NewPharnacyRole from "../../components/Pharmacy/NewPharnacyRole";
import { useEffect } from "react";
import { pharmacies } from "../../Data/PharmactData";
import NewLaboratoryForm from "../../components/laboratory/NewLaboratoryForm";
import NewXrayForm from "../../components/laboratory/NewXrayForm";

const AddXray = ({ Id }) => {
  const [click, setClick] = useState(true);
  const [formDataState, setFormDataState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };
  const handleChangeCountry = (value) => {
    setFormDataState({ ...formDataState, country: value });
  };
  const handleChangeState = (value) => {
    setFormDataState({ ...formDataState, state: value });
  };
  //edit pharmacy
  useEffect(() => {
    if (Id) {
      const edit = pharmacies.find((item) => item.id === Number(Id));
      setFormDataState(edit);
    } else {
      setFormDataState({});
    }
  }, [Id]);

  return (
    <>
      <div className="row px-3  pt-4 addpatient-tab">
        <div className="col-12">
          <p className="mb-0 addpatient-heading">Add X RAY</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-lg-12 ">
            <BreadCrum
                firstLink="/xray/list"
                firstText="X RAY"
                secondText="ADD X RAY"
              />
            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="row  m-0 first-row">
            <div class="col-lg-12 ">
              <div class="add-doc-left-col">
                <NewXrayForm
                  handleChange={handleChange}
                  formDataState={formDataState}
                  handleChangeCountry={handleChangeCountry}
                  handleChangeState={handleChangeState}
                  id={Id}
                  click={click}
                  setClick={setClick}
                  lastTextBoxTitle="About X Ray"
                  submitButtonText="Add X Ray"
                  submitUpdateText="Update X Ray"
                  apiEndpoint={process.env.REACT_APP_ADD_LABORATORY_DATA}
                  updateApiEndPoint={
                    process.env.REACT_APP_UPDATE_LABORATORY_DATA
                  }
                  timeGetApi={process.env.REACT_APP_GET_LABORATORY_SLOT}
                  getByIdAPI={process.env.REACT_APP_GET_LABORATORY_DATA_ID}
                  timeSetApi={process.env.REACT_APP_SET_LABORATORY_SLOT}
                  entityType="laboratory"
                  customToastMessage="Laboratory Added Successfully"
                  updateToastMessage="Laboratory Details Updated Successfully!"
                />
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </>
  );
};

export default AddXray;
