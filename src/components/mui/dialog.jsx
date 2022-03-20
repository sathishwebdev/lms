import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogBox({open, close, action, title, text}) {
  return (
    <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={close}>Close</Button>
          <Button color="warning" onClick={action} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogBox