import React, { useState } from "react";
import "../assets/styles/pages/chatpage.css";
import BotIcon from "../assets/chat/leaf.png";
import UserIcon from "../assets/chat/user.png";
import InfoIcon from "../assets/chat/info.png";

const ChatMessage = ({ type, text }) => {
  return (
    <div className={`message-${type}`}>
      <img
        src={type === "bot" ? BotIcon : UserIcon}
        alt={`${type} icon`}
        className="icon"
      />
      <div className={`message-bubble-${type}`}>{text}</div>
    </div>
  );
};

const ChatPage = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // 메시지를 전송하는 로직을 여기에 추가하세요 (예: API 호출)
      console.log("Sent message:", message);
      setMessage(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>
          <img src={BotIcon} className="icon" alt="bot icon" />
        </span>
        AENERGY Bot
        <span>
          <img src={InfoIcon} className="info-icon" alt="info icon" />
        </span>
      </div>
      <div className="chat-body">
        <ChatMessage
          type="bot"
          text="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        />
        <ChatMessage
          type="user"
          text="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        />
        {/* 추가 메시지 */}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={message}
          onChange={handleMessageChange}
          placeholder="input message"
        />
        <button className="message-send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
