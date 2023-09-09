import { useState, useRef, useEffect } from "react";
import camera from "../../../assets/images/common/camera.svg";
import CustomSelect from "../../common/CustomSelect";
import "../../../assets/css/patients/addpatients/addnewpatientform.scss";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
import Location from "../../../atoms/Location/Location";
import { optionHostpital } from "../../../Data/DoctorData";
import CustomDropDown from "../../../atoms/CustomDropDown/Index";
import GoogleMap from "../../common/GoogleMap";
import { Controller, useForm } from "react-hook-form";
import useFetch from "../../../customHook/useFetch";
import Phone from "../../../atoms/phone";
import usePost from "../../../customHook/usePost";
import ImageUploader from "../../../atoms/uploadProfile/UploadProfile";
import ButtonLoader from "../../../atoms/buttonLoader";
import { CustomToast } from "../../../atoms/toastMessage";
import { useNavigate } from "react-router-dom";
import useDeleteData from "../../../customHook/useDelete";
import moment from "moment";

const AddNewPatient = ({ Id }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [dropdownValueChange, setDropdownValueChange] =
    useState("Adan Hospital");
  const [showMap, setShowMap] = useState(false);
  const [locationProp, setLocationProp] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, error, postData } = usePost();

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: hospitalData } = useFetch(
    process.env.REACT_APP_GET_HOSPITAL_DATA
  );

  const handleHospitalChange = (value, name) => {
    console.log("firstasd", value, name)

  };

  console.log("hospitalData", hospitalData)

  useEffect(() => {
    if (hospitalData?.success) {
      setHospitals(
        hospitalData?.data?.data?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      );
    }
  }, [hospitalData]);



  const deleteProductData = useDeleteData();
  const deleteData = deleteProductData.deleteData
  console.log("firstId", Id)

  useEffect(() => {
    deleteData(`get_patient_by_id/${Id}`, (response) => {
      console.log("firresponsest", response)
      setPreviewImage(response?.data)
      setPatientData(response?.data)
      setPatientData((pre=>({...pre, ...response?.data?.user})))
      // setPatientData((pre=>({...pre, 'first_name':response?.data?.user.name})))
      // setPatientData((pre=>({...pre, 'last_name':response?.data?.user.name})))
      setValue( 'customer_email', response?.data?.user?.email)
      // setValue( 'first_name', response?.data?.user?.name)
      // setValue( 'last_name', response?.data?.user?.name)
      Object.entries(response?.data?.user).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
      Object.entries(response?.data).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
    });
  }, [Id])

  console.log("PatientData", patientData)

  const onSubmit = () => {
    console.log("'asdasd'")

    const formData = new FormData();
    for (const key in patientData) {
      if (key === "specialties" && Array.isArray(patientData[key])) {
        patientData[key].forEach((value) => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, patientData[key]);
      }
    }


    // alert('asdf')
    postData(Id
      ? `${process.env.REACT_APP_UPDATE_PATIENT}/${Id}`
      :`${process.env.REACT_APP_ADD_PATIENT}`,
      formData,
      (res) => {
        console.log("ressss", res)
        // setAddRole({...addRole, 'join_id':res?.data?.id})

        if (res?.success === true) {
          CustomToast({
            type: "success",
            message: `Patient added successfully`,
          })
          setValue('')
          setPatientData({})
          reset()
          navigate("/patients");
        }

      }
    );



  }

  const handleLocationIconClick = () => {
    !showMap ? setShowMap(true) : setShowMap(false)
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log("readerasd", reader)
    setPatientData((pre) => ({ ...pre, 'profile_pic': file }))
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleChangeSelect = (value) => {
    setDropdownValueChange(value);
  };
  const gender = [
    {
      label: "Male",
      value: 1,
    },
    {
      label: "Female",
      value: 0,
    },
    {
      label: "Other",
      value: 2,
    },
  ]

  return (
    <div className="add-new-patient-form-wrapper">
      <div className="add-profile">
        <div className="image-uploader">
          <div className="left">
            <div className="image-preview">

              {previewImage ? (
                <img
                  src={previewImage?.user?.profile_pic ? `${process.env.REACT_APP_IMAGE_URL}/${previewImage?.user?.profile_pic}` : previewImage}
                  alt="Preview"
                  width="80"
                  height="80"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
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
      <form className="add-new-patient-form">
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
                      setPatientData(pre => ({ ...pre, 'first_name': e.target.value }))
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
                      setPatientData(pre => ({ ...pre, 'last_name': e.target.value }))
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
            <label for="visit-date-input">Visit Date</label>
            <div className="border" style={{ borderRadius: "5px" }}>
              <DatePicker
                size="large"
                style={{ width: "100%", border: "none" }}
                // value={patientData.visit_date ? moment(patientData.visit_date) : null}
                placeholder={patientData.visit_date}
                onChange={(e) => {
                  console.log("firsteee", e)
                  setPatientData(prev => ({ ...prev, 'visit_date': e.format("YYYY-MM-DD") }))
                }}
              />
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label>Visit Time</label>
            <div className="border" style={{ borderRadius: "5px" }}>
              <TimePicker
                format="HH:mm"
                size="large"
                placeholder={patientData.visit_time}
                // value={patientData.visit_time ? moment(patientData.visit_time, 'HH:mm') : null}
                style={{ width: "100%", border: "none" }}
                onChange={(e) => {
                  setPatientData((prev) => ({ ...prev, 'visit_time': e.format("HH:mm") }))
                }}

              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Age<span className="text-danger">*</span></label>
            {/* <input type="text" id="age-input" name="age" /> */}
            <Controller
              name="age"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <input
                    type="number"
                    name="age"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      // setNameData(e.target.value);
                      setPatientData(pre => ({ ...pre, 'age': e.target.value }))
                    }}
                  />

                  {errors.age && (
                    <span className="error-message">
                      This field is required
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div class="form-group col-lg-6">
            <label>Gender<span className="text-danger">*</span></label>
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
                      setPatientData(pre => ({ ...pre, 'gender': value }))
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
          <div class="form-group col-lg-6 " style={{ paddingTop: "2px" }}>
            {/* <label for="phone-number-input">Phone Number</label> */}
            {/* <input
              type="text"
              id="phone-number-input"
              name="phone-number-input"
            /> */}
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
                      // handleChange(e.target.name, e.target.value);
                      setPatientData((pre) => ({ ...pre, 'contact': e.target.value }))
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
          <div class="form-group col-lg-6">
            <label for="email-input">Email<span className="text-danger">*</span></label>
            {/* <input type="email" id="email-input" name="email-input" /> */}
            <Controller
              name="customer_email"
              control={control}
              rules={{
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              }}
              render={({ field }) => (
                <>
                  <input
                    className=""
                    type="text"
                    name="customer_email"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPatientData((pre) => ({ ...pre, 'email': e.target.value }))
                    }}
                  />
                  {errors.customer_email &&
                    errors.customer_email.type === "required" && (
                      <span className="error-message">
                        This field is required
                      </span>
                    )}
                  {errors.customer_email &&
                    errors.customer_email.type === "pattern" && (
                      <span className="error-message">
                        Invalid email address
                      </span>
                    )}
                </>
              )}
            />
          </div>
        </div>
        <div class="form-row">
          {/* <div class="form-group col-lg-6">
            <label for="patient-id-input">Patient ID no<span className="text-danger">*</span> </label>
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
                      setPatientData(pre => ({ ...pre, 'patient_id': e.target.value }))
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
          </div> */}
          <div class="form-group col-lg-6">
            <label for="kuwait-no-location-input">Kuwait ID no </label>
          
            <Controller
              name="kwd_id"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <input
                    type="number"
                    name="kwd_id"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPatientData(pre => ({ ...pre, 'kwd_id': e.target.value }))
                    }}
                  />

                  {errors.kwd_id && (
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
            <label for="Location">Hospital<span className="text-danger">*</span> </label>
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
                      setPatientData(pre => ({ ...pre, 'hospital_id': value }))
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
            <label for="Location">Address</label>
            <Location handleLocation={handleLocationIconClick} locationProp={locationProp} />
            {showMap && (
              <GoogleMap locationProp={locationProp} setLocationProp={setLocationProp} />
            )}
          </div>
        </div>

        <button type="button" disabled={isLoading} className="add-patient" onClick={handleSubmit(onSubmit)} >
          {!isLoading ? <span>{Id ? 'Edit Patient' : 'Add Patient'}</span> : <div className="pb-2">
            <ButtonLoader />
          </div>}
        </button>
      </form>
    </div>
  );
};

export default AddNewPatient;
