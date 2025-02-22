import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {  FaSignOutAlt, FaCrown, FaUserShield,   FaEdit } from 'react-icons/fa';
const ProfilePage = () => {
    const navigate = useNavigate();

 const [user, setUser] = useState(null); 

useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) return;
        const response = await fetch("https://tuneify-pbc9.onrender.com/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);


  const onLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen pb-24 flex flex-col items-center text-white p-5">
      <div className="w-full  bg-gradient-to-r from-black via-gray-900 to-red-700 rounded-lg shadow-lg p-6 flex flex-col items-center border-2 border-gray-600">
      <div className="w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center bg-red-600 text-black text-5xl sm:text-7xl font-bold rounded-full mb-4 border-4 border-white hover:bg-red-700 hover:scale-110 transition duration-300">
  

                    {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                </div>
      

 <h1 className="text-lg sm:text-3xl font-bold">{user?.name || "Guest"}</h1>
 <p className="text-gray-400 mt-2">
          {user?.isPremium ? "Premium User" : "Music Lover"}
        </p>
        
        
        {/* Plan Section */}
        <div className="mt-6 w-full  p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center border-2 border-gray-600">
  <div>
    <p className="text-lg font-semibold" >Your Plan</p>
  <h2 className="text-xl font-bold">
              {user?.isPremium ? "Tuneify Premium" : "Tuneify Free"}
            </h2>
 
  </div>
  <button onClick={() => navigate('/premium')} className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600 w-full sm:w-auto mt-3 sm:mt-0">
            {user?.isPremium ? "Your Plan" : "Explore Plan"}
          </button>
</div>

        {/* Account Section */}
        <div className="mt-6 w-full  p-2 rounded-lg border-2 border-gray-600 bg-black">
          <h3 className="text-lg font-bold mb-3">Account</h3>
          <div className="space-y-3">
            <div  onClick={() => navigate('/premium')}className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-red-600 cursor-pointer">
              <div  className="flex items-center space-x-2 ">
                <FaCrown />
                <p className="">sub scription</p>
              </div>
            </div>
            
            <div   onClick={() => navigate('/edit-profile')} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-red-600 cursor-pointer">
              <div className="flex items-center space-x-2">
                <FaEdit />
                <p>Edit Profile</p>
              </div>
            </div>
       <div onClick={() => navigate('/admin')} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-red-600 cursor-pointer">
              <div className="flex items-center space-x-2">
                <FaUserShield />
                <p>Admin</p>
              </div>
            </div>
            <div onClick={onLogout} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-red-600 cursor-pointer">
              <div className="flex items-center space-x-2">
                <FaSignOutAlt />
                <p>Sign Out</p>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default ProfilePage;