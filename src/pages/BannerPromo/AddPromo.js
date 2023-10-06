import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Modal, Rate, Select, Slider, DatePicker, TimePicker } from "antd";
import { Controller, useForm } from "react-hook-form";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import CalenderIcon from "../../assets/images/doctor/CalenderIcon.svg";
import ClockIcon from "../../assets/images/doctor/ClockIcon.svg";

import CustomDropDown from '../../atoms/CustomDropDown/Index';
import CustomDropDownMulti from '../../atoms/CustomDropDown/CustomDropDownMulti';
import Time from '../../atoms/Time/Time';
import UploadFile from '../../molecules/UploadFile/UploadFile';
import { useState } from 'react';
import { useEffect } from 'react';
import usePost from '../../customHook/usePost';
import { CustomToast } from '../../atoms/toastMessage';
import ButtonLoader from '../../atoms/buttonLoader';
import useDeleteData from '../../customHook/useDelete';

const AddPromo = ({Id}) => {
    const [formDataState, setFormDataState] = useState('')
    const [bannerData, setBannerData] = useState({})
    const [errorData, setErrorData] = useState({})
    const [dropDownData, setDropDownData] = useState([])
    const AddBanner = usePost()
    const navigate = useNavigate();
    const customData = useDeleteData();
    const [roleType, setRoleType] = useState([
        {value: 9, label: "Main Home" },
        { value: 1, label: "Hospital Admin" },
        { value: 2, label: "Doctor Admin" },
        { value: 3, label: "Pharmacy Admin" },
        { value: 7, label: "Medical Equipment Admin" },
        { value: 4, label: "Laboratory Admin" },
        { value: 8, label: "X-ray Admin" },
    ])

    console.log("bannerData", bannerData)

    // option={
    //     [
    //         {
    //             label: "Main Home",
    //             value: 1
    //         },
    //         {
    //             label: "Doctor List​​",
    //             value: 2
    //         },
    //         {
    //             label: "Hospital List​",
    //             value: 3
    //         },
    //         {
    //             label: "Pharmacy List​",
    //             value: 4
    //         },
    //         {
    //             label: "Medical Equipment List​",
    //             value: 5
    //         },
    //         {
    //             label: "Laboratory List​",
    //             value: 6
    //         },
    //         {
    //             label: "X-ray List​",
    //             value: 7
    //         },
    //     ]}

    const {
        reset,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
setValue('placements', null)
    },[])

    useEffect(() => {
        if (Id) {
        setTimeout(() => {
            customData.deleteData(
                `${process.env.REACT_APP_LIST_PROMO_BY_ID}/${Id}`,
                (val) => {
                  console.log("value", val?.data);
                  setBannerData({
                    ...val?.data,
                    specialties: val?.data?.specialities?.map((l) => l.id),
                  });
                  Object.entries(val?.data).forEach(([fieldName, fieldValue]) => {
                    setValue(fieldName, fieldValue);
                  });
                console.log('asdasdasd', val?.data?.promo_placements[1]?.promo_location_id)
                  setValue(
                    "promo_locations",
                    val?.data?.promo_placements?.map((item) => item.promo_location_id)
                  )
                  setValue('promo_type', val?.data?.promo_type?.toString())
                  setValue('placement_id', val?.data?.promo_placements[0]?.placement_id? val?.data?.promo_placements[0]?.placement_id : 9)
                  setBannerData((pre)=>({...pre, 'promo_type': val?.data?.promo_type?.toString(), 'placement_id': val?.data?.promo_placements[0]?.placement_id? val?.data?.promo_placements[0]?.placement_id : 9}))
                  dropDownChange(val?.data?.promo_placements[0]?.placement_id, 'placement_id')
                  if(val?.data?.start_date === null){
                    setBannerData((pre)=>({...pre, 'start_date' : null, 'end_date': null } ))
                  }
                }
              );
        }, 3);
        }
      }, [Id]);

      const dropDownChange = (value, name) => {

        // if(roleCategoryId){
        //     setRoleType({...bannerData, 'promo_locations': roleCategoryId})
        // }

        console.log("firstww", value, name)
        const selectedOption = roleType.find(option => option.value === value);
        console.log("asdasdselectedOption", selectedOption)
        if (selectedOption?.label === "Hospital Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'hospitaladmin' }))
        }
        else if (selectedOption?.label === "Doctor Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'doctor' }))
        }
        else if (selectedOption?.label === "Pharmacy Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'pharmacist' }))
        }
        else if (selectedOption?.label === "Laboratory Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'technologist' }))
        }
        else if (selectedOption?.label === "Medical Equipment Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'storeadmin' }))
        }
        else if (selectedOption?.label === "X-ray Admin") {
            setBannerData(prv => ({ ...prv, 'role_type': 'radiologic' }))
        }
        else {
            setBannerData(prv => ({ ...prv, [name]: value }))
        }
        setBannerData(prv => ({ ...prv, [name]: value }))
        if (value === 1 && name === 'placement_id'
            || value === 2 && name === 'placement_id'
            || value === 3 && name === 'placement_id'
            || value === 4 && name === 'placement_id'
            || value === 7 && name === 'placement_id'
            || value === 8 && name === 'placement_id') {
                customData?.deleteData(`${value === 1 ? `get_hospitals`
                : value === 2 ? `get_doctors`
                    : value === 3 ? `list_pharmacies?status=1`
                        : value === 4 ? `list_laboratories?is_laboratory=1`
                            : value === 7 ? `list_pharmacies?status=0`
                                : value === 8 ? `list_laboratories?is_laboratory=0`
                                    : null}`, (response) => {
                                        console.log("dattt", response?.data)
                                        const transformedData = response?.data?.map((item) => ({
                                            value: value == 2 ? item?.user?.id : item?.id,
                                            label: value == 2 ? item?.user?.name : item?.name,
                                        }));

                                        console.log("transformedDataasd", transformedData)
                                        setDropDownData(transformedData);
                                    })
        }
    }

