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

export default PricingCard;