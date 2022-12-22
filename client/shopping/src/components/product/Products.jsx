import React from "react";

import "./products.css";
import { popularProducts } from "../../data";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Products = ({ cate, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cate
            ? `http://localhost:5000/api/products?category=${cate}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cate]);

  useEffect(() => {
    cate &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) => item[key].includes(value))
        )
      );
  }, [cate, filter, products]);

  useEffect(()=>{
    if(sort === "newest"){
      setFilterProducts(prev=>[...prev].sort((a,b)=>a.createdAt - b.createdAt))
    }else if ((sort === "asc")){
      setFilterProducts(prev=>[...prev].sort((a,b)=>a.price - b.price))
    }else {
      setFilterProducts(prev=>[...prev].sort((a,b)=>b.price - a.price))
    }
  },[sort])

  return (
    <div className="proS_container">
      {cate
        ? filterProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </div>
  );
};

export default Products;
