import React from 'react';
import { Check, X, Award, Zap, Crown } from 'lucide-react';

const PricingCard = ({ plan }) => {
  return (
    <div className="relative flex flex-col h-full p-8 bg-white rounded-2xl border border-gray-200
    shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-cyan-500" />
    
    <div className="text-center pb-8">
      {/* Icon wrapper */}
      <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 bg-cyan-50">
        {plan.icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-4 h-12">{plan.description}</p>
      <div className="text-4xl font-bold mb-2">{plan.price}</div>
      <div className="text-gray-500">{plan.period}</div>
    </div>
    
    <div className="flex-grow">
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature.name} className="flex items-center">
            {feature.included ? (
              <Check className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
            )}
            <span className={feature.included ? "text-gray-900" : "text-gray-500"}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      
      <button className="w-full py-4 px-6 rounded-xl font-semibold text-white
        bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
        {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
      </button>
    </div>
  </div>
);
};

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
        { name: "5 pre-built trip templates", included: true },
        { name: "Basic budget calculator", included: true },
        { name: "Basic carbon footprint tracking", included: true },
        { name: "Community forums access", included: true },
        { name: "AI trip planning (limited to 2/month)", included: false },
        { name: "Advanced budget optimization", included: false },
        { name: "Reward points", included: false },
        { name: "Priority support", included: false }
      ]
    },
    {
      name: "Green Voyager",
      description: "For regular eco-conscious travelers",
      price: "$9.99",
      period: "per month",
      icon: <Zap className="h-8 w-8 text-teal-500" />,
      features: [
        { name: "Advanced location search & filtering", included: true },
        { name: "20 pre-built trip templates", included: true },
        { name: "Advanced budget calculator", included: true },
        { name: "Detailed carbon footprint analytics", included: true },
        { name: "Community forums access", included: true },
        { name: "AI trip planning (10/month)", included: true },
        { name: "Advanced budget optimization", included: true },
        { name: "100 reward points monthly", included: true },
        { name: "Priority support", included: false }
      ]
    },
    {
      name: "Sustainability Pro",
      description: "Ultimate eco-travel experience",
      price: "$24.99",
      period: "per month",
      icon: <Crown className="h-8 w-8 text-cyan-500" />,
      features: [
        { name: "Premium location search & recommendations", included: true },
        { name: "Unlimited trip templates", included: true },
        { name: "Premium budget calculator & forecasting", included: true },
        { name: "Real-time carbon footprint monitoring", included: true },
        { name: "VIP community access", included: true },
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