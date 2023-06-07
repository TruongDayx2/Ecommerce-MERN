import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./cart.css";
import { useEffect } from "react";
import { deleteCart, getCart, updateCart, updateCartOrder } from "../../redux/apiCart";
import { addOrder } from "../../redux/apiOrder";

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const cart = useSelector((state) => state.cart);

  const [data, setData] = useState([])
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState()
  const [ship, setShip] = useState(10)
  const [totalPrice, setTotalPrice] = useState(0)

  
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

  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      if (item.productId.inStock) {
        total += item.productId.price * item.quantity;
      }
    });
    setTotalPrice(total);
  }, [data]);

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

  const handleCheckOut=async()=>{
    if (address && phone && phone.toString().length === 10){
      console.log('xac nhan')

      const temp2 = data.map((obj)=>({
        ...obj,
        productId:obj.productId._id
      }))
      console.log(temp2)

      let token = user.token
      const idUser = user.data[0]._id

      const data1 = {
        "userId":idUser,
        "products":temp2,
        "amount":totalPrice + ship,
        "status":"pending",
        "address":address,
        "phone":phone
      }
      const res = await addOrder({token,idUser,data1})
      if (res.status === 200){
        console.log('You have successfully ordered')
        setData([])
        handleUpdateCartOrder()
        alert('You have successfully ordered');
      }
    }
  }
  const handleUpdateCartOrder= async()=>{
    let token = user.token
    const idUser = user.data[0]._id
    const res = await updateCartOrder({ token, idUser, data });
    if (res.status === 200) {
      console.log(' updateCart')
    }
  }

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
            <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
              <span className="cart_summaryItem_Text">Address</span>
              <input style={{marginTop:'10px'}} onChange={e=>setAddress(e.target.value)}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
              <span className="cart_summaryItem_Text">Phone</span>
              <input style={{marginTop:'10px'}} onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',marginBottom:'20px'}}>
              <span className="cart_summaryItem_Text">Delivery Method</span>
              <select
                style={{marginTop:'10px'}}
                onClick={(e) => setShip(e.target.value)}
              >
                <option key={'GHN'} value={10}>GHN</option>
                <option key={'GHTK'} value={15}>GHTK</option>
                <option key={'GH24h'} value={13}>GH24h</option>
              </select>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Order</span>
              <span className="cart_summaryItem_Price">$ {totalPrice}</span>
            </div>
            <div className="cart_summaryItem">
              <span className="cart_summaryItem_Text">Shipping</span>
              <span className="cart_summaryItem_Price">$ {ship}</span>
            </div>
            <div className="cart_summaryItem" style={{ fontWeight: "500", fontSize: "24px" }}>
              <span className="cart_summaryItem_Text">Total</span>
              <span className="cart_summaryItem_Price">$ {Number(ship) + totalPrice}</span>
            </div>
            <button className="cart_summaryBtn" onClick={()=>handleCheckOut()}>CHECKOUT NOW</button>
          </div>
        </div>
      </div>
      <Footer />
      <Chat />
    </div>
  );
};

export default Cart;
