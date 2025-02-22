import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { 
   FaLock, FaEnvelope, 
  FaMusic, FaHeadphones,  FaAd, FaUsers 
} from "react-icons/fa";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://tuneify-pbc9.onrender.com/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      setError("");
    } catch (error) {
      setError("Incorrect Credientials");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 bg-gradient-to-r from-black via-gray-900 to-red-700">
      {/* Content Section - Moves above the login form on small screens */}
      <div className="text-center md:w-1/2 mb-6 md:mb-0">
      <img
          src="/TuneifyLogo.png"
          alt="Tuneify Logo"
          className="h-20 w-20 cursor-pointer mx-auto text-5xl"
         
        />
        <h1 className="text-white text-2xl font-bold mt-2">Welcome Back!</h1>
        <p className="text-gray-400 text-sm">Music for everyone, anytime, anywhere.</p>
        <p className="text-gray-400 text-sm mt-2">
          Discover a world of music at your fingertips. Enjoy seamless streaming, curated playlists,
          and exclusive content tailored just for you.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Unlock premium features like ad-free listening, offline downloads, and high-quality sound.
          Join millions of users who have made their music experience extraordinary. 
        </p>

        <h2 className="text-white font-bold text-lg mt-4">Why Choose Us?</h2>
        <ul className="mt-2 space-y-2 text-gray-300">
          <li className="flex items-center justify-center"><FaMusic className="text-[#1db954] mr-2" /> Unlimited Music Streaming</li>
          <li className="flex items-center justify-center"><FaHeadphones className="text-[#1db954] mr-2" /> High-Quality Audio Experience</li>
          <li className="flex items-center justify-center"><FaAd className="text-[#1db954] mr-2" /> Ad-Free Listening</li>
          <li className="flex items-center justify-center"><FaUsers className="text-[#1db954] mr-2" /> Millions of Satisfied Users</li>
        </ul>
      </div>

      {/* Login Form */}
      <div className=" p-8 rounded-xl shadow-lg border border-black w-full max-w-sm md:w-1/3">
        {error && (
          <div className="bg-red-600 text-white text-center p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-600" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 pl-10 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <Link to="/forgot-password" className="text-red-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            Sign up for Tuneify
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white text-xs">"Where words fail, music speaks." 🎵</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
