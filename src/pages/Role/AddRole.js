import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import { Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import './AddRole.scss'
import useDeleteData from '../../customHook/useDelete';
import { CustomToast } from '../../atoms/toastMessage';
import useFetch from '../../customHook/useFetch';
import Phone from '../../atoms/phone';
import { Controller, useForm } from 'react-hook-form';
import SelectCountry from '../../atoms/Country';
import SelectState from '../../atoms/State';
import CustomDropDown from '../../atoms/CustomDropDown/Index';

const AddRole = ({ role_Id }) => {
    // console.log("role_Id", role_Id)

    const [addRole, setAddRole] = useState({ country: "Kuwait" })
    const [roleType, setRoleType] = useState([
        { value: 0, label: "Hospital Admin" },
        { value: 1, label: "Doctor" },
        { value: 2, label: "Laboratory Admin" },
        { value: 3, label: "Pharmacy Admin" },
    ])

    const [dropDownData, setDropDownData] = useState([])

    const { isLoading, error, deleteData } = useDeleteData();

    const {
        reset,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleChangeSelect = (value, name) => {
        setAddRole({ ...addRole, [name]: value });
    };

    const dropDownChange = (value, name) => {
        console.log("first", value, name)
        // setAddRole({ ...addRole,  })

        const selectedOption = roleType.find(option => option.value === value);
        if (selectedOption) {
            setAddRole({ ...addRole, [name]: value, 'role_type': selectedOption?.label })
        }
        if (value === 0 && name === 'role_type_id'
            || value === 1 && name === 'role_type_id'
            || value === 2 && name === 'role_type_id'
            || value === 3 && name === 'role_type_id') {
            deleteData(`${value === 0 ? `get_hospitals`
                : value === 1 ? `get_doctors`
                    : value === 3 ? `list_pharmacies`
                        : value === 2 ? `list_laboratories`
                            : null}`, (response) => {
                                console.log("dattt", response?.data?.data)
                                // setDropDownData(response?.data?.data)
                                const transformedData = response?.data?.data?.map((item) => ({
                                    value: value === 1 ? item?.user?.id : item?.id,
                                    label: value === 1 ? item?.user?.name : item?.name,
                                }));

                                setDropDownData(transformedData);
                            })
        }

    }
    console.log("addRole", addRole)

    const handleHospitalSubmit = () => {
        // validation();
        console.log("name");

    }

    return (
        <div className="row  px-2 pt-4 ">
            <div className="col-12  ">
                <p className="mb-0 dashboard-com-top-text">Manage Roles</p>
            </div>

            <div className="col-12  ">
                <div className="row d-flex align-items-end">
                    <div className="col-lg-6 col-12 mt-lg-0 mt-2">
                        <p className="mb-0 doctor-header-top-text">
                            <Link className="doc-link " to="/">
                                DASHBOARD
                            </Link>
                            <img
                                className="mx-lg-3 ml-2 pr-1 pb-1"
                                src={RightArrow}
                                alt=""
                            />
                            <span style={{ color: "#4FA6D1" }}>MANAGE ROLES</span>
                        </p>
                    </div>

                    <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">
                        <Link className="add-doc-link-color" to='/allroles' >
                            <button
                                className="btn-add-doc-filter mr-2"
                            // onClick={() => setModal2Open(true)}
                            >
                                <span className="  btn-add-doc-filter-text">All Roles</span>
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleHospitalSubmit)} className='w-100'>
                <div className="col-12 pt-3 px-0 mb-5 pb-5">


                    <div className="row mt-4 px-3">
                        <div className="col-lg-6 pr-lg-1 doc-setting-input">
                            <p style={{ marginBottom: '10px', fontSize: '16px' }}>Role Type</p>
                            <Select
                                style={{ width: "100%" }}
                                //   value={formValues.role}
                                onChange={(value) => {
                                    dropDownChange(value, 'role_type_id')
                                    // setAddRole({...addRole, 'join_id': null})
                                }}
                                options={roleType}
                            />


                            {/* <Controller
                                name="role_type_id"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            handleChangeSelect={(value) => {
                                                field.onChange(value);
                                                dropDownChange(value, 'role_type_id')
                                            }}
                                            style={{width:'100%'}}
                                            options={roleType || []}
                                            name="role_type_id"
                                            field={field}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                        />

                                        

                                        {errors.role_type_id && (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </>
                                )}
                            /> */}



                        </div>

                        <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                            <p style={{ marginBottom: '10px', fontSize: '16px' }}>{addRole.role_type_id === "Hospital Admin"
                                ? "Hospitals"
                                : addRole.role_type_id === "Doctor"
                                    ? "Doctors"
                                    : addRole.role_type_id === "Laboratory Admin"
                                        ? "Laboratories"
                                        : addRole.role_type_id === "Pharmacy Admin"
                                            ? "Pharmacies"
                                            : "Hospital"}</p>
                            <Select
                                style={{ width: "100%" }}
                                //   value={addRole.join_id}
                                onChange={(value) => { dropDownChange(value, 'join_id') }}
                                options={dropDownData}
                                disabled={dropDownData?.length < 1}
                            />
                            {isLoading ? <span style={{ fontSize: "12px", color: 'grey' }}>Loading...</span> : null}
                        </div>
                    </div>

                    <div className="row px-3 mt-4">
                        <div className="col-lg-12 doc-setting-input">
                            <p className="doc-add-filter-text" style={{ marginBottom: '10px', fontSize: '16px' }}>Name</p>
                            <input
                                type="text"
                                name="name"
                                value={addRole?.name}
                                onChange={(e) => setAddRole({ ...addRole, 'name': e.target.value })}
                            //   value={formValues.name}
                            //   onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row px-3 mt-4">
                        <div className="col-lg-4 doc-setting-input  pr-3 pr-lg-1">
                            <p className="doc-add-filter-text " style={{ marginBottom: '10px', fontSize: '16px' }}>Email</p>
                            <input
                                type="email"
                                name="email"
                                value={addRole?.email}
                                onChange={(e) => setAddRole({ ...addRole, 'email': e.target.value })}
                            />
                        </div>
                        <div className="col-lg-4 px-3 px-lg-2 pt-4 pt-lg-0">
                        <p className="doc-add-filter-text " style={{ marginBottom: '10px', fontSize: '16px' }}>Password</p>
                            <input
                                type="password"
                                name="password"
                                value={addRole?.password}
                                onChange={(e) => setAddRole({ ...addRole, 'password': e.target.value })}
                            />
                        </div>
                        <div className="col-lg-4 pl-3 pl-lg-1 pt-4 pt-lg-0">
                            <Controller
                                name="contact"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <>
                                        <Phone
                                            label="Contact"
                                            name="contact"
                                            field={field}
                                            value={field.value}
                                            handleChange={(e) => {
                                                field.onChange(e);
                                                setAddRole({ ...addRole, 'contact': e.target.value })
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




                    <div className="row mt-4 px-3">
                        <div className="col-lg-6  pr-lg-1 doc-setting-input">
                            <Controller
                                name="country"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                defaultValue="Kuwait"
                                render={({ field }) => (
                                    <>
                                        <SelectCountry
                                            handleChangeSelect={(value, name) => {
                                                field.onChange(value);
                                                //   handleChange(name, value);
                                                handleChangeSelect(value, name);
                                            }}
                                            name="country"
                                            field={field}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            isDisabled={true}
                                        />

                                        {errors.country && (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                            <SelectState
                                country={addRole?.country}
                                disabled={!addRole?.country}
                                name="state"
                                value={addRole?.state || ""}
                                handleChange={handleChangeSelect}
                            />
                        </div>
                    </div>






                    {/* <div className="row px-3 mt-4">
                    <div className="col-lg-12 doc-setting-input">
                        <p className="mb-2">Country</p>
                        <Select
                            style={{ width: "100%" }}
                            //   value={formValues.country}
                            //   onChange={handleCountryChange}
                            options={[
                                { value: "Kuwait", label: "Kuwait" },
                                { value: "Canada", label: "Canada" },
                                { value: "United kingdom", label: "United Kingdom" },
                                { value: "Pakistan", label: "Pakistan" },
                            ]}
                        />
                    </div>
                </div>

                <div className="row mt-4 px-3">
                    <div className="col-lg-6 pr-lg-1 doc-setting-input">
                        <p className="mb-2">Contact</p>
                        <PhoneInput
                            country="US"
                            //   value={formValues.contact}
                            defaultCountry="KW"
                        //   onChange={(value) => handleInputChange("contact", value)}
                        />
                    </div>

                    <div className="col-lg-6 mt-lg-0 mt-4 pl-lg-1 doc-setting-input">
                        <p className="mb-2">State</p>
                        <Select
                            name="state"
                            //   value={formValues.state}
                            //   onChange={handleStateChange}
                            style={{ width: "100%" }}
                            options={[
                                { value: "Cardiology", label: "Cardiology" },
                                { value: "Neurology", label: "Neurology" },
                            ]}
                        />
                    </div>
                </div> */}

                    <div className="row mt-4 pl-2 ml-2">
                        <button className='Add-role-btn px-5 py-2'> {role_Id ? 'Edit' : 'Add'}  Role</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRole