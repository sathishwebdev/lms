import { CalendarMonth, CurrencyExchange, Diamond, LineWeight, LocationOn, ModeStandby, Money, Paid, PaidOutlined, Person, Phone, PointOfSale, PriceCheck, Print, Scale } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DialogBox from '../components/mui/dialog'
import { Loader, Message } from '../containers'
import { closeTheAccount, getLoanDetail } from '../redux/actions/loan.action'


function LoanDetails() {

    let {loanId} = useParams()
    let dispatch = useDispatch()
    let {loading, error, detail, success} = useSelector(state=> state.loans.detail)
    let {loading : closeLoad, error:closeError, success : closeSuccess} = useSelector(state => state.loans.close)
    // CONFIRMATION DIALOG CONFIG

    const [open, setOpen] = useState(false);
    const [dialogText , setDialogText] = useState("This will considered as you have retured their property and they returned and complete their loan.")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogAction = () =>{
        dispatch(closeTheAccount(detail.data._id))
        if(closeLoad){
             setDialogText(<Loader/>)
        }
        if(closeSuccess){
            setOpen(false);
            dispatch(getLoanDetail(loanId))
        }
        if(closeError){
            setDialogText(closeError)
        }
       
    }

    useEffect(()=>{
        dispatch(getLoanDetail(loanId))
    },[])
    let data = detail ? detail.data : detail
    let row =  detail ? detail.data.activities : detail

    // console.table(data)



  return <div className="m-auto" style={{minHeight:"100vh", padding:"2%", paddingTop:"100px"}}>
      {loading && <Loader/>}
      {error && <Message type="error" message={error}/>}
      {!success 
        ? <div className="loader"></div> 
        : <div>
             < >   
             <div id={`print-${loanId}`}  className="pad">
               
                             <div>
                 
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>{data.loanId}</h1>
                        <div className={data.status ==='active' ? "active-status" : "closed-status" }>
                            <h2  style={{textTransform:"capitalize"}} > <ModeStandby /> {data.status}</h2>
                        </div>
                    </div>
                    <h1>{data.name}</h1>
                    <p> {data.surName} </p>
                    <p><LocationOn/> {data.address} -
                    <a className='btn btn-outline-info m-1' href={`tel:${data.contact}`} > <Phone/> {data.contact} </a></p>
                             </div>
                             <div>
                    <h2> <Diamond/> Property Details</h2>
                   <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> <Diamond/> Name</TableCell>
                                <TableCell align="right"> <Scale/> Weight (g)</TableCell>
                                <TableCell align="right"> <LineWeight/> Quantity</TableCell>
                                <TableCell align="right"> <Money/>Issued Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{data.property.name}</TableCell>
                                <TableCell align="right">{data.property.weight} g</TableCell>
                                <TableCell align="right">{data.property.quantity}</TableCell>
                                <TableCell align="right">₹ {data.amount}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table></TableContainer>
                             </div>
                 
                             <div style={{paddingTop:"50px", paddingBottom:"100px"}}>
                    <h2> <PointOfSale/> Amount Details</h2>
                    <TableContainer component={Paper}>
                    <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>LoanId</TableCell>
                                <TableCell align="right">issued Amount</TableCell>
                                <Tooltip  title='Interest per Month' ><TableCell align='right'>IPM</TableCell></Tooltip>
                                <Tooltip title="Number of Months from issued month"><TableCell align='right'>No. of Months</TableCell></Tooltip>
                                <Tooltip  title='Interest till Today' ><TableCell align='right'>Interest Amount</TableCell></Tooltip>
                                <TableCell align="right"> <PriceCheck/> Payed Amount</TableCell>
                                <TableCell align="right"> <Money/> Total Amount</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { row && row.history.map((historyRow) => (
                                <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                    {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.loanId}</TableCell>
                                <TableCell align="right">₹ {historyRow.amount}</TableCell>
                                <TableCell align="right">{historyRow.ipm}</TableCell>
                                <TableCell align="right">{historyRow.numOfMonths}</TableCell>
                                <TableCell align="right">₹ {historyRow.interestAmount}</TableCell>
                                <TableCell align="right">₹ {historyRow.payedAmount}</TableCell>
                                <TableCell align="right">
                                   ₹ {historyRow.total}
                                </TableCell>
                                </TableRow>
                            ))}
                            <TableRow >
                                 <TableCell rowSpan="6" colSpan="3"></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><CalendarMonth/><b>Total No. Months</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>{row.history.reduce((acc, data)=> acc + data.numOfMonths, 0)}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><CurrencyExchange/><b>Total Interest Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b> ₹ {row.history.reduce((acc, data)=> acc + data.interestAmount, 0)}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"> <PaidOutlined/> <b>Issued Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>₹ {row.amount}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><b> <PriceCheck/> Payed Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>₹ {row.history.reduce((acc, data)=> acc + data.payedAmount, 0)}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><h4> <Money/> <b>Total Amount</b></h4></TableCell>
                                <TableCell colSpan="2" align="right"><h4><b>₹ {row.totalamount}</b></h4></TableCell>
                            </TableRow>
                            </TableBody>
                 
                        </Table>
                        </TableContainer>
                 
                       { data.status === "active" && <div className="pad" >
                        {/* <button className='btn btn-dark m-1' >
                            <CurrencyExchange /> Pay Interest
                        </button> */}
                        <button className='btn btn-warning m-1' onClick={handleClickOpen} >
                            <Paid/> Pay Full Amount
                        </button>
                    </div>}
                 
                             </div>
               </div> 
            </>
            <DialogBox open={open} close = {handleClose} title="Do you Want to Close the Account?" text={dialogText} action={handleDialogAction} />
             {data.status !== "active" && <div>
                <button className="btn btn-dark" onClick={()=>{window.print()}} style={{margin:"3%"}} ><Print/> Print </button>
                </div>}
         </div> }
    </div>
}

export default LoanDetails