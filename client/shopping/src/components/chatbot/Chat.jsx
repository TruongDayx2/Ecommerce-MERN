import { ForumOutlined, RemoveOutlined, SendOutlined } from "@material-ui/icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import Message from "./Message";

const baseURL = "http://localhost:8080";

const mes = [];

const Chat = ({ user }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [turnChat, setTurnChat] = useState(false);
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

    if (input !== "" && input.trim() !== "") {
      const newMessage = {
        message: input,
        role: "You",
      };

      mes.push(newMessage);

      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
      // (async () => {
      //   // POST request using axios with async/await
      //   const mesPush = { msg: input  };
      //   const res = await axios.post("http://localhost:8080/api/chatbot", mesPush, axiosConfig);
      //   var newBotMessage = {
      //     message: res.data.response,
      //     role: "Bot",
      //   };
      //   console.log(res.data.response)

      // })();
      axios.post("http://localhost:8080/api/chatbot", { msg: input }, axiosConfig)
      .then((res) => {
        const newBotMessage = {
          message: res.data.response,
          role: "Bot",
        };

        mes.push(newBotMessage);
        setInput("");

      });

      // console.log("mes is here:", mes);

      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {!turnChat && (
        <div className="chat__icon" onClick={() => setTurnChat(!turnChat)}>
          <ForumOutlined style={{ fontSize: "50px" }} />
        </div>
      )}
      {turnChat && (
        <div className="chat__container">
          <div className="chat__box">
            <div className="chat__header">
              <div className="chat__header__left">
                <span>Welcome to 77Shop!</span>
                <p>Can I help you?</p>
              </div>
              <div className="chat__header__right" onClick={() => setTurnChat(!turnChat)}>
                <RemoveOutlined />
              </div>
            </div>
            <div className="chat__messages">
              {mes.map((message, index) => (
                <Message key={index} message={message} />
              ))}
              <div
                ref={scrollRef}
                style={{ float: "left", clear: "both", paddingTop: "4rem" }}
              ></div>
            </div>
            <div className="chat__input">
              <form
                onSubmit={sendMessages}
                style={{ width: "375px", display: "flex", alignItems: "center" }}
              >
                <input
                  type="text"
                  placeholder="Type a message here"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button>
                  <SendOutlined />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Chat;
