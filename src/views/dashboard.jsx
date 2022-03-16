import { Add } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import LoanList from '../components/dashboard/loanList'

function Dashboard() {
  return (
    <div>
      <div style={{paddingTop:"100px", textAlign:"center",}}>
          <h1>Dashboard</h1>
          <Link to="/user/add/loan" className="btn btn-dark" ><Add /> Add Loan</Link>
      </div>
      <LoanList />
    </div>

  )
}

export default Dashboard