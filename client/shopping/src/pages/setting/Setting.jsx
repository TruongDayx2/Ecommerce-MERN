import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./setting.css";

const Setting =()=>{
  return(
    <div className="st_container">
      <Navbar/>
      <div className="st_wrapper">
        <h2>setting</h2>
      </div>
      <Footer/>
      <Chat/>
    </div>
  )
}

export default Setting;