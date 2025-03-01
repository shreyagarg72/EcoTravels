import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Shield, Leaf, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import PricingCard from './PricingCard';

const PricingPlan = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userTier, setUserTier] = useState('Free');
  const [loadingUser, setLoadingUser] = useState(true);
  const [processingSubscription, setProcessingSubscription] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Set current user when component mounts
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        fetchUserTier(user.uid);
      } else {
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchUserTier = async (firebaseUid) => {
    try {
      // Using a dedicated endpoint to fetch just the tier
      const response = await fetch(`http://localhost:5000/api/users/${firebaseUid}/tier`);
      const data = await response.json();
      
      if (response.ok && data.tier) {
        setUserTier(data.tier);
      } else {
        console.error("Error fetching user tier:", data.error);
        // Default to Free tier if there's an error
        setUserTier('Free');
      }
    } catch (error) {
      console.error("Error retrieving user tier:", error);
      // Default to Free tier if there's an error
      setUserTier('Free');
    } finally {
      setLoadingUser(false);
    }
  };

  const updateUserTier = async (newTier) => {
    if (!currentUser) {
      toast.error("Please login to subscribe to a plan", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/login');
      return;
    }

    if (newTier === userTier) {
      toast.info(`You are already subscribed to the ${newTier} plan`, {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setProcessingSubscription(true);

    try {
      // Update user tier endpoint
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.uid}/updateTier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: newTier,
          description: `Subscription upgrade to ${newTier} tier`
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `Server error: ${response.status}`);
      }
      
      setUserTier(newTier);
      
      toast.success(`Successfully subscribed to ${newTier} plan!`, {
        position: "top-center",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error("Error updating subscription:", error);
      
      toast.error("Failed to update subscription. Please try again later.", {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setProcessingSubscription(false);
    }
  };

  // Plan configuration
  const plans = [
    {
      name: 'Free',
      icon: Leaf,
      price: '0 INR',
      accentColor: 'green',
      features: [
        { text: 'Basic trip suggestions', included: true },
        { text: 'Standard search upto 2 locations', included: true },
        { text: 'Basic reward points', included: true },
        { text: 'Renew after 90 days', included: true },
        { text: 'Advanced search for many location', included: false },
        { text: 'Unlimited trip saves', included: false },
        { text: 'No inbuilt trips suggestions', included: false },
        { text: 'No curated hidden gems', included: false }
      ]
    },
    {
      name: 'Standard',
      icon: Shield,
      price: '99 INR',
      accentColor: 'blue',
      features: [
        { text: 'Daily Login rewards', included: true },
        { text: 'Search upto 10 itineraries', included: true },
        { text: 'Unlimited Inbuilt trips', included: true },
        { text: 'Carbon footprint calculator', included: true },
        { text: 'Save Itinerary', included: true },
        { text: 'No unlimited locations search', included: true },
        { text: 'No curated hidden gems', included: false },
        { text: 'Exclusive premium destinations', included: false }
      ]
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '199 INR',
      accentColor: 'purple',
      features: [
        { text: 'Advanced curated hidden gems of India', included: true },
        { text: 'Unlimited search capabilities', included: true },
        { text: 'Unlimited trip saves', included: true },
        { text: 'Daily reward points (10 per login)', included: true },
        { text: 'Carbon footprint calculator', included: true },
        { text: 'Premium eco-friendly recommendations', included: true },
        { text: ' Unlock friends and school trips plans', included: true },
        { text: 'Discounts on renewal', included: true }
      ]
    }
  ];

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your EcoTravel Plan</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Unlock premium features to enhance your travel experience and make the most of your journeys</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center mt-10">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan.name}
              icon={plan.icon}
              price={plan.price}
              features={plan.features}
              userTier={userTier}
              processingSubscription={processingSubscription}
              onSubscribe={updateUserTier}
              accentColor={plan.accentColor}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 justify-center mb-2">
              <Star className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">All Plans Include</h3>
            </div>
            <p className="text-gray-600 text-sm">Basic search functionality, access to our community reviews, personal trip storage, and our eco-points reward system that can be redeemed for travel benefits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;