import { useState } from "react";
import "./Message.css";

const Message = ({ message }) => {
  const str = message.message;

  const [sr,setSr] = useState("")

  // console.log(str.search("@@@@"));
  // const s1 = str.split("@@@@")[0];
  // const s2 = str.split("@@@@")[1];


  const s1 = str.split("@@@@")[0];
  const s2 = str.split("@@@@")[1];

  // setSr(s2)
  // const s3 = s2.slice(str.search('@@@@'))
  if(str.lastIndexOf('@@@@') === str.search('@@@@')){
    var s3 = undefined
  }else{
    var s3 = str.slice(str.lastIndexOf('@@@@')+4)
  }

  // const s3 = str.slice(str.lastIndexOf('@@@@')+4)
  
  // console.log(s1);
  // console.log(s2);
  // console.log(s3);


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
          {str.search("@@@@") >= 0 ? (
            <>
              <p>{s1}</p>
              <a href={s2}>{s2}</a>
              <img src={s3} className="chat__message_img" />
            </>
          ) : (
            <p>{str}</p>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
