import { FormControlLabel, InputAdornment, Radio, RadioGroup, Input as MuiInput } from '@mui/material';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Input } from '../components/mui'
import { SecondaryButton } from '../components/mui/Button'
import * as yup from 'yup'
import { setSnackbar } from '../redux/actions/snackbar.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLoan } from '../redux/actions/loan.action';

function AddLoan() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let time = new Date().toLocaleTimeString('en-us');
  let date = new Date().toLocaleDateString('en-in');

  // AUTHORIZATION CHECK
    
  const { loading, error, user_login } = useSelector(
    (state) => state.users.login
  );


    useEffect(() => {
        if (user_login) {
  
          if(user_login.isVerified){
            
           }else{
            dispatch(setSnackbar(true, "error", "not verified yet"))
            navigate('/user/verify')
        }
        }else{
          navigate('/')
        }
       
      }, [user_login, dispatch, loading, error, navigate]);

  const validator = yup.object({
    name: yup.string().min(4).required(),
    surname : yup.string().min(4).required(),
    address : yup.string().min(4).required(),
    amount : yup.number().min(2000).required(),
    propertyName : yup.string().required(),
    contact: yup.string().matches(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/).required(),
    propertyQuantity: yup.number().min(1),
    propertyWeight: yup.number().min(0).max(100),
    gender : yup.string().required()
  })

  const submitter = (values, { setSubmitting, resetForm }) =>{
    
    let data = {
      date: date,
      time: time,
      ...values
    }
    console.log(data)
    dispatch(setSnackbar(true, "success", "loan details added successfully"))
    dispatch(addLoan(data, user_login._id))
    setSubmitting(false);
    resetForm()
    
  }

  const { values, handleChange, handleSubmit, handleBlur, errors, touched}  = useFormik({
    initialValues: {
      name: '',
      propertyName: '',
      propertyWeight: 0,
      propertyQuantity : 1,
      gender : '',
      surname : '',
      address: '',
      contact :"+91",
      amount: ''
    },
    onSubmit : submitter,
    validationSchema : validator
  })

  return (
    <div className="d-flex justify-content-center align-items-center text-uppercase"  style={{paddingTop:"100px", paddingBottom:"100px", textAlign:"center", backgroundColor:"#ddd", minHeight:"100vh"}}>
    
      <div className="pad d-flex flex-column align-items-center" style={{ maxWidth:"800px"}}>
           <h1>Add New Loan Details</h1>
          <Input 
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className='input'
            margin="normal"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            required
          />
          <small style={{color:"red"}}>{errors.name && touched.name && errors.name }</small>
           
           <RadioGroup
                row
                name="gender"
                id="gender"
                sx={{color:"gray"}}
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
            >             
              <FormControlLabel value="male" control={<Radio color="default" />} label="Male" />
              
              <FormControlLabel value="female" control={<Radio color="default" />} label="Female" />
            </RadioGroup>

            <small style={{color:"red"}}>{errors.gender && touched.gender && errors.gender }</small>

          <Input 
            className="input" 
            margin="normal"
            type="text" 
            name = "surname" 
            id="surName" 
            placeholder="Sur-Name" 
            value={values.surname} 
            onChange={handleChange} 
            onBlur={handleBlur}
            required 
          />
           <small style={{color:"red"}}>{errors.surname && touched.surname && errors.surname }</small>
          <Input 
            className="input" 
            margin="normal"
            type="text" 
            placeholder="Address"
            name="address"
            id="address" 
            value={values.address} 
            onChange={handleChange}   
            onBlur={handleBlur}
            required 
          />
          <small style={{color:"red"}}>{errors.address && touched.address && errors.address }</small>
          <Input 
            className="input" 
            margin="normal"
            type="tel" 
            placeholder="Contact" 
            inputProps={{pattern:"[0-9]{10}"}}
            id="contact"
            name="contact"
            value={values.contact} 
            onChange={handleChange}  
            onBlur={handleBlur}
            required 
          />
          <small style={{color:"red"}}>{errors.contact && touched.contact && errors.contact }</small>
          <Input 
            className="input" 
            margin="normal"
            id="amount"
            name="amount"
            placeholder="Amount" 
            onChange={handleChange} 
            onBlur={handleBlur}
            value={values.amount} 
            required 
          />
          <small style={{color:"red"}}>{errors.amount && touched.amount && errors.amount }</small>
          <div style={{width:"100%"}}>
            <h2 style={{color:"#000"}}>Propery Details</h2>

            <small style={{color:"red"}}>{errors.propertyName && touched.propertyName && errors.propertyName}</small>
            <small style={{color:"red"}}>{errors.propertyQuantity && touched.propertyQuantity && errors.propertyQuantity}</small>
            <small style={{color:"red"}}>{errors.propertyWeight && touched.propertyWeight && errors.propertyWeight}</small>

            <Input
              type="text"
              margin="normal"
              name="propertyName"
              id="propertyName"
              sx={{width:"40%", marginRight:"20px"}}
              placeholder ="Property Name "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.propertyName}
              required
            />
            
            <Input
              type="number"
              margin="normal"
              name="propertyQuantity"
              id="propertyQuantity"
              sx={{width:"100px", marginRight:"20px"}}
              placeholder ="Quantiy "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.propertyQuantity}
              required
            />
            
            <Input
              type="number"
              margin="normal"
              name="propertyWeight"
              id="propertyWeight"
              sx={{width:"100px"}}
              placeholder ="Property weight "
              InputProps={{
                inputMode: 'numeric',
                endAdornment:(
                  <InputAdornment position="end">
                   <p style={{color:"#000", zIndex:"1", marginTop:"15px"}}>gm</p>
                  </InputAdornment>
                ),
                 min: 10
              }}
              value={values.propertyWeight}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
           
          </div>

            <br/>
          <SecondaryButton
            margin="normal"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </SecondaryButton>
      </div>
    </div>
  )
}

export default AddLoan