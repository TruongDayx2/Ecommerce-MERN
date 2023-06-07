import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";
import { useSelector } from "react-redux";
import { CancelOrder, getOrders } from "../../redux/apiOrder";
import { useEffect, useState } from "react";
import "./order.css";
import { Button } from "@material-ui/core";

const Order = () => {
  const [data, setData] = useState([]);
  const [countByStatus, setCountByStatus] = useState({});
  const [detailModal, setDetailModal] = useState(false);
  const [detailItem, setDetailItem] = useState({});

  const user = useSelector((state) => state.user.currentUser);
  const fetchData = async () => {
    let token = user.token;
    const idUser = user.data[0]._id;
    const res = await getOrders({ token, idUser });
    if (res.status === 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    if (user) {
      
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    // Định nghĩa hàm đếm số lượng theo trường status
    const getCountByStatus = (data) => {
      const count = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      setCountByStatus(count);
    };

    // Gọi hàm đếm số lượng khi data thay đổi
    getCountByStatus(data);
  }, [data]);

  const handleDetail = (item) => {
    setDetailItem(item);
    setDetailModal(true);
  };

  const handleCancel = async(item)=>{
    let token = user.token
    const idUser = user.data[0]._id
    const id = item._id
    const res = await CancelOrder({token,idUser,id})
    if (res.status === 200) {
      alert('Cancel Successful')
      fetchData();

    }else{
      alert('Cancel Failed')
    }
  }

  return (
    <div className="or_container">
      <Navbar />
      <div className="or_wrapper">
        <h1 className="or_title">YOUR ORDERS</h1>
        <div className="or_hr">
          <hr width="80%" align="center" />
        </div>
        <div className="or_bottom">
          <div className="or_info">
            {data?.map((item, index) => (
              <div
                className="or_item"
                style={{
                  border: `1.5px solid ${
                    item.status === "pending"
                      ? "orange"
                      : item.status === "Delivered"
                      ? "teal"
                      : "red"
                  }`,
                }}
                key={index}
              >
                <div className="or_itemLeft">
                  <span className="or_id">
                    <b>Id:</b> {item._id}
                  </span>
                  <span className="or_id">
                    <b>Amount:</b> $ {item.amount}
                  </span>
                  <span className="or_id">
                    <b>Day:</b> {item.createdAt.slice(0, 10)}
                  </span>
                  <span className="or_id">
                    <b>Status:</b> {item.status}
                  </span>
                </div>
                <div className="or_itemRight">
                  {item.status === "pending" && (
                    <button onClick={()=>handleCancel(item)} className="or_detailBtn" style={{ color: "red", marginRight: "5px" }}>
                      Cancel
                    </button>
                  )}
                  <button onClick={() => handleDetail(item)} className="or_detailBtn">
                    Detail
                  </button>
                </div>
              </div>
            ))}
            {detailModal &&
              <div className="or_detailModal" style={{ position: 'fixed', height: '400px', overflow: 'auto' }}>
                <div style={{display:'flex', alignItems:'center', marginBottom:'10px',justifyContent:'space-between'}}>
                  <Button style={{border:'1px solid teal', }} onClick={()=>setDetailModal(false)}>close</Button>
                  <h3>Detail Order</h3>
                  <div></div>
                </div>
                {detailItem.products?.map((product, index) => (
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
                          <div>
                            <b>Color:</b>
                          </div>
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
                        
                        <span className="cart_proAmount">{product.quantity}</span>
                        
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <b>Total: </b>
                        <div className="cart_proPrice">
                          $ {product.productId.price * product.quantity}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            }
          </div>
          <div className="or_summary">
            <h1 className="or_summaryTitle">ORDER SUMMARY</h1>
            <div className="or_summaryItem">
              <span className="or_summaryItem_Text">Order</span>
              <span className="or_summaryItem_Price">{data.length}</span>
            </div>
            <div className="or_summaryItem">
              <span className="or_summaryItem_Text">Pending</span>
              <span className="or_summaryItem_Price">
                {countByStatus.pending ? countByStatus.pending : 0}
              </span>
            </div>
            <div className="or_summaryItem">
              <span className="or_summaryItem_Text">Delivery</span>
              <span className="or_summaryItem_Price">
                {countByStatus.Delivered ? countByStatus.Delivered : 0}
              </span>
            </div>
            <div className="or_summaryItem">
              <span className="or_summaryItem_Text">Cancel</span>
              <span className="or_summaryItem_Price">
                {countByStatus.Canceled ? countByStatus.Canceled : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Chat />
    </div>
  );
};

export default Order;
