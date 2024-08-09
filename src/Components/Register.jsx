import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {
  const RegistrationRef = useRef()
  const nav = useNavigate()

  const RegistrationApi = async (first_name,last_name,username,email,password,password2,is_doctor) =>{
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/register/',{
        first_name:first_name,last_name:last_name,username:username,email:email,password:password,password2:password2,is_doctor:is_doctor
      });
      console.log(response.data); 
      nav('/login')
    } catch(error){
      let errormsg=error.response?.data?.message?.email?.[0]||error.response?.data?.message?.password8?.[0]||error.response?.data?.message?.password_error?.[0]
      toast.error(errormsg)
      alert(errormsg)
      console.log(errormsg,'error messsages');
      
      console.error(error)
    }
  }

  const submitRegister = (e) =>{
    e.preventDefault()

    let first_name = RegistrationRef.current.first_name.value
    let last_name = RegistrationRef.current.last_name.value
    let username = RegistrationRef.current.username.value
    let email = RegistrationRef.current.email.value
    let password = RegistrationRef.current.password.value
    let password2 = RegistrationRef.current.password2.value
    let is_doctor = document.getElementById('is_doctor').checked

    RegistrationApi(first_name,last_name,username,email,password,password2,is_doctor)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-8 space-y-6">
        <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white md:text-2xl">
          Create an account
        </h1>
        <form ref={RegistrationRef} onSubmit={submitRegister} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Last Name"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <input
                type="password"
                name="password2"
                id="password2"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <input
              id="is_doctor"
              aria-describedby="is_doctor"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="is_doctor" className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300">Are you a doctor?</label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-white text-black rounded-lg py-2.5 px-5 text-center text-sm font-medium hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
