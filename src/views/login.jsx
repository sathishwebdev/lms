import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Input } from "../components/mui";
import { loginUser } from "../redux/actions/users.actions";
import * as yup from 'yup'
import { PrimaryButton } from "../components/mui/Button";
import walk from '../assets/walk.svg'
import { CustomizedSnackbars, Message } from "../containers";
import { setSnackbar } from "../redux/actions/snackbar.actions";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { loading, error, user_login } = useSelector(
    (state) => state.users.login
  );


    useEffect(() => {
        if (user_login) {
          dispatch(setSnackbar(true, "success", "User Logged in "))
          if(user_login.isVerified){
            navigate('/user/dashboard');
           }else{
           navigate('/user/verify')
        }
        }
       
      }, [user_login, dispatch, loading, error, navigate]);

     const loginSchema = yup.object({
        email: yup
          .string()
          .trim()
          .email("Enter valid email.")
          .required("Email is required"),
        password: yup.string().required("Password is required").min(5),
      });
    
    const Submission = (formData, { setSubmitting, resetForm }) =>{
    
      let data = {
        password : formData.password,
        email : formData.email
      }

      dispatch(loginUser(data))

      setSubmitting(false);
      resetForm()
      
    }
  
    const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
      initialValues:{
        email:'',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit: Submission
    })
   
  
    return (
      <div className="App">
        <div className="header" style={{ borderRadius:"0 0 0 0", minHeight:"100vh", backgroundColor:"transparent"}}>
           <div className="d-none d-sm-block walk-holder" >
              <img src={walk} alt="human" />
            </div>
             <div className="col-12 col-sm-6 col-lg-4 pad " style={{ color:"gray"}} >
                  <div style={{ textAlign: "center" }}>
                  {error && <Message type="error" message={error}/>}
                <CustomizedSnackbars />

                    <h1>Login in</h1>
                    <Input
                      id="email"
                      name='email'
                      placeholder='Email'
                      // label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="input"
                      margin="normal"
                      required
                      />
                      <br/>
                      <small style={{color:"red"}} >{errors.email && touched.email && errors.email}</small>
                      <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name='password'
                      placeholder='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // label="Password"
                      value={values.password}
                      className="input"
                      margin="normal"
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
                      required/>
                      <br/>
                      <small style={{color:"red"}} >{errors.password && touched.password && errors.password}</small>
                      <br/>
                    <PrimaryButton
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {loading ? <div className='loader' ></div> : "LOG IN"}
                    </PrimaryButton>
                    <br/>
              <small>
                <Link to="/user/forgetpassword" className='link'>Forget Password ?</Link>
                <p>New one ? <span><Link to='/user/signup' className='link' >Sign Up</Link></span></p>
              </small>
               </div>
            </div>
            
        </div>
      </div>
    );
  }