import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./setting.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const Setting =()=>{

  const [name,setName]= useState('')

  const user = useSelector((state) => state.user.currentUser);
  console.log(user)
  return(
    <div className="st_container">
      <Navbar/>
      <div className="st_wrapper">
      <h1 className="or_title">SETTING</h1>
        <div className="or_hr">
          <hr width="80%" align="center" />
        </div>
        <div className="or_bottom">

        </div>
        <div className="or_summary" style={{height:'50vh',width:'500px'}}>
            <h1 className="or_summaryTitle">YOUR ACCOUNT</h1>
            <div className="or_summaryItem1" style={{marginTop:'20px'}}>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686158191~exp=1686158791~hmac=90f109c0ea044668acce0c21e1720fa08290b26ab740aca8aa9572a1a62f6732" alt="" style={{height:'70px',width:'70px'}} />
            <button style={{height:'20px',marginLeft:'10px'}}>Choose</button>
            </div>
            <div className="or_summaryItem1" style={{marginTop:'20px'}}>
              <span className="or_summaryItem_Text" style={{marginRight:'20px'}}>Email</span>
              <span className="or_summaryItem_Price">{user.data[0].email}</span>
              <span className="or_summaryItem_Price"></span>
            </div>
            <div className="or_summaryItem1" style={{marginTop:'20px'}}>
              <span className="or_summaryItem_Text" style={{marginRight:'20px'}}>FirstName</span>
              <input  onChange={e=>setName(e.target.value)}/>
              <span className="or_summaryItem_Price"></span>
            </div>
            <div className="or_summaryItem1" style={{marginTop:'20px'}}>
              <span className="or_summaryItem_Text" style={{marginRight:'20px'}}>LastName</span>
              <input  onChange={e=>setName(e.target.value)}/>
              <span className="or_summaryItem_Price"></span>
            </div>
            <div className="or_summaryItem1" style={{marginTop:'20px'}}>
              <span className="or_summaryItem_Text" style={{marginRight:'20px'}}>Password </span>
              <input  onChange={e=>setName(e.target.value)}/>
              <span className="or_summaryItem_Price"></span>
            </div>
          </div>
      </div>
      <Footer/>
      <Chat/>
    </div>
  )
}

export default Setting;