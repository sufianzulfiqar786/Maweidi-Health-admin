import React from "react";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import "../../assets/css/Carousel.scss";
import "../../assets/css/doctor.scss";
import { Rate } from "antd";

const CrouselCard = ({ el }) => {
  return (
    <>
      <div className="col-12 mt-lg-5 pt-lg-5 pt-4 d-flex justify-content-center">
        <img className="doc-review-pic cursor-pointer" src={el.pic} alt="" />
      </div>

      <div className="col-12 mt-3 d-flex justify-content-center flex-column align-items-center">
        <Stack spacing={1}>
          <Rating name="half-rating" defaultValue={3} precision={0.5} />
        </Stack>

        <p className="mb-0 pt-3 pb-4 review-name-detail">-Jane Coper</p>
      </div>
    </>
  );
};

export default CrouselCard;
