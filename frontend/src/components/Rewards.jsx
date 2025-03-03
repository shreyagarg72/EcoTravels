import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Award, Trophy, Users, Activity, Calendar } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

const Rewards = () => {
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Use Firebase auth to get current user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch user data using Firebase UID
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${currentUser.uid}/points`);
        
        // Fetch leaderboard data
        const leaderboardRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard`);
        
        setUserData(userRes.data.ecoPoints);
        setLeaderboard(leaderboardRes.data.leaderboard);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        toast.error('Could not load rewards data', {
          position: 'top-center'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);

  // Helper function to determine tier color
  const getTierColor = (tier) => {
    switch(tier) {
      case 'Free': return 'bg-free';
      case 'Standard': return 'bg-standard';
      case 'Premium': return 'bg-premium';
      default: return 'bg-gray-500';
    }
  };
  
  // Helper function to get tier icon
  const getTierIcon = (tier) => {
    switch(tier) {
      case 'Free': return <Award className="h-5 w-5" />;
      case 'Standard': return <Trophy className="h-5 w-5" />;
      case 'Premium': return <Sparkles className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Next tier calculation
  const getNextTierInfo = () => {
    if (!userData) return { nextTier: null, remaining: 0, percentage: 0, color: 'bg-gray-300' };
    
    const currentTotal = userData.total;
    
    if (userData.tier === 'Free') {
      const remaining = 1000 - currentTotal;
      const percentage = (currentTotal / 1000) * 100;
      return {
        nextTier: 'Standard',
        remaining,
        percentage: Math.min(percentage, 100),
        color: 'bg-standard'
      };
    } else if (userData.tier === 'Standard') {
      const remaining = 5000 - currentTotal;
      const percentage = ((currentTotal - 1000) / 4000) * 100;
      return {
        nextTier: 'Premium',
        remaining,
        percentage: Math.min(percentage, 100),
        color: 'bg-premium'
      };
    }
    
    // Already premium
    return {
      nextTier: null,
      remaining: 0,
      percentage: 100,
      color: 'bg-premium'
    };
  };
  
  const nextTierInfo = getNextTierInfo();

  // Handle not logged in state
  if (!currentUser && !loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">EcoPoints Rewards</h2>
          <p className="mb-6">Please log in to view your rewards and leaderboard.</p>
          <button 
            onClick={() => toast.info('Please use the login button in the navigation bar', { position: 'top-center' })}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Sparkles className="mr-2 h-8 w-8 text-primary" />
        EcoPoints Rewards
      </h1>
      
      {/* User Points Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your EcoPoints</h2>
            <div className="flex items-center mt-2">
              <span className="text-4xl font-bold text-primary">{userData?.total || 0}</span>
              <div className="ml-4 px-3 py-1 rounded-full flex items-center text-white" 
                   style={{backgroundColor: userData?.tier === 'Free' ? '#94a3b8' : 
                          userData?.tier === 'Standard' ? '#60a5fa' : '#facc15'}}>
                {getTierIcon(userData?.tier || 'Free')}
                <span className="ml-1">{userData?.tier || 'Free'} Tier</span>
              </div>
            </div>
          </div>
          
          {nextTierInfo.nextTier && (
            <div className="mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg md:w-96">
              <p className="text-sm text-gray-600 mb-1">
                {nextTierInfo.remaining} more points to reach {nextTierInfo.nextTier} Tier
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${nextTierInfo.color}`} 
                     style={{ width: `${nextTierInfo.percentage}%` }}></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`mr-8 py-4 text-sm font-medium ${activeTab === 'overview' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700'}`}>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                Overview
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`mr-8 py-4 text-sm font-medium ${activeTab === 'history' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700'}`}>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                History
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`py-4 text-sm font-medium ${activeTab === 'leaderboard' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700'}`}>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Leaderboard
              </div>
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="font-bold text-lg mb-4">Points Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-gray-500 mb-1">This Month</div>
                  <div className="text-2xl font-bold">
                    {userData?.history?.reduce((sum, item) => {
                      // Check if the timestamp is from the current month
                      const itemDate = new Date(item.timestamp);
                      const currentDate = new Date();
                      return (itemDate.getMonth() === currentDate.getMonth() && 
                              itemDate.getFullYear() === currentDate.getFullYear())
                        ? sum + item.points
                        : sum;
                    }, 0) || 0}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-gray-500 mb-1">Total Activities</div>
                  <div className="text-2xl font-bold">{userData?.history?.length || 0}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-gray-500 mb-1">Avg. Points/Activity</div>
                  <div className="text-2xl font-bold">
                    {userData?.history?.length
                      ? Math.round(userData.total / userData.history.length)
                      : 0}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="font-bold text-lg mb-4">Points History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData?.history?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {item.activityType.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-primary">
                          +{item.points}
                        </td>
                      </tr>
                    ))}
                    {(!userData?.history || userData.history.length === 0) && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No activity yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div>
              <h3 className="font-bold text-lg mb-4">Top EcoPoints Earners</h3>
              
              {/* Premium Tier */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-premium mr-2" />
                  <h4 className="text-md font-medium">Premium Tier</h4>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {leaderboard?.premium?.length > 0 ? (
                    leaderboard.premium.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center">
                          <div className="bg-premium text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <span className="font-medium">{user.userName}</span>
                        </div>
                        <span className="font-bold">{user.ecoPoints.total.toLocaleString()} pts</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No users in Premium tier yet</div>
                  )}
                </div>
              </div>
              
              {/* Standard Tier */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Trophy className="h-5 w-5 text-standard mr-2" />
                  <h4 className="text-md font-medium">Standard Tier</h4>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {leaderboard?.standard?.length > 0 ? (
                    leaderboard.standard.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center">
                          <div className="bg-standard text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <span className="font-medium">{user.userName}</span>
                        </div>
                        <span className="font-bold">{user.ecoPoints.total.toLocaleString()} pts</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No users in Standard tier yet</div>
                  )}
                </div>
              </div>
              
              {/* Free Tier */}
              <div>
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-free mr-2" />
                  <h4 className="text-md font-medium">Free Tier</h4>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {leaderboard?.free?.length > 0 ? (
                    leaderboard.free.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center">
                          <div className="bg-free text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <span className="font-medium">{user.userName}</span>
                        </div>
                        <span className="font-bold">{user.ecoPoints.total.toLocaleString()} pts</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No users in Free tier yet</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;