import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/mainpage.jsx';
import ConsumptionProduction from './pages/consumptionProduction.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import ChatPage from './pages/chatpage.jsx';
import './App.css';
import ScrollToTop from './scrollToTop.js';

const AppContent = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mapchart" element={<ConsumptionProduction />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      {location.pathname !== "/chat" && <Footer />} {/* /chat 페이지가 아닐 때만 Footer 렌더링 */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
