import React from "react";
import Navbar from "../../Global/Navbar";

function Thankyou() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 text-center px-4">
       <Navbar/>
      {/* Animated Circle */}
      <div className="flex justify-center items-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg animate-bounce mb-6">
        <span className="text-white text-5xl font-bold">💫</span>
      </div>

      {/* Thank You Text */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Thank You!
      </h1>
      <p className="text-lg text-gray-600 max-w-md">
        We truly appreciate your time and effort. Your response has been recorded successfully.  
        Have a wonderful day ahead!
      </p>

    

    
    </div>
  );
}

export default Thankyou;
