
// import React from "react";
// import { useNavigate } from "react-router-dom"; // React Router for navigation

// const TravelOptions = ({ showLoginModal }) => {
//   const navigate = useNavigate();

//   const handleOptionClick = (type) => {
//     // Save selected travel type to local storage (or pass as route param)
//     localStorage.setItem("selectedTravelType", type);

//     // Navigate to the activities page
//     navigate("/activities");
//   };

//   return (
//     <div className={`${showLoginModal ? "blur-sm" : ""}`}>
//       <div className="flex flex-col items-center mt-10">
//         <h2 className="text-3xl font-semibold mb-6">Travel Options</h2>
//         <div className="grid grid-cols-2 gap-6">
//           <div
//             onClick={() => handleOptionClick("Solo")}
//             className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
//           >
//             <h3 className="font-bold text-xl">Solo</h3>
//             <p>Explore the world at your own pace.</p>
//           </div>
//           <div
//             onClick={() => handleOptionClick("Family")}
//             className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
//           >
//             <h3 className="font-bold text-xl">Family</h3>
//             <p>Create unforgettable memories with your family.</p>
//           </div>
//           <div
//             onClick={() => handleOptionClick("Friends")}
//             className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
//           >
//             <h3 className="font-bold text-xl">Friends</h3>
//             <p>Enjoy adventures with your friends.</p>
//           </div>
//           <div
//             onClick={() => handleOptionClick("School")}
//             className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
//           >
//             <h3 className="font-bold text-xl">School</h3>
//             <p>Educational trips for students.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelOptions;
import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const TravelOptions = ({ showLoginModal }) => {
  const navigate = useNavigate();

  const handleOptionClick = (type) => {
    // Save selected travel type to local storage
    localStorage.setItem("selectedTravelType", type);

    // Navigate to the activities page with the travel type stored in localStorage
    navigate("/duration");
  };

  return (
    <div className={`${showLoginModal ? "blur-sm" : ""}`}>
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-3xl font-semibold mb-6">Travel Options</h2>
        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={() => handleOptionClick("Solo")}
            className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="font-bold text-xl">Solo</h3>
            <p>Explore the world at your own pace.</p>
          </div>
          <div
            onClick={() => handleOptionClick("Family")}
            className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="font-bold text-xl">Family</h3>
            <p>Create unforgettable memories with your family.</p>
          </div>
          <div
            onClick={() => handleOptionClick("Friends")}
            className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="font-bold text-xl">Friends</h3>
            <p>Enjoy adventures with your friends.</p>
          </div>
          <div
            onClick={() => handleOptionClick("School")}
            className="border p-4 rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="font-bold text-xl">School</h3>
            <p>Educational trips for students.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelOptions;
