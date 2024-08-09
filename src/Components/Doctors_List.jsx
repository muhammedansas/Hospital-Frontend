import React, { useContext, useEffect, useState } from 'react';
import './Doctors_List.css';
import AuthContext from '../context/AuthContext';
import axiosInstance,{baseURL} from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


const Doctors_List = () => {
  const { user,authToken,doctors,setDoctors } = useContext(AuthContext);
  const nav = useNavigate()
  
  useEffect(()=>{
    getDoctors()
  },[])
  
  let getDoctors = async () =>{
    // let response = await fetch('http://127.0.0.1:8000/api/doctorsList/', {
      //   method:'GET',
      //   headers:{
        //     'Content-Type':'application/json',
        // 'Authorization':'Bearer '+String(authToken.access)                                 #without axios do like this
        //   }
        // })
        // let data = await response.json()
        
        let response = await axiosInstance.get('/api/doctorsList/')
        
        if(response.status === 200){
          setDoctors(response.data)
        }
        
      }
      console.log(doctors,'qwertyuio');
      return (
    <>
    {doctors.map(doctor =>(
       <div style={{width:"99%",boxShadow:"0px 0px 3px 3px grey",backgroundColor:"white",margin:"10px" ,display:"flex",alignContent:"center",justifyContent:"space-between", borderRadius:" 10px",padding:"10px" }} >
          
       <div style={{display:"flex"}}  > <img style={{height:"100px",borderRadius:"10px"}} src={`${baseURL + doctor.image}`} alt="" onClick={()=> nav('  /')} /> 
         <div style={{marginLeft:"10px"}} >
             <h6></h6>
             <h6>{doctor.user.username}</h6>
             <h6>{doctor.department}</h6>
             <h6>{doctor.hospital}</h6>
          </div>
          
       </div>
      <div style={{width:"100px",height:"90px",display:"grid",alignItems:"center",justifyContent:"center"}} >
          <button style={{width:"60px",borderRadius:"5px",height:"30px",border:"0px",backgroundColor:'#3734d5',color:"white",fontWeight:"bold"}} >Edit</button>
           <button  style={{width:"70px",borderRadius:"5px",height:"30px",border:"0px",backgroundColor:'#eb1919',color:"white",fontWeight:"bold"}} >remove</button>
          </div>
     </div>
    ))}
    
    </>
  );
};

export default Doctors_List;
