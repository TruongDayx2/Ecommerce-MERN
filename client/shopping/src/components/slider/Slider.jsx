import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useCallback } from "react";
import { useState } from "react";
import "./slider.css";
import { sliderItems } from "../../data";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1 < 0 ? sliderItems.length - 1 : slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1 === sliderItems.length ? 0 : slideIndex + 1);
    }
  };

  const nextSlide = useCallback(() => {
    const index = slideIndex + 1 === sliderItems.length ? 0 : slideIndex + 1;
    setSlideIndex(index);
  }, [slideIndex]);

  useEffect(() => {
    const slideAuto = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => {
      clearInterval(slideAuto);
    };
  }, [nextSlide]);

  return (
    <div className="sl_container">
      <div className="sl_arrow sl_left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="sl_wrapper">
        {sliderItems.map((item, index) => (
          <HeroSliderItem key={index} item={item} active={index === slideIndex} />
        ))}
      </div>
      <div className="sl_arrow sl_right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

const HeroSliderItem = (props) => (
  <div className={`sl_slide ${props.active ? "active" : ""}`}>
    <div className="sl_img">
      <img src={props.item.img1} alt="" className="sl_img__item" />
      <img src={props.item.img2} alt="" className="sl_img__item" />
    </div>
    <div className="sl_info">
      <h1 className="sl_title">{props.item.title}</h1>
      <p className="sl_desc">{props.item.desc}</p>
      <Link to={`/products/${props.item.cate}`}>
        <button className="sl_btn">SHOW NOW</button>
      </Link>
    </div>
  </div>
);

export default Slider;
