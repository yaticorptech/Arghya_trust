import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 shadow-lg">
      <div className="flex justify-between items-center px-6 md:px-12 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/Vcys3yJF/ARGHYA-LOGOO.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <a
              href="https://arghyatrust.org/"
              className="hover:text-yellow-300 transition duration-200"
            >
              Home
            </a>
          </li>
         
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg space-y-4 py-6 animate-slideDown border-t border-purple-400">
          <li>
            <a
              href="/"
              className="font-medium hover:text-yellow-300 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="https://yaticorp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-yellow-300 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
