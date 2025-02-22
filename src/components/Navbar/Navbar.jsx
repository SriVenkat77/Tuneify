import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaMusic, FaCompactDisc, FaBars, FaTimes, FaHome } from "react-icons/fa";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black  w-full fixed top-0 left-0 shadow-md z-50">
      <div className="max-w-7xl text-red-600  mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="flex items-center bg-black">
            <img
              src="/TuneifyLogo.png"
              alt="Tuneify Logo"
              className="h-10 w-10 cursor-pointer"
              onClick={() => navigate('/')}
            />
            <span className="ml-2 text-sm sm:text-2xl  font-bold font-serif ">
              Tuneify
            </span>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">

          <NavLink
            to="/list-albums"
            className={({ isActive }) =>
              `flex items-center gap-1 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
          >
            <FaCompactDisc /> Albums
          </NavLink>
          <NavLink
            to="/list-songs"
            className={({ isActive }) =>
              `flex items-center gap-1 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
          >
            <FaMusic /> Songs
          </NavLink>

          <NavLink
            to="/list-users"
            className={({ isActive }) =>
              `flex items-center gap-1 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
          >
            <FaUser /> Users
          </NavLink>


        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-4 text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-red-600 block flex items-center justify-center gap-2 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/list-albums"
            className={({ isActive }) =>
              `text-red-600  block flex items-center justify-center gap-2 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <FaCompactDisc /> Albums
          </NavLink>
          <NavLink
            to="/list-songs"
            className={({ isActive }) =>
              `text-red-600  block flex items-center justify-center gap-2 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <FaMusic /> Songs
          </NavLink>
          <NavLink
            to="/list-users"
            className={({ isActive }) =>
              ` text-red-600  block flex items-center justify-center gap-2 ${isActive ? "text-white" : "hover:text-gray-400"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <FaUser /> Users
          </NavLink>


        </div>
      )}
    </nav>
  );
};

export default Navbar;
