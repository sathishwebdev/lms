import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Box, 
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper} from '@mui/material';
import {AccountCircle, BadgeRounded, CalendarMonth, Diamond, DoubleArrowRounded, KeyboardArrowDown, KeyboardArrowUp, LocationOn, ModeStandby, Money, Phone, PriceCheck, Receipt} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Preview, print } from 'react-html2pdf';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLoanActivity } from '../../redux/actions/loan.action';


const thisMonth = new Date().getMonth()
let today = new Date()



function createData({name,loanId, status, amount, property, dateOfIssue, rateOfInterest, address, gender, contact, surName}) {
    


let dayOfIssue = dateOfIssue.split('/')[0]
let monthOfIssue = dateOfIssue.split('/')[1]
let yearOfIssue = dateOfIssue.split('/')[2]

var date1 = new Date(`${monthOfIssue}/${dayOfIssue}/${yearOfIssue}`);
var date2 = today;
  
// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); //D in Days
let ipm = amount * (rateOfInterest/100) 
let yearsofPay = Difference_In_Days/(365.25) 
let DiffinMnth = Math.round(Difference_In_Days / 30.4375)
let numofyearstopay = (+`${DiffinMnth}`.split('.')[0]/12)
let numOfMonths = +(numofyearstopay*12).toFixed(2)
let totalamount = ((ipm*((numofyearstopay*12)))+amount) % 10 === 0 ? (ipm*((numofyearstopay*12))+amount) : round(Math.round((ipm*((numofyearstopay*12))+amount)))
console.log(loanId , numOfMonths, DiffinMnth)
if(numOfMonths < 0.5 && numofyearstopay < 1){
    
    numOfMonths = 1+DiffinMnth
    totalamount = ((ipm*numOfMonths)+amount ) % 10 === 0 ? (ipm*numOfMonths)+amount : round(Math.round((ipm*numOfMonths)+amount))
}else if(numOfMonths > 0 && numofyearstopay < 1){
    console.log(loanId , numOfMonths, DiffinMnth)
    numOfMonths = DiffinMnth
     console.log(loanId , numOfMonths, DiffinMnth)
    totalamount = ((ipm*numOfMonths)+amount ) % 10 === 0 ? (ipm*numOfMonths)+amount : round(Math.round((ipm*numOfMonths)+amount))
}else if(numofyearstopay >=1){
    numOfMonths = 12
}

// (ipm*(numOfMonths))+amount % 10 ? ((ipm*numOfMonths)+amount) : (round(Math.round((ipm*numOfMonths)+amount)))

// (ipm*(numOfMonths+(numofyearstopay*12)))+amount % 10 ? (ipm*(numOfMonths+(numofyearstopay*12))+amount) : round(Math.round((ipm*(numOfMonths+(numofyearstopay*12))+amount)))


// function round(n)
// {
//     let a = parseInt(n / 10, 10) * 10;
//     let b = a + 10;
//     return b
// }

const round = (x) => (Math.ceil(x/5)*5)

const data = {
    loanId,
    date : dateOfIssue,
    status,
    name, 
    propertyWeight : property ? property.weight : '',
    amount,
    history: [
    {
        ipm: amount * (rateOfInterest/100),
        date: dateOfIssue ,
        loanId,
        amount,
        numOfMonths ,
        interestAmount: ipm * (numOfMonths),
        payedAmount : 0,
        total : totalamount
    }
    ],
    property :[
        {
            name : property? property.name : '',
            weight : property ? property.weight : '',
            quantity : property ? property.quantity : '',
            amount
        }
    ],
   address, gender, contact, surName
};


if(numofyearstopay >=1) {
    amount = amount*((numOfMonths * (rateOfInterest/100))+1)
    ipm = round(amount*(rateOfInterest/100))
    ipm = ipm > +`${ipm}`.split('.')[0] ? ipm+( 1 - +`0.${`${ipm}`.split('.')[1]}`): ipm
    console.log(numOfMonths,DiffinMnth, loanId)
    numOfMonths = numOfMonths === 0 ? 1 : Math.abs(DiffinMnth - numOfMonths)+1
    console.log(numOfMonths,DiffinMnth, loanId)
    totalamount = ((ipm*numOfMonths)+amount % 10) === 0 ? ((ipm*numOfMonths)+amount) : (round(Math.round((ipm*numOfMonths)+amount)))
    data.history.push({
        ipm,
        date: today.toLocaleDateString('en-IN'),
        loanId,
        amount,
        numOfMonths,
        interestAmount: (ipm*numOfMonths),
        payedAmount : 0,
        total : totalamount
    })
    
}

console.table({
    loanId,
    ipm,
    Difference_In_Days,
    yearsofPay,
    DiffinMnth,
    numofyearstopay,
    numOfMonths,
    totalamount
})

    return {...data, totalamount, ipm, interestAmount : data.history.reduce((acc, data)=> acc + data.interestAmount, 0)}
}

   
    function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(addLoanActivity(row, row.loanId))
        },[])
    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="right">
                {row.loanId}
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            </TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center"><div className={row.status === 'active' ? "active-status" : "closed-status"}>{row.status}</div></TableCell>
            <TableCell >{row.name}</TableCell>
            <TableCell align="right">{row.propertyWeight} g</TableCell>
            <TableCell align="right">₹ {row.amount}</TableCell>
            <TableCell align="right">₹ {row.ipm}</TableCell>
            <TableCell align="right">₹ {row.interestAmount}</TableCell>
            <TableCell align="right">₹ {row.totalamount}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <>
                <Typography variant="h6" gutterBottom component="div">
                        Account Details - <span className={row.status === 'active' ? "active-status" : "closed-status"} style = {{width: "fit-content", textTransform:"capitalize"}} > <ModeStandby/> {row.status}</span>
                    </Typography>
                   
                        <div className='pad'>
                        
                                       <div>
                           <h2>{row.loanId} -  {row.name} </h2>
                           <p> {row.surName} </p>
                           <p><LocationOn/> {row.address} -
                           <a className='btn btn-outline-info m-1' href={`tel:${row.contact}`} > <Phone/> {row.contact} </a></p>
                                       </div>
                        <Typography variant="h6" gutterBottom component="div">
                            Property Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Weight (g)</TableCell>
                                <TableCell align="right">Quantityt</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {row.property.map((propertyRow, id) => (
                                <TableRow key={id}>
                                <TableCell component="th" scope="row">
                                    {propertyRow.name}
                                </TableCell>
                                <TableCell align="right">{propertyRow.weight}</TableCell>
                                <TableCell align="right">{propertyRow.quantity}</TableCell>
                                <TableCell align="right">{propertyRow.amount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        <Typography variant="h6" gutterBottom component="div">
                            Amount Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>LoanId</TableCell>
                                <TableCell align="right">issued Amount</TableCell>
                                <Tooltip  title='Interest per Month' ><TableCell align='right'>IPM</TableCell></Tooltip>
                                <Tooltip title="Number of Months from issued month"><TableCell align='right'>No. of Months</TableCell></Tooltip>
                                <Tooltip  title='Interest till Today' ><TableCell align='right'>Interest Amount</TableCell></Tooltip>
                                <TableCell align="right"> Payed Amount</TableCell>
                                <TableCell align="right"> Total Amount</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {row.history.map((historyRow) => (
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
                                <TableCell colSpan="3"><b>Total No. Months</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>{row.history.reduce((acc, data)=> acc + data.numOfMonths, 0)}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><b>Total Interest Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b> ₹ {row.interestAmount}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><b>Issued Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>₹ {row.amount}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><b>Payed Amount</b></TableCell>
                                <TableCell colSpan="2" align="right"><b>₹ {row.history.reduce((acc, data)=> acc + data.payedAmount, 0)}</b></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><h4><b>Total Amount</b></h4></TableCell>
                                <TableCell colSpan="2" align="right"><h4><b>₹ {row.totalamount}</b></h4></TableCell>
                            </TableRow>
                            </TableBody>
                        
                        </Table>
                        
                    </div>
                    </>
                 <div className="pad text-right d-flex w-100 align-items-center justify-content-end"  >
                    
                    <Link className="btn btn-dark" style={{margin:"3%"}} to={`/loan/detail/${row.loanId}`} > Take Action <DoubleArrowRounded/>  </Link>
                </div>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    );
    }

    Row.propTypes = {
    row: PropTypes.shape({
        loanId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        propertyWeight: PropTypes.number.isRequired,
        property: PropTypes.arrayOf(
            PropTypes.shape({
            amount: PropTypes.number.isRequired,
            weight: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
            }),
        ).isRequired,
        history: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            loanId: PropTypes.string.isRequired,
            ipm : PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
        }),
        ).isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    };

export default function ReactTable({data}) {

    const rows = data.map(row => createData(row)).reverse()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center" > <BadgeRounded/> Loan Id</TableCell>
            <TableCell align="center"> <CalendarMonth/> Date</TableCell>
            <TableCell align="center"> <ModeStandby/> Status</TableCell>
            <TableCell align="center"> <AccountCircle/> Name </TableCell>
            <TableCell align="right"> <Diamond/> Property (g)</TableCell>
            <TableCell align="right"> <PriceCheck/> Issued Amount</TableCell>
            <Tooltip title="Interest Per Month">
                <TableCell align="right"> <PriceCheck/> IPM</TableCell>
            </Tooltip>
            <Tooltip title="Interest till Today">
            <TableCell align="right"> <PriceCheck/> Interest Amount</TableCell></Tooltip>
            <Tooltip title="Amount to Pay">
            <TableCell align="right"> <Money/> Total Amount</TableCell></Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <Row key={id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
