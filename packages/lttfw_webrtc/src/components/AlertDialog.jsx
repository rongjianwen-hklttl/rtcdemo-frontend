import React from 'react'
import { useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid'

import { useMobile } from '@lttfw/core/src/helpers'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

export default function AlertDialog(props) {
  const { sx, title, submit, ...rest } = props

  const theme = useTheme()
  const isMobile = useMobile()
  const rootSX = createRootSX(theme, sx, {
    isMobile,
  })

  return (
    <Dialog
      {...rest}
      fullScreen={isMobile}
      sx={rootSX}
      onClose={handleClose}
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        { title }
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose(event, reason) {
    console.debug(reason)
    if (reason && reason === "backdropClick") {
      return
    }
    props.onClose()
    submit()
  }
}

export function createRootSX(theme, sx, params) {
  const { isMobile } = params
  const style = _.merge(
    {
      '& .MuiPaper-root': {
        width: isMobile ? '100vw' : '50vw',
      },
    },
    typeof sx === 'function' ? sx(theme) : sx
  )

  return style
}
