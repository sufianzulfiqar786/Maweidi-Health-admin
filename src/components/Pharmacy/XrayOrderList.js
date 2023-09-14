import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Button, Modal, Rate, Select, Slider } from "antd";
import sohaibavatar from "../../assets/images/dashboard/sohaibavatar.png";
import "../../assets/css/common/datatable.scss";
import { Box, Typography } from "@mui/material";
import CustomPagination from "../common/CustomPagination";
import prescriptionSVG from "../../assets/images/common/prescription.svg";
import Edit from "../common/Edit.js";
import Delete from "../common/Delete.js";
import Cross from "../common/Cross";
import Tick from "../common/Tick.js";

// img svg
import NullIcon from "../../assets/images/pharmacy/NullIcon.svg";
import CameraIcon from "../../assets/images/doctor/CameraIcon.svg";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";
import pic2 from "../../assets/images/doctor/doc2.png";
import pic3 from "../../assets/images/doctor/doc3.png";
import pic4 from "../../assets/images/doctor/doc4.png";
import pic5 from "../../assets/images/doctor/doc5.png";
import pic6 from "../../assets/images/doctor/doc6.png";
import pic7 from "../../assets/images/doctor/doc7.png";
import pic8 from "../../assets/images/doctor/doc8.png";
import { Link, Navigate } from "react-router-dom";
import useFetch from "../../customHook/useFetch";
import ButtonLoader from "../../atoms/buttonLoader";
import usePost from "../../customHook/usePost";
import ListSkeleton from "../../molecules/ListSkeleton/ListSkeleton";

