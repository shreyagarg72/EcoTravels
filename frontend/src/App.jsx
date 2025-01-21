// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./components/Home";
// import TravelOptions from "./components/TravelOptions";
// // Import TravelOptions
// import Duration from "./components/Duration";
// //  import Activities from './components/Activities';
// import Itinerary from "./components/Itinerary";
// import InbuiltTrip from "./components/InbuiltTrip";
// import LoginModal from "./components/LoginModal";
// // import Signup from "./components/Signup";
// function App() {
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleLoginClick = () => {
//     setShowLoginModal(true);
//   };

//   const closeModal = () => {
//     setShowLoginModal(false);
//   };

//   return (
//     <Router>
//       <div>
//         <Header
//           showLoginModal={showLoginModal}
//           handleLoginClick={handleLoginClick}
//           closeModal={closeModal}
//         />
        
//         {/* <Signup isOpen={showLoginModal} onClose={closeModal} /> */}
//         <Routes>
//           <Route path="/" element={<Home showLoginModal={showLoginModal} />} />
//           <Route
//             path="/trips"
//             element={<InbuiltTrip showLoginModal={showLoginModal} />}
//           />
//           <Route
//             path="/travel-options"
//             element={<TravelOptions showLoginModal={showLoginModal} />}
//           />
//           <Route
//             path="/duration"
//             element={<Duration showLoginModal={showLoginModal} />}
//           />
//           <Route
//             path="/itinerary"
//             element={<Itinerary showLoginModal={showLoginModal} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import TravelOptions from "./components/TravelOptions";
import Duration from "./components/Duration";
import Itinerary from "./components/Itinerary";
import InbuiltTrip from "./components/InbuiltTrip";
import LoginSignupModel from "./components/LoginSignupModel";

function App() {
  const [showModal, setShowModal] = useState(false); // State for showing modal

  const handleLoginClick = () => {
    setShowModal(true); // Show modal on login button click
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <Router>
      <div>
        {/* Pass the modal controls to Header */}
        <Header handleLoginClick={handleLoginClick} />

        {/* Login and Signup Modal */}
        <LoginSignupModel showModal={showModal} closeModal={closeModal} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<InbuiltTrip />} />
          <Route path="/travel-options" element={<TravelOptions />} />
          <Route path="/duration" element={<Duration />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
