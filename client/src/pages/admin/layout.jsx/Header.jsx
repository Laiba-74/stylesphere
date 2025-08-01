import React from 'react';
import { LogOut, Bell, Search } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <>
                <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h2 className="text-lg font-semibold text-gray-900">
                    StyleSphere Admin
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-5 w-5" />
                </button>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  View Store
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
    // <header className="bg-white  px-6 py-4 shadow-sm flex justify-between items-center">
    //   <div className="text-lg font-semibold text-gray-800">StyleSphere Admin</div>

    //   <div className="flex items-center space-x-4">
    //     <div className="relative">
    //       <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
    //       />
    //     </div>
    //     <button className="p-2 text-gray-400 hover:text-gray-500">
    //       <Bell className="h-5 w-5" />
    //     </button>
    //     <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
    //       View Store
    //     </Link>

    //   </div>
    // </header>
  );
}

export default Header;
