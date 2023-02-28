import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(cart.products.quantity);


  console.log(cart)
  

  const updateQuantity = (type) => {
    // if (type === "plus") {
    //   console.log(product.quantity - quantity)
    //   product.quantity - quantity >0 ? setQuantity(quantity + 1) : console.log('San pham da het')
    // } else {
    //   quantity > 1 && setQuantity(quantity - 1);
    // }
    console.log(type)
  };

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
            {cart.products?.map((product, index) => (
              <div className="cart_product" key={index}>
                <div className="cart_productDetail">
                  <img src={product.img} alt="" className="cart_proImg" />
                  <div className="cart_proDetail">
                    <span className="cart_proName">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="cart_proId">
                      <b>Id:</b> {product._id}
                    </span>
                    <div
                      className="cart_proColor"
                      style={{ backgroundColor: `${product.color}` }}
                    ></div>
                    <span className="cart_proSize">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="cart_priceDetail">
                  <div className="cart_proAmountContainer">
                    <div className="p_minus" onClick={() => updateQuantity(["minus",product])}>
                      <Remove />
                    </div>
                    <span className="cart_proAmount">{product.quantity}</span>
                    <div className="p_plus" onClick={() => updateQuantity(["plus",product])}>
                      <Add />
                    </div>
                  </div>
                  <div className="cart_proPrice">VND {product.price * product.quantity}.000</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart_summary">
            <h1 className="cart_summaryTitle">ORDER SUMMARY</h1>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Subtotal</span>
              <span className="cart_summaryItem_Price">VND {cart.total}.000</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Estimated Shipping</span>
              <span className="cart_summaryItem_Price">VND 5000</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Shipping Discount</span>
              <span className="cart_summaryItem_Price">VND -5000</span>
            </div>
            <div className="cart_summaryItem" style={{ fontWeight: "500", fontSize: "24px" }}>
              <span className="cart_summaryItem_Text">Total</span>
              <span className="cart_summaryItem_Price">VND {cart.total}.000</span>
            </div>
            <button className="cart_summaryBtn">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
      <Chat />
    </div>
  );
};

export default Cart;
