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
    <header className="bg-white text-white shadow-lg w-full z-20 top-0 left-0">
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
        className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out "
      >
        <div className="absolute inset-0 bg-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
        <FaUserPlus className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white"/>
        <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
          Register
        </span>
      </button>
    </>
  )}
  
  
  {user && !user.is_admin && (
    <button
      onClick={() => nav("/profile")}
      className="relative flex items-center space-x-2 px-4 py-2 text-green-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
    >
      <div className="absolute inset-0 bg-green-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
      <FaUser className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white" />
      <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
        Profile
      </span>
    </button>
  )}

  {user && !user.is_doctor && (
    <button
    onClick={() => nav("/doctors_list")}
    className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
    <FaUserMd className="relative z-10 text-xl transition-colors duration-300 ease-in-out group-hover:text-white" />
    <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
      Doctors
    </span>
  </button>
  
  )}

  {user && user.is_admin && (
   <button
   onClick={() => nav("/userlist")}
   className="relative flex items-center space-x-2 px-4 py-2 text-blue-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
 >
   <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
   <FaUser className="relative z-10 text-xl transition-colors duration-300 ease-in-out group-hover:text-white" />
   <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
     Users
   </span>
 </button>
 
  )}

  {user && (
    <button
      onClick={logoutUser}
      className="relative flex items-center space-x-2 px-4 py-2 text-red-600 font-semibold rounded-lg overflow-hidden group transition-all duration-300 ease-in-out"
    >
      <div className="absolute inset-0 bg-red-600 transition-transform duration-500 ease-in-out group-hover:translate-x-0 translate-x-full pointer-events-none z-0"></div>
      <FaSignOutAlt className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white" />
      <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
        Logout
      </span>
    </button>
  )}
</div>

      </div>
    </header>
  );
};

export default Header;
