import React from "react";

import "./products.css";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Products = ({ cate, filter, sort, catePath }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          catePath
            ? `http://localhost:5000/api/products/?category=${cate}/${catePath}`
            : cate
            ? `http://localhost:5000/api/products?category=${cate}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cate, catePath]);


  useEffect(() => {
    if (cate) {
      setFilterProducts([])
      if (filter.size) {
        const allowedSize = [];
        allowedSize.push(filter.size);
        const itemFilter = [];
        const itemFilter1 = [];
        for (let i = 0; i < products.length; i++) {
          let filtered = Object.keys(products[0].size_color).filter((key) =>
            allowedSize.includes(key)
          );
          if (filtered.length !== 0) {
            itemFilter.push(products[0]);
            itemFilter1.push(Object(products[0].size_color));
          }
        }
        if (filter.color) {
          // console.log("co size va color");
          const allowedColor = [];
          allowedColor.push(filter.color);

          const itemFilterAll = [];
          for (let i = 0; i < itemFilter1.length; i++) {
            let k = Object.keys(itemFilter1[i]);
            let v = Object.values(itemFilter1[i]);
            for (let j = 0; j < k.length; j++) {
              if (k[j] === allowedSize[0]) {
                let t = v[j];
                let check = Object.keys(t).filter((key) => allowedColor.includes(key));
                if (check.length !== 0) {
                  itemFilterAll.push(itemFilter[i]);
                }
              }
            }
          }
          setFilterProducts(itemFilterAll)
        } else {
          // console.log('Chi co size')
          setFilterProducts(itemFilter)
        }
      } else if (filter.color) {
        // console.log("chi co color");
        const itemFilter2 = []
        const itemFilter = []
        for (let i = 0; i < products.length; i++) {
          const allowedSizeAll = ['XS','S','M','L','XL','XXL']
          let filtered = Object.keys(products[0].size_color).filter((key) =>
            allowedSizeAll.includes(key)
          );
          if (filtered.length !== 0) {
            itemFilter.push(products[0]);
            itemFilter2.push(Object(products[0].size_color));
          }

        }


        const allowedColor = [];
          allowedColor.push(filter.color);

          const itemFilterAll = [];
          for (let i = 0; i < itemFilter2.length; i++) {
            let k = Object.keys(itemFilter2[i]);
            let v = Object.values(itemFilter2[i]);
            for (let j = 0; j < k.length; j++) {
                let t = v[j];
                let check = Object.keys(t).filter((key) => allowedColor.includes(key));
                if (check.length !== 0) {
                  itemFilterAll.push(itemFilter[i]);
                  break
                }
            }
          }
          setFilterProducts(itemFilterAll)
      } else {
        setFilterProducts(products)
      }
    }
  }, [cate, filter, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div className="proS_container">
      {cate
        ? filterProducts.map((item) => <Product item={item} key={item._id} />)
        : products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
    </div>
  );
};

export default Products;
