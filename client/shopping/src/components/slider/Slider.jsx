import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import "./slider.css";
import { sliderItems } from "../../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {};

  return (
    <div className="sl_container">
      <div className="sl_arrow sl_left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="sl_wrapper">
        {sliderItems.map((item) => (
          <div className="sl_slide">
            <div className="sl_img">
              <img
                src="https://cdn.ssstutter.com/products/po0EUQXd52Ks47dT/112022/1667804871800.jpeg"
                alt=""
                className="sl_img__item"
              />
              <img
                src="https://cdn.ssstutter.com/products/po0EUQXd52Ks47dT/112022/1667904482646.jpeg"
                alt=""
                className="sl_img__item"
              />
            </div>
            <div className="sl_info">
              <h1 className="sl_title">FALL into SWEATER</h1>
              <p className="sl_desc">Immerse Yourself in The Midst Of Nature</p>
              <button className="sl_btn">SHOW NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div className="sl_arrow sl_right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
