import React, { useEffect, useRef, useState } from 'react'
import './Doctors_List.css';
import axiosInstance, { baseURL } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    let editRef = useRef()
    let navigate = useNavigate()
    let [users,setUsers] = useState([])
    
    useEffect(() =>{
        getUser()
    },[])
    
    let getUser = async () =>{
        let response = await axiosInstance.get('/api/Userlist/')
        if(response.status === 200){
            setUsers(response.data)
        }
    }

    let Blockuser = async (id) =>{
            let response = await axiosInstance.patch(`/api/Userlist/${id}/`,{
                block:true
            })
            if (response.status === 200){
                console.log("jefjj");
                
            }
    }



    
    console.log(users.username);
    return (
    <>
    {users.map((user,id) =>(
        <div style={{width:"99%",boxShadow:"0px 0px 3px 3px grey",backgroundColor:"white",margin:"10px" ,display:"flex",alignContent:"center",justifyContent:"space-between", borderRadius:" 10px",padding:"10px" }} >
          
        <div style={{display:"flex"}}  > <img style={{height:"100px",borderRadius:"10px"}} src={`${baseURL + user?.image}`} alt="" /> 
          <div style={{marginLeft:"10px"}} >
              <h6></h6>
              <h6>{user.username}</h6>
              <h6>{user.email}</h6>
           </div>
           
        </div>
       <div style={{width:"100px",height:"90px",display:"grid",alignItems:"center",justifyContent:"center"}} >
           <button onClick={Blockuser(id)}  type="submit" style={{width:"80px",borderRadius:"5px",height:"30px",border:"0px",backgroundColor:'green',color:"white",fontWeight:"bold"}} >Unblock</button>
            <button onClick={()=>navigate('/')} style={{width:"70px",borderRadius:"5px",height:"30px",border:"0px",backgroundColor:'#eb1919',color:"white",fontWeight:"bold"}} >Block</button>
           </div>
      </div>
    ))} 
     
    </>
  )
}

export default UserList