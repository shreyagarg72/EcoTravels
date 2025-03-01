import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

const PricingCard = ({ 
  plan, 
  icon: Icon, 
  price, 
  features, 
  userTier, 
  processingSubscription, 
  onSubscribe, 
  accentColor 
}) => {
  const isCurrentPlan = userTier === plan;
  const isFree = plan === 'Free';
  const renderFeatureItem = (text, included, isPremium = false) => (
    <div className="flex items-center space-x-2 py-1">
      {included ? (
        <Check className={`h-5 w-5 ${isPremium ? 'text-purple-500' : `text-${accentColor}-500`}`} />
      ) : (
        <AlertCircle className="h-5 w-5 text-gray-300" />
      )}
      <span className={`text-sm ${included ? 'text-gray-700' : 'text-gray-400'}`}>{text}</span>
    </div>
  );

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col
      ${isCurrentPlan ? `ring-2 ring-${accentColor}-500` : ''}`}
    >
      {isCurrentPlan && (
        <div className={`absolute top-0 right-0 bg-${accentColor}-500 text-white px-3 py-1 rounded-bl-lg text-xs font-medium`}>
          CURRENT PLAN
        </div>
      )}
      <div className={`p-6 bg-gradient-to-r from-${accentColor}-50 to-${accentColor}-100`}>
        <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 mb-4 mx-auto">
          <Icon className={`h-6 w-6 text-${accentColor}-500`} />
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800">{plan} Plan</h3>
        <div className="mt-4 text-center">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {!isFree && <span className="text-gray-600">/ 3 months</span>}
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <div className="space-y-2">
          {features.map((feature, index) => 
            renderFeatureItem(feature.text, feature.included, plan === 'Premium')
          )}
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t">
        <button
          onClick={() => onSubscribe(plan)}
          disabled={isCurrentPlan || processingSubscription}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center
            ${isCurrentPlan 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : `bg-${accentColor}-500 text-white hover:bg-${accentColor}-600`}`}
        >
          {isCurrentPlan ? 'Current Plan' : (processingSubscription ? 'Processing...' : 'Subscribe Now')}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;