import React, { useEffect, useState } from 'react';
import { FaMusic, FaUsers, } from 'react-icons/fa';

const AdminHome = () => {
  return (
    <div className='flex flex-col items-center min-h-screen p-3 pt-12 '>
      
{/* Instructions & Features Section */}
<div className='bg-gray-600 p-8 rounded-lg shadow-lg w-full sm:w-[80vw] space-y-6'>
  <h3 className='text-xl font-semibold text-white mb-4 border-b-2 border-white'>
    Instructions & Features
  </h3>

  {/* List of Features with Icons */}
  <ul className='text-white space-y-5 '>
    {/* Feature 1: Manage song albums */}
    <li>
      <FaMusic className='inline-block text-2xl text-black mr-2' />
      Manage songs and albums easily by viewing all available albums.
    </li>
    
    {/* Feature 2: Track song data */}
    <li>
      <FaMusic className='inline-block  text-2xl text-yellow-600 mr-2' />
      Track and monitor users data (name, email, status, etc.).
    </li>
    
    {/* Feature 3: Upload images and songs */}
    <li>
      <FaMusic className='inline-block text-2xl  text-blue-600 mr-2' />
      Ensure all albums have proper images and audio uploaded.
    </li>
    
    {/* Feature 4: View album details */}
    <li>
      <FaMusic className='inline-block text-2xl text-red-600 mr-2' />
      Filter on song lists to view its details, like song and album Details.
    </li>
  </ul>
</div>


{/* View UI Changes Section */}
<div className='mt-8 bg-gray-600 p-6 rounded-lg shadow-lg w-full sm:w-[80vw] mb-6 space-y-6'>
  <h3 className='text-xl font-semibold text-white mb-4 border-b-2 border-white'>
    View UI Changes
  </h3>
  <p className='text-white mb-2'>
    Click the button below to explore the user interface updates.
  </p>
  <button
    onClick={() => window.open('https://tuneifya.netlify.app', '_blank')}
    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
  >
    Click Here
  </button>
</div>


      {/* Support Details Section */}
      <div className='bg-gray-600 p-8 rounded-lg shadow-lg w-full sm:w-[80vw] mt-8 space-y-6'>
        <h3 className='text-xl font-semibold text-white mb-4 border-b-2 border-white'>
          
          Support Details
        </h3>
        <p className='text-white'>
          For any issues, please contact support:
        </p>
        <p className="text-white truncate hover:whitespace-normal hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer">
  <FaUsers className="inline-block text-2xl  text-green-600 mr-2" />
  Email  <br /> <a href="mailto:support@tuneify.com">support@tuneify.com</a>
</p>

        <p className='text-white truncate hover:whitespace-normal hover:bg-gray-700 px-2 py-1 rounded-md cursor-pointer'>
          <FaUsers className='inline-block text-2xl text-green-600 mr-2' />
          Phone  <br /> +1-800-123-4567
        </p>
      </div>

      {/* Additional Info Section */}
<div className='bg-gray-600 p-8 rounded-lg shadow-lg w-full sm:w-[80vw] mt-8 space-y-6'>
  <h3 className='text-xl font-semibold text-white mb-4 border-b-2 border-white'>
    Admin Management
  </h3>

  <div className='flex items-start space-x-4'>
    <div className='flex items-center'>
      <FaMusic className='text-2xl text-black-600 mr-2' />
      <p className='text-white'>
        As the admin, you have full control over the app. You can add and manage all songs and albums.
      </p>
    </div>
  </div>

  <div className='flex items-start space-x-4'>
    <div className='flex items-center'>
      <FaMusic className='text-2xl text-blue-600 mr-2' />
      <p className='text-white'>
        You can monitor user access and manage permissions to maintain a secure environment for the users.
      </p>
    </div>
  </div>

  <div className='flex items-start space-x-4'>
    <div className='flex items-center'>
      <FaMusic className='text-2xl text-yellow-500 mr-2' />
      <p className='text-white'>
        You will receive real-time updates on the app's performance and usage, allowing you to make informed decisions.
      </p>
    </div>
  </div>

  <div className='flex items-start space-x-4'>
    <div className='flex items-center'>
      <FaMusic className='text-2xl text-red-500 mr-2' />
      <p className='text-white'>
        Manage system settings, including troubleshooting, updates, and general app maintenance for seamless operations.
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default AdminHome;
