import * as React from "react";
import {Box, Alert, IconButton, Collapse} from "@mui/material";
import {Close} from '@mui/icons-material'

export default function Message({ message, type }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box className="m-2">
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
             <Close/> 
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}