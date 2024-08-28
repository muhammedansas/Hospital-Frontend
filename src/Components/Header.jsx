import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  FaUserMd,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
} from "react-icons/fa";

const Header = () => {
  const nav = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="bg-white text-white shadow-lg fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <div className="flex-1 flex items-center justify-start">
          <span className="text-3xl font-bold text-black">HealthCare+</span>
        </div>
        <div className="flex-1 flex justify-center">
        <button
    onClick={() => nav('/')}
    className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
    <FaHome className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white" />
    <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">Home</span>
    </button>

        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          {!user && (
            <>
              <button
                onClick={() => nav("/login")}
                className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
                <FaSignInAlt className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white" />
                <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Login
                </span>
              </button>

              <button
                onClick={() => nav("/register")}
                className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
                <FaUserPlus className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white" />
                <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Register
                </span>
              </button>
            </>
          )}
          {user && !user.is_admin && (
            <>
              <button
                onClick={() => nav("/profile")}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 transition-all duration-300 px-4 py-2 rounded-lg"
              >
                <FaUser />
                <span>Profile</span>
              </button>
            </>
          )}

          {user && (
            <button
              onClick={logoutUser}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 transition-all duration-300 px-4 py-2 rounded-lg"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}

          <button
            className="inline-flex items-center p-2 text-gray-200 hover:bg-gray-600 hover:text-white rounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            data-collapse-toggle="navbar-sticky"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden md:flex items-center justify-between w-full md:w-auto"
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {user && !user.is_doctor && (
              <li>
                <a
                  onClick={() => nav("/doctors_list")}
                  className="flex items-center space-x-2 py-2 px-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <FaUserMd />
                  <span>Doctors List</span>
                </a>
              </li>
            )}
            {user && !user.is_admin && (
              <li>
                <a
                  onClick={() => nav("/profile")}
                  className="flex items-center space-x-2 py-2 px-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <FaUser />
                  <span>Profile</span>
                </a>
              </li>
            )}
            {user && user.is_admin && (
              <li>
                <a
                  onClick={() => nav("/userlist")}
                  className="flex items-center space-x-2 py-2 px-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <FaUserMd />
                  <span>User List</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
