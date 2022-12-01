import { RemoveOutlined } from "@material-ui/icons";
import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Message from "./Message";

const mes = []

const Chat = ({ user }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    // db.collection("messages")
    //   .orderBy("timestamp", "asc")
    //   .onSnapshot((snapshot) => {
    //     setMessages(
    //       snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    //     );
    //   });
  }, []);

  const sendMessages = (e) => {
    e.preventDefault();

    if (input !== "") {
      const newMessage = {
        message:input,
        role:'You',
      }

      mes.push(newMessage)
      setInput("");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      console.log(mes)
    }
  };

  return (
    <div className="chat__container">
      <div className="chat__box">
        <div className="chat__header">
          <div className="chat__header__left">
            <span>Welcome to 77Shop!</span>
            <p>Can I help you?</p>
          </div>
          <div className="chat__header__right">
            <RemoveOutlined/>
          </div>
        </div>
        <div className="chat__messages">
          {mes.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div
            ref={scrollRef}
            style={{ float: "left", clear: "both", paddingTop: "4rem" }}
          ></div>
        </div>
        <div className="chat__input">
          <form onSubmit={sendMessages} style={{width: "375px"}}>
            <input
              type="text"
              placeholder="Type a message here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button>&rarr;</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;