import { ContentCopy } from '@mui/icons-material'
import { Button, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSnackbar } from "../../../../redux/actions/snackbar.actions"

const ShortUrlColumn = ({shortUrl}) => {

    const dispatch = useDispatch()

    return (
       <div className="shorturl">
       <Button  onClick={()=>{  
            
            window.open(`/${shortUrl}`, '_blank')
          
            }} className="link">
            {shortUrl}
        </Button>
        <Tooltip title="Copy Short link" >
            <IconButton
            onClick={
                () => {
                    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`)
                    dispatch(setSnackbar(true, "success", "Copied"))
                }
            }
            >
                <ContentCopy />
            </IconButton>
        </Tooltip>
        </div>
    )
}

export default ShortUrlColumn