// const rows = [
//   {
//     id: 1,
//     pic: pic1,
//     name: "Al-Hayat Pharmacy",
//     email: "info@alhayatpharmacy.com",
//     address: "Al Sharq, Block 1, Street 1",
//     mobile: "+965 12345678",
//     productName: "Paracetamol",
//     total: "5 KWD",
//     detail: "Pack of 20 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10001",
//   },
//   {
//     id: 2,
//     pic: pic2,
//     name: "Al-Dawaa Pharmacy",
//     email: "info@aldawaapharmacy.com",
//     address: "Salmiya, Block 10, Street 2",
//     mobile: "+965 98765432",
//     productName: "Amoxicillin",
//     total: "3.5 KWD",
//     detail: "Suspension 125mg/5ml",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10002",
//   },
//   {
//     id: 3,
//     pic: pic3,
//     name: "Pharma Plus",
//     email: "info@pharmapluskw.com",
//     address: "Hawally, Block 5, Street 3",
//     mobile: "+965 56781234",
//     productName: "Ibuprofen",
//     total: "2.25 KWD",
//     detail: "Pack of 24 capsules",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10003",
//   },
//   {
//     id: 4,
//     pic: pic4,
//     name: "Health First Pharmacy",
//     email: "info@healthfirstkw.com",
//     address: "Jabriya, Block 8, Street 4",
//     mobile: "+965 87654321",
//     productName: "Aspirin",
//     total: "1 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10004",
//   },
//   {
//     id: 5,
//     pic: pic5,
//     name: "Al-Razi Pharmacy",
//     email: "info@alrazipharmacy.com",
//     address: "Fahaheel, Block 3, Street 5",
//     mobile: "+965 23456789",
//     productName: "Cetirizine",
//     total: "1.5 KWD",
//     detail: "Pack of 10 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10005",
//   },
//   {
//     id: 6,
//     pic: pic6,
//     name: "Al-Salam Pharmacy",
//     email: "info@alsalampharmacykw.com",
//     address: "Mubarak Al-Kabeer, Block 6, Street 6",
//     mobile: "+965 65432109",
//     productName: "Loratadine",
//     total: "2.75 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10006",
//   },
//   {
//     id: 7,
//     pic: pic7,
//     name: "Al-Adwaa Pharmacy",
//     email: "info@aladwaapharmacykw.com",
//     address: "Salmiya, Block 9, Street 7",
//     mobile: "+965 98765432",
//     productName: "Omeprazole",
//     total: "4 KWD",
//     detail: "Pack of 14 capsules",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10007",
//   },
//   {
//     id: 8,
//     pic: pic8,
//     name: "Al-Sehha Pharmacy",
//     email: "info@alsehhapharmacykw.com",
//     address: "Fintas, Block 2, Street 8",
//     mobile: "+965 23456789",
//     productName: "Diazepam",
//     total: "3 KWD",
//     detail: "Pack of 20 tablets",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10008",
//   },
//   {
//     id: 9,
//     pic: pic5,
//     name: "Al-Tadawi Pharmacy",
//     email: "info@altadawipharmacykw.com",
//     address: "Hawally, Block 4, Street 9",
//     mobile: "+965 65432109",
//     productName: "Ciprofloxacin",
//     total: "5.5 KWD",
//     detail: "Pack of 10 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10009",
//   },
//   {
//     id: 10,
//     pic: pic3,
//     name: "Sama Pharmacy",
//     email: "info@samapharmacy.com",
//     address: "Mishref, Block 7, Street 10",
//     mobile: "+965 12345678",
//     productName: "Salbutamol",
//     total: "2.5 KWD",
//     detail: "Inhaler",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10010",
//   },
//   {
//     id: 11,
//     pic: pic1,
//     name: "Al-Najjar Pharmacy",
//     email: "info@alnajjarpharmacy.com",
//     address: "Al Ahmadi, Block 1, Street 11",
//     mobile: "+965 98765432",
//     productName: "Atorvastatin",
//     total: "6.75 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10011",
//   },
//   {
//     id: 12,
//     pic: pic3,
//     name: "Al-Wataniya Pharmacy",
//     email: "info@alwataniyapharmacy.com",
//     address: "Jabriya, Block 3, Street 12",
//     mobile: "+965 87654321",
//     productName: "Metformin",
//     total: "4.25 KWD",
//     detail: "Pack of 60 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10012",
//   },
//   {
//     id: 13,
//     pic: pic2,
//     name: "Al-Hikma Pharmacy",
//     email: "info@alhikmapharmacy.com",
//     address: "Salmiya, Block 6, Street 13",
//     mobile: "+965 23456789",
//     productName: "Warfarin",
//     total: "2.75 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10013",
//   },
//   {
//     id: 14,
//     pic: pic4,
//     name: "Al-Dunya Pharmacy",
//     email: "info@aldunyapharmacy.com",
//     address: "Hawally, Block 2, Street 14",
//     mobile: "+965 65432109",
//     productName: "Lisinopril",
//     total: "3.5 KWD",
//     detail: "Pack of 28 tablets",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10014",
//   },
//   {
//     id: 15,
//     pic: pic5,
//     name: "Al-Shifa Pharmacy",
//     email: "info@alshifapharmacy.com",
//     address: "Mubarak Al-Kabeer, Block 5, Street 15",
//     mobile: "+965 12345678",
//     productName: "Simvastatin",
//     total: "5 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10015",
//   },
//   {
//     id: 16,
//     pic: pic7,
//     name: "Al-Jamila Pharmacy",
//     email: "info@aljamilapharmacy.com",
//     address: "Salmiya, Block 8, Street 16",
//     mobile: "+965 98765432",
//     productName: "Amlodipine",
//     total: "2.5 KWD",
//     detail: "Pack of 20 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10016",
//   },
//   {
//     id: 17,
//     pic: pic6,
//     name: "Al-Rahma Pharmacy",
//     email: "info@alrahmapharmacy.com",
//     address: "Hawally, Block 4, Street 17",
//     mobile: "+965 23456789",
//     productName: "Metoprolol",
//     total: "3 KWD",
//     detail: "Pack of 30 tablets",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10017",
//   },
//   {
//     id: 18,
//     pic: pic8,
//     name: "Al-Saad Pharmacy",
//     email: "info@alsaadpharmacy.com",
//     address: "Fahaheel, Block 7, Street 18",
//     mobile: "+965 65432109",
//     productName: "Cephalexin",
//     total: "4.5 KWD",
//     detail: "Pack of 20 capsules",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10018",
//   },
//   {
//     id: 19,
//     pic: pic1,
//     name: "Al-Wifaq Pharmacy",
//     email: "info@alwifaqpharmacy.com",
//     address: "Mishref, Block 2, Street 19",
//     mobile: "+965 12345678",
//     productName: "Fluoxetine",
//     total: "2.25 KWD",
//     detail: "Pack of 30 capsules",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10019",
//   },
//   {
//     id: 20,
//     pic: pic3,
//     name: "Al-Amana Pharmacy",
//     email: "info@alamanapharmacy.com",
//     address: "Al Ahmadi, Block 6, Street 20",
//     mobile: "+965 98765432",
//     productName: "Prednisone",
//     total: "3.75 KWD",
//     detail: "Pack of 20 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10020",
//   },
//   {
//     id: 21,
//     pic: pic2,
//     name: "Al-Saeed Pharmacy",
//     email: "info@alsaedpharmacy.com",
//     address: "Salmiya, Block 1, Street 21",
//     mobile: "+965 23456789",
//     productName: "Metronidazole",
//     total: "2.5 KWD",
//     detail: "Pack of 14 tablets",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10021",
//   },
//   {
//     id: 22,
//     pic: pic1,
//     name: "Al-Taqwa Pharmacy",
//     email: "info@altaqwapharmacy.com",
//     address: "Hawally, Block 5, Street 22",
//     mobile: "+965 65432109",
//     productName: "Levothyroxine",
//     total: "4 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10022",
//   },
//   {
//     id: 23,
//     pic: pic3,
//     name: "Al-Huda Pharmacy",
//     email: "info@alhudapharmacy.com",
//     address: "Mubarak Al-Kabeer, Block 3, Street 23",
//     mobile: "+965 12345678",
//     productName: "Azithromycin",
//     total: "6.5 KWD",
//     detail: "Pack of 6 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10023",
//   },
//   {
//     id: 24,
//     pic: pic4,
//     name: "Al-Rahman Pharmacy",
//     email: "info@alrahmanpharmacy.com",
//     address: "Salmiya, Block 4, Street 24",
//     mobile: "+965 98765432",
//     productName: "Losartan",
//     total: "3.25 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10024",
//   },
//   {
//     id: 25,
//     pic: pic5,
//     name: "Al-Noor Pharmacy",
//     email: "info@alnoorpharmacy.com",
//     address: "Hawally, Block 8, Street 25",
//     mobile: "+965 23456789",
//     productName: "Hydrochlorothiazide",
//     total: "2.75 KWD",
//     detail: "Pack of 20 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10025",
//   },
//   {
//     id: 26,
//     pic: pic6,
//     name: "Al-Mawaddah Pharmacy",
//     email: "info@almawaddahpharmacy.com",
//     address: "Fintas, Block 2, Street 26",
//     mobile: "+965 65432109",
//     productName: "Metoclopramide",
//     total: "4.5 KWD",
//     detail: "Pack of 10 tablets",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10026",
//   },
//   {
//     id: 27,
//     pic: pic7,
//     name: "Al-Saif Pharmacy",
//     email: "info@alsaifpharmacy.com",
//     address: "Mishref, Block 6, Street 27",
//     mobile: "+965 12345678",
//     productName: "Dextromethorphan",
//     total: "1.5 KWD",
//     detail: "Cough syrup",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10027",
//   },
//   {
//     id: 28,
//     pic: pic8,
//     name: "Al-Farhan Pharmacy",
//     email: "info@alfarhanpharmacy.com",
//     address: "Al Ahmadi, Block 4, Street 28",
//     mobile: "+965 98765432",
//     productName: "Folic Acid",
//     total: "2 KWD",
//     detail: "Pack of 30 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10028",
//   },
//   {
//     id: 29,
//     pic: pic4,
//     name: "Al-Mutawa Pharmacy",
//     email: "info@almutawapharmacy.com",
//     address: "Salmiya, Block 7, Street 29",
//     mobile: "+965 23456789",
//     productName: "Ibuprofen Gel",
//     total: "3.75 KWD",
//     detail: "Tube of 50g",
//     status: false,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10029",
//   },
//   {
//     id: 30,
//     pic: pic3,
//     name: "Al-Khayr Pharmacy",
//     email: "info@alkhayrpharmacy.com",
//     address: "Hawally, Block 3, Street 30",
//     mobile: "+965 65432109",
//     productName: "Vitamin D",
//     total: "2.25 KWD",
//     detail: "Pack of 60 tablets",
//     status: true,
//     country: "Kuwait",
//     state: "Kuwait City",
//     zipcode: "10030",
//   },
// ];

