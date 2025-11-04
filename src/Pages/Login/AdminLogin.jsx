import React, { useState } from 'react';
import { FaRegCreditCard, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { validateAdminLogin } from '../../Utils/Vaildation';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Global/Navbar';

function AdminLogin() {
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const number = "123456789012";
  const pass = "admin@123";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateAdminLogin({ cardNumber, password });
    if (Object.keys(errors).length) {
      toast.error(Object.values(errors).join(' '));
      return;
    }

    setLoading(true);
    try {
      if (cardNumber === number && password === pass) {
        const res = await axios.get(
          "https://script.google.com/macros/s/AKfycbzLJusZ_UVo9ZeYbjTxstpHtYAbNGD1oJ_OjQp9zzn_n8ui-3mB7uDVayAcSsAsrX6k/exec"
        );
        const apiData = res.data;
        toast.success('✅ Login successful! Redirecting...');

        setTimeout(() => navigate('/admin', { state: { apiData } }), 1500);
      } else {
        toast.error('❌ Invalid Secret Number or Password');
      }
    } catch (error) {
      console.error(error);
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;

      if (status === 401) toast.error('Incorrect password.');
      else if (status === 502) toast.info('User already registered.');
      else if (status === 404) toast.warning('User not found.');
      else toast.error(msg || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 px-4 relative">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full">
        <Navbar />
      </div>

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 transform transition duration-300 hover:scale-[1.02] mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Secret Number Field */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-gray-700 font-semibold mb-1"
            >
              Secret Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaRegCreditCard className="text-gray-500 mr-2" />
              <input
                id="cardNumber"
                type="text"
                maxLength={12}
                placeholder="Enter your Secret number"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCardNumber(value);
                }}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-500 mr-2" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Admin Portal | Secure Access
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
