import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const Input = styled(TextField)({
    'input' :{
      // backgroundColor: 'white',
      borderColor: 'whitesmoke',
      color: '#331068',
      zIndex:"1",
      borderRadius:"25px"
    },
    
    '& label.Mui-focused': {
      color: "#331068",
      // backgroundColor: 'white',
      outline: 'none',
      display:'none'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'whitesmoke',
    },
    '& .MuiOutlinedInput-root': {
      
      '&.Mui-focused fieldset': {
        borderColor: 'whitesmoke',
        outline:"none",
      },
      '&:hover fieldset':{
        borderColor:"whitesmoke"
      },
      ' fieldset':{
        borderRadius:"25px",
        borderColor:"whitesmoke",
        backgroundColor:"white",
        color:"#331068",
        zIndex:"0"
      }
    },
  });

export default Input