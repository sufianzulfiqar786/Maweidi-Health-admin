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

const AddBannerPromo = ({Id}) => {
    const [formDataState, setFormDataState] = useState('')
    const [bannerData, setBannerData] = useState({})
    const [errorData, setErrorData] = useState({})
    const AddBanner = usePost()
    const navigate = useNavigate();
    const customData = useDeleteData();

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
          customData.deleteData(
            `${process.env.REACT_APP_LIST_BANNER_BY_ID}/${Id}`,
            (val) => {
              console.log("value", val?.data);
              setBannerData({
                ...val?.data,
                specialties: val?.data?.specialities?.map((l) => l.id),
              });
              Object.entries(val?.data).forEach(([fieldName, fieldValue]) => {
                setValue(fieldName, fieldValue);
              });
            console.log('asdasdasd', val?.data?.banner_placements[0]?.placement_id)
              setValue(
                "placements",
                val?.data?.banner_placements?.map((item) => item.placement_id)
              )
            }
          );
        }
      }, [Id]);

console.log("firstId", Id)

    const handleBannerSubmit = () => {
        console.log("Banner console")

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
                ? `${process.env.REACT_APP_UPDATE_BANNER}/${Id}`
                : `${process.env.REACT_APP_ADD_BANNER}`, formData, (response) => {

                console.log("tokenwww", response)
                // navigate("/banner-promo");
                // alert('sdf')
                if (response?.success === true) {
                  navigate("/banner-promo");
                  CustomToast({
                    type: "success",
                    message: `Role added successfully`,
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
                <p className="mb-0 dashboard-com-top-text">Banner and Promo</p>
                {/* Banner tab and promo tab are different in sidebar, crud also different,
                extra add promo location in promo tab, not in banner. ( category by-default payload ) */}
            </div>
            <div className="col-12 mt-lg-0 mt-2 pt-4">
                <p className="mb-0 doctor-header-top-text pt-1">
                    <Link className="doc-link " to="/">
                        DASHBOARD
                    </Link>

                    <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                    <span style={{ color: "#4FA6D1" }}>Banner and Promo</span>{" "}
                </p>
            </div>
            <div className="col-12 mt-4 " >
<div className='mt-3 pt-2' style={{backgroundColor:"white", borderRadius:"5px", border:"1px solid #e4e3e4"}}>
                <div className="row px-3 mt-4">
                    <div className="col-lg-12 doc-setting-input">
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
                </div>

                <div className="row px-3 mt-4">
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
                                    <CustomDropDownMulti
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
                                        mode="multiple"
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




                </div>

                {/* <div className="row px-3 mt-4">
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
                                                label: "Specific Time",
                                                value: '5'
                                            },
                                            {
                                                label: "Time Range",
                                                value: '6'
                                            },
                                            {
                                                label: "Specific Date and Time Range",
                                                value: '7'
                                            },
                                            {
                                                label: "Date Range and Time Range",
                                                value: '8'
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
                    </div>
                    <div className="col-lg-6 doc-setting-input">
                        <p className=" doc-add-filter-text">Dsicount %<span className='text-danger'>*</span></p>
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
                </div> */}

                <div className="row px-3 mt-4">
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


                </div>


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
                        >{!AddBanner?.isLoading ? Id ? 'Edit Banner' : 'Add Banner' : <div className='pb-3'><ButtonLoader /></div> }</button>
                    </div>

                </div>
                </div>
            </div>
        </div>
    )
}

export default AddBannerPromo