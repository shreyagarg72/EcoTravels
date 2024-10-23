// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <h1>hello</h1>
//     </>
//   )
// }

// export default App
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './components/Home';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Routes>
//           {/* Define route for the home page */}
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

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
        {/* Pass modal state and functions to Header */}
        <Header 
          showLoginModal={showLoginModal} 
          handleLoginClick={handleLoginClick} 
          closeModal={closeModal} 
        />
        
        <Routes>
          {/* Pass modal state to Home */}
          <Route path="/" element={<Home showLoginModal={showLoginModal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
