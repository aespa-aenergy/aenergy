import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/mainpage.jsx';
import ConsumptionProduction from './pages/consumptionProduction.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import ChatPage from './pages/chatpage.jsx';
import './App.css';
import ScrollToTop from './scrollToTop.js';

const App = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/conpro" element={<ConsumptionProduction />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes> 
      <Footer/>
    </Router>
  );
};

export default App;

/**
 * 
 * <Link to="/chatbot">Chatbot</Link>
        <Link to="/predictions">Predictions</Link>

        <Route path='/chatbot' element={<Chatbot />}/>
        <Route path='/chatbot' element={<Predictions />}/>
        
 */
