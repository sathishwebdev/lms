import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/mui'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { PrimaryButton } from '../components/mui/Button'
import { forgetPassword } from '../redux/actions/users.actions'
import {useDispatch, useSelector} from 'react-redux'
import { setSnackbar } from '../redux/actions/snackbar.actions'
import { UserActionTypes } from '../redux/types/user.types'
import { CustomizedSnackbars, Message } from '../containers'

function ForgetPassword() {

    const navigate = useNavigate()
    
    // redux
    const dispatch = useDispatch()
    const {loading, error, success, response} = useSelector(state=>state.users.forgetPassword)

    const Submission = (values, { setSubmitting, resetForm }) =>{
        dispatch(forgetPassword(values))
        setSubmitting(false)
        resetForm()
    }

    let formValidateSchema = yup.object({
                email:yup
                    .string()
                    .trim()
                    .email("Enter valid email.")
                    .required("Email is required"),
                })

    const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues:{
            email:''
        },
        validationSchema : formValidateSchema,
        onSubmit: Submission
        })

    useEffect(()=>{
        if(success){
            dispatch(setSnackbar(true, "success", response ? response.message : "Request Sent!"))
        }
        return () =>{
            dispatch({type: UserActionTypes.FORGETPASSWORD.RESET})
        }
    },[dispatch, response, success])    

  return (
    <div className="header" >
        <div className="App">
        {error && <Message type="error" message={error}/>}
        {success && <Message type="success" message= {response ? response.message : "Request Sent!"} /> }
            <CustomizedSnackbars />
            <h1>ForgetPassword ?</h1>
            <small>Enter your Mail id to send a request</small><br/>

            <Input
                id="email"
                placeholder="Email"
                name="email"
                margin='normal'
                className='input'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
            />
            <br/>
            <smal style={{color:'red'}} l>{errors.email && touched.email && errors.email}</smal>
            <br/>
            <PrimaryButton
                type="submit"
                onClick={handleSubmit}
            >
              {loading? <div className="loader"></div> : "Send Request"}
            </PrimaryButton>
        </div>
    </div>
  )
}

export default ForgetPassword