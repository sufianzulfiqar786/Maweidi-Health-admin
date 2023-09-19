import { useState, useRef, useEffect } from "react";
import { Switch } from 'antd';
import camera from "../../../assets/images/common/camera.svg";
import CustomSelect from "../../common/CustomSelect";
import "../../../assets/css/treatmentsponsor/treatmentsponsor.scss";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";
import UploadFile from "../../../molecules/UploadFile/UploadFile";

import { Controller, useForm } from "react-hook-form";
import Phone from "../../../atoms/phone";
import useFetch from "../../../customHook/useFetch";
import usePost from "../../../customHook/usePost";
import useDeleteData from "../../../customHook/useDelete";
import { CustomToast } from "../../../atoms/toastMessage";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../../atoms/buttonLoader";

const AddNeedyPatientForm = ({Id}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [needyPatient, setNeedyPatient] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const fileInputRef = useRef(null);
  const { data, isLoading, error, postData } = usePost();
  const customData = useDeleteData();
  const navigate = useNavigate();

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: hospitalData } = useFetch(
    process.env.REACT_APP_GET_HOSPITAL_DATA
  );

  console.log("hospitalData", hospitalData)

  useEffect(() => {
    if (hospitalData?.success) {
      setHospitals(
        hospitalData?.data?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      );
    }
  }, [hospitalData]);

  console.log("hospitals", hospitals)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setNeedyPatient((pre) => ({ ...pre, 'profile_pic': file }))
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const gender = [
    {
      label: "Male",
      value: 1,
    },
    {
      label: "Female",
      value: 3,
    },
    {
      label: "Other",
      value: 2,
    },
  ]

  console.log('needyPatient', needyPatient)

  const handleNeedyPatientSubmit = () => {
    console.log('firstwww')

    const formData = new FormData();
    for (const key in needyPatient) {
      if (key === "specialties" && Array.isArray(needyPatient[key])) {
        needyPatient[key].forEach((value) => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, needyPatient[key]);
      }
    }

    postData(Id
      ? `${process.env.REACT_APP_UPDATE_NEEDY_PATIENT}/${Id}`
      :`${process.env.REACT_APP_ADD_NEEDY_PATIENT}`,
      formData,
      (res) => {
        console.log("ressss", res)
        // setAddRole({...addRole, 'join_id':res?.data?.id})
        if (res?.success === true) {
          CustomToast({
            type: "success",
            message: `Needy patient ${!Id ? 'added' : 'edited'} successfully`,
          })
          setValue('')
          setNeedyPatient({})
          reset()
          navigate("/needy-patients");
        }

      }
    );

  }

  useEffect(() => {
    if (Id) {
      customData.deleteData(
        `${process.env.REACT_APP_GET_NEEDY_PATIENT_BY_ID}/${Id}`,
        (val) => {
          console.log("value", val?.data);
          setPreviewImage(val?.data)
       setNeedyPatient(val?.data)
       Object.entries(val?.data).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
        }
      )
    }
  }, [Id]);

  console.log("previewImage?.profile_pic", previewImage)

  return (
    <div className="add-needy-patient-form-wrapper">
      <div className="add-profile">
        <div className="image-uploader">
          <div className="left">
            <div className="image-preview">
              {previewImage ? (
                <img
                src={!previewImage?.profile_pic =='' ? `${process.env.REACT_APP_IMAGE_URL}/${previewImage?.profile_pic}` : previewImage?.profile_pic =='' ?  camera : previewImage }
                  alt="Preview"
                  width= {previewImage?.profile_pic =='' ? `50`: `80`}
                  height={previewImage?.profile_pic =='' ? `50`: `80`}
                  style={{ objectFit: previewImage?.profile_pic =='' ?  '' : "cover", borderRadius: "50%" }}
                  onClick={handleUploadClick}
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
      <form className="">
        <div className="add-new-patient-form">
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label for="first-name-input">First Name<span className="text-danger">*</span></label>
              {/* <input type="text" id="first-name-input" name="first-name" /> */}
              <Controller
                name="first_name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      name="first_name"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'first_name': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.first_name && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="last-name-input">Last Name<span className="text-danger">*</span></label>
              {/* <input type="text" id="last-name-input" name="last-name" /> */}
              <Controller
                name="last_name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      name="last_name"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'last_name': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.last_name && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label for="cost-input">Approx. Treatment Cost</label>
              {/* <input type="text" id="cost-input" name="cost" /> */}
              <Controller
                name="approx_treatment_cost"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      style={{height:"33px"}}
                      name="approx_treatment_cost"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'approx_treatment_cost': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.approx_treatment_cost && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div class="form-group col-lg-6">
              {/* <label>Gender</label>
            <CustomSelect options={gender} /> */}

              {/* <label for="contact-input">Contact No</label> */}
              {/* <input type="text" id="contact-input" name="contact" /> */}
              <Controller
                name="contact"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <Phone
                      name="contact"
                      field={field}
                      value={field.value}
                      handleChange={(e) => {
                        field.onChange(e);
                        setNeedyPatient((pre) => ({ ...pre, 'contact': e.target.value }))
                      }}
                    />
                    {errors.contact && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label for="phone-number-input">Civil ID no<span className="text-danger">*</span></label>
              {/* <input
                type="text"
                id="phone-number-input"
                name="phone-number-input"
              /> */}
              <Controller
                name="civil_id"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="number"
                      name="civil_id"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'civil_id': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.civil_id && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div class="form-group col-lg-6">
              <label>Gender</label>
              {/* <CustomSelect options={gender} /> */}
              <Controller
                name="gender"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <CustomDropDown
                      handleChangeSelect={(value, name) => {
                        field.onChange(value);
                        console.log("firstgender", value)
                        setNeedyPatient(pre => ({ ...pre, 'gender': value }))
                      }}
                      option={gender}
                      field={field}
                      value={field.value || ''}
                      onBlur={field.onBlur}
                    />

                    {errors.gender && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label for="patient-id-input">Patient ID no<span className="text-danger">*</span> </label>
              {/* <input type="text" id="patient-id-input" name="patient-id" /> */}
              <Controller
                name="patient_id"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="number"
                      name="patient_id"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'patient_id': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.patient_id && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="disease-input">Disease<span className="text-danger">*</span> </label>
              {/* <input type="text" id="disease-input" name="disease" /> */}
              <Controller
                name="disease"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      name="disease"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'disease': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.disease && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6">
              <label for="patient-id-input">Hospital Name<span className="text-danger">*</span></label>
              {/* <CustomDropDown /> */}
              <Controller
                name="hospital_id"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <CustomDropDown
                      handleChangeSelect={(value, name) => {
                        field.onChange(value);
                        setNeedyPatient(pre => ({ ...pre, 'hospital_id': value }))
                      }}
                      option={hospitals}
                      field={field}
                      value={field.value}
                      onBlur={field.onBlur}
                    />

                    {errors.hospital_id && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="patient-id-input">Medical History<span className="text-danger"></span></label>
              <UploadFile
                formDataState={needyPatient}
                setFormDataState={setNeedyPatient}
                value={needyPatient?.certificate || ""}
                name='medical_history'
              />
            </div>

          </div>

          <div class="form-row">
            <div class="form-group col-lg-12">
              <label for="Location">Desciption</label>
              {/* <textarea style={{ height: "80px" }}></textarea> */}

              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <>
                    <textarea
                      type="text"
                      name="description"
                      style={{ height: "150px" }}
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setNeedyPatient((pre) => ({ ...pre, 'description': e.target.value }))
                        // handleChangeHospital(e);
                      }}
                    />

                    {errors.description && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>


        <div className="privacy-selection">
          <div className="private-container"  >
            {/* <div className="d-flex align-items-center privacy-children">
              <div className="mr-3">Hide Identity</div>
              <Switch onChange={(e) => {
                console.log('firsteee', e)
                setNeedyPatient((pre) => ({ ...pre, 'hide_identity': e }))
              }} />
            </div> */}

          </div>
        </div>
        <div className="add-new-patient-form">
          <button type="button" disabled={isLoading} className="add-patient" onClick={handleSubmit(handleNeedyPatientSubmit)}>
          {!isLoading ? <span>{Id ? 'Edit Needy Patient' : 'Add NeedyPatient'}</span> : <div className="pb-2">
            <ButtonLoader />
          </div>}
          </button>
        </div>
      </form>

    </div>
  );
};

export default AddNeedyPatientForm;
