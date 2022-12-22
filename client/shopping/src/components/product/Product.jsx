import React from "react";

import "./product.css";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>
        <div className="pro_icon">
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
