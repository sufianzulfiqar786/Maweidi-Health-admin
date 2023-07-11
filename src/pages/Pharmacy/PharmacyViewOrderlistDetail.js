import React from 'react'
import { Link } from 'react-router-dom'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import { Box, Typography } from "@mui/material";

import pic1 from "../../assets/images/pharmacy/facewash.png";
import pic2 from "../../assets/images/pharmacy/diabend.png";
import pic3 from "../../assets/images/pharmacy/ashwagandha.png";
import pic4 from "../../assets/images/pharmacy/handwash.png";
import doc1 from "../../assets/images/doctor/doc1.png";


// img svg
import RightArrow from "../../assets/images/doctor/RightArrow.svg";
import PharmacyViewProductCounter from '../../components/common/PharmacyViewProductCounter';

const PharmacyViewOrderlistDetail = () => {

    const data = [
        {
            id: 1,
            pic: pic1,
            name: 'Facewash',
            price: 'KWD 255.00',
            quantity: '30',
            total: "KWD 510.00",
        },
        {
            id: 2,
            pic: pic2,
            name: 'Diabend',
            price: 'KWD 520.00',
            quantity: '20',
            total: "KWD 560.00",
        },
        {
            id: 3,
            pic: pic3,
            name: 'Ashwagandha Churna',
            price: 'KWD 160.00',
            quantity: '10',
            total: "KWD 530.00",
        },
        {
            id: 4,
            pic: pic4,
            name: 'Dettol handwash',
            price: 'KWD 510.00',
            quantity: '2',
            total: "KWD 500.00",
        },
    ]

    return (
        <>

            <div className="row px-2 pt-4 mb-5">

                <div className="col-12  ">
                    <p className="mb-0 dashboard-com-top-text">Pharmacy List</p>
                </div>

                <div className="col-12">
                    <div className="row d-flex align-items-end">
                        <div className="col-lg-6 col-12 mt-4 pt-1">
                            <p className="mb-0 doctor-header-top-text">
                                <Link className="doc-link " to="">
                                    DASHBOARD
                                </Link>
                                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                                <Link className="doc-link " to="pharmacy">
                                    <span>PHARMACY</span>{" "}
                                </Link>
                                <img className="mx-lg-3 ml-2 pr-1 pb-1" src={RightArrow} alt="" />{" "}
                                <span style={{ color: "#4FA6D1" }}>PRODUCT DETAILS</span>{" "}
                            </p>
                        </div>

                        <div className="col-lg-6 col-12 mt-lg-0 mt-3 d-flex justify-content-end ">

                            {/* <button className="btn-add-new-doc"> Add Product </button>{" "} */}

                        </div>
                    </div>
                </div>

                <div className="col-md-8 mt-4 pt-3">

                    <TableContainer
                        component={Paper}
                        sx={{ backgroundColor: "#FFFFFF" }}
                        className="custom-scroll"
                    >
                        <Table aria-label="simple table">
                            <TableHead
                                sx={{
                                    "& th": {
                                        color: "#193F52",
                                        whiteSpace: "nowrap",
                                        wordWrap: "break-word",
                                    },
                                }}
                            >
                                <TableRow>

                                    <TableCell sx={{ pl: 8 }} align="left">Product</TableCell>
                                    {/* <TableCell align="left">Type</TableCell> */}
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">inStock</TableCell>
                                    <TableCell align="center">Ordered Quantity</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody
                                sx={{
                                    "& td": {
                                        color: "#767676",
                                        whiteSpace: "nowrap",
                                        wordWrap: "break-word",
                                    },
                                }}
                            >



                                {data.map(({ id, pic, name, price, total, quantity }) => (
                                    <TableRow
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >

                                        {/* <TableCell  align="left"></TableCell> */}
                                        <TableCell align="left">

                                            <div className='pharmacy-product-view-prodeuct-cell'>
                                                <span className='pharmacy-product-view-prodeuct-cell-text1 pl-3 pr-4'>{id}</span>   <img src={pic} alt="" /> <span className='pl-2 pharmacy-product-view-prodeuct-cell-text2'>{name}</span>
                                            </div>

                                        </TableCell>

                                        {/* <TableCell align="left"><span className='pl-2 pharmacy-product-view-text'>{quantity === '30'? 'on Site' : 'Home Service'}</span></TableCell> */}
                                        <TableCell align="center"><span className='pl-2 pharmacy-product-view-text'>{quantity === 'Kuwait' ? '--' : 'Kuwait'}</span></TableCell>
                                        <TableCell align="center"><span className='pl-2 pharmacy-product-view-text'>{price}</span></TableCell>
                                        <TableCell align="center"><span className='pl-2 pharmacy-product-view-text'>1323</span></TableCell>
                                        <TableCell align="center"><span className='pl-2 pharmacy-product-view-text'>{quantity}</span></TableCell>
                                        {/* <TableCell align="left"> <PharmacyViewProductCounter increBtn={'increBtnPharmacyProduct'} decreBtn={'decreBtnPharmacyProduct'} inputField={'inputFieldPharmacyProduct'} /> </TableCell> */}
                                        <TableCell align="center"><span className='pl-2 pharmacy-product-view-text'>{total}</span></TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>



                </div>

                {/* <div className="col-4 mt-4 pt-3 mb-5"> */}

                {/* <div className="row"> */}

                {/* <div className="col-md-8"></div> */}

                <div className="col-md-4 mt-4 pt-3 mb-5 ">

                    <div className='pharmacy-product-approve'>

                        <div className="row mx-0">
                            <div className="col-12   border-bottom">
                            <div className='d-flex justify-content-center flex-column align-items-center'>
                                <div className='mt-4' style={{
                                    width:"100px", height:'100px'
                                }}>
                                <img className='w-100 h-100 object-fit-cover' style={{borderRadius:"100px"}} src={doc1} alt="" />
                                </div>
                            <p className='mb-0 mt-2 text-center pharmacy-product-approve-text2'>Wang</p>
                            <p className='mb-0  text-center pharmacy-product-approve-text2'>Wang@gmail.com</p>
                            <p className='mb-0  text-center pharmacy-product-approve-text2'>320-D, al-ali town, kuwait</p>
                            </div>

                                <div className='d-flex justify-content-between px-2 py-4'>
                                    <span className='pharmacy-product-approve-text1'>Subtotal</span>
                                    <span className='pharmacy-product-approve-text2'>KWD 2190</span>

                                </div>

                            </div>

                            <div className="col-12   border-bottom">

                                <div className='d-flex justify-content-between px-2 py-4'>
                                    <span className='pharmacy-product-approve-text1'>Subtotal</span>
                                    <span className='pharmacy-product-approve-text2'>KWD 2190</span>

                                </div>

                            </div>

                            <div className="col-12   border-bottom">

                                <div className='d-flex justify-content-between px-2 py-4'>
                                    <span className='pharmacy-product-approve-text1'>Taxes</span>
                                    <span className='pharmacy-product-approve-text2'>KWD 219</span>

                                </div>

                            </div>

                            <div className="col-12   ">

                                <div className='d-flex justify-content-between px-2 py-4'>
                                    <span className='pharmacy-product-approve-text1'>Total</span>
                                    <span className='pharmacy-product-approve-text2'>KWD 2409</span>

                                </div>

                            </div>

                            <div className="col-12 mb-5 pb-5  ">
                                <span className='pharmacy-product-approve-text1 pl-2 ' style={{ color: "#202020" }}>Payment Method</span>
                                <div className='d-flex justify-content-between px-2 pt-1 pb-4'>
                                    <span className='pharmacy-product-approve-text3'>Debit Card</span>
                                    <span className='pharmacy-product-approve-text4'>Paid</span>

                                </div>

                            </div>


                            <div className="col-12 py-4  d-flex justify-content-end">

                                <button className='pharmacy-product-approve-btn1'>Accept</button>
                                <button className='pharmacy-product-approve-btn2'>Decline</button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* </div> */}

                {/* </div> */}

            </div>

        </>
    )
}

export default PharmacyViewOrderlistDetail