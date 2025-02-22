import { useState } from "react";
import axios from "axios";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://tuneify-pbc9.onrender.com/api/user/forgot-password", { email });
      // Reset the error message if the request is successful
      setErrorMessage("");
      alert("link sent to mail !"); // You can customize this further
    } catch (error) {
      // Set the error message if the request fails
      setErrorMessage("Incorrect email.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-8 rounded-lg shadow-lg w-full border-2  border-black max-w-sm">
       
        <div className="mb-6 text-center">
          <img
          src="/TuneifyLogo.png"
          alt="Tuneify Logo"
          className="h-20 w-20 cursor-pointer mx-auto text-5xl"
         
        />
          <h1 className="text-white text-2xl font-bold mt-2">Reset Your Password</h1>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            <span className="font-semibold text-2xl mr-2">!</span> 
            <span className="text-lg">{errorMessage}</span>
          </div>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-300">
            Enter the email address linked to your Tuneify account, and we'll send you an email.
          </p>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1 text-left"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gradient-to-r from-black via-gray-900 to-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-red-600 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
