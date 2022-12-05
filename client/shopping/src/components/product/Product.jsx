import React from "react";

import "./product.css";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";

const Product = ({ item }) => {
  return (
    <div className="pro_container">
      <div className="pro_circle"></div>
      <img src={item.img} alt="" className="pro_img" />
      <div className="pro_info">
        <div className="pro_icon">
          <ShoppingCartOutlined />
        </div>
        <div className="pro_icon">
          <SearchOutlined />
        </div>
        <div className="pro_icon">
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
