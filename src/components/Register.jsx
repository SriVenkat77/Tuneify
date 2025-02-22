import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate(); // To redirect to the login page

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://tuneify-pbc9.onrender.com/api/user/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Success:", response.data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 border-black p-8 rounded-lg shadow-lg w-full max-w-sm">
      <div className="mb-6 text-center">
      <img
          src="/TuneifyLogo.png"
          alt="Tuneify Logo"
          className="h-20 w-20 cursor-pointer mx-auto text-5xl"
         
        />
          <h1 className="text-white text-2xl font-bold mt-2">Sign up to start listening</h1>
          <p className="text-gray-400 mt-1">Join millions of users and enjoy unlimited music streaming.</p>
        </div>

        {error && (
          <div className="bg-red-600 text-white text-center py-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1 text-left">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1 text-left">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-bold text-lg hover:bg-red-600 transition">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account? <Link to="/" className="text-red-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
