import * as mui from "@mui/material"; 

const Button = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#",
    margin: "3%",
    fontFamily: "advent",
  
    "&:hover": {
      backgroundColor: "",
      color: "white",
      textShadow: "0px 0px 20px 1px #0f0f0f",
    },
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }));

  const PrimaryButton = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#ffd500",
    margin: "3%",
    fontFamily: "advent",
    borderRadius:"25px",
    padding:"2%",
  
    "&:hover": {
      backgroundColor: "#ffd600",
      color: "white",
      boxShadow: "0px 0px 20px 1px #0f0f0f",
    },
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }));
  const SecondaryButton = mui.styled(mui.Button)(({ theme }) => ({
   color: theme.palette.getContrastText(mui.colors.purple[500]),
  backgroundColor: "#000",
  fontFamily: "advent",
  padding:"2%",
  margin: "3%",
  '&:hover': {
    backgroundColor: "white",
    color:"black",
    boxShadow: "0px 0px 20px 1px #0f0f0f",
  },
  }));
  export default Button

  export{
    PrimaryButton,
    SecondaryButton
  }