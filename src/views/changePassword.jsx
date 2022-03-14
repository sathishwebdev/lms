import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IconButton, Input } from "../components/mui";
import { PrimaryButton } from "../components/mui/Button";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/actions/users.actions";
import { setSnackbar } from "../redux/actions/snackbar.actions";
import { UserActionTypes } from "../redux/types/user.types";
import { CustomizedSnackbars, Message } from "../containers";

const ChangePassword= () =>{

    const location = useLocation()
    const {userId} = useParams()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    let key = location.search
  
    const navigate = useNavigate()

    // redux

    const{loading, error, success, response} = useSelector(state => state.users.changePassword)
    const dispatch = useDispatch()

    let formValidateSchema = yup.object({
      password : yup.string().required("Password is required").min(5),
    })
    
    const Submission = (values, { setSubmitting, resetForm }) =>{
      dispatch(changePassword(values, userId, key))
      setSubmitting(false)
      resetForm()
    }
  
    const {values, handleChange, handleSubmit, handleBlur,errors, touched } = useFormik({
      initialValues:{
        password:''
      },
      validationSchema: formValidateSchema,
      onSubmit: Submission
    })

    useEffect(()=>{
      if(success){
          dispatch(setSnackbar(true, "success",  response ? response.message : "Request Sent!"))
      }
      return () =>{
          dispatch({type: UserActionTypes.CHANGEPASSWORD.RESET})
      }
  },[dispatch, success])    

    return  <div className="App">
        <div className="App-header">
            <div className="container" >
                  <div style={{ textAlign: "center" }}>
                  {error && <Message type="error" message={error}/>}
        {success && <Message type="success" message= { response ? response.message : "Password Changed !"} /> }
        <CustomizedSnackbars />
                    <h1>Forget Password ?</h1>
                    <small>Change Your Password</small>
                    <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name='password'
                  placeholder='New Password'
                  label="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="input"
                  margin="normal"
                  InputProps={{
                    endAdornment:(
                      <InputAdornment position="end">
                        <small style={{color:"red"}} >{errors.password && touched.password && errors.password}</small>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                      
                    )
                  }}
                  required/>
                    <PrimaryButton
                      type="submit"
                      color="inherit"
                      size="large"
                      onClick={handleSubmit}
                    >
                      {loading? <div className='loader' ></div> : "Change Password"}
                    </PrimaryButton>
                    <br/>
              <small>
                <Link to='/login' className='link' > Log in</Link>
                <p>New one ? <span><Link to='signup' className='link' >Sign Up</Link></span></p>
              </small>
               </div>
            </div>
        </div>
      </div>
  
  
  }

  export default ChangePassword