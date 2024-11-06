import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TravelOptions from './components/TravelOptions'; // Import TravelOptions

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Router>
      <div>
        <Header 
          showLoginModal={showLoginModal} 
          handleLoginClick={handleLoginClick} 
          closeModal={closeModal} 
        />
        
        <Routes>
          <Route path="/" element={<Home showLoginModal={showLoginModal} />} />
          <Route path="/travel-options" element={<TravelOptions />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
