import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/home/header'
import { PrimaryButton } from '../components/mui/Button'
import { Message } from '../containers'
import { logout } from '../redux/actions/users.actions'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {error, user_login } = useSelector(
        (state) => state.users.login
      );

      useEffect(()=>{
        if (user_login) navigate('/user/dashboard')
      },[user_login])

      if(error){
          alert("session expired");
          dispatch(logout())
      }

  return (
    <div>
         {error && <Message type="error" message={`${error} \n You need to Login again`} />}

        <Header />
        <div className="pad">
            <h1 ><b>YOUR CLIENTS CAN CHECK THEIR STATUS EASY</b></h1>
            <PrimaryButton
                 onClick={()=>{
                    navigate('/login')
                }}
                sx={{
                    fontSize:"24px", padding:"16px", borderRadius:"50px"
                }}
            >
                CHECK YOUR STATUS
            </PrimaryButton><br/>
            <small>If You are a Client.</small>
        </div>
    
    </div>
  )
}

export default Home