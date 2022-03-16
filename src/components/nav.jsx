import { Close, Menu } from "@mui/icons-material"
import {IconButton } from "@mui/material"
import { useState } from "react"
import logo from '../assets/logo.svg'
import { Link, useLocation, useNavigate } from "react-router-dom"
import Button, { PrimaryButton, SecondaryButton } from "./mui/Button"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/users.actions"
import NavModel  from "../model/navModel"
import AccountMenu from "./NavBar/AccountMenu"

const NavBar = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const{ user_login } = useSelector(
      (state) => state.users.login
    );
  
    return       <div
        className='nav'
    >
    <div className="d-flex justify-content-around align-items-center " >
    <Link to="/" style={{color:"white", textDecoration:"none"}} ><img style={{margin:"5%"}} src={logo} height="35px" alt="logo" /></Link>
       <Link to="/" style={{color:"#ffd500", textDecoration:"none"}} > <h1 style={{marginLeft:"10px", marginTop:"10px"}} >LMS</h1></Link>
    </div>
    <div className="d-flex align-items-center"  >
  { !user_login 
    ? <> {location.pathname === "/user/login" 
        ? "" 
        : <SecondaryButton
            onClick={()=>{
                navigate('/user/login')
            }}
                sx={{
                    width:"100px",
                    borderRadius:"50px"
                }}
          >
              Login
          </SecondaryButton>
      }
        
          {location.pathname === "/user/signup" 
        ? "" 
        :  <PrimaryButton
              onClick={()=>{
                  navigate('/user/signup')
              }}
              sx={{
                marginRight:"20px"
            }}
          >
              SignUp
          </PrimaryButton>}
      </>
          
        :<div className="d-flex align-items-center" style={{marginRight:"20px"}}>
          <p style={{marginTop:"15px"}} >{user_login.name}</p>
        <AccountMenu name = {user_login.name[0]} title={user_login.name} />
        </div>}
    </div>
    </div>
     
  }
  

  const CollapesNav = () =>{
   
    const [navStatus, setNavStatus] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{ user_login } = useSelector(
      (state) => state.users.login
    );
  
    const CloseMenu = () =>{
      
      document.getElementById('c-nav').style.transform = 'translateX(-100vw)'
      document.getElementById('c-nav').style.display = "none"
      setNavStatus(false)
    }
  
    const OpenMenu = () =>{
      document.getElementById('c-nav').style.display = "flex"
      document.getElementById('c-nav').style.transform = 'translateX(0)'
      setNavStatus(true)
    }
  
    return <>
    <div className='nav-btn' >
      <IconButton
        onClick={!navStatus ? OpenMenu : CloseMenu}
      >
        {!navStatus ? <><Menu fontSize= "large"/>  </> :<Close sx={{color:'gray'}} fontSize='large' />}
      </IconButton>
      <div className="d-flex justify-content-around align-items-center " >
    <Link to="/" style={{color:"white", textDecoration:"none"}} ><img style={{margin:"5%"}} src={logo} height="35px" alt="logo" /></Link>
       <Link to="/" style={{color:"#ffd500", textDecoration:"none"}} > <h1 style={{marginLeft:"10px", marginTop:"10px"}} >LMS</h1></Link>
    </div>
      <div style={{marginRight:"20px", marginLeft:"auto"}}>
          {!user_login
           ? <SecondaryButton
            onClick={()=>{
                navigate('/user/login')
            }}
                sx={{
                    width:"100px",
                    borderRadius:"50px"
                }}
          >
              Login
          </SecondaryButton> 
          : <div className='d-flex'>
            <p style={{marginTop:"15px"}} >{user_login.name.split(' ')[0]}</p>
            <AccountMenu name = {user_login.name[0]} title={user_login.name} />
          </div>}
      </div>
    </div>
      <div
      className='collopse-nav' id="c-nav"
      >
     {NavModel.map(({name,path}, id)=>(
       <Button
       key={id}
       sx={{
         margin:'5%',
         color:"gray"
       }}
       onClick={CloseMenu}
        href={path}
       >
        {name}
        </Button>
     )) }
     { !user_login 
    ? <> {location.pathname === "/user/login" 
        ? "" 
        : <SecondaryButton
            onClick={()=>{
                navigate('/user/login')
                CloseMenu()
            }}
                sx={{
                    width:"100px",
                    borderRadius:"50px"
                }}
          >
              Login
          </SecondaryButton>
      }
        {location.pathname === "/user/signup" 
        ? "" 
        :  <PrimaryButton
              onClick={()=>{
                  navigate('/user/signup')
                  CloseMenu()
              }}
          >
              SignUp
          </PrimaryButton>}</>
          
        :
        <Button
        onClick={ ()=>{
          CloseMenu()
          dispatch(logout())
        }}
        sx={{
          backgroundColor:"#ff5145"
        }}
      >
        Logout
      </Button>

        }
  
      </div>
    </>
  
  }

  export{
      NavBar,
      CollapesNav
  }