import AddRoleIcon from "../../assets/images/doctor/AddRoleIcon.svg";
import { useState } from "react";
import BreadCrum from "../../atoms/breadcrum/BreadCrum";
import NewPharmacyForm from "../../components/Pharmacy/NewPharmacyForm";
import NewPharnacyRole from "../../components/Pharmacy/NewPharnacyRole";
import { useEffect } from "react";
import { pharmacies } from "../../Data/PharmactData";

const AddPharmacy = ({ Id }) => {
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
          <p className="mb-0 addpatient-heading">Add New Pharmacy</p>
        </div>

        <div className="col-12 my-4">
          <div className="row ">
            <div className="col-lg-12 ">
              <BreadCrum
                firstLink="/pharmacy"
                firstText="PHARMACY"
                secondText={Id ? "UPDATE PHARMACY" : "ADD PHARMACY"}
              />
            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="row  m-0 first-row">
            <div class="col-lg-12 ">
              <div class="add-doc-left-col">
                <NewPharmacyForm
                  handleChange={handleChange}
                  formDataState={formDataState}
                  handleChangeCountry={handleChangeCountry}
                  handleChangeState={handleChangeState}
                  id={Id}
                />
              </div>
            </div>
          </div>

          <div className="row pb-5 mb-lg-5 m-0 second-row">
            {click ? (
              <div
                className="col-12 mb-5 py-4 d-flex align-items-center"
                onClick={() => {
                  setClick(!click);
                }}
              >
                <img
                  className="cursor-pointer"
                  // onClick={handleAddItem}

                  src={AddRoleIcon}
                  alt=""
                />{" "}
                <span
                  // onClick={handleAddItem}
                  className="cursor-pointer add-doc-role pl-3 "
                >
                  Add a Role
                </span>
              </div>
            ) : (
              <div className="col-lg-8 mt-3">
                <NewPharnacyRole
                  click={click}
                  setClick={(data) => {
                    setClick(data);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPharmacy;