const XrayOrderList = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modal1Open, setModal1Open] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [errorData, setErrorData] = useState(0);

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const [orderListState, setOrderListState] = useState()

  const orderlistPost = usePost();

  useEffect(() => {
    orderlistPost?.postData(
      `get_blood_test_orders?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`,
      {},
      (res) => {
        console.log("ressss", res?.data)
        setOrderListState(res)
      }
    );
  }, [page])

  // const getHospital = useFetch(
  //   `${process.env.REACT_APP_GET_BLOOD_TEST_ORDERS}?per_page=${rowsPerPage}&page=${page}&is_laboratory=${0}`
  // )

  // const rows = getHospital.data
  // console.log("roesss", rows?.data)

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDoctorImageClick = () => {
    // Create a file input element and trigger a click event
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
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
      setImage(URL.createObjectURL(file));
    };
    input.click();
  };




  const getHospital = useFetch(
    `${process.env.REACT_APP_GET_HOSPITAL_DATA}?per_page=${rowsPerPage}&page=${page}`
  );

  const rows = orderListState
  console.log("roesss", rows)

  const totalRows = rows?.data?.total;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows?.data?.data

  console.log("visibleRows", visibleRows)

  // const totalRows = rows.length;
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  // const startIndex = page * rowsPerPage;
  // const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  // const visibleRows = rows
  //   .filter((item) => {
  //     var lcInfo = searchQuery.toLocaleLowerCase();
  //     return lcInfo === ""
  //       ? item
  //       : item.name.toLocaleLowerCase().includes(lcInfo) ||
  //       item.address.toLocaleLowerCase().includes(lcInfo) ||
  //       item.mobile.toLocaleLowerCase().includes(lcInfo) ||
  //       item.country.toLocaleLowerCase().includes(lcInfo) ||
  //       item.zipcode.toLocaleLowerCase().includes(lcInfo) ||
  //       item.state.toLocaleLowerCase().includes(lcInfo);
  //   })
  //   ?.slice(startIndex, endIndex);



  return (
    <>
      <div className="row  ml-0 mx-2 " style={{ overflowX: "hidden" }}>
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
                <TableCell className="number" align="left">
                  #
                </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Mobile No.</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Details</TableCell>
                <TableCell align="left">Status</TableCell>
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
              {!orderlistPost?.isLoading ? visibleRows?.map(({
                id,
                profile_pic,
                name,
                email,
                address,
                contact,
                country,
                state,
                zipcode,
                status,
                productName,
                user,
                total_amount,
                order_items,
                profile,
                blood_test,
              }, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" className="number">
                    {((page - 1) * rowsPerPage + index) + 1}
                  </TableCell>
                  <TableCell align="left">
                    <CardHeader
                      sx={{ padding: "0px" }}
                      avatar={
                        <Box
                          sx={{
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
                          }}
                        >
                          <Avatar alt={user?.name} src={`${process.env.REACT_APP_IMAGE_URL + '/' + user?.profile_pic}`} />
                        </Box>
                      }


                      title={user?.name}
                    />
                  </TableCell>
                  <TableCell align="center">{user?.email}</TableCell>
                  <TableCell align="center">{user?.address ? user?.address : '-'}</TableCell>
                  <TableCell align="center">{user?.contact}</TableCell>
                  <TableCell align="center">{order_items?.map((item, index) => (
                    <div className="d-flex justify-content-start">
                      <li className="m-0 p-0">
                          {item?.bloodtest?.title}
                      </li>
                      <br />
                    </div>
                  ))}</TableCell>
                  <TableCell align="center">{total_amount}</TableCell>
                  <TableCell align="center">
                    <button
                      onClick={() => {
                        navigate(`/xray/detail/${id}`);
                      }}
                      className="btn-add-new-doc pharmacy-view-detail"
                    >
                      View detail
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    {status === null ? (
                      <div className="d-flex justify-content-center">
                        <img src={NullIcon} alt="" />
                      </div>
                    ) : status === 1 ? (
                      <button className="pharmacy-order-status ">
                        Accepted
                      </button>
                    ) : status === 0 ? (
                      <button className="pharmacy-order-status " style={{ color: '#EC826E', backgroundColor: "#f1938097" }}>
                        Declined
                      </button>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              )
              )
                :
                <TableRow>
                  <TableCell colSpan={9}>
                    <ListSkeleton totalRow={4} totalCol={9} image={true} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="pagination-container px-md-3 ml-md-1 mt-md-2 ">
                <div className="pagination-detail">
                    Showing {(page -1) * rowsPerPage + 1} -{" "}
                    {rows?.data?.to} of {rows?.data?.total}
                </div>
                <CustomPagination
                    page={page}
                    totalPages={totalPages}
                    onChangePage={handleChangePage}
                />
            </div>
    </>
  );
};

export default XrayOrderList;
