import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/pages/chatpage.css";
import BotIcon from "../assets/chat/bot.png";
import UserIcon from "../assets/chat/user.png";
import InfoIcon from "../assets/chat/info.png";
import LoadingGif from "../assets/chat/writing-loading.gif";

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
          <span dangerouslySetInnerHTML={{ __html: text }} />
        )}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true); // 로딩 상태로 설정

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

        if (!res.body) {
          throw new Error("ReadableStream not supported");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let botMessage = "";

        // 타이핑 애니메이션 초기화
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: "bot", text: "", isLoading: true },
        ]);

        // 서버로부터 데이터를 스트리밍으로 읽기
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          botMessage += chunk;

          // "." 뒤에 <br/>을 추가하여 줄바꿈 처리
          const formattedMessage = botMessage.replace(/\./g, ".<br/>");

          // 실시간으로 메시지 업데이트
          setChatHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            newHistory[newHistory.length - 1] = {
              type: "bot",
              text: formattedMessage,
              isLoading: false,
            };
            return newHistory;
          });
        }

        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error("Failed to send message:", error);
        setLoading(false);
        streamMessage("Failed to send message. Please try again.", "bot"); // 에러 메시지 타이핑 애니메이션으로 표시
      }
    }
  };

  const streamMessage = (fullMessage, type = "bot") => {
    // "." 뒤에 <br/>을 추가하여 줄바꿈 처리
    const formattedMessage = fullMessage.replace(/\./g, ".<br/>");

    let index = 0;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type, text: "" }, // 빈 메시지 추가하여 애니메이션 준비
    ]);

    const interval = setInterval(() => {
      index++;
      setChatHistory((prevHistory) => {
        const lastMessage = prevHistory[prevHistory.length - 1];
        const updatedMessage =
          lastMessage.text + formattedMessage.slice(index - 1, index); // 문자를 한 번에 하나씩 추가
        const newHistory = [
          ...prevHistory.slice(0, -1),
          { ...lastMessage, text: updatedMessage },
        ];
        return newHistory;
      });
      if (index >= formattedMessage.length) {
        clearInterval(interval);
      }
    }, 50); // 글자당 50ms 간격으로 추가
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

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
        YEPPI
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
            <h1>YEPPI BOT에 오신 것을 환영합니다!</h1>
            <p>
              YEPPI는 수많은 데이터를 통해 최적의 태양광 발전소 부지를
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
          onKeyPress={handleKeyPress}
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
