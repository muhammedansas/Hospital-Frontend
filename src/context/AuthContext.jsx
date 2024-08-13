import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    let [authToken,setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null)
    let [user,setUser] = useState(()=> localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')):null)
    let [loading,setLoading] = useState(true)
    const [doctors,setDoctors] = useState([])
    let nav = useNavigate()

   

    let loginUser = async(e) =>{
        e.preventDefault()
        console.log("login works")
        let response = await fetch('http://127.0.0.1:8000/api/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})          // first get the email and password from react and puth the values in to the django login verificaton fields for authentication
        })
        let data = await response.json()
        
        
        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            console.log(jwtDecode(data.access));
            localStorage.setItem('authToken',JSON.stringify(data))
            nav('/')    
        }else{
            alert("Somthing went wrong")
        }
    }

    let logoutUser = () =>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')                              // using delete the authToken from localstorage
        nav('login/')
    }

    let updateToken = async () =>{
        console.log('update method is calling')
        let response = await fetch('http://127.0.0.1:8000/api/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken?.refresh})            //this one for get the refresh token and put into the django refresh token for generating new access and refresh token
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken',JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{

        if(loading){
            updateToken()
        }

        let fourminutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authToken){
                updateToken()
            }
        },fourminutes)
        return ()=>clearInterval(interval)
    },[authToken,loading])
    
    let contextData = {
        user:user,
        authToken:authToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
        doctors:doctors,
        setDoctors:setDoctors
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null :children}
        </AuthContext.Provider>
    )
}