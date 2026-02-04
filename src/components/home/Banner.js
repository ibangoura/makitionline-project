import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { 
  bannerImgOne, 
  bannerImgTwo, 
  bannerImgThree, 
  bannerImgFour, 
  bannerImgFive 
} from "../../assets/index";

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => setDotActive(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#f3a847",
                cursor: "pointer",
              }
            : {
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ccc",
                cursor: "pointer",
              }
        }
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const images = [bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive];

  return (
    <div className="w-full">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img 
                src={img} 
                alt={`banner-${index}`} 
                className="w-full h-auto object-cover" 
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;