import React from "react";

import { categories } from "../../data";
import CategoryItem from "./CategoryItem";
import './categories.css'

const Categories = () => {
  return (
    <div className="cate_container">
      {categories.map((item, index) => (
        <CategoryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Categories;
