import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/pages/chatpage.css";
import BotIcon from "../assets/chat/bot.png";
import UserIcon from "../assets/chat/user.png";
import InfoIcon from "../assets/chat/info.png";
import LoadingGif from "../assets/chat/writing-loading.gif"; // 로딩 GIF 이미지 가져오기

const ChatMessage = ({ type, text, isLoading }) => {
  return (
    <div className={`message-${type}`}>
      <img
        src={type === "bot" ? BotIcon : UserIcon}
        alt={`${type} icon`}
        className="icon"
      />
      <div className={`message-bubble-${type}`}>
        {isLoading ? (
          <img src={LoadingGif} alt="Loading..." className="loading-gif" />
        ) : (
          text
        )}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
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

      // 로딩 상태로 설정
      setLoading(true);

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

        // 로딩 상태 해제하고, 서버 응답을 채팅 기록에 추가
        setLoading(false);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "bot", text: data.response },
        ]);
      } catch (error) {
        console.error("Failed to send message:", error);
        // 로딩 상태 해제하고, 오류 메시지를 추가
        setLoading(false);
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
  }, [chatHistory, loading]);

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
          <>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} type={chat.type} text={chat.text} />
            ))}
            {loading && <ChatMessage type="bot" isLoading={true} />}{" "}
            {/* 로딩 중일 때 로딩 메시지 표시 */}
          </>
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
