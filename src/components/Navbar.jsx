import React, { useState, useEffect } from 'react'; 
import {  FaSearch, FaBell } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { IoClose } from 'react-icons/io5'; // Importing Close Icon
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State to handle the hamburger menu toggle
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://tuneify-pbc9.onrender.com/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

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

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-red-700 text-white" style={{ height: '60px' }}>
     
      <div className="flex items-center">
        <img
          src="/TuneifyLogo.png"
          alt="Tuneify Logo"
          className="h-10 w-10 cursor-pointer"
          onClick={() => navigate('/')}
        />
      <span className="ml-2 text-lg sm:text-2xl font-bold font-serif hidden min-[360px]:block">
  Tuneify
</span>

      </div>

      {/* Center Section: Search Bar */}
      <div className="flex items-center gap-6 flex-grow justify-center">
        {/* Home Icon */}
        

        {/* Search Bar */}
        <div className="flex items-center bg-[#282828] px-4 py-2 rounded-full w-[150px] sm:w-[400px]">
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to play ? "
            className="bg-transparent text-base text-white focus:outline-none ml-3 w-full"
          />
          {searchQuery && (
            <IoClose
              className="text-white text-2xl cursor-pointer ml-2"
              onClick={clearSearch}
              title="Clear Search"
            />
          )}
          <button onClick={handleSearch} className="text-white ml-3">
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-black text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 hidden lg:flex">
        
        <div
          className="flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer"
          title="Notifications"
        >
          <FaBell className="text-xl text-white" />
        </div>
        <div onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white text-xl font-bold cursor-pointer">
          {user ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer"
          onClick={onLogout}
          title="Logout"
        >
          <MdLogout className="text-xl text-white" />
        </div>
      </div>

      {/* Dropdown Menu */}
     
      {menuOpen && (
  <div className="lg:hidden fixed top-[60px] left-0 w-full bg-black text-white flex flex-col p-2 pb-16 z-50 shadow-lg max-h-[70vh] overflow-y-auto">
    <p onClick={() => { navigate('/'); setMenuOpen(false); }} className="py-2 cursor-pointer hover:underline">
      Home
    </p>
    <p onClick={() => { navigate('/profile'); setMenuOpen(false); }} className="py-1 cursor-pointer hover:underline">
      Profile
    </p>
    <p onClick={() => { navigate('/premium'); setMenuOpen(false); }} className="py-1 cursor-pointer hover:underline">
      Premium
    </p>
    <p onClick={() => { navigate('/support'); setMenuOpen(false); }} className="py-1 cursor-pointer hover:underline">
      Support
    </p>
    <p onClick={() => { navigate('/about'); setMenuOpen(false); }} className="py-1 cursor-pointer hover:underline">
      About
    </p>
    <p onClick={() => { onLogout(); setMenuOpen(false); }} className="py-1 cursor-pointer hover:underline">
      Logout
    </p>
  </div>
)}


    </div>
  );
};

export default Navbar;
