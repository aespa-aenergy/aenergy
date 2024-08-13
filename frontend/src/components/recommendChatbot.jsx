import React from "react";

function RecommendChatbot({ onClickChatPage }) {
  return (
    <div className="recommend-chatbot">
      <h1>스마트하게 태양광 발전소 부지를 선정하세요! </h1>
      <h1>최신 AI 기술과 데이터 분석이 도와드립니다.</h1>
      <div className="chatbot-text">
        <p>
          aenergy의 챗봇은 최신 인공지능 기술과 수많은 데이터를 기반으로 태양광
          발전소 부지를 예측합니다.
        </p>
        <p>
          과학적 데이터와 인공지능의 힘을 결합하여 여러분의 태양광 발전소가 가장
          효율적인 위치에 자리 잡을 수 있도록 돕겠습니다.
        </p>
        <button className="chatbot-btn" onClick={onClickChatPage}>
          챗봇으로 추천받기
        </button>
      </div>
    </div>
  );
}

export default RecommendChatbot;
