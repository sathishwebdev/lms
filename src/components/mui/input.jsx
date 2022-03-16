import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const Input = styled(TextField)({
    'input' :{
      backgroundColor: 'whitesmoke',
      borderColor: 'whitesmoke',
      color: '#252525',
      zIndex:"1",
      borderRadius:"25px"
    },
    
    '& label.Mui-focused': {
      color: "#252525",
      backgroundColor: 'whitesmoke',
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
        backgroundColor:"whitesmoke"
      },
      '&:hover fieldset':{
        borderColor:"whitesmoke"

      },
      ' fieldset':{
        borderRadius:"25px",
        borderColor:"whitesmoke",
        backgroundColor:"whitesmoke",
        color:"#252525",
        zIndex:"0"
      }
    },
  });

export default Input