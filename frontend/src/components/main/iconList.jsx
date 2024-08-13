import React from "react";

function IconList() {
  const items = [
    { id: 1, icon: "🏭", title: "에너지 소비 분석" },
    { id: 2, icon: "☀️", title: "신재생 에너지 발전" },
    { id: 3, icon: "📊", title: "미래 에너지 예측" },
    { id: 4, icon: "📈", title: "효율성 평가" },
    { id: 5, icon: "💬", title: "부지 추천 챗봇" },
  ];

  return (
    <div className="icon-list">
      <h1>Our Platform Features</h1>
      <div className="icon-list-items">
        {items.map((item) => (
          <div key={item.id} className="icon-list-item">
            <div className="icon">{item.icon}</div>
            <div className="title">{item.title}</div>
          </div>
        ))}
      </div>
      <div className="platform-description">
        <p>
          우리 플랫폼은 에너지 소비의 효율성을 극대화하고, 지속 가능한 미래를
          설계하는 데 필요한 모든 솔루션을 제공합니다.</p> <p>태양광 에너지 발전과
          에너지 소비 분석, 미래 에너지 수요 예측 등 다양한 기능을 통해 에너지
          관리의 새로운 기준을 제시합니다.</p> <p> AI와 빅데이터 분석을 기반으로, 우리는
          현재의 에너지 사용 패턴을 분석하고, 신재생
          에너지의 발전을 통해 청정 에너지 생산을 최적화합니다. </p> <p>더불어, 미래
          에너지 시장의 변동을 예측하여 에너지 자원의 최적화를 돕고, 효율적인
          에너지 소비를 실현할 수 있도록 지원합니다. </p> <p>또한, 맞춤형 부지 추천
          챗봇을 통해 신재생 에너지 발전을 위한 최적의 부지를 쉽고 빠르게 찾을
          수 있도록 도와드립니다. </p> <p>복잡한 에너지 관리와 미래 예측을 간편하게
          해결할 수 있는 이 플랫폼은, 기업과 개인 모두에게 지속 가능한 성장을
          위한 필수적인 도구가 될 것입니다.
        </p>
      </div>
    </div>
  );
}

export default IconList;
