import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../containers';
import { getLoanList } from '../../redux/actions/loan.action';
import { setSnackbar } from '../../redux/actions/snackbar.actions';
import ReactTable from '../mui/table';

function LoanList() {
     const dispatch = useDispatch();
     const timestamp = new Date();
    const {user_login : user} = useSelector(state=>state.users.login)
    const {loading, error, success, list} = useSelector(state => state.loans.list)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
        }else{
            if(user.isVerified){
                dispatch(getLoanList(user._id))
                if(success){
                   dispatch(setSnackbar(true, "success", "Successfully Fetched"))
                }
           }else{
               navigate('/user/verify')
           }
        }
    },[] )

    
    let date = timestamp.getDate()
    let month = timestamp.getMonth()
    let year = timestamp.getFullYear()

    let totalAmountCirculating = list ? list.data.filter(data=>data.status === "active").reduce((acc, data)=> acc + data.amount, 0) : null

    let totalAmountInvested = list ? list.data.reduce((acc, data)=> acc + data.amount, 0) : null

  

  return (
    <>
        {error && <Message type="error" message={error} />}
        {success && <Message type="success" message="Successfully Fetched"/>}
        {loading ? <div className='loader' ></div> :
        
        <div className="" style={{paddingBottom:"100px"}} >
            <div className="pad row justify-content-around align-items-center">
            <div className="col-12 col-sm" style={{border:"1px solid black", padding:"15px", borderRadius:"25px", backgroundColor:"lightgreen", margin:"2%"}}>
                    <h2>Invested : &#8377; {totalAmountCirculating}</h2>
                </div>
                <div className="col-12 col-sm" style={{border:"1px solid black", padding:"15px", borderRadius:"25px", backgroundColor:"lightgreen", margin:"2%"}}>
                    <h2>Circulating Now : &#8377; {totalAmountInvested}</h2>
                </div>
            </div>
            <div className='m-auto' style={{overflowX:"auto", padding:"10px", maxWidth:"900px", margin:"3%"}}>
                <ReactTable data={success ? list.data : []} />
            </div>
        </div>
        
        }
    </>
  )
}

export default LoanList