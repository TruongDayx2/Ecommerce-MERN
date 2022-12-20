import "./Message.css";

const Message = ({ message }) => {
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
          <p>{message.message}</p>
        </div>
      )}
    </>
  );
};

export default Message;
