import React, { useState } from 'react';
import { useAuth } from '../context/ContextProvider.jsx';
import { Link } from 'react-router-dom';
import { FaUser,FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-teal-500 text-white relative">
        <div className='flex justify-between items-center gap-2'>
        <FaUser className="text-white  " size={20} />
        <h1 className="text-2xl font-bold ">{user?.name}</h1>
        </div>

        {user ? (
          <button
            className="flex items-center   bg-opacity-20 hover:bg-opacity-30 transition "
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="text-white  hover:text-blue-500 cursor-pointer" size={20} />
          </button>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <button className="bg-white text-teal-500 px-4 py-2 rounded-md text-sm">Login</button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-teal-500 px-4 py-2 rounded-md text-sm">Signup</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/90 shadow-lg transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-teal-700"> Hello, {user?.name}</h3>
          <button
            className="text-gray-600 text-2xl hover:text-red-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Optional: translucent full-screen overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
