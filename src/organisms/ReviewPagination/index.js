import React, { useState } from "react";
import "../../assets/css/common/datatable.scss";
import { Box, Typography } from "@mui/material";
import CustomPagination from "../../components/common/CustomPagination";

// images png
import pic1 from "../../assets/images/doctor/doc1.png";
import pic2 from "../../assets/images/doctor/doc2.png";
import pic3 from "../../assets/images/doctor/doc3.png";
import pic4 from "../../assets/images/doctor/doc4.png";
import { Link } from "react-router-dom";
import Review from "../../molecules/Review";

const rows = [
    {
        id: 1,
        pic: pic1,
        name: "Dr. Liam",
        review: "I highly recommend Dr. Liam. He was very knowledgeable and attentive to my concerns. He took the time to explain everything to me and made me feel comfortable throughout the process. The treatment I received from him was effective, and I saw significant improvement in my condition. Thank you, Dr. Liam!",
        rating: "5",
      },
      {
        id: 2,
        pic: pic2,
        name: "Dr. Emma",
        review: "Dr. Emma is an exceptional doctor who goes above and beyond for her patients. She is very knowledgeable and thorough in her approach. She took the time to explain my diagnosis and treatment options in detail, making sure I understood everything. Her caring and compassionate demeanor put me at ease during a stressful time. I highly recommend Dr. Emma to anyone in need of a great doctor.",
        rating: "4.5",
      },
      {
        id: 3,
        pic: pic3,
        name: "Dr. Oliver",
        review: "I had a fantastic experience with Dr. Oliver. He is not only an incredibly skilled doctor but also a great communicator. He listened attentively to my concerns and provided clear explanations of my treatment options. His expertise and professionalism gave me confidence in the care I was receiving. I'm thankful to have Dr. Oliver as my doctor and would recommend him without hesitation.",
        rating: "3.5",
      },
      {
        id: 4,
        pic: pic1,
        name: "Dr. Sophia",
        review: "Dr. Sophia is an amazing doctor who genuinely cares about her patients. She took the time to understand my medical history and provided personalized care tailored to my needs. Her compassionate and empathetic approach made me feel heard and supported throughout my treatment. I am grateful for her expertise and highly recommend her to anyone seeking a compassionate and skilled doctor.",
        rating: "4",
      },
      {
        id: 5,
        pic: pic4,
        name: "Dr. Benjamin",
        review: "Dr. Benjamin is an outstanding physician who goes above and beyond to ensure the well-being of his patients. He is thorough, attentive, and extremely knowledgeable. He explained my diagnosis in a way that was easy to understand and provided me with a comprehensive treatment plan. Thanks to Dr. Benjamin's expertise, I am now on the road to recovery. I highly recommend him.",
        rating: "3",
      },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "2",
     
     
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "3.5",
     
     
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 1,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 3,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 2,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 3,
    pic: pic2,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic4,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 1,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 2,
    pic: pic3,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 3,
    pic: pic3,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic1,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
  {
    id: 4,
    pic: pic3,
    name: "Dr. Liam",
    review: "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical ",
    rating: "4.5",
     
     
  },
];

const ReviewPagination = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const visibleRows = rows.slice(startIndex, endIndex);

  return (
    <>
      <div className="row w-100 ml-0 mx-2 " style={{ overflowX: "hidden" }}>
        {visibleRows.map(
          (items, index) => <Review key={index} items={items}/>
        )}
      </div>

      <div className="pagination-container w-100 px-md-3 ml-md-1 mt-md-2 ">
        <div className="pagination-detail">
          Showing {page * rowsPerPage + 1} -{" "}
          {Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}
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

export default ReviewPagination;
