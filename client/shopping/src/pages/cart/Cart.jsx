import { Add, Remove } from "@material-ui/icons";
import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import "./cart.css";

const Cart = () => {
  return (
    <div className="cart_container">
      <Navbar />
      <div className="cart_wrapper">
        <h1 className="cart_title">YOUR BAG</h1>
        <div className="cart_top">
          <button className="cart_topBtn">CONTINUE SHOPPING</button>
          <div className="cart_topTexts">
            <span className="cart_topText">Shopping Bag(2)</span>
            <span className="cart_topText">Your Wishlist(0)</span>
          </div>
          <button className="cart_topBtn">CHECKOUT NOW</button>
        </div>
        <div className="cart_bottom">
          <div className="cart_info">
            <div className="cart_product">
              <div className="cart_productDetail">
                <img
                  src="https://cdn.ssstutter.com/products/po0EUQXd52Ks47dT/112022/1668409522619.jpeg"
                  alt=""
                  className="cart_proImg"
                />
                <div className="cart_proDetail">
                  <span className="cart_proName">
                    <b>Product:</b> LONG SLEEVED SHIRT
                  </span>
                  <span className="cart_proId">
                    <b>Id:</b> 8391037456
                  </span>
                  <div className="cart_proColor" style={{ backgroundColor: "red" }}></div>
                  <span className="cart_proSize">
                    <b>Size:</b> L
                  </span>
                </div>
              </div>
              <div className="cart_priceDetail">
                <div className="cart_proAmountContainer">
                  <Add/>
                  <div className="cart_proAmount">2</div>
                  <Remove/>
                </div>
                <div className="cart_proPrice">$ 30</div>
              </div>
            </div>
            <hr className="cart_hr"></hr>
            <div className="cart_product">
              <div className="cart_productDetail">
                <img
                  src="https://cdn.ssstutter.com/products/po0EUQXd52Ks47dT/112022/1668409522619.jpeg"
                  alt=""
                  className="cart_proImg"
                />
                <div className="cart_proDetail">
                  <span className="cart_proName">
                    <b>Product:</b> LONG SLEEVED SHIRT
                  </span>
                  <span className="cart_proId">
                    <b>Id:</b> 8391037456
                  </span>
                  <div className="cart_proColor" style={{ backgroundColor: "red" }}></div>
                  <span className="cart_proSize">
                    <b>Size:</b> L
                  </span>
                </div>
              </div>
              <div className="cart_priceDetail">
                <div className="cart_proAmountContainer">
                  <Add/>
                  <div className="cart_proAmount">2</div>
                  <Remove/>
                </div>
                <div className="cart_proPrice">$ 30</div>
              </div>
            </div>
          </div>
          <div className="cart_summary">
            <h1 className="cart_summaryTitle">ORDER SUMMARY</h1>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Subtotal</span>
              <span className="cart_summaryItem_Price">$ 60</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Estimated Shipping</span>
              <span className="cart_summaryItem_Price">$ 5</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Shipping Discount</span>
              <span className="cart_summaryItem_Price">$ -5</span>
            </div>
            <div className="cart_summaryItem" style={{fontWeight:'500', fontSize:'24px'}}>
              <span className="cart_summaryItem_Text">Total</span>
              <span className="cart_summaryItem_Price">$ 60</span>
            </div>
            <button className="cart_summaryBtn">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
