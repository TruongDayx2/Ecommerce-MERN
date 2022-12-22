import { useState } from "react";
import "./Message.css";

const Message = ({ message }) => {
  const str = message.message 

  
  return (  
    <>
      {message.role === "You" ? (
        <div className="chat__message cus">
          {/* <img src={message.user.photoURL} alt="User avatar" /> */}
          <span>{message.role}</span>
          <p>{message.message}</p>
        </div>
      ) : (
        <div className="chat__message ">
          {/* <img src={message.user.photoURL} alt="User avatar" /> */}
          <span>{message.role}</span>
          { str.search('http')>=0 ? <a href={str}>{str}</a>:<p>{str}</p>}
        </div>
      )}
    </>
  );
};

export default Message;
