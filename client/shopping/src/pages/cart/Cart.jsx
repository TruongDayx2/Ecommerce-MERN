import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from '../../components/chatbot/Chat'

import "./cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
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
            {cart.products?.map((product,index) => (
              <div className="cart_product" key={index}>
                <div className="cart_productDetail">
                  <img
                    src={product.img}
                    alt=""
                    className="cart_proImg"
                  />
                  <div className="cart_proDetail">
                    <span className="cart_proName">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="cart_proId">
                      <b>Id:</b> {product._id}
                    </span>
                    <div className="cart_proColor" style={{ backgroundColor: `${product.color}` }}></div>
                    <span className="cart_proSize">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="cart_priceDetail">
                  <div className="cart_proAmountContainer">
                    <Remove />
                    <div className="cart_proAmount">{product.quantity}</div>
                    <Add />
                  </div>
                  <div className="cart_proPrice">$ {product.price * product.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart_summary">
            <h1 className="cart_summaryTitle">ORDER SUMMARY</h1>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Subtotal</span>
              <span className="cart_summaryItem_Price">$ {cart.total}</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Estimated Shipping</span>
              <span className="cart_summaryItem_Price">$ 5</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Shipping Discount</span>
              <span className="cart_summaryItem_Price">$ -5</span>
            </div>
            <div className="cart_summaryItem" style={{ fontWeight: "500", fontSize: "24px" }}>
              <span className="cart_summaryItem_Text">Total</span>
              <span className="cart_summaryItem_Price">$ {cart.total}</span>
            </div>
            <button className="cart_summaryBtn">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
      <Chat/>
    </div>
  );
};

export default Cart;
