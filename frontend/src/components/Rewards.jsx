// RewardsPage.jsx
import React, { useState } from 'react';

const Rewards = () => {
  // Sample user data - replace with your actual data source
  const [currentUser, setCurrentUser] = useState({
    username: "YourUsername",
    points: 1250,
  });
  
  const [leaderboard, setLeaderboard] = useState([
    { username: "TopGamer123", points: 5230 },
    { username: "PointMaster", points: 4850 },
    { username: "RewardHunter", points: 4210 },
    { username: "PointCollector", points: 3890 },
    { username: "GameWizard", points: 3540 },
    { username: "RewardChaser", points: 3210 },
    { username: "PointWinner", points: 2980 },
  ]);

  // Extract top 3 users for the podium
  const topThree = leaderboard.slice(0, 3);
  
  // Rest of the leaderboard after top 3
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Rewards Leaderboard</h1>
        
        {/* Current User Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Your Rewards</h2>
              <p className="text-2xl font-bold text-indigo-600">{currentUser.username}</p>
            </div>
            <div className="bg-indigo-100 rounded-full px-6 py-3">
              <p className="text-xl font-bold text-indigo-700">{currentUser.points.toLocaleString()} Points</p>
            </div>
          </div>
        </div>
        
        {/* Top 3 Users */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Performers</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {topThree.map((user, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center ${
                index === 0 ? 'bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-300' : 
                index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-gray-300' : 
                'bg-gradient-to-b from-orange-50 to-orange-100 border-2 border-orange-300'
              }`}
            >
              <div className={`absolute -top-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? 'bg-amber-500' : 
                index === 1 ? 'bg-gray-500' : 
                'bg-orange-500'
              }`}>
                {index + 1}
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3 mt-2">
                <span className="text-2xl">{user.username.charAt(0)}</span>
              </div>
              <p className="font-semibold text-gray-800 text-lg">{user.username}</p>
              <p className="text-xl font-bold text-indigo-600">{user.points.toLocaleString()} Points</p>
            </div>
          ))}
        </div>
        
        {/* Rest of Leaderboard */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Leaderboard</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {restOfLeaderboard.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 4}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-indigo-600">{user.points.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rewards;