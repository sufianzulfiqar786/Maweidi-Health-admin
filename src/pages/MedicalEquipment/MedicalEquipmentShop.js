import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Rate } from 'antd';
import "../../assets/css/doctor.scss";
import '../../assets/css/pharmacy.scss'

import { Button, Modal, Rate, Select, Slider } from "antd";

// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import EditIcon from "../../assets/images/pharmacy/EditIcon.svg";
import DeleteIcon from "../../assets/images/pharmacy/DeleteIcon.svg";

// img png
import PharmacyCardImg1 from '../../assets/images/pharmacy/PharmacyCardImg1.png'
import PharmacyCardImg2 from '../../assets/images/pharmacy/PharmacyCardImg2.png'
import PharmacyCardImg3 from '../../assets/images/pharmacy/PharmacyCardImg3.png'
import PharmacyCardImg4 from '../../assets/images/pharmacy/PharmacyCardImg4.png'
import PharmacyCardImg5 from '../../assets/images/pharmacy/PharmacyCardImg5.png'
import PharmacyCategoryImg1 from '../../assets/images/pharmacy/PharmacyCategoryImg1.png'
import PharmacyCategoryImg2 from '../../assets/images/pharmacy/PharmacyCategoryImg2.png'
import PharmacyCategoryImg3 from '../../assets/images/pharmacy/PharmacyCategoryImg3.png'
import PharmacyCategoryImg4 from '../../assets/images/pharmacy/PharmacyCategoryImg4.png'
import PharmacyCategoryImg5 from '../../assets/images/pharmacy/PharmacyCategoryImg5.png'
import PharmacyCategoryImg6 from '../../assets/images/pharmacy/PharmacyCategoryImg6.png'
import PharmacyCategoryImg7 from '../../assets/images/pharmacy/PharmacyCategoryImg7.png'
import PharmacyCounter from '../../components/common/PharmacyCounter';

import BreadCrum from '../../atoms/breadcrum/BreadCrum';
import { products } from '../../Data/PharmactData';

