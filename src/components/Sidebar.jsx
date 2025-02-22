import React from 'react';
import { FaHome, FaUser, FaCrown, FaInfoCircle, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className=' h-full p-8 pt-28 bg-gradient-to-r from-black via-gray-900 to-red-700 text-white hidden lg:flex flex-col gap-12  shadow-lg'>
      {/* Sidebar Buttons with Icons */}
      <button onClick={() => navigate('/')} className='flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-red-600 rounded-full w-full text-center font-semibold hover:bg-orange-600 transition'>
        <FaHome /> Home
      </button>
      <button onClick={() => navigate('/profile')} className='flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-red-600 rounded-full w-full text-center font-semibold hover:bg-orange-600 transition'>
        <FaUser /> Profile
      </button>
      <button onClick={() => navigate('/premium')} className='flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-red-600 rounded-full w-full text-center font-semibold hover:bg-orange-600 transition'>
        <FaCrown /> Premium
      </button>
      <button onClick={() => navigate('/support')} className='flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-red-600 rounded-full w-full text-center font-semibold hover:bg-orange-600 transition'>
        <FaHeadset /> Support
      </button>
      <button onClick={() => navigate('/about')} className='flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-red-600 rounded-full w-full text-center font-semibold hover:bg-orange-600 transition'>
        <FaInfoCircle /> About
      </button>
    </div>
  );
};

export default Sidebar;
