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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import Home from "./components/Home";
import TravelOptions from "./components/TravelOptions";
import Duration from "./components/Duration";

import InbuiltTrip from "./components/InbuiltTrips/InbuiltTrip.jsx";
import LoginSignupModel from "./components/LoginSignupModel";
import { ToastContainer } from "react-toastify";
import ViewTrip from "./components/viewTrip.jsx";
import Reviews from "./components/Reviews.jsx";
import BudgetSelection from "./components/BudgetSelection.jsx";
import Rewards from "./components/Rewards.jsx";
import PricingPlans from "./components/Pricing/PricingPlans.jsx";
import TravelPreferences from "./components/TravelPreferences.jsx";
function App() {
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
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
        <Header
          handleLoginClick={handleLoginClick}
          isLoggedIn={!!user}
          userEmail={user?.email}
        />

        {/* Login and Signup Modal */}
        <LoginSignupModel
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<InbuiltTrip />} />
          <Route path="/travel-options" element={<TravelOptions />} />
          {/* <Route path="/duration"  element={<Duration setShowModal={setShowModal} />} /> */}
          <Route
            path="/duration"
            element={<Duration handleLoginClick={handleLoginClick} />}
          />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          <Route
            path="/reviews"
            element={<Reviews handleLoginClick={handleLoginClick} />}
          />
          <Route path="/budget" element={<BudgetSelection />} />
          <Route path="/travel-preference" element={<TravelPreferences />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
