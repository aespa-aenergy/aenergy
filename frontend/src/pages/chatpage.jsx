import React, { useState, useEffect, useRef } from "react";
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
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      // 사용자가 입력한 메시지를 채팅 기록에 추가
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: message },
      ]);

      // 메시지 전송 후 입력 필드 초기화
      setMessage("");

      try {
        const res = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                content: message,
              },
            ],
          }),
        });

        const data = await res.json();
        // 서버 응답을 채팅 기록에 추가
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "bot", text: data.response },
        ]);
      } catch (error) {
        console.error("Failed to send message:", error);
        // 오류 발생 시 에러 메시지를 추가
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "bot", text: "Failed to send message. Please try again." },
        ]);
      }
    }
  };

  // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
      <div
        className={`chat-body ${chatHistory.length === 0 ? "empty" : ""}`}
        ref={chatBodyRef}
      >
        {chatHistory.length === 0 ? (
          <div className="welcome-message">
            <h1>aenergy Bot에 오신 것을 환영합니다!</h1>
            <p>
              aenergy bot은 수많은 데이터를 통해 최적의 태양광 발전소 부지를
              추천해드립니다.
            </p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <ChatMessage key={index} type={chat.type} text={chat.text} />
          ))
        )}
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
