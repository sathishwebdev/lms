import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../containers';
import { getLoanList } from '../../redux/actions/loan.action';
import { setSnackbar } from '../../redux/actions/snackbar.actions';

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
    },[success] )

    console.log(list)
    let date = timestamp.getDate()
    let month = timestamp.getMonth()
    let year = timestamp.getFullYear()

    let totalAmountInvested = list ? list.data.filter(data=>data.status === "active").reduce((acc, data)=> acc + data.amount, 0) : null

    let totalAmountReturned = list ? list.data.filter(data=> !data.status === "active").reduce((acc, data)=> acc + data.amount, 0) : null

    console.log(totalAmountInvested);
  return (
    <div>
        {error && <Message type="error" message={error} />}
        {success && <Message type="success" message="Successfully Fetched"/>}
        {loading ? <div className='loader' ></div> :
        
        <div className="pad" >
            <div className="d-flex">
                <div style={{border:"1px solid black", padding:"15px", width:"fit-content", borderRadius:"25px", backgroundColor:"lightgreen", margin:"2%"}}>
                    <h2>Circulating Now : &#8377; {totalAmountInvested}</h2>
                </div>
                <div style={{border:"1px solid black", padding:"15px", width:"fit-content", borderRadius:"25px", backgroundColor:"#ff7878",margin:"2%"}}>
                    <h2>Returned Gross: &#8377; {totalAmountReturned}</h2>
                </div>
                <div style={{border:"1px solid black", padding:"15px", width:"fit-content", borderRadius:"25px", backgroundColor:"lightgreen",margin:"2%"}}>
                    <h2>Gross Gain : &#8377; {totalAmountReturned*0.02}</h2>
                </div>
            </div>
            <div style={{overflowX:"auto", padding:"10px"}}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan="2">LoanId</th>
                            <th rowSpan="2">Date</th>
                            <th rowSpan="2">Status</th>
                            <th rowSpan="2">Name</th>
                            <th rowSpan="2">Amount</th>
                            <th colSpan="2" rowSpan="1">Property</th>
                            <th rowSpan="2">Rate of Interest</th>
                            <th rowSpan="2" title ="Interest per Month" >IPM</th>
                            <th rowSpan="2" >No. of Months</th>
                            <th rowSpan="2" title="till today">Total Interest Amount</th>
                            <th rowSpan="2" title="till today">Total Amount</th>
                        </tr>
                        <tr>
                            <th>name</th>
                            <th>weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list &&  list.data.map((data, id)=>((
                                <tr key={id}>
                                    <td>{data.loanId}</td>
                                    <td>{data.dateOfIssue}</td>
                                    <td>{data.status}</td>
                                    <td>{data.name}</td>
                                    <td>{data.amount}</td>
                                    <td>{data.property.name}</td>
                                    <td>{data.property.weight}</td>
                                    <td>{data.rateOfInterest}%</td>
                                    <td>{data.amount * (data.rateOfInterest/100)}</td>
                                    <td>{(data.dateOfIssue.split('/')[1]-month)}</td>
                                    <td>{(data.dateOfIssue.split('/')[1]-month )* (data.amount * (data.rateOfInterest/100)) }</td>
                                    <td>{((data.dateOfIssue.split('/')[1]-month )* (data.amount * (data.rateOfInterest/100)))+data.amount }</td>
                                </tr>
                        )))}
                     </tbody>
                </table>
            </div>
        </div>
        
        }
    </div>
  )
}

export default LoanList