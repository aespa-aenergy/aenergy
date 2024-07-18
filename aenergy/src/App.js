import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main.jsx';
// import Consumption from './pages/consumption.jsx';
// import Production from './pages/production.jsx';
// import Recommendations from './pages/recommendations.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/consumption" element={<Consumption />} />
        <Route path="/production" element={<Production />} />
        <Route path="/recommendations" element={<Recommendations />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
