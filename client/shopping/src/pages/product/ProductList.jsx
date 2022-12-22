import React from "react";

import Navbar from "../../components/navbar/Navbar";
import Products from "../../components/product/Products";
import NewLetter from "../../components/newLetter/NewLetter";
import Footer from "../../components/footer/Footer";
import "./productList.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ProductList = () => {
  const location = useLocation();
  const cate = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <div className="proL_container">
      <Navbar />
      <h1 className="proL_title">{cate}</h1>
      <div className="proL_filterContainer">
        <div className="proL_filterItem">
          <div className="proL_filterText">Filter Product:</div>
          <select
            name="color"
            id=""
            className="proL_select"
            onChange={handleFilter}
            defaultValue={"1"}
          >
            <option value="1" disabled className="proL_option">
              Color
            </option>
            <option value="white" className="proL_option">
              White
            </option>
            <option value="black" className="proL_option">
              Black
            </option>
            <option value="red" className="proL_option">
              Red
            </option>
            <option value="blue" className="proL_option">
              Blue
            </option>
            <option value="yellow" className="proL_option">
              Yellow
            </option>
            <option value="green" className="proL_option">
              Green
            </option>
          </select>
          <select
            name="size"
            id=""
            className="proL_select"
            onChange={handleFilter}
            defaultValue={"1"}
          >
            <option value="1" disabled className="proL_option">
              Size
            </option>
            <option value="XS" className="proL_option">
              XS
            </option>
            <option value="S" className="proL_option">
              S
            </option>
            <option value="M" className="proL_option">
              M
            </option>
            <option value="L" className="proL_option">
              L
            </option>
            <option value="XL" className="proL_option">
              XL
            </option>
            <option value="XXL" className="proL_option">
              XXL
            </option>
          </select>
        </div>
        <div className="proL_filterItem">
          <div className="proL_filterText">Sort Product:</div>
          <select name="" id="" className="proL_select" onChange={e=>setSort(e.target.value)}>
            <option value="Newest" className="proL_option">
              Newest
            </option>
            <option value="asc" className="proL_option">
              Price (asc)
            </option>
            <option value="desc" className="proL_option">
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products cate={cate} filter={filter} sort={sort}/>
      <NewLetter />
      <Footer />
    </div>
  );
};

export default ProductList;
