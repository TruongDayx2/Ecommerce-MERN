import React from "react";

import Navbar from "../../components/navbar/Navbar";
import Products from "../../components/product/Products";
import NewLetter from "../../components/newLetter/NewLetter";
import Footer from "../../components/footer/Footer";
import "./productList.css";

const ProductList = () => {
  return (
    <div className="proL_container">
      <Navbar />
      <h1 className="proL_title">Shirt</h1>
      <div className="proL_filterContainer">
        <div className="proL_filterItem">
          <div className="proL_filterText">Filter Product:</div>
          <select name="" id="" className="proL_select">
            <option value="" disabled selected className="proL_option">
              Color
            </option>
            <option value="" className="proL_option">White</option>
            <option value="" className="proL_option">Black</option>
            <option value="" className="proL_option">Red</option>
            <option value="" className="proL_option">Blue</option>
            <option value="" className="proL_option">Yellow</option>
            <option value="" className="proL_option">Green</option>
          </select>
          <select name="" id="" className="proL_select">
            <option value="" disabled selected className="proL_option">
              Size
            </option>
            <option value="" className="proL_option">XS</option>
            <option value="" className="proL_option">S</option>
            <option value="" className="proL_option">M</option>
            <option value="" className="proL_option">L</option>
            <option value="" className="proL_option">XL</option>
            <option value="" className="proL_option">XXL</option>
          </select>
        </div>
        <div className="proL_filterItem">
          <div className="proL_filterText">Sort Product:</div>
          <select name="" id="" className="proL_select">
            <option value=""  selected className="proL_option">
              Newest
            </option>
            <option value="" className="proL_option">Price (asc)</option>
            <option value="" className="proL_option">Price (desc)</option>
        
          </select>
        </div>
      </div>
      <Products />
      <NewLetter />
      <Footer />
    </div>
  );
};

export default ProductList;
