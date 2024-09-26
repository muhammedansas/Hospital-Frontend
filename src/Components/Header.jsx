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




{/* <div className="relative max-w-sm">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)} // Update the date when selected
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Select date"
                dateFormat="MMMM d, yyyy" // Format for the selected date
                isClearable              // Allows clearing the selected date
                open={isCalendarOpen} // Show the calendar immediately
                onClickOutside={() => setIsCalendarOpen(false)} // Close calendar when clicked outside
                onFocus={() => setIsCalendarOpen(true)} // Open calendar on input focus
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </div>
            </div> */}