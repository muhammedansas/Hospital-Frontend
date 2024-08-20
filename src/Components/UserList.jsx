import React, { useEffect, useState } from 'react';
import axiosInstance, { baseURL } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/api/Userlist/');
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const Blockuser = async (id, blocked, email) => {
    try {
      const response = await axiosInstance.patch(`/api/Userlist/${id}/`, {
        blocked,
        email
      });
      if (response.status === 200) {
        getUser(); // Refresh the user list
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  return (
    <div className="space-y-6">
      {users.map(user => (
        <div
          key={user.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row items-center sm:justify-between p-4 m-2 transition-transform transform hover:translate-y-1 hover:scale-101 hover:shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
              src={`${baseURL + user.profile_image}`}
              alt={user.username}
            />
            <div className="text-center sm:text-left">
              <h6 className="text-lg font-semibold text-gray-900">{user.username}</h6>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end space-y-2 mt-4 sm:mt-0">
            {user.blocked ? (
              <button
                onClick={() => Blockuser(user.id, false, user.email)}
                className="px-4 py-2 bg-green-500 text-white rounded-md font-medium shadow-sm hover:bg-green-600 transition-colors duration-150"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => Blockuser(user.id, true, user.email)}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium shadow-sm hover:bg-red-600 transition-colors duration-150"
              >
                Block
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
