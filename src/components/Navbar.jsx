// --- Navbar.jsx ---
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { AuthContext } from '../pages/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Use AuthContext
  
  useEffect(() => {
    const id = localStorage.getItem('userId');
   
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
      try {
        // Send a POST request to the backend to log out
        await axios.post('http://localhost:5000/api/user/logout', {}, {
          withCredentials: true, // Include cookies in the request
        });
  
        // Clear the authentication state in the frontend
        document.cookie = 'token=; Max-Age=0; path=/'; // Clear the token cookie
        localStorage.removeItem('userId');
        setIsAuthenticated(false); // Update global auth state
        
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <nav className="bg-cyan-500 text-white p-4">
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className="text-2xl font-bold">
          <Link to="/">Opal</Link>
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
        <ul
          className={`flex flex-col md:flex-row md:space-x-10 absolute md:static bg-cyan-500 md:bg-transparent w-full md:w-auto left-0 p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'top-16' : '-top-96'
          }`}
        >
          <li className="py-2 md:py-0">
            <Link to="/dashboard" onClick={() => setIsOpen(false)}><IoIosHome /></Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/search" onClick={() => setIsOpen(false)}><CiSearch /></Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to="/message" onClick={() => setIsOpen(false)}><FiMessageCircle /></Link>
          </li>
          <li className="py-2 md:py-0">
            <Link to={'/profile'} onClick={() => setIsOpen(false)}><FaRegUserCircle /></Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li className="py-2 md:py-0">
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
              
            </>
          ) : (
            <li className="py-2 md:py-0">
              <button onClick={handleLogout} className="text-white">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;