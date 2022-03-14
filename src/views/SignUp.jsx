import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { IconButton, Input } from "../components/mui";
import {  loginUser, registerUser } from "../redux/actions/users.actions";
import * as yup from 'yup'
import { PrimaryButton } from "../components/mui/Button";
import walk from '../assets/walk.svg'
import { setSnackbar } from "../redux/actions/snackbar.actions";
import { CustomizedSnackbars, Message } from "../containers";
import { UserActionTypes } from "../redux/types/user.types";

function SignUp() {


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  

  const { loading, error, success, response } = useSelector(
  (state) => state.users.create);
    
  const { user_login } = useSelector(
    (state) => state.users.login);
  
   const signupSchema = yup.object({
      email: yup
        .string()
        .trim()
        .email("Enter valid email.")
        .required(),
      password: yup.string().required("create your secuirity key").min(5),
      name: yup.string().min(4).required("How can i call you?")
    });
  
  const Submission = (formData, { setSubmitting, resetForm }) =>{
  
    let data = {...formData}

    dispatch(registerUser(data))

    setSubmitting(false);
    resetForm()
  }

  const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues:{
      email:'',
      password: '',
      name:''
    },
    validationSchema: signupSchema,
    onSubmit: Submission
  })

  useEffect(() => {
    if (user_login) {
      navigate('/user/dashboard');
    }
    
    if(success){
      
      dispatch(setSnackbar(true, "success", response.message))
      dispatch({type: UserActionTypes.REGISTER.RESET})
      navigate('/user/login')
    }
    if(error){
      dispatch(setSnackbar(true, "error", "Error !"))
    }

  }, [user_login, dispatch, loading, error, success]);


  


  return (
    <div className="header" style={{ borderRadius:"0 0 0 0", minHeight:"100vh"}}>
           <div className="d-none d-sm-block walk-holder" >
              <img src={walk} alt="human" />
            </div>
            <div className=' pad col-12 col-sm-6 text-center' >

                <h1> SIGN UP </h1>
                {error && <Message type="error" message={error}/>}
                {response && <Message type = {response.error ? "error"  : "success"} message = {response.message}/>}
                <CustomizedSnackbars />

                <Input
                    name="name"
                    id="name"
                    placeholder="Name"
                    margin="normal"
                    className='input'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                />
                <br/>
                  <small style={{color:"red"}} >{errors.name && touched.name && errors.name}</small>
                <br/>
                <Input
                    name="email"
                    id="email"
                    placeholder="Email"
                    margin="normal"
                    className='input'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                />
                <br/>
                  <small style={{color:"red"}} >{errors.email && touched.email && errors.email}</small>
                <br/>
                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    margin="normal"
                    className='input'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility sx={{color:"#331068", zIndex:"1"}} /> : <VisibilityOff sx={{color:"#331068", zIndex:"1"}} />}
                          </IconButton>
                          
                        </InputAdornment>
                      )
                    }}
                    required
                />
                <br/>
                      <small style={{color:"red"}} >{errors.password && touched.password && errors.password}</small>
                      <br/>
                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                >
                   {loading ? <div className="loader" ></div> :  "Sign Up"}
                </PrimaryButton>
            </div>
    </div>
  )
}

export default SignUp