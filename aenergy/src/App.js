import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main.jsx';
import ConsumptionProduction from './pages/consumptionProduction.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/conpro" element={<ConsumptionProduction />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
