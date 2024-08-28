import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let {loginUser,user} = useContext(AuthContext)
  let nav = useNavigate()
  
  return (
    <>
      <div >
        <section className="bg-gray-50 dark:bg-gray-900" style={{backgroundImage:"url('https://e0.pxfuel.com/wallpapers/374/343/desktop-wallpaper-abstract-futuristic-telecom.jpg')",
          width:"100%",height:"100vh",objectFit:"cover"}}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form onSubmit={loginUser} className="space-y-4 md:space-y-6" >
                  {/* {user.blocked &&
                    <h1>User is blocked please contact the admin and make sure your a unblocked user</h1>} */}
                  <h1></h1>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                    </div> 
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-purple-50">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a onClick={()=>nav("/register")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
