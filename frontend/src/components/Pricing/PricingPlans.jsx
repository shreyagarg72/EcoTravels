import React from 'react';
import { Check, X, Award, Zap, Crown } from 'lucide-react';
import PricingCard from './PricingCards';

const PricingPlans = () => {
  const plans = [
    {
      name: "Eco Explorer",
      description: "Perfect for occasional travelers",
      price: "Free",
      period: "forever",
      icon: <Award className="h-8 w-8 text-emerald-500" />,
      features: [
        { name: "Basic location search", included: true },
        { name: "Multiple location(upto to 2 locations)", included: true },
        { name: "Basic budget calculator", included: true },
        { name: "Access to standard trip recommendations", included: true },
        { name: "AI trip planning (limited to 1/year)", included: false },
        { name: "Advanced budget optimization", included: false },
        { name: "No carbon footprint tracking", included: false },
      ]
    },
    {
      name: "Green Voyager",
      description: "For regular eco-conscious travelers",
      price: "$9.99",
      period: "per month",
      icon: <Zap className="h-8 w-8 text-teal-500" />,
      features: [
        { name: "Carbon footprint calculator", included: true },
        { name: "Advanced budget calculator", included: true },
        { name: "Access to premium inbuilt trip", included: true },
        { name: "AI trip planning (10/month)", included: true },
        { name: "Reward points monthly", included: true },
        { name: "Advanced budget optimization", included: false },
        { name: "Exclusive recommendations", included: false}
      ]
    },
    {
      name: "Sustainability Pro",
      description: "Ultimate eco-travel experience",
      price: "$24.99",
      period: "per month",
      icon: <Crown className="h-8 w-8 text-cyan-500" />,
      features: [
        { name: "Premium location recommendations", included: true },
        { name: "Unlimited multiple-location handling", included: true },
        { name: "AI-powered itinerary optimization", included: true },
        { name: "Carbon footprint monitoring", included: true },
        { name: "Unlimited AI trip planning", included: true },
        { name: "Advanced budget optimization", included: true },
        { name: "300 reward points monthly + bonuses", included: true },
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Eco Journey</h2>
        <p className="text-lg text-gray-600">Select the perfect plan for your sustainable travel adventures</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;