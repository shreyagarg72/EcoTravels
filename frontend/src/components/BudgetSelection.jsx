import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Leaf, Shield, Check } from 'lucide-react';

const BudgetSelection = () => {
  const [selectedBudget, setSelectedBudget] = useState('');
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const navigate = useNavigate();

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const handleContinue = () => {
    if (selectedBudget) {
      const existingData = JSON.parse(localStorage.getItem('selectedCitiesData') || '{"selectedCities": []}');
      console.log('Existing data before budget update:', existingData);
      
      const updatedData = {
        ...existingData,
        budget: selectedBudget,
        isEcoFriendly: isEcoFriendly
      };

      localStorage.setItem('selectedCitiesData', JSON.stringify(updatedData));
      console.log('Updated data with budget:', updatedData);
      
      navigate('/duration');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Travel Style</h1>
          <p className="mt-2 text-gray-600">Choose how you'd like to experience your journey</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
          {/* Budget Friendly Card */}
          <div 
            className={`p-6 rounded-lg shadow cursor-pointer transition-all duration-300 relative overflow-hidden
              ${selectedBudget === 'cheap' 
                ? 'ring-2 ring-green-500 shadow-lg bg-white' 
                : 'hover:shadow-xl bg-white hover:scale-105'
              }
              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
              before:bg-gradient-to-r before:from-green-100/50 before:to-blue-100/50
              before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500
              before:pointer-events-none
            `}
            onClick={() => handleBudgetSelect('cheap')}
          >
            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Essential Explorer</h3>
              <p className="text-gray-600 text-center text-sm">
                Authentic local experiences with comfortable basics.
                <span className="mt-2 block text-green-600 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Perfect for adventurous souls
                </span>
              </p>
            </div>
          </div>

          {/* Moderate Card */}
          <div 
            className={`p-6 rounded-lg shadow cursor-pointer transition-all duration-300 relative overflow-hidden
              ${selectedBudget === 'moderate' 
                ? 'ring-2 ring-blue-500 shadow-lg bg-white' 
                : 'hover:shadow-xl bg-white hover:scale-105'
              }
              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
              before:bg-gradient-to-r before:from-blue-100/50 before:to-purple-100/50
              before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500
              before:pointer-events-none
            `}
            onClick={() => handleBudgetSelect('moderate')}
          >
            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Balanced Voyager</h3>
              <p className="text-gray-600 text-center text-sm">
                Enhanced comfort with premium experiences.
                <span className="mt-2 block text-blue-600 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Quality accommodations included
                </span>
              </p>
            </div>
          </div>

          {/* Premium Card */}
          <div 
            className={`p-6 rounded-lg shadow cursor-pointer transition-all duration-300 relative overflow-hidden
              ${selectedBudget === 'high' 
                ? 'ring-2 ring-purple-500 shadow-lg bg-white' 
                : 'hover:shadow-xl bg-white hover:scale-105'
              }
              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
              before:bg-gradient-to-r before:from-purple-100/50 before:to-pink-100/50
              before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500
              before:pointer-events-none
            `}
            onClick={() => handleBudgetSelect('high')}
          >
            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="p-3 bg-purple-100 rounded-full flex">
                <DollarSign className="h-6 w-6 text-purple-600" />
                <DollarSign className="h-6 w-6 text-purple-600 -ml-2" />
              </div>
              <h3 className="text-xl font-semibold">Luxury Connoisseur</h3>
              <p className="text-gray-600 text-center text-sm">
                Exclusive experiences and premium services.
                <span className="mt-2 block text-purple-600 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Personalized attention guaranteed
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Custom Checkbox using Lucide icons */}
        <div 
          className="flex items-center justify-center space-x-2 mt-8 cursor-pointer"
          onClick={() => setIsEcoFriendly(!isEcoFriendly)}
        >
          <div className={`w-5 h-5 border rounded flex items-center justify-center
            ${isEcoFriendly ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
          >
            {isEcoFriendly && <Check className="h-4 w-4 text-white" />}
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span className="text-gray-700">
              Focus on eco-friendly activities and accommodations
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedBudget}
            className={`px-8 py-3 rounded-lg font-semibold transition-all
              ${selectedBudget 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSelection;