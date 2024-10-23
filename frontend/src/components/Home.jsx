import React from "react";
import SearchBar from "./SearchBar";
import PopularTrips from "./PopularTrips";

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-green-300 to-blue-300 py-16">
      <div className="text-center">
  <div className="flex justify-center items-center space-x-2">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-widest">EXPLORE</h1>
      <p className="text-lg mt-2">New Places</p>
    </div>

    <div className="text-4xl font-bold">.</div> {/* Dot between EXPLORE and PLAN */}

    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-widest">PLAN</h1>
      <p className="text-lg mt-2">Budget</p>
    </div>

    <div className="text-4xl font-bold">.</div> {/* Dot between PLAN and BOOK */}

    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-widest">BOOK</h1>
      <p className="text-lg mt-2">Your Trip</p>
    </div>

    <div className="text-4xl font-bold">.</div> {/* Dot between BOOK and TRAVEL */}

    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-widest">TRAVEL</h1>
      <p className="text-lg mt-2">All Over Country</p>
    </div>
  </div>
  <h2 className="text-2xl mt-4">All at one place!</h2>
</div>

      </div>
      <SearchBar />

      <div className="flex items-center px-8 py-5">
        <PopularTrips />
      </div>
    </>
  );
};

export default Home;
