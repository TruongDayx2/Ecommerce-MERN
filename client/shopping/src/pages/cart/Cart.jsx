import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./cart.css";
import { useEffect } from "react";
import { deleteCart, getCart, updateCart } from "../../redux/apiCart";

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const cart = useSelector((state) => state.cart);

  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      let token = user.token
      const idUser = user.data[0]._id
      const res = await getCart({ token, idUser });
      if (res.status === 200) {
        setData(res.data[0].products);
      }
    };
    fetchData();
  },[user]);



  const updateQuantity = (item,key) => {
    if (item.productId.inStock){
      const idItem = item._id
      const updateQuantity = data.map((item1)=>{
        const id = item1._id
        if(id === idItem){
          let quantity = item1.quantity
          if (key === 'minus' && quantity > 1) {
            quantity--;
          } else if (key === 'plus' && quantity < item1.productId.size_color[item.size][[item.color]]) {
            quantity++;
          } else if (key === 'plus' && quantity > item1.productId.size_color[item.size][[item.color]]) {
            quantity = item1.productId.size_color[item.size][[item.color]]
          }
          return {
            ...item1,
            quantity,
          };
        }
        return item1
      })
      setData(updateQuantity)
    }
  };

  const deleteData = async (list) => {
    let token = user.token
    const idUser = user.data[0]._id
    const res = await deleteCart({ token, idUser, list });
    if (res.status === 200) {
 
      alert('Successfull');
      // fetchData()
    }else{
      alert('Error');
    }
  }
  const handleDelete =(item)=>{
    const itemId = item._id
    const updatedData = data.filter(item1 => item1._id !== itemId);
    setData(updatedData)
    deleteData(item)
    console.log('dsa',updatedData)
  }

  useEffect(() => {
    const updateData = async () => {
      const token = user.token
      const idUser = user.data[0]._id
      console.log('first')
      const res = await updateCart({ token, idUser, data });
      if (res.status === 200) {
        console.log(' updateCart')
      }else{
        alert('Failed')
      }
    }
    updateData()
  }, [data,user])

  return (
    <div className="cart_container">
      <Navbar />
      <div className="cart_wrapper">
        <h1 className="cart_title">YOUR BAG</h1>
        <div className="cart_hr">
          <hr width="80%" align="center" />
        </div>
        <div className="cart_bottom">
          <div className="cart_info">
            {data?.map((product, index) => (
              <div className="cart_product" key={index}>
                <div className="cart_productDetail">
                  <img src={product.productId.img} alt="" className="cart_proImg" />
                  <div className="cart_proDetail">
                    <span className="cart_proName">
                      <b>Product:</b> {product.productId.title}
                    </span>
                    <span className="cart_proId">
                      <b>Id:</b> {product.productId._id}
                    </span>
                    <div className="cart_proColor1">
                      <div><b>Color:</b></div>
                      <div
                        className="cart_proColor"
                        style={{ backgroundColor: `${product.color}` }}
                      ></div>
                    </div>
                    <span className="cart_proSize">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                
                <div className="cart_priceDetail">
                  
                  <div className="cart_proAmountContainer">
                    <b>Quantity: </b>
                    <div className="p_minus" onClick={() => updateQuantity(product,"minus")}>
                      <Remove />
                    </div>
                    <span className="cart_proAmount">{product.quantity}</span>
                    <div className="p_plus" onClick={() => updateQuantity(product,"plus")}>
                      <Add />
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <b>Total: </b>
                    <div className="cart_proPrice">$ {product.productId.price * product.quantity}</div>
                  </div>
                </div>
                <div style={{marginRight:'20px',marginTop:'40px'}}>
                    <button className="cart_removeBtn" onClick={()=>handleDelete(product)}>X</button>
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
