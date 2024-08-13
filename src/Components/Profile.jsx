import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'
import axiosInstance, { baseURL } from '../utils/axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [doctorprofile, setDoctorprofile] = useState()
    const [userprofile, setUserprofile] = useState()
    const editRef = useRef()
    const { user } = useContext(AuthContext)
    const nav = useNavigate()
    
    useEffect(() => {
        if (user.is_doctor){
            getDoctorProfile()
        }else{
            getUserProfile()
        }
    }, [])
    
    const getDoctorProfile = async () => {
        let response = await axiosInstance.get('/api/doctorProfile/')
        if (response.status === 200) {
            setDoctorprofile(response.data)
        }
    }

    const getUserProfile = async () => {
        let response = await axiosInstance.get('/api/Userprofile/')
        if (response.status === 200) {
            setUserprofile(response.data)
        }
    }

    const editDoctorApi = async (username, email, department, hospital, image) => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('department', department);
            formData.append('hospital', hospital);
            if (image) {
                formData.append('image', image);
            }
            const response = await axiosInstance.patch('/api/doctorProfile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(formData);
            
            if (response.status === 200) {
                setDoctorprofile(response.data);
            }
            nav('/');
        } catch (error) {
            console.log(error);
        }
    }

    const editUserApi = async (first_name, last_name, username, email, profile_image) => {
        try {
            const formData = new FormData();
            console.log(formData)
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('email', email);
            if (profile_image) {
                formData.append('profile_image', profile_image);
            }
            console.log(formData,"////////////////////////////");
            
            const response = await axiosInstance.patch('/api/Userprofile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setUserprofile(response.data);
            }
            nav('/');
        } catch (error) {
            console.log("error works");
            
            // console.log(error);
        }
    }

    const submitDoctor = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const department = formData.get('department');
        const hospital = formData.get('hospital');
        const image = formData.get('image');
        editDoctorApi(username, email, department, hospital, image);
    }

    const submitUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const first_name = formData.get('first_name');
        const last_name = formData.get('last_name');
        const username = formData.get('username');
        const email = formData.get('email');
        const profile_image = formData.get('profile_image');
        editUserApi(first_name, last_name, username, email, profile_image);
    }

    return (
        <>
            {user.is_doctor ?
                <form ref={editRef} onSubmit={submitDoctor} className="flex flex-col items-center justify-center px-4 py-2 mt-14 lg:py-0">
                    <div className="w-full max-w-lg bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:bg-opacity-50 dark:border-gray-700">
                        <div className="p-2 md:p-4 flex flex-col items-center">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
                            <div className="w-full flex flex-col items-center">
                                <img
                                    className="w-1/2 h-auto rounded-3xl shadow-lg mb-4"
                                    src={`${baseURL + doctorprofile?.image} `}
                                    alt="Profile Image"
                                />
                                <div className="w-full flex flex-col space-y-4 px-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={doctorprofile?.user.username}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={doctorprofile?.user.email}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="department" className="block text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                            <input
                                                type="text"
                                                name="department"
                                                id="department"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={doctorprofile?.department}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="hospital" className="block text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                            <input
                                                type="text"
                                                name="hospital"
                                                id="hospital"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={doctorprofile?.hospital}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 mt-2 w-full">
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-500 bg-opacity-70 text-gray-400 hover:bg-gray-900 hover:text-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                :
                <form ref={editRef} onSubmit={submitUser} className="flex flex-col items-center justify-center px-4 py-2 mt-14 lg:py-0">
                    <div className="w-full max-w-lg bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:bg-opacity-50 dark:border-gray-700">
                        <div className="p-2 md:p-4 flex flex-col items-center">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Details</h2>
                            <div className="w-full flex flex-col items-center">
                                <img
                                    className="w-1/2 h-auto rounded-3xl shadow-lg mb-4"
                                    src={`${baseURL + userprofile?.profile_image} ` || "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg"}
                                    alt="Profile Image"
                                />
                                <div className="w-full flex flex-col space-y-4 px-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="U_first_name" className="block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={userprofile?.first_name}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="U_last_name" className="block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="ast_name"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={userprofile?.last_name}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="U_username" className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={userprofile?.username}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="U_email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                defaultValue={userprofile?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="profile_image" className="block text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
                                        <input
                                            type="file"
                                            name="profile_image"
                                            id="profile_image"
                                            className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 mt-2 w-full">
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gray-500 bg-opacity-70 text-gray-400 hover:bg-gray-900 hover:text-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-900 dark:bg-opacity-35 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>  
                </form>
            }
        </>
    )
}

export default Profile;
