import React from "react";
import SearchBar from "./SearchBar";
import PopularTrips from "./PopularTrips/PopularTrips.jsx";
import Footer from "./Footer.jsx";
const Home = ({ showLoginModal }) => {
  return (
    <>
      <div className={`bg-gradient-to-r from-green-300 to-blue-300 py-8 md:py-16 ${showLoginModal ? "blur-sm" : ""}`}>
        <div className="text-center px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2">
            {/* Responsive grid for explore, plan, book, travel */}
            {[
              { title: "EXPLORE", subtitle: "New Places" },
              { title: "PLAN", subtitle: "Budget" },
              { title: "DISCOVER", subtitle: "Exclusive Itineraries" },
              { title: "TRAVEL", subtitle: "All Over Country" }
            ].map((item, index) => (
              <React.Fragment key={item.title}>
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl md:text-4xl font-bold tracking-widest">{item.title}</h1>
                  <p className="text-sm md:text-lg mt-1">{item.subtitle}</p>
                </div>
                {/* Add dot between items, but not after the last item */}
                {index < 3 && (
                  <div className="hidden md:block text-4xl font-bold">.</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <h2 className="text-lg md:text-2xl mt-4">All at one place!</h2>
        </div>
      </div>
      
      <SearchBar showLoginModal={showLoginModal} />
      
      <div className="flex items-center px-4 md:px-8 py-5">
        <PopularTrips showLoginModal={showLoginModal}/>
      </div>
      <Footer/>
    </>
  );
};

export default Home;