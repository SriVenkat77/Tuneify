import React, { useState } from 'react';
import { FaLock, FaShieldAlt, FaExclamationTriangle, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPin = import.meta.env.VITE_ADMIN_PIN; 
    if (pin === adminPin) {
      window.location.href = 'https://spotify-admin.netlify.app/';
    } else {
      setError('Incorrect PIN!');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-red-700 min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg border border-gray-700 text-center">
        <FaUserShield className="text-yellow-400 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="text-gray-400 mt-2">Enter your PIN to access admin privileges.</p>

        <div className="mt-6">
          <input
            type="password"
            placeholder="Enter PIN"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-center text-lg"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
          >
            Unlock Access
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-400 text-sm flex items-center justify-center">
            <FaExclamationTriangle className="mr-2" /> {error}
          </div>
        )}
      </div>

      <div className="w-full  mt-10 p-6 rounded-lg bg-black shadow-md">
        <h2 className="text-xl font-bold flex items-center mb-4"><FaLock className="mr-2 text-yellow-400" /> Why Admin Access?</h2>
        <p>Admins have special privileges to manage and oversee.They can create, modify, and manage songs,albums details for a smooth operation.</p>

        <h2 className="text-xl font-bold flex items-center mt-6 mb-4"><FaShieldAlt className="mr-2 text-yellow-400" /> Security & Compliance</h2>
        <p>For security reasons, this page is protected with a PIN verification system. Unauthorized attempts may trigger security measures.</p>

        <h2 className="text-xl font-bold flex items-center mt-6 mb-4"><FaExclamationTriangle className="mr-2 text-yellow-400" /> Need Assistance?</h2>
        <p>If you are an admin but do not have the correct PIN, contact the system administrator for verification. Unauthorized attempts are logged.</p>

        <h2 className="text-xl font-bold flex items-center mt-6 mb-4"><FaLock className="mr-2 text-yellow-400" /> User Responsibility</h2>
        <p>Admins must ensure integrity and prevent unauthorized modifications.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
