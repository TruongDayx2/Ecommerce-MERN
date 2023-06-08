import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Chat from "../../components/chatbot/Chat";

import "./setting.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const Setting = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [name, setName] = useState(user.data[0].name);
  const [lastName, setLastName] = useState(user.data[0].lastname);
  const [changePass, setChangePass] = useState(false);
  const [pass, setPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [cfPass, setCfPass] = useState('');

  const handleCancel =()=>{
    setName(user.data[0].name)
    setLastName(user.data[0].lastname)
    setChangePass(false)
    setPass('')
    setOldPass('')
    setNewPass('')
    setCfPass('') 
  }


  
  console.log(name)

  console.log(lastName);
  return (
    <div className="st_container">
      <Navbar />
      <div className="st_wrapper">
        <h1 className="or_title">SETTING</h1>
        <div className="or_hr">
          <hr width="80%" align="center" />
        </div>
        <div className="or_bottom"></div>
        <div className="or_summary" style={{ height: "60vh", width: "500px" }}>
          <h1 className="or_summaryTitle">YOUR ACCOUNT</h1>
          <div className="or_summaryItem1" style={{ marginTop: "20px",display:'flex',alignItems:'flex-end'}}>
            <img
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686158191~exp=1686158791~hmac=90f109c0ea044668acce0c21e1720fa08290b26ab740aca8aa9572a1a62f6732"
              alt=""
              style={{ height: "70px", width: "70px" }}
            />
            <button className="or_submitBtn" style={{ marginLeft:'20px',border:' 2px solid orange'}}>Choose</button>
          </div>
          <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
            <span className="or_summaryItem_Text" style={{ marginRight: "20px" }}>
              Email
            </span>
            <span className="or_summaryItem_Price">{user.data[0].email}</span>
            <span className="or_summaryItem_Price"></span>
          </div>
          <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
            <span className="or_summaryItem_Text" style={{ marginRight: "20px" }}>
              FirstName
            </span>
            <input onChange={(e) => setName(e.target.value)} value={name} />
            <span className="or_summaryItem_Price"></span>
          </div>
          <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
            <span className="or_summaryItem_Text" style={{ marginRight: "20px" }}>
              LastName
            </span>
            <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
            <span className="or_summaryItem_Price"></span>
          </div>
          {!changePass && (
            <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
              <span className="or_summaryItem_Text"  style={{ marginRight: "20px" }} >
                Password{" "}
              </span>
              <input  onChange={e=>setPass(e.target.value)} type='password' style={{ marginRight: "20px" }} value={pass}/>
              <button className="or_submitBtn" style={{border:' 2px solid orange'}} onClick={() => setChangePass(true)}>
                Change
              </button>
            </div>
          )}
          {changePass && (
            <>
              <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
                <span className="or_summaryItem_Text" style={{ marginRight: "50px" }}>
                  Old password{" "}
                </span>
                <input onChange={(e) => setOldPass(e.target.value)} type="password"/>
                <span className="or_summaryItem_Price"></span>
              </div>
              <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
                <span className="or_summaryItem_Text" style={{ marginRight: "45px" }}>
                  New password
                </span>
                <input onChange={(e) => setNewPass(e.target.value)} type="password"/>
                <span className="or_summaryItem_Price"></span>
              </div>
              <div className="or_summaryItem1" style={{ marginTop: "20px" }}>
                <span className="or_summaryItem_Text" style={{ marginRight: "20px" }}>
                  Confirm password
                </span>
                <input onChange={(e) => setCfPass(e.target.value)} type="password"/>
                <span className="or_summaryItem_Price"></span>
              </div>
            </>
          )}
          <div className="or_submit">
            <button className="or_cancelBtn" onClick={()=>handleCancel()} >Cancel</button>
            <button className="or_submitBtn">Submit</button>
          </div>

        </div>
      </div>
      <Footer />
      <Chat />
    </div>
  );
};

export default Setting;
