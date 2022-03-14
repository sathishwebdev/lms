import * as mui from "@mui/material"; 

const IconButton = mui.styled(mui.IconButton)(({ theme }) => ({
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  }));

  export default IconButton