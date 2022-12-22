import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import NewLetter from "../../components/newLetter/NewLetter";

import "./product.css";

const Product = () => {

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) =>{
        if (type === 'plus'){
            setQuantity(quantity+1)
        }else{
            setQuantity(quantity-1 < 1 ? 1 : quantity - 1)
        }
    }

  return (
    <div className="p_container">
      <Navbar />
      <div className="p_wrapper">
        <div className="p_imgContainer">
          <img
            src="https://cdn.ssstutter.com/products/po0EUQXd52Ks47dT/112022/1667904313497.jpeg"
            alt=""
            className="p_img"
          />
        </div>
        <div className="p_infoContainer">
          <h1 className="p_title">CITY SWEATSHIRT</h1>
          <p className="p_desc">
            Sweatshirt with a firm neckline, elastic sleeves and tail Graphic hand-embroidered
            letters, chest position. Thickened crab leg felt material, keeps warm well Model 1m75
            tall, weighs 60kg, wears size 2
          </p>
          <span className="p_price">$ 100</span>
          <div className="p_filterContainer">
            <div className="p_filter">
                <span className="p_filterTitle">Color</span>
                <div className="p_filterColor" style={{backgroundColor:"red"}}></div>
                <div className="p_filterColor" style={{backgroundColor:"blue"}}></div>
                <div className="p_filterColor" style={{backgroundColor:"black"}}></div>
            </div>
            <div className="p_filter">
                <span className="p_filterTitle">Size</span>
                <select name="" id="" className="p_filterSize" defaultValue={'XS'}>
                    <option value="XS" className="p_filterSizeOption">XS</option>
                    <option value="S" className="p_filterSizeOption">S</option>
                    <option value="M" className="p_filterSizeOption">M</option>
                    <option value="L" className="p_filterSizeOption">L</option>
                    <option value="XL" className="p_filterSizeOption">XL</option>
                </select>
            </div>
          </div>
          <div className="p_addContainer">
            <div className="p_amountContainer">
                <div className="p_minus" onClick={()=>updateQuantity('minus')}>
                    <Remove/>
                </div>
                <span className="p_amount">{quantity}</span>
                <div className="p_plus" onClick={()=>updateQuantity('plus')}>
                    <Add/>
                </div>
            </div>
            <button className="p_addBtn">ADD TO CART</button>
          </div>
        </div>
      </div>
      <NewLetter />
      <Footer />
    </div>
  );
};

export default Product;
