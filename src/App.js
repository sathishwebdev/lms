import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter,Route, Routes, useNavigate} from 'react-router-dom';
import Verify from './views/Verify';
import Login from './views/login';
import { useSelector } from 'react-redux';
import Home from './views/home';
import { CollapesNav, NavBar } from './components/nav';
import SignUp from './views/SignUp';
import Verification from './components/verification';
import ForgetPassword from './views/forgetPassword';
import ChangePassword from './views/changePassword';


function App(props) {

  const {user_login} = useSelector(state => state.users.login)

  return (
   <>
   
    <BrowserRouter>   
    <div className="d-none d-sm-block" >
    
      <NavBar />
    
  </div>
  <div className="d-block d-sm-none" >
    <CollapesNav/>
  </div>
      <Routes>
        <Route exact path="/" element={<Home {...props} />}/>
        <Route exact path="/user/login" element ={<Login />} />
        <Route exact path="/user/signup" element ={<SignUp />} />
        <Route exact path="/user/verify" element={<Verify mailId={user_login ? user_login.email : ''} {...props} />}/>
        <Route exact path='/:id/verify/k' element={<Verification />} /> 
        <Route exact path ="/user/forgetpassword" element={<ForgetPassword />} />
        <Route exact path = "/:userId/changepassword/k" element={<ChangePassword/>} />
      
        <Route path="*" element={<div className="header" style={{minHeight:"100vh", borderRadius:"0 0 0 70vw", color:"white"}}><h1>404</h1></div>}/>
      </Routes>
    </BrowserRouter></>
  );
}

export default App;


const Private = ({children}) =>{
  const{ user_login } = useSelector(
    (state) => state.users.login
  );
  const navigate = useNavigate()

  useEffect(()=>{
      if(!user_login){
        navigate('/')
      }else if(!user_login.isVerified){
        navigate('/user/verify')
      }
  },[user_login])
  
  return <>
    {
      children  
    }
  </>
}