console.log("firstId", Id)

    const handleBannerSubmit = () => {
        console.log("Promo console")

        console.log('formDataState', formDataState)

        if(!formDataState){
            setErrorData((pre)=>({...pre, 'upload_image': true}))
        }else{
            setErrorData((pre)=>({...pre, 'upload_image': false}))

            const updateRoleData = {
                ...bannerData,
                image: formDataState?.certificate,
              }

            const formData = new FormData();
            for (const key in updateRoleData) {
              if (Array.isArray(updateRoleData[key])) {
                updateRoleData[key].forEach((value) => {
                  formData.append(`${key}[]`, value);
                });
              } else {
                formData.append(key, updateRoleData[key]);
              }
            }

            AddBanner?.postData(Id
                ? `${process.env.REACT_APP_UPDATE_PROMO}/${Id}`
                : `${process.env.REACT_APP_ADD_PROMO}`, formData, (response) => {

                console.log("tokenwww", response)
                // navigate("/banner-promo");
                // alert('sdf')
                if (response?.success === true) {
                  navigate("/promo");
                  CustomToast({
                    type: "success",
                    message: `Added successfully`,
                  })
                  
                }
                
                // else {
                //     CustomToast({
                //         type: "error",
                //         message: `${response?.message?.role_type ? response?.message?.role_type[0] :response?.message}`,
                //     })
                // }
              })

        }

    }

    console.log("formDataState", formDataState)

    

    return (
        <div className="row  px-2 pt-4 mb-5 pb-5">
            <div className="col-12  ">
                <p className="mb-0 dashboard-com-top-text">Promo</p>
                {/* Banner tab and promo tab are different in sidebar, crud also different,
                extra add promo location in promo tab, not in banner. ( category by-default payload ) */}
            </div>
            <div className="col-12 mt-lg-0 mt-2 pt-4">
                <p className="mb-0 doctor-header-top-text pt-1">
                    <Link className="doc-link " to="/">
                        DASHBOARD
                    </Link>

                    <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                    <span style={{ color: "#4FA6D1" }}>Promo</span>{" "}
                </p>
            </div>
            <div className="col-12 mt-4 " >
<div className='mt-3 pt-2' style={{backgroundColor:"white", borderRadius:"5px", border:"1px solid #e4e3e4"}}>
             
                <div className="row px-3 mt-4">
                    <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input pr-0">
                        <p className=" doc-add-filter-text">Title<span className='text-danger'>*</span></p>

                        {/* <input type="text" /> */}
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        type="text"
                                        name="title"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setBannerData((pre) => ({ ...pre, 'title': e.target.value }));
                                        }}
                                    />

                                    {errors.title && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className="col-lg-6 doc-setting-input">
                        <p className=" doc-add-filter-text ">Status<span className='text-danger'>*</span></p>

                        <Controller
                            name="status"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomDropDown
                                        handleChangeSelect={(value, name) => {
                                            field.onChange(value);
                                            console.log("firststatus", value)
                                            setBannerData(pre => ({ ...pre, 'status': value }))
                                        }}
                                        option={[
                                            {
                                                label: "Enable",
                                                value: 1
                                            },
                                            {
                                                label: "Disable",
                                                value: 2
                                            }
                                        ]}
                                        field={field}
                                        value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />

                                    {errors.status && (
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
                        <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input pr-0">
                        <p className=" doc-add-filter-text">Promo Placement<span className='text-danger'>*</span></p>

                            <Controller
                                name="placement_id"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <>
                                        <CustomDropDown
                                            handleChangeSelect={(value, name) => {
                                                field.onChange(value);
                                                dropDownChange(value, name);
                                            }}
                                            option={roleType || []}
                                            name="placement_id"
                                            field={field}
                                            value={field.value || null}
                                            onBlur={field.onBlur}
                                        />

                                        {errors.placement_id && (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </>
                                )}
                            />

                        </div>

                        <div className="col-lg-6 doc-setting-input">
                            <p className='doc-add-filter-text'>{
                                bannerData?.role_type === "hospitaladmin" || bannerData?.placement_id === 1
                                    ? "Hospitals"
                                    : bannerData?.role_type === "doctor" || bannerData?.placement_id === 2
                                        ? "Doctors"
                                        : bannerData?.role_type === "technologist" || bannerData?.placement_id === 4
                                            ? "Laboratories"
                                            : bannerData?.placement_id === "pharmacist" || bannerData?.placement_id === 3
                                                ? "Pharmacies"
                                                : bannerData?.placement_id === "storeadmin" || bannerData?.placement_id === 7
                                                    ? "Medical Equipment"
                                                    : bannerData?.placement_id === "radiologic" || bannerData?.placement_id === 8
                                                        ? "X-ray"
                                                        : "Select Placement"}<span className='text-danger'>*</span></p>

                            <Controller
                                name="promo_locations"
                                control={control}
                                rules={{
                                    required: !dropDownData?.length > 0 ? false : true,
                                }}
                                render={({ field }) => (
                                    <>
                                        <CustomDropDownMulti
                                            handleChangeSelect={(value, name) => {
                                                field.onChange(value);
                                                dropDownChange(value, name);
                                                console.log("vvvvvv", value, name)
                                            }}
                                            option={dropDownData || []}
                                            name="promo_locations"
                                            field={field}
                                            value={field.value || ''}
                                            onBlur={field.onBlur}
                                            disabled={ dropDownData?.length < 1}
                                            mode="multiple"
                                        />

                                        {dropDownData?.length > 0 && errors.promo_locations && (
                                            <span className="error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </>
                                )}
                            />

                            { customData?.isLoading ? <span style={{ fontSize: "12px", color: 'grey' }}>Loading...</span> : null }
                        </div>
                    </div>

                {/* <div className="row px-3 mt-4">
                    <div className="col-lg-6 pr-lg-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Banner Placement<span className='text-danger'>*</span></p>
                        <Controller
                            name="placements"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomDropDown
                                        handleChangeSelect={(value, name) => {
                                            field.onChange(value);
                                            console.log("firstplacements", value)
                                            setBannerData(pre => ({ ...pre, 'placements': value }))
                                        }}
                                        option={
                                            [
                                                {
                                                    label: "Main Home",
                                                    value: 1
                                                },
                                                {
                                                    label: "Doctor List​​",
                                                    value: 2
                                                },
                                                {
                                                    label: "Hospital List​",
                                                    value: 3
                                                },
                                                {
                                                    label: "Pharmacy List​",
                                                    value: 4
                                                },
                                                {
                                                    label: "Medical Equipment List​",
                                                    value: 5
                                                },
                                                {
                                                    label: "Laboratory List​",
                                                    value: 6
                                                },
                                                {
                                                    label: "X-ray List​",
                                                    value: 7
                                                },
                                            ]}
                                        field={field}
                                        value={field.value || null}
                                        onBlur={field.onBlur}
                                    />

                                    {errors.placements && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input">
                        <p className=" doc-add-filter-text ">Status<span className='text-danger'>*</span></p>

                        <Controller
                            name="status"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomDropDown
                                        handleChangeSelect={(value, name) => {
                                            field.onChange(value);
                                            console.log("firststatus", value)
                                            setBannerData(pre => ({ ...pre, 'status': value }))
                                        }}
                                        option={[
                                            {
                                                label: "Enable",
                                                value: 1
                                            },
                                            {
                                                label: "Disable",
                                                value: 2
                                            }
                                        ]}
                                        field={field}
                                        value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />

                                    {errors.status && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>




                </div> */}

                <div className="row px-3 mt-4">
                    <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input pr-0">
                        <p className=" doc-add-filter-text">Promo Type<span className='text-danger'>*</span></p>
                        <Controller
                            name="promo_type"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomDropDown
                                        handleChangeSelect={(value, name) => {
                                            field.onChange(value);
                                            console.log("firstpromo_type", value)
                                            setBannerData(pre => ({ ...pre, 'promo_type': value }))
                                        }}
                                        option={[
                                            {
                                                label: "Every Order/Booking",
                                                value: '1'
                                            },
                                            {
                                                label: "1st Order/Booking",
                                                value: '2'
                                            },
                                            {
                                                label: "Specific Date",
                                                value: '3'
                                            },
                                            {
                                                label: "Date Range",
                                                value: '4'
                                            },
                                            {
                                                label: "Time Range",
                                                value: '5'
                                            },
                                            {
                                                label: "Specfic Date and Time Range",
                                                value: '6'
                                            },
                                            
                                            {
                                                label: "Date Range and Time Range",
                                                value: '7'
                                            },
                                        ]}
                                        field={field}
                                        value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />

                                    {errors.promo_type && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                     {  bannerData?.promo_type === '3' ||
                     bannerData?.promo_type === '4' ||
                     bannerData?.promo_type === '5' ||
                     bannerData?.promo_type === '6' ||
                     bannerData?.promo_type === '7' ?
                     <div className='promo-detail box-shadow-hover1 border mt-2 mb-3 mt-2 border-radius-five'>
                        {
                    bannerData?.promo_type ==='3'? 
                    <div className=' d-flex w-100 my-2'>

<div className="w-100 px-2" >
                        <p className=" doc-add-filter-text ">Please select date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="start_date"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='3' ? true : false,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    placeholder={bannerData?.start_date || 'Start Date'}
                                        format="YYYY/MM/DD"
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'start_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.start_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>

                    

                    

                    </div>
                    : bannerData?.promo_type ==='4'? 
                    <div className=' d-flex w-100 my-2'>

                    <div className="w-100 pl-2 pr-1" >
                                            <p className=" doc-add-filter-text ">Please select start date<span className='text-danger'>*</span></p>
                                            <div className="border" style={{ borderRadius: "5px" }}>
                                                <Controller
                                                    name="start_date"
                                                    control={control}
                                                    rules={{
                                                        required: bannerData?.promo_type ==='4' ? true : false,
                                                    }}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                        placeholder={bannerData?.start_date || 'Start Date'}
                                                            format="YYYY/MM/DD"
                                                            style={{ border: "none", width: "100%", height: '36.5px' }}
                                                            onChange={(value, name) => {
                                                                field.onChange(value);
                                                                setBannerData((pre) => ({ ...pre, 'start_date': value?.format("YYYY/MM/DD") }));
                                                            }}
                                                            field={field}
                                                            // value={field.value || ''}
                                                            onBlur={field.onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.start_date && (
                                                <span className="error-message">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                    
                                        <div className="w-100 pr-2 pl-1" >
                                            <p className=" doc-add-filter-text ">Please select end date<span className='text-danger'>*</span></p>
                                            <div className="border" style={{ borderRadius: "5px" }}>
                                                <Controller
                                                    name="end_date"
                                                    control={control}
                                                    rules={{
                                                        required: bannerData?.promo_type ==='4' ? true : false,
                                                    }}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                        placeholder={bannerData?.end_date || 'End Date'}
                                                            format="YYYY/MM/DD"
                                                            style={{ border: "none", width: "100%", height: '36.5px' }}
                                                            onChange={(value, name) => {
                                                                field.onChange(value);
                                                                setBannerData((pre) => ({ ...pre, 'end_date': value?.format("YYYY/MM/DD") }));
                                                            }}
                                                            field={field}
                                                            // value={field.value || ''}
                                                            onBlur={field.onBlur}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.end_date && (
                                                <span className="error-message">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>                    
                    
                                        
                    
                                        </div>
                    : bannerData?.promo_type ==='5'? 
                    <div className=' d-flex w-100 my-2'>

                    <div className="w-100 pl-2 pr-1" >
                                            <p className=" doc-add-filter-text ">Please select start time<span className='text-danger'>*</span></p>
                                            <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                        <Controller
                                name="start_time"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='5' ? true : false,
                                }}
                                render={({ field }) => (
                                  
                                    <TimePicker
                                    format="HH:mm"
                                    placeholder={bannerData?.start_time || 'Start Time'}
                                    style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                    onChange={(value, name) => {
                                        field.onChange(value);
                                        setBannerData((pre) => ({ ...pre, 'start_time': value?.format("HH:mm") }));
                                    }}
                                    field={field}
                                    // value={field.value || ''}
                                    onBlur={field.onBlur}
                                />
                                )}
                            />
                        </div>
                        {errors.start_time && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                                        </div>
                    
                                        <div className="w-100 pr-2 pl-1" >
                                            <p className=" doc-add-filter-text ">Please select end time<span className='text-danger'>*</span></p>
                                            <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                        <Controller
                                name="end_time"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='5' ? true : false,
                                }}
                                render={({ field }) => (
                                  
                                    <TimePicker
                                    format="HH:mm"
                                    placeholder={bannerData?.end_time || 'End Time'}
                                    style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                    onChange={(value, name) => {
                                        field.onChange(value);
                                        setBannerData((pre) => ({ ...pre, 'end_time': value?.format("HH:mm") }));
                                    }}
                                    field={field}
                                    // value={field.value || ''}
                                    onBlur={field.onBlur}
                                />
                                )}
                            />
                        </div>
                        {errors.end_time && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                                        </div>                    
                    
                                        
                    
                                        </div>
                                         : bannerData?.promo_type ==='6'? 
                                        <div className='my-2'>
                                         <div className=' d-flex w-100 border-bottom pb-2 '>

<div className="w-100 px-2" >
                        <p className=" doc-add-filter-text ">Please select date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="start_date"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='6' ? true : false,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    placeholder={bannerData?.start_date || 'Start Date'}
                                        format="YYYY/MM/DD"
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'start_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.start_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>

                    

                

                    </div>
                                         <div className=' d-flex w-100 mt-2  '>
                     
                     <div className="w-100 pl-2 pr-1" >
                                             <p className=" doc-add-filter-text ">Please select start time<span className='text-danger'>*</span></p>
                                             <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                         <Controller
                                 name="start_time"
                                 control={control}
                                 rules={{
                                     required: bannerData?.promo_type ==='6' ? true : false,
                                 }}
                                 render={({ field }) => (
                                   
                                     <TimePicker
                                     format="HH:mm"
                                     placeholder={bannerData?.start_time || 'Start Time'}
                                     style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                     onChange={(value, name) => {
                                         field.onChange(value);
                                         setBannerData((pre) => ({ ...pre, 'start_time': value?.format("HH:mm") }));
                                     }}
                                     field={field}
                                     // value={field.value || ''}
                                     onBlur={field.onBlur}
                                 />
                                 )}
                             />
                         </div>
                         {errors.start_time && (
                             <span className="error-message">
                                 This field is required
                             </span>
                         )}
                                         </div>
                     
                                         <div className="w-100 pr-2 pl-1" >
                                             <p className=" doc-add-filter-text ">Please select end time<span className='text-danger'>*</span></p>
                                             <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                         <Controller
                                 name="end_time"
                                 control={control}
                                 rules={{
                                     required: bannerData?.promo_type ==='6' ? true : false,
                                 }}
                                 render={({ field }) => (
                                   
                                     <TimePicker
                                     format="HH:mm"
                                     placeholder={bannerData?.end_time || 'End Time'}
                                     style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                     onChange={(value, name) => {
                                         field.onChange(value);
                                         setBannerData((pre) => ({ ...pre, 'end_time': value?.format("HH:mm") }));
                                     }}
                                     field={field}
                                     // value={field.value || ''}
                                     onBlur={field.onBlur}
                                 />
                                 )}
                             />
                         </div>
                         {errors.end_time && (
                             <span className="error-message">
                                 This field is required
                             </span>
                         )}
                                         </div>                    
                     
                                         
                     
                                         </div>
                                        </div>
                                        : bannerData?.promo_type ==='7'? 
                                        <div className='my-2'>
                                         <div className=' d-flex w-100 border-bottom pb-2 '>



<div className="w-100 pl-2 pr-1" >
                        <p className=" doc-add-filter-text ">Please select start date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="start_date"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='7' ? true : false,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    placeholder={bannerData?.start_date || 'Start Date'}
                                        format="YYYY/MM/DD"
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'start_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.start_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="w-100 pr-2 pl-1" >
                        <p className=" doc-add-filter-text ">Please select end date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="end_date"
                                control={control}
                                rules={{
                                    required: bannerData?.promo_type ==='7' ? true : false,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    placeholder={bannerData?.end_date || 'End Date'}
                                        format="YYYY/MM/DD"
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'end_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.end_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>                    

                    


                    


                    

                

                    </div>
                                         <div className=' d-flex w-100 mt-2  '>
                     
                     <div className="w-100 pl-2 pr-1" >
                                             <p className=" doc-add-filter-text ">Please select start time<span className='text-danger'>*</span></p>
                                             <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                         <Controller
                                 name="start_time"
                                 control={control}
                                 rules={{
                                     required: bannerData?.promo_type ==='7' ? true : false,
                                 }}
                                 render={({ field }) => (
                                   
                                     <TimePicker
                                     format="HH:mm"
                                     placeholder={bannerData?.start_time || 'Start Time'}
                                     style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                     onChange={(value, name) => {
                                         field.onChange(value);
                                         setBannerData((pre) => ({ ...pre, 'start_time': value?.format("HH:mm") }));
                                     }}
                                     field={field}
                                     // value={field.value || ''}
                                     onBlur={field.onBlur}
                                 />
                                 )}
                             />
                         </div>
                         {errors.start_time && (
                             <span className="error-message">
                                 This field is required
                             </span>
                         )}
                                         </div>
                     
                                         <div className="w-100 pr-2 pl-1" >
                                             <p className=" doc-add-filter-text ">Please select end time<span className='text-danger'>*</span></p>
                                             <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                         <Controller
                                 name="end_time"
                                 control={control}
                                 rules={{
                                     required: bannerData?.promo_type ==='7' ? true : false,
                                 }}
                                 render={({ field }) => (
                                   
                                     <TimePicker
                                     format="HH:mm"
                                     placeholder={bannerData?.end_time || 'End Time'}
                                     style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                     onChange={(value, name) => {
                                         field.onChange(value);
                                         setBannerData((pre) => ({ ...pre, 'end_time': value?.format("HH:mm") }));
                                     }}
                                     field={field}
                                     // value={field.value || ''}
                                     onBlur={field.onBlur}
                                 />
                                 )}
                             />
                         </div>
                         {errors.end_time && (
                             <span className="error-message">
                                 This field is required
                             </span>
                         )}
                                         </div>                    
                     
                                         
                     
                                         </div>
                                        </div>
                                        : ''
                }</div> : null}
                    </div>
                    <div className="col-lg-6 doc-setting-input">
                        <p className=" doc-add-filter-text">Discount %<span className='text-danger'>*</span></p>
                        <Controller
                            name="discount_percentage"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        type="text"
                                        name="discount_percentage"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setBannerData((pre) => ({ ...pre, 'discount_percentage': e.target.value }));
                                        }}
                                    />

                                    {errors.discount_percentage && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>
                </div>

                {/* Time and date  */}

                {/* {  
                     bannerData?.promo_type === '1' ||
                     bannerData?.promo_type === '2' ?

              <>  <div className="row px-3 mt-4">
                    <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input pr-0" >
                        <p className=" doc-add-filter-text ">Start Date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="start_date"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    placeholder={bannerData?.start_date || 'Start Date'}
                                        format="YYYY/MM/DD"
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'start_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.start_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div className="col-lg-6 pt-lg-0 pt-4 doc-setting-input ">
                        <p className=" doc-add-filter-text ">End Date<span className='text-danger'>*</span></p>
                        <div className="border" style={{ borderRadius: "5px" }}>
                            <Controller
                                name="end_date"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        format="YYYY/MM/DD"
                                        placeholder={bannerData?.end_date || 'End Date'}
                                        style={{ border: "none", width: "100%", height: '36.5px' }}
                                        onChange={(value, name) => {
                                            field.onChange(value);
                                            setBannerData((pre) => ({ ...pre, 'end_date': value?.format("YYYY/MM/DD") }));
                                        }}
                                        field={field}
                                        // value={field.value || ''}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </div>
                        {errors.end_date && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>


                </div>

                <div className="row px-3 mt-4">

                    <div className="col-lg-6 pt-lg-0 pt-4 pr-0 doc-setting-input ">
                        <p className=" doc-add-filter-text">Start Time<span className='text-danger'>*</span></p>

                        <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                        <Controller
                                name="start_time"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                  
                                    <TimePicker
                                    format="HH:mm"
                                    placeholder={bannerData?.start_time || 'Start Time'}
                                    style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                    onChange={(value, name) => {
                                        field.onChange(value);
                                        setBannerData((pre) => ({ ...pre, 'start_time': value?.format("HH:mm") }));
                                    }}
                                    field={field}
                                    // value={field.value || ''}
                                    onBlur={field.onBlur}
                                />
                                )}
                            />
                        </div>
                        {errors.start_time && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                       
                    </div>

                    <div className="col-lg-6 pt-lg-0 pt-4  doc-setting-input">
                        <p className=" doc-add-filter-text">End Time<span className='text-danger'>*</span></p>

                        <div className='banner-time-border d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
                        <Controller
                                name="end_time"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                  
                                    <TimePicker
                                    format="HH:mm"
                                    placeholder={bannerData?.end_time || 'End Time'}
                                    style={{ border: '1px solid #e4e3e4', height: '36px', width:'100%' }}
                                    onChange={(value, name) => {
                                        field.onChange(value);
                                        setBannerData((pre) => ({ ...pre, 'end_time': value?.format("HH:mm") }));
                                    }}
                                    field={field}
                                    // value={field.value || ''}
                                    onBlur={field.onBlur}
                                />
                                )}
                            />
                        </div>
                        {errors.end_time && (
                            <span className="error-message">
                                This field is required
                            </span>
                        )}
                    </div>


                </div> </> : null } */}


                <div className="row px-3 mt-4">
                    <div className="col-lg-6 pr-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Link<span className='text-danger'>*</span></p>

                        {/* <input type="text" /> */}
                        <Controller
                            name="link"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        type="text"
                                        name="link"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setBannerData((pre) => ({ ...pre, 'link': e.target.value }));
                                        }}
                                    />

                                    {errors.link && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className="col-lg-6 pt-lg-0 pt-4  doc-setting-input ">
                        <p className=" doc-add-filter-text">Upload Image<span className='text-danger'>*</span></p>

                        <UploadFile setFormDataState={setFormDataState} formDataState={formDataState} />
                        {errorData?.upload_image && (
                                        <span className="error-message">
                                            This field is required
                                        </span>
                                    )}
                    </div>


                </div>

                <div className="row px-3 mt-4">
                    <div className="col-lg-12 pr-lg-0 doc-setting-input">
                        <p className=" doc-add-filter-text">Description<span className='text-danger'>*</span> </p>

                        {/* <textarea id="w3review" name="w3review" rows="4" style={{ width: "98%" }} /> */}
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
                      style={{ height: "150px", paddingTop:"10px" }}
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // setNameData(e.target.value);
                        setBannerData((pre) => ({ ...pre, 'description': e.target.value }))
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

                    <div className="col-12 pt-3 pb-2 d-flex justify-content-center mt-3">
                        <button disabled={AddBanner?.isLoading} className="apply-filter submit-save-banner"
                            onClick={handleSubmit(handleBannerSubmit)}
                        >{!AddBanner?.isLoading ? Id ? 'Edit Promo' : 'Add Promo' : <div className='pb-3'><ButtonLoader /></div> }</button>
                    </div>

                </div>
                </div>
            </div>
        </div>
    )
}

export default AddPromo