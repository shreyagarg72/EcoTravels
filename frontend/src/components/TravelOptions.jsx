import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Users, 
  Plane, 
  School, 
  User, 
  UserPlus, 
  Baby as Family,
} from 'lucide-react';

const TravelOptions = ({ showLoginModal }) => {
  const navigate = useNavigate();
  const [showTravellersModal, setShowTravellersModal] = useState(false);
  const [showStudentCountModal, setShowStudentCountModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [travellersCount, setTravellersCount] = useState(1);
  const [studentCount, setStudentCount] = useState(100); // Default to 100 for school

  const travelOptions = [
    {
      type: 'Solo',
      icon: User,
      description: 'Embark on a transformative journey of self-discovery',
      color: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      type: 'Family',
      icon: Family,
      description: 'Weave lifelong memories across generations',
      color: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      type: 'Friends',
      icon: Users,
      description: 'Create epic stories that become legendary tales',
      color: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      type: 'School',
      icon: School,
      description: 'Unlock knowledge beyond classroom walls',
      color: 'bg-yellow-100',
      textColor: 'text-yellow-800'
    }
  ];

  const handleOptionClick = (type) => {
    // Get existing selectedCitiesData from localStorage
    const existingData = JSON.parse(localStorage.getItem('selectedCitiesData') || '{"selectedCities": []}');
    console.log('Existing data before update:', existingData);
    
    if (type === 'Solo') {
      // For solo, directly proceed
      const updatedData = {
        ...existingData,
        travelType: type,
        travelCount: 1
      };
      localStorage.setItem('selectedCitiesData', JSON.stringify(updatedData));
      console.log('Updated data for Solo:', updatedData);
      navigate('/budget');
    } else if (type === 'School') {
      // For school, show student count input modal
      setSelectedType(type);
      setShowStudentCountModal(true);
    } else {
      // For family and friends, show travellers modal
      setSelectedType(type);
      setShowTravellersModal(true);
    }
  };

  const handleTravellersConfirm = () => {
    // Get existing selectedCitiesData from localStorage
    const existingData = JSON.parse(localStorage.getItem('selectedCitiesData') || '{"selectedCities": []}');
    console.log('Existing data before travellers update:', existingData);
    
    // Update the data with travel type and count
    const updatedData = {
      ...existingData,
      travelType: selectedType,
      travelCount: travellersCount
    };

    // Save updated data back to localStorage
    localStorage.setItem('selectedCitiesData', JSON.stringify(updatedData));
    console.log('Updated data with travellers:', updatedData);
    navigate('/budget');
  };

  const handleStudentCountConfirm = () => {
    // Get existing selectedCitiesData from localStorage
    const existingData = JSON.parse(localStorage.getItem('selectedCitiesData') || '{"selectedCities": []}');
    
    // Update the data with travel type and student count
    const updatedData = {
      ...existingData,
      travelType: 'School',
      travelCount: parseInt(studentCount, 10) || 100 // Default to 100 if invalid input
    };

    // Save updated data back to localStorage
    localStorage.setItem('selectedCitiesData', JSON.stringify(updatedData));
    console.log('Updated data with student count:', updatedData);
    
    // Close modal and navigate
    setShowStudentCountModal(false);
    navigate('/budget');
  };

  const handleStudentCountChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === '' || /^\d+$/.test(value)) {
      setStudentCount(value);
    }
  };

  return (
    <div className={`${showLoginModal ? 'blur-sm' : ''}`}>
      <div className="flex flex-col items-center mt-10 px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600">
          Choose Your Adventure Canvas
        </h2>
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          {travelOptions.map((option) => (
            <div
              key={option.type}
              onClick={() => handleOptionClick(option.type)}
              className={`
                ${option.color} 
                border-2 border-transparent 
                p-6 rounded-2xl 
                shadow-lg 
                transform transition-all 
                hover:scale-105 
                hover:border-opacity-50 
                hover:shadow-2xl 
                cursor-pointer 
                flex flex-col items-center 
                text-center group
              `}
            >
              <option.icon 
                className={`
                  w-16 h-16 mb-4 
                  ${option.textColor} 
                  group-hover:scale-110 
                  transition-transform
                `} 
              />
              <h3 className={`font-bold text-2xl mb-2 ${option.textColor}`}>
                {option.type}
              </h3>
              <p className={`text-sm opacity-70 ${option.textColor}`}>
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Travellers Modal */}
      {showTravellersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              How Many Travelers?
            </h3>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <button 
                onClick={() => setTravellersCount(Math.max(1, travellersCount - 1))}
                className="bg-gray-200 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold"
              >
                -
              </button>
              <span className="text-3xl font-bold">{travellersCount}</span>
              <button 
                onClick={() => setTravellersCount(travellersCount + 1)}
                className="bg-gray-200 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold"
              >
                +
              </button>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowTravellersModal(false)}
                className="w-full bg-gray-200 py-3 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleTravellersConfirm}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Count Input Modal */}
      {showStudentCountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Number of Students
            </h3>
            <div className="mb-6">
              <div className="flex items-center justify-center mb-2">
                <School className="text-yellow-600 w-8 h-8 mr-2" />
                <span className="text-lg font-medium">Enter student count:</span>
              </div>
              <input
                type="text"
                value={studentCount}
                onChange={handleStudentCountChange}
                className="w-full p-4 text-center text-2xl font-bold border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500"
                placeholder="Number of students"
              />
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowStudentCountModal(false)}
                className="w-full bg-gray-200 py-3 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleStudentCountConfirm}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelOptions;