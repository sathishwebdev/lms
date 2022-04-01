import { Add, ArrowDownward, ArrowUpward, CurrencyExchange, Paid, PriceCheck } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
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

    let totalAmountReturned = list ? list.data.filter(data=>data.status === "closed").reduce((acc, data)=> acc + data.amount, 0) : null

    let totalInterest = list ? list.data.filter(data=>data.status === "active").reduce((acc, data)=> data.activities ? acc + data.activities.interestAmount : acc + 0, 0) : null

    let totalProfit = list ? list.data.filter(data=>data.status !== "active").reduce((acc, data)=> data.activities? acc + data.activities.interestAmount : acc+0, 0) : null

    let totalAmountInvested = list ? list.data.reduce((acc, data)=> acc + data.amount, 0) : null

  console.table({totalAmountCirculating, totalAmountReturned, totalInterest})

  return (
    <>
        {error && <Message type="error" message={error} />}
        {success && <Message type="success" message="Successfully Fetched"/>}
        {loading ? <div className='loader' ></div> :
        
        <div className="" style={{paddingBottom:"100px"}} >
            <div className="pad row ">
                <div className="pad col-12 col-lg" style={{border:"1px solid black", borderRadius:"25px", backgroundColor:"gold"}}>
                    <div className="d-flex flex-wrap justify-content-around align-items-center">
                        <div >
                         <Paid style={{fontSize:"60px"}} />
                         <h6>Invested</h6>
                        </div>
                        <div style={{width:"100%"}} >
                         <span  style={{fontSize:"30px"}}> ₹ {totalAmountInvested}</span>
                        </div>
                    </div>
                   
                </div>
                
                <div className="col-12 col-lg pad" style={{border:"1px solid black",  borderRadius:"25px", backgroundColor:"gold"}}>
                  <div className="d-flex flex-wrap justify-content-around align-items-center">
                      <div>
                        <PriceCheck style={{fontSize:"60px"}}/>
                        <h6>Profits</h6>
                      </div>
                     <div>
                           <p style={{fontSize:"20px"}}>{((totalProfit/totalAmountReturned)*100).toFixed(2)}%  {(totalProfit/totalAmountReturned)*100 > 2 ? <ArrowUpward color="success"/> : <ArrowDownward color="error"/> }</p>
                        {/* <Tooltip title="Return Investment">
                           <p>/ ₹ {totalAmountReturned}</p> 
                          </Tooltip>*/}
                     </div>
                     <div style={{width:"100%"}} > 
                     <span style={{fontSize:"30px"}}>₹ {totalProfit}</span>
                     </div>
                  </div>
                </div>

                <div className="col-12 col-lg pad" style={{border:"1px solid black", borderRadius:"25px", backgroundColor:"gold"}}>
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                      <div>
                   <CurrencyExchange style={{fontSize:"60px"}}/> <h6> Circulating </h6>
                   </div>
                   <div style={{width:"100%"}} >
                   <span style={{fontSize:"30px"}}> ₹ {totalAmountCirculating}</span>
                    </div>
                </div>
                </div>

                <div className="col-12 col-lg pad" style={{border:"1px solid black", borderRadius:"25px", backgroundColor:"gold"}}>
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                      <div>
                   <CurrencyExchange style={{fontSize:"60px"}}/> 
                   <h6> Interest Amount</h6>
                   </div>
                   <div style={{width:"100%"}} >
                   <span style={{fontSize:"30px"}} >₹ {totalInterest} <Add/></span>
                   </div>
                </div>
                </div>

            </div>
            <div className='m-auto' style={{ padding:"10px", maxWidth:"1200px", margin:"3%"}}>
                <ReactTable data={success ? list.data : []} />
            </div>
        </div>
        
        }
    </>
  )
}

export default LoanList