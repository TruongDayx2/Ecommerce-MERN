import React from "react";
import { Link } from "react-router-dom";

import "./categoryItem.css";

const CategoryItem = ({ item }) => {
  return (
    <div className="cateItem_container">
      <Link to={`/products/${item.cate}`}>
        <img src={item.img} alt="" className="cateItem_img" />
        <div className="cateItem_info">
          <h1 className="cateItem_title">{item.title}</h1>
          <button className="cateItem_btn">SHOW NOW</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
