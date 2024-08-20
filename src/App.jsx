import './App.css'
import Header from './Components/Header'
import { Routes,Route } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Register from './Components/Register'
import Doctors_List from './Components/Doctors_List'
import Profile from './Components/Profile'
import UserList from './Components/UserList'


function App() {

  return (
    <>
     <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/doctors_list' element={<Doctors_List/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/userlist' element={<UserList/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
