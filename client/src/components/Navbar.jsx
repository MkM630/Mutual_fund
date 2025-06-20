import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FiHome, FiStar, FiLogIn, FiLogOut, FiUserPlus, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <FiHome className="mr-2" />
            FundTracker
          </Link>
          
          <div className="flex space-x-4 items-center">
            <Link to="/" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded">
              <FiHome className="mr-1" /> Home
            </Link>
            
            {user ? (
              <>
                <Link to="/saved" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded">
                  <FiStar className="mr-1" /> Saved Funds
                </Link>
                {user.name && (
                  <div className="flex items-center px-3 py-2 bg-indigo-700 rounded">
                    <FiUser className="mr-1" /> {user.name}
                  </div>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded">
                  <FiLogIn className="mr-1" /> Login
                </Link>
                <Link to="/register" className="flex items-center px-3 py-2 hover:bg-indigo-700 rounded">
                  <FiUserPlus className="mr-1" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;