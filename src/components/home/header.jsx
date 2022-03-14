import { ChevronRightRounded } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import header from '../../assets/header.png'
import { PrimaryButton } from '../mui/Button'

function Header() {
    const navigate = useNavigate()
  return (
    <div className="header" style={{paddingTop:"100px"}}>
        <div className="pad" style={{ textAlign:"left"}}>
            <div className=" align-items-center">
                <div className="col-6">
                    <h1 className="header-text" style={{color:"white"}} >
                        SIMPLE LOAN MANAGEMENT SYSTEM.
                    </h1>
                </div>
                <div className="col-6 col-lg-12">
                    <PrimaryButton
                        className=""
                        onClick={()=>{
                            navigate('/login')
                        }}
                        sx={{
                            borderRadius:"30px",
                            fontSize:"24px",
                            padding:"15px",
                            color:"#ffd500",
                            backgroundColor:"white"
                        }}
                    >
                        GET STARTED
                    </PrimaryButton>
                </div>
            </div>
        </div>

        <div className="d-none d-md-block" >
            <img src={header} alt="header" className="header-img" />
        </div>
    </div>
  )
}

export default Header