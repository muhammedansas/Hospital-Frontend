import React, { useContext, useEffect, useState } from 'react';
import './Doctors_List.css';
import AuthContext from '../context/AuthContext';
import axiosInstance, { baseURL } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Doctors_List = () => {
  const { user, authToken, doctors, setDoctors } = useContext(AuthContext);
  const nav = useNavigate();
  console.log("this is doctors log", doctors);
  
  useEffect(() => {
    getDoctors();
  }, []);

  let getDoctors = async () => {
    try {
      let response = await axiosInstance.get('/api/doctorsList/');
      if (response.status === 200) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  let BlockDoctor = async (id, blocked) => {
    try {
      let response = await axiosInstance.patch(`/api/doctorsList/${id}/`, {
        "blocked": blocked,
      });

      if (response.status === 200) {
        getDoctors();
        nav('/doctors_list');
      }
    } catch (error) {
      console.error("Error blocking/unblocking doctor", error);
    }
  };

  return (
    <div className="space-y-6">
  {doctors.map(doctor => (
    <div 
      key={doctor.id} 
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row items-center sm:justify-between p-6 transition-transform transform hover:translate-y-1 hover:scale-101 hover:shadow-lg"
    >
      <div className="flex items-center sm:space-x-6 space-y-4 sm:space-y-0 flex-col sm:flex-row w-full sm:w-auto">
        <img 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer" 
          src={`${baseURL + doctor.user.profile_image}`} 
          alt={doctor.user.username}  
        />
        <div className="text-center sm:text-left">
          <h6 className="text-lg font-semibold text-gray-900">{doctor.user.username}</h6>
          <p className="text-sm text-gray-600">{doctor.department}</p>
          <p className="text-sm text-gray-600">{doctor.hospital}</p>
        </div>
      </div>
      {user.is_admin && (
        <div className="mt-4 sm:mt-0 flex flex-col items-center sm:items-end space-y-2">
          {doctor.user.blocked ? (
            <button 
              onClick={() => BlockDoctor(doctor.id, false)} 
              className="px-4 py-2 bg-green-500 text-white rounded-md font-medium shadow-sm hover:bg-green-600 transition-colors duration-150"
            >
              Unblock
            </button>
          ) : (
            <button 
              onClick={() => BlockDoctor(doctor.id, true)} 
              className="px-4 py-2 bg-red-500 text-white rounded-md font-medium shadow-sm hover:bg-red-600 transition-colors duration-150"
            >
              Block
            </button>
          )}
          <div className="flex items-center">
            <input
              id="is_doctor"
              aria-describedby="is_doctor"
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="is_doctor" className="ml-2 text-sm text-gray-700">
              Verify doctor
            </label>
          </div>
        </div>
      )}
    </div>
  ))}
</div>

  );
  ;
};

export default Doctors_List;
