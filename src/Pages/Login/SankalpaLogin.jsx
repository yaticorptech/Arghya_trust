import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { validatesankalpalogin } from "../../Utils/Vaildation";
import axios from "axios";
import Navbar from "../../Global/Navbar";

function SankalpaLogin() {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validatesankalpalogin(phone);
    if (Object.keys(errors).length) {
      toast.error(Object.values(errors).join(" "));
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbxLbmisRbn87AKjwi-ntSThn1pRr_37iKt_NyJuVsuRwMYbVzV9qAJnBcwSQ6T827AwFg/exec",
        { params: { phone } }
      );


      const apiData = res.data;

      if (apiData.count > 0) {
        navigate("/sankalpa", { state: { apiData } });
      } else {
        toast.error("Invalid response from server.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      const status = error?.response?.status;
      if (status === 401) toast.error("Entered values are wrong");
      else if (status === 404) toast.warning("Please register in whatsapp");
      else toast.error("Unexpected server error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4">
      <Navbar />
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Sankalpa
        </h2>

        {/* Mobile Number Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Enter Your Registered Mobile Number
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-400 bg-white">
            <FaPhone className="text-indigo-600 mx-2 sm:mx-3 md:mx-4 text-base sm:text-lg md:text-xl" />

            <input
              type="text"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile Number"
              required
              className="flex-1 px-2 py-2 outline-none text-gray-700 placeholder-gray-400 rounded-r-lg"
            />
          </div>
          {errors.phone && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 text-white font-semibold rounded-lg transition duration-300 ${loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Sankalpa"
          )}
        </button>
      </form>
    </div>
  );
}

export default SankalpaLogin