import arslan from "../../assets/images/Arslan.jpg"
import remove from "../../assets/images/remove-icon.svg"
import CustomDropDown from '../../atoms/CustomDropDown/Index';
import usePost from '../../customHook/usePost';
import { CustomToast } from '../../atoms/toastMessage';
import useFetch from '../../customHook/useFetch';
import useDeleteData from '../../customHook/useDelete';
import CustomPagination from '../../components/common/CustomPagination';
import ButtonLoader from '../../atoms/buttonLoader';
const PharmacyShop = () => {


  const dataImg = [
    {
      pic: PharmacyCategoryImg1,
      text1: 'Skin',
      text2: "Care"
    },
    {
      pic: PharmacyCategoryImg2,
      text1: 'Cough',
      text2: "& Cold"
    },
    {
      pic: PharmacyCategoryImg4,
      text1: 'Pain',
      text2: "Relief"
    },
    {
      pic: PharmacyCategoryImg3,
      text1: 'Heart',
      text2: "Health"
    },
    {
      pic: PharmacyCategoryImg5,
      text1: 'Diabetes',
      text2: "Care"
    },
    {
      pic: PharmacyCategoryImg6,
      text1: 'Cancer',
      text2: "Care"
    },
    {
      pic: PharmacyCategoryImg7,
      text1: 'Weight ',
      text2: "Management"
    }
  ]



  const [addProduct, setAddProduct] = useState(false);
  const [addProductData, setAddProductData] = useState({
    // other properties
    images: [], // Initialize an empty array to store image data
  });
  const [addImageData, setAddImageData] = useState({});
  const AddProductHook = usePost()
  const [editProduct, setEditProduct] = useState(false);
  const [getId, setGetId] = useState(false);
  const [getCardId, setGetCardId] = useState(false);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [errorData, setErrorData] = useState(0);

  const [fileName, setFileName] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [listDataProduct, setListDataProduct] = useState(false);

  useEffect(() => {
    setFileName([])
    setGetId('')
    setAddProductData('')
    setAddProductData(prev => ({ ...prev, 'title': '', 'price': '', 'sales_price': '', 'quantity': '' }))
  }, [addProduct == false])

  const handleDoctorImageClick = () => {
    // Create a file input element and trigger a click event
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // input.multiple = true;


    // input.accept = 'image/png,image/jpeg';  // its just show png and jpeg file rather then other
    input.onchange = (event) => {
      const file = event.target.files[0];

      if (!file) {
        setErrorData(0);
        return;
      }
      const fileType = file.type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {

        // alert('Please select a PNG or JPEG file');
        setErrorData(1);
        return;
      } else {
        setErrorData(0);
      }
      // Set the selected image as the state of the component
      setImage(null);
      setFileName(fileName.length !== 4 ? [...fileName, URL.createObjectURL(file)] : fileName);
      // setAddImageData( [...addImageData, file])
      setAddProductData({
        ...addProductData,
        images: [...(addProductData?.images || []), file], // Add the new file to the existing images array
      });
      // setAddProductData({...addProductData, 'image[]':file})

      setLoading(true);
      setTimeout(() => {
        setLoading(false);


      }, 2000);
    };
    input.click();
  };

  const deleteProductData = useDeleteData();
  const deleteData = deleteProductData.deleteData
  const deleteDataLoading = deleteProductData.isLoading
  console.log("getIdd", getId)
  const getDataById = (Id) => {

    deleteData(`${process.env.REACT_APP_GET_PRODUCT_BY_ID}/${Id}`, (response) => {
      console.log("firresponsest", response?.data)
      setGetId(response?.data)
      setAddProductData(response?.data)
      setAddProductData(prevData => ({
        ...prevData,
        category_id: response?.data?.categories[0]?.id,
        equipment_store_id: 0,
        equipment_store_id: response?.data?.equipment_store_id,
        // equipment_store_id: 41,
      }));
      setFileName(response?.data?.images)
    });

  }

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getPharmacy = useFetch(
    `${process.env.REACT_APP_GET_PHARMACY_DATA}?per_page=${rowsPerPage}&page=${page}&status=${0}`
  );

  getPharmacy.fetchPaginatedData(`${process.env.REACT_APP_GET_PHARMACY_DATA}?status=${0}`)

  console.log("getPharmacy", getPharmacy?.data?.data)

  const getPharmacyArray = getPharmacy?.data?.data?.data?.map(item => ({
    label: item.name,
    value: item.id
  }));

  console.log("getPharmacyArray", getPharmacyArray)

  const { data, isLoading, error, fetchPaginatedData } = useFetch(
    `${process.env.REACT_APP_GET_LIST_PRODUCT}?per_page=${rowsPerPage}&page=${page}&pharmacy=${0}`
  );

  const rows = data
  console.log("roesss", rows)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  console.log("firstdata", data?.data?.data)

  // useEffect(()=>{
  //   deleteData(`${process.env.REACT_APP_GET_LIST_PRODUCT}`, (response) => {
  //     console.log("firresposdsdsdnsest", response?.data?.data[0]?.images[0]?.image)
  //     setListDataProduct(response?.data?.data)
  //   });
  // },[])


  const removeIndex = (selectedIndex) => {
    // fileName.splice(index, 1)

    // console.log(fileName, "updatedF");

    setFileName(fileName.filter((value, index) => {
      return index !== selectedIndex
    }))

  }

  const handleSubmit = () => {
    const formData = new FormData();
    for (const key in addProductData) {
      if (Array.isArray(addProductData[key])) {
        addProductData[key].forEach((value) => {
          console.log("vvvvvvv", value.type)
          if (value?.type?.startsWith("image")) {
            formData.append(`${key}[]`, value);
          }
        });
      } else {
        formData.append(key, addProductData[key]);
      }
    }

    if (
      fileName.length === 0 ||
      addProductData.category_id === '' ||
      addProductData.title === '' ||
      addProductData.sales_price === '' ||
      addProductData.quantity === '' ||
      addProductData.price === '' ||
      addProductData.label === '' ||
      addProductData?.equipment_store_id === ''
    ) {
      CustomToast({
        type: "error",
        message: `Please fill in all fields before submitting.`,
      })
    } else {

      AddProductHook?.postData((`${!getId ? process.env.REACT_APP_ADD_PRODUCT : process.env.REACT_APP_GET_UPDATE_PRODUCT + '/' + getCardId}`)

        , formData, (response) => {

          console.log("tokenwww", response)

          if (response?.success === true) {
            CustomToast({
              type: "success",
              message: `Product ${getId ? 'updated' : 'added'}  successfully`,
            })
            setAddProduct(false)
            fetchPaginatedData(`${process.env.REACT_APP_GET_LIST_PRODUCT}?per_page=${rowsPerPage}&page=${page}`)
          }
        })
    }

  }

  const handleDelete = (Id) => {

    deleteData(`${process.env.REACT_APP_GET_DELETE_PRODUCT}/${getCardId}`, () => {
      // setDeleteModal(false)
      fetchPaginatedData(`${process.env.REACT_APP_GET_LIST_PRODUCT}?per_page=${rowsPerPage}&page=${page}`)
      // const filter = rows?.data?.data?.filter(val => val.id !== deleteState)
      CustomToast({
        type: "success",
        message: "Product Delete Successfuly!",
      });
      setDeleteModal(false)
      // setRows(filter)
    });
  };

  // useEffect(()=>{
  //   if(getId){
  //   handleChangeSelectCategory(getId?.categories?.id, 'category_id')
  //   }
  // },[addProductData?.category_id])

  const handleChangeSelectCategory = (value, name) => {

    setAddProductData(pre => ({ ...pre, 'category_id': value }))

  }

  return (
    <>

      <div className="row px-2 pt-4">

        <div className="col-12  ">
          <p className="mb-0 dashboard-com-top-text">Medical Equipment List</p>
        </div>

        <div className="col-12">
          <div className="row d-flex align-items-end">
            <div className="col-lg-6 col-12 mt-lg-0 mt-2">
              <BreadCrum
                firstLink="/medical/equipment"
                firstText="Medical Equipment"
                secondText="PRODUCTS"
              />
              {/* <p className="mb-0 doctor-header-top-text">
                <Link className="doc-link " to="">
                  DASHBOARD
                </Link>
                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                <Link className="doc-link " to="pharmacy">
                  <span>PHARMACY</span>{" "}
                </Link>
                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                <span style={{ color: "#4FA6D1" }}>PRODUCTS</span>{" "}
              </p> */}
            </div>

            <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">

              <button onClick={() => setAddProduct(true)} className="btn-add-new-doc"> Add Product </button>{" "}

            </div>
          </div>
        </div>

        <div className="col-12 mt-1">
          <p className='mb-0 py-4  pharmacy-view-product'>Most Viewed Products</p>
        </div>

        <div className="col-12 ">

          <div className="row px-2">

            {!isLoading ?
              visibleRows?.map(({ id, images, label, price }, index) => {
                return (
                  <>

                    <div class=" px-2 py-2 position-relative pharmacy-product-card-new" >

                      <div className=' pharmacy-product-card'>

                        <div className="pharmacy-product-card-img pt-2 px-2" >
                          <img src={`${process.env.REACT_APP_IMAGE_URL}/${images[0]?.image}`} alt="" />
                        </div>

                        <div className='py-2'>
                          <PharmacyCounter />
                        </div>

                        <hr className='my-0' />

                        <div className="div">
                          <span className='pharmacy-product-name pl-2'>{label}</span>
                        </div>

                        <div className="div pharmacy-product-rate mb-2 d-flex justify-content-between align-items-center">
                          <span className='pharmacy-product-name pharmacy-product-price pl-2 pt-2 '>KWD {price}</span>

                          {/* <span className='pr-2 mr-1'>
                            <Rate allowHalf defaultValue={2.5} />
                          </span> */}
                        </div>
                      </div>

                      <div className='position-absolute pharmacy-product-edit'>

                        <img onClick={() => {
                          // setEditProduct(true)
                          setAddProduct(true)
                          // setGetId(11)
                          setGetCardId(id)
                          getDataById(id)
                          // handleDelete()
                        }} alt='img' className='' src={EditIcon} />
                        {
                          console.log("getCardId", getCardId)
                        }
                      </div>

                      <div className='position-absolute pharmacy-product-delete'>

                        <img className='' onClick={() => {
                          setDeleteModal(true)
                          setGetCardId(id)
                        }} alt='img' src={DeleteIcon} />

                      </div>

                    </div>

                  </>
                )
              }) : 
              // <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: '300px', backgroundColor: 'rgba(46, 46, 46, 0.4)', borderRadius: '5px' }}>
              //   <ButtonLoader />
              // </div> 
              null

            }



          </div>





        </div>

        <div className="pagination-container px-md-3 ml-md-1 mt-md-2 w-100">
          <div className="pagination-detail">
            Showing {(page - 1) * rowsPerPage + 1} -{" "}
            {rows?.data?.to} of {rows?.data?.total}
          </div>
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onChangePage={(newPage) => {
              setPage(newPage);
            }}
          />
        </div>

        <div className="col-12 mt-0">
          <p className='mb-0 py-4  pharmacy-view-product'>Categories</p>
        </div>


        <div className="col-12 mb-5">

          <div className="row px-2 mb-lg-5 pb-5">

            {
              dataImg.map(({ pic, text1, text2 }) => {
                return (
                  <>

                    <div class=" px-2 py-2 position-relative pharmacy-product-card-new" >

                      <div className=' pharmacy-product-card'>

                        <div className="pharmacy-product-card-img " >
                          <img src={pic} alt="" />
                        </div>

                      </div>

                      <div className='position-absolute pharmacy-product-cate'>

                        <p className='mb-0'>{text1}</p>
                        <p className='mb-0'>{text2} </p>

                      </div>

                    </div>

                  </>
                )
              })
            }



          </div>





        </div>


      </div>





      <Modal
        className="doctor-filter-modal"
        centered
        open={addProduct}

        // onOk={() => setModal2Open(false)}
        onCancel={() => setAddProduct(false)}
        width={925}
        footer={
          <div className="row px-3 mt-4 mb-2">


            <div className="col-12 d-flex justify-content-end mt-3">
              <button className="apply-filter submit-pharmacy-add-product" disabled={
                fileName.length === 0 ||
                addProductData.category_id === '' ||
                addProductData.title === '' ||
                addProductData.sales_price === '' ||
                addProductData.quantity === '' ||
                addProductData.price === '' ||
                addProductData.label === '' ||
                AddProductHook?.isLoading ||
                addProductData?.equipment_store_id === ''
              }
                style={{
                  opacity: fileName.length === 0 ||
                    addProductData.category_id === '' ||
                    addProductData.title === '' ||
                    addProductData.sales_price === '' ||
                    addProductData.quantity === '' ||
                    addProductData.price === '' ||
                    addProductData.label === '' ||
                    addProductData?.equipment_store_id === '' ? '0.7' : null
                }}
                onClick={handleSubmit}> {AddProductHook?.isLoading ? <div className='pb-3'><ButtonLoader /></div> : getId ? 'Update Product' : "Add Product"} </button>
            </div>
          </div>
        }
      >





        {
          console.log("fileNamemmm", fileName)
        }


        <div className="row px-3 border-bottom">
          <div className="col-12 ">
            <p className=" pharmacy-modal-header">Add Product</p>
          </div>
        </div>


        <div className="row px-3 ">

          <div className="col-4 mt-2" >
            <div >
              <div className='col-12 d-flex' style={{ display: "flex", justifyContent: 'center' }}>
                <div className='col-5 ' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[0] ?
                      <img src={remove} alt='imge' style={{ width: "15px", position: "absolute", zIndex: "1000", left: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(0) }} /> : null

                  }

                  {
                    fileName[0] ?
                      <img src={`${fileName[0]?.image ? process.env.REACT_APP_IMAGE_URL + '/' + fileName[0]?.image : fileName[0]}`} alt='imgwe' style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: 'cover' }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }



                </div>
                <div className='col-5' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[1] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", right: "-5px", top: "-4px", cursor: "pointer", objectFit: 'cover' }} onClick={() => { removeIndex(1) }} /> : null

                  }
                  {
                    fileName[1] ?
                      <img src={`${fileName[1]?.image ? process.env.REACT_APP_IMAGE_URL + '/' + fileName[1]?.image : fileName[1]}`} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: 'cover' }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
              </div>
              <div className='col-12 d-flex' style={{ display: "flex", justifyContent: 'center' }}>
                <div className='col-5 ' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "2px" }}>
                  {
                    fileName[2] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", left: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(2) }} /> : null

                  }
                  {
                    fileName[2] ?
                      <img src={`${fileName[2]?.image ? process.env.REACT_APP_IMAGE_URL + '/' + fileName[2]?.image : fileName[2]}`} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: 'cover' }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
                <div className='col-5 ' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "2px" }}>
                  {
                    fileName[3] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", right: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(3) }} />
                      : null
                  }
                  {
                    fileName[3] ?
                      <img src={`${fileName[3]?.image ? process.env.REACT_APP_IMAGE_URL + '/' + fileName[3]?.image : fileName[3]}`} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: 'cover' }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
              </div>

              {errorData === 1 ? (
                <span className="error-message">
                  Please select a valid image file (JPEG or PNG)
                </span>
              ) : (
                ""
              )}
            </div>
            <button className='pharmacy-add-upload-img mt-3' onClick={handleDoctorImageClick} >Upload Image</button>








          </div>

          <div className="col-8">

            <div className="row px-3 mt-4">


              <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">

                <p className=" doc-add-filter-text">
                  Category
                </p>
                {
                  console.log("addProductData", addProductData)
                }
                <CustomDropDown
                  defaultValue="Select"
                  style={{
                    width: "100%",
                  }}
                  name="category_id"
                  value={addProductData?.category_id == "1" ? 'Skin Care' :
                    addProductData?.category_id == "2" ? 'Cough & Cold' :
                      addProductData?.category_id == "3" ? 'Pain Relief​​' :
                        addProductData?.category_id == "4" ? 'Heart Health' :
                          addProductData?.category_id == "5" ? 'Diabetes Care' :
                            addProductData?.category_id == "6" ? 'Cancer Care' :
                              addProductData?.category_id == "7" ? 'Weight Management'
                                : ""}
                  // onChange={() => { }}
                  handleChangeSelect={(value) => handleChangeSelectCategory(value, 'category_id')}
                  option={[
                    {
                      label: "Skin Care",
                      value: "1"
                    },
                    {
                      label: "Cough & Cold",
                      value: "2"
                    },
                    {
                      label: "Pain Relief",
                      value: "3"
                    },
                    {
                      label: "Heart Health",
                      value: "4"
                    },
                    {
                      label: "Diabetes Care",
                      value: "5"
                    },
                    {
                      label: "Cancer Care",
                      value: "6"
                    },
                    {
                      label: "Weight Management",
                      value: "7"
                    },
                  ]}
                />
              </div>

              <div className="col-lg-6  doc-setting-input">
                <p className=" doc-add-filter-text">
                  Add Title
                </p>
                <input type="text"
                  name='title' value={addProductData?.title}
                  onChange={(e) => {
                    setAddProductData({ ...addProductData, 'title': e.target.value })
                  }}
                />
              </div>



              <div className="col-12">


                <div className="row mt-3">

                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Price</p>

                    <div className='d-flex doc-setting-input-border-pharmacy justify-content-center align-items-center'>
                      <span className='border-right px-3' >$</span>
                      <input className='doc-setting-input-inner' type="number" placeholder='Price'
                        name='price' value={addProductData?.price}
                        onChange={(e) => {
                          setAddProductData({ ...addProductData, 'price': e.target.value })
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">
                    <p className=" doc-add-filter-text">
                      Label
                    </p>

                    <CustomDropDown
                      defaultValue="Select"
                      style={{
                        width: "100%",
                      }}
                      name="label"
                      value={addProductData?.label || ""}
                      handleChangeSelect={(value, name) => {
                        setAddProductData({ ...addProductData, 'label': value })
                      }}
                      option={[
                        {
                          label: "Featured​​",
                          value: "Featured"
                        },
                        {
                          label: "New",
                          value: "New"
                        },
                        {
                          label: "Popular",
                          value: "Popular"
                        },
                        {
                          label: "Recent",
                          value: "Recent"
                        },
                      ]}
                    />
                  </div>

                </div>

                <div className="row mt-3">

                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Sales Price</p>

                    <div className='d-flex doc-setting-input-border-pharmacy justify-content-center align-items-center'>
                      <span className='border-right px-3' >$</span>
                      <input className='doc-setting-input-inner' type="number" placeholder='Price'
                        name='sales_price' value={addProductData?.sales_price}
                        onChange={(e) => {
                          setAddProductData({ ...addProductData, 'sales_price': e.target.value })
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Quantity</p>
                    <input type="text"
                      name='quantity' value={addProductData?.quantity}
                      onChange={(e) => {
                        setAddProductData({ ...addProductData, 'quantity': e.target.value })
                      }}
                    />
                  </div>



                </div>

                <div className="row mt-3">

                  <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">
                    <p className=" doc-add-filter-text">
                    Equipment store Id
                    </p>

                    <CustomDropDown
                      defaultValue="Select"
                      style={{
                        width: "100%",
                      }}
                      name="equipment_store_id"
                      value={addProductData?.equipment_store_id || ""}
                      handleChangeSelect={(value, name) => {
                        setAddProductData({ ...addProductData, 'equipment_store_id': value })
                      }}
                      option={getPharmacyArray}
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Modal>

      <Modal
        className="doctor-filter-modal"
        centered
        open={editProduct}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setEditProduct(false)}
        width={925}
        footer={
          <div className="row px-3 mt-4 mb-2">


            <div className="col-12 d-flex justify-content-end mt-3">
              <button className="apply-filter submit-pharmacy-add-product">Add Product</button>
            </div>
          </div>
        }
      >








        <div className="row px-3 border-bottom">
          <div className="col-12 ">
            <p className=" pharmacy-modal-header rrrr">Edit Product</p>
          </div>
        </div>


        <div className="row px-3">

          <div className="col-4 mt-2" >
            <div >
              <div className='col-12 d-flex' style={{ display: "flex", justifyContent: 'center' }}>
                <div className='col-5 ' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[0] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", left: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(0) }} /> : null

                  }

                  {
                    fileName[0] ?
                      <img src={fileName[0] ?? ""} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px" }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }



                </div>
                <div className='col-5' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[1] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", right: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(1) }} /> : null

                  }
                  {
                    fileName[1] ?
                      <img src={fileName[1] ?? ""} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px" }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
              </div>
              <div className='col-12 d-flex' style={{ display: "flex", justifyContent: 'center' }}>
                <div className='col-5' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[2] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", left: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(2) }} /> : null

                  }
                  {
                    fileName[2] ?
                      <img src={fileName[2] ?? ""} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px" }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
                <div className='col-5' style={{ width: "100px", height: "100px", padding: '0', margin: "2px", marginTop: "5px" }}>
                  {
                    fileName[3] ?
                      <img src={remove} alt='img' style={{ width: "15px", position: "absolute", zIndex: "1000", right: "-5px", top: "-4px", cursor: "pointer" }} onClick={() => { removeIndex(3) }} />
                      : null
                  }
                  {
                    fileName[3] ?
                      <img src={fileName[3] ?? ""} alt='img' style={{ width: "100%", height: "100%", borderRadius: "8px" }} /> :
                      <div className="loader-bar-null-for-add-product" />

                  }
                </div>
              </div>

              {errorData === 1 ? (
                <span className="error-message">
                  Please select a valid image file (JPEG or PNG)
                </span>
              ) : (
                ""
              )}
            </div>
            <button className='pharmacy-add-upload-img mt-3' onClick={handleDoctorImageClick} >Upload Image</button>








          </div>

          <div className="col-8">

            <div className="row px-3 mt-4">


              <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">
                <p className=" doc-add-filter-text">
                  Category
                </p>

                <Select
                  defaultValue="Select"
                  style={{
                    width: "100%",
                  }}
                  onChange={() => { }}
                  options={[
                    {
                      label: "Cardiology0​​",
                      value: "Cardiology0"
                    },
                    {
                      label: "Neurology",
                      value: "Neurology"
                    },
                    {
                      label: "Cardiology​​",
                      value: "Cardiology"
                    },
                    {
                      label: "Neurology1",
                      value: "Neurology1"
                    },
                  ]}
                />
              </div>
              <div className="col-6 doc-setting-input">
                <p className=" doc-add-filter-text">
                  Add Title
                </p>
                <input type="text" />
              </div>

              <div className="col-12">


                <div className="row mt-3">

                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Price</p>

                    <div className='d-flex doc-setting-input-border-pharmacy justify-content-center align-items-center'>
                      <span className='border-right px-3' >$</span> <input className='doc-setting-input-inner' type="text" placeholder='Price' />
                    </div>
                  </div>

                  <div className="col-lg-6 mt-lg-0  mt-4  doc-setting-input">
                    <p className=" doc-add-filter-text">
                      Label
                    </p>

                    <Select
                      defaultValue="Select"
                      style={{
                        width: "100%",
                      }}
                      onChange={() => { }}
                      options={[
                        {
                          label: "Featured​​",
                          value: "Featured"
                        },
                        {
                          label: "New",
                          value: "New"
                        },
                        {
                          label: "Popular",
                          value: "Popular"
                        },
                        {
                          label: "Recent",
                          value: "Recent"
                        },
                      ]}
                    />
                  </div>

                </div>

                <div className="row mt-3">

                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Sales Price</p>

                    <div className='d-flex doc-setting-input-border-pharmacy justify-content-center align-items-center'>
                      <span className='border-right px-3' >$</span> <input className='doc-setting-input-inner' type="text" placeholder='Price' />
                    </div>

                  </div>


                  <div className="col-lg-6 doc-setting-input">
                    <p className=" doc-add-filter-text">Quantity</p>
                    <input type="text" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </Modal>
      <Modal
        className="doctor-filter-modal"
        centered
        open={deleteModal}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setDeleteModal(false)}
        width={514}
        footer={null}
        closable={false}

      >

        <div className="row pb-1">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center pharmacy-delete">
            <p className='mb-0 pt-lg-5 pt-3 pb-4 mt-lg-3'>Are you sure you want to delete?</p>
            <button className='mt-lg-4 mt-1 mb-lg-5 mb-2' disabled={deleteDataLoading} onClick={handleDelete}> {deleteDataLoading ? <div className='pb-3'><ButtonLoader /></div> : 'Delete'}</button>
          </div>
        </div>
      </Modal>


    </>
  )
}

export default PharmacyShop