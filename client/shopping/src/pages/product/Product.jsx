import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import NewLetter from "../../components/newLetter/NewLetter";
import { addProduct } from "../../redux/cartRedux";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import Chat from '../../components/chatbot/Chat'


import "./product.css";

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({...product, quantity, color, size}));
  };

  return (
    <div className="p_container">
      <Navbar />
      <div className="p_wrapper">
        <div className="p_imgContainer">
          <img src={product.img} alt="" className="p_img" />
        </div>
        <div className="p_infoContainer">
          <h1 className="p_title">{product.title}</h1>
          <p className="p_desc">{product.desc}</p>
          <span className="p_price">$ {product.price}</span>
          <div className="p_filterContainer">
            <div className="p_filter">
              <span className="p_filterTitle">Color</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  className={`p_filterColor ${color === c ? "active" : ""}`}
                  onClick={() => setColor(c)}
                >
                  <div className="p_circle" style={{ backgroundColor: `${c}` }}></div>
                </div>
              ))}
            </div>
            <div className="p_filter">
              <span className="p_filterTitle">Size</span>
              <select
                name=""
                id=""
                className="p_filterSize"
                onClick={(e) => setSize(e.target.value)}
              >
                {product.size?.map((s) => (
                  <option key={s} value={s} className="p_filterSizeOption">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="p_addContainer">
            <div className="p_amountContainer">
              <div className="p_minus" onClick={() => updateQuantity("minus")}>
                <Remove />
              </div>
              <span className="p_amount">{quantity}</span>
              <div className="p_plus" onClick={() => updateQuantity("plus")}>
                <Add />
              </div>
            </div>
            <button className="p_addBtn" onClick={handleClick}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <NewLetter />
      <Footer />
      <Chat/>
    </div>
  );
};

export default Product;
